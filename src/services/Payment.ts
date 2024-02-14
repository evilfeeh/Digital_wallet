import { OrderRepository, PayInRepository } from '../model'
import { instantiateUser } from '../utils/instantiateUser'

interface IOrder {
  payer_id: string;
  seller_id: string;
  payment_amount: number;
  id: string;
  date: string;
  status: string;
}

export class Payment {
  private readonly order: IOrder
  private readonly payInRepository = new PayInRepository
  private readonly orderRepository = new OrderRepository
  constructor (order: any) {
    this.order = order
  }

  private async authorizator (): Promise<boolean> {
    return true
  }

  async start () {
    this.payInRepository.register(this.order),
    this.orderRepository.save(this.order, 'OPEN_PAYMENT_ORDER') 

    try {
      const isAuthorized = await this.authorizator()
      if (!isAuthorized) {
        this.orderRepository.save(this.order, 'BANK_UNATHORIZED') 
        return { status: 'Failed', message: 'Insuficient debit amount' }
      }

      const payer = await instantiateUser(this.order.payer_id)
      const seller = await instantiateUser(this.order.seller_id)

      if (payer.debit_amount < this.order.payment_amount) {
        this.orderRepository.save(this.order, 'BANK_AUTHORIZATION_FAILED_NO_DEBIT') 
        return { status: 'Failed', message: 'Insuficient debit amount' }
      }
      this.orderRepository.save(this.order, 'BANK_AUTHORIZATION_SUCCESS')
      this.orderRepository.save(this.order, 'STARTING_PAYER_WITHDRAW')
      await payer.withdraw()

      this.orderRepository.save(this.order, 'STARTING_DEPOSIT') 
      await seller.deposit()

      this.orderRepository.save(this.order, 'TRANSACTION DONE SUCCESSFULLY') 
      return { status: 'Success', message: 'Order Complete Successfully' }
    } catch (error) {
      await this.orderRepository.save(this.order, 'TRANSACTION DONE FAILED') 
      throw new Error('Order Failed')
    }
  }
}
