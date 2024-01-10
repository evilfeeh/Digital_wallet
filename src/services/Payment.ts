import { OrderRepository } from '../model/orderRepository'
import { PayInRepository } from '../model/payinRepository'
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
  private readonly payInRepository: PayInRepository
  private readonly orderRepository: OrderRepository
  constructor (order: any) {
    this.order = order
  }
  private async authorizator (): Promise<boolean> {
    // calls AES services to approve order
    return false
  }
  async start () {
    this.payInRepository.register(this.order),
    this.orderRepository.save(this.order) // init status = OPEN_PAYMENT_ORDER

    try {
      const isAuthorized = await this.authorizator()
      if (!isAuthorized) {
        // authorization recused
      }

      const payer = await instantiateUser(this.order.payer_id)
      const seller = await instantiateUser(this.order.seller_id)

      if (payer.debit_amount < this.order.payment_amount) {
        // debit recused
      }
      this.orderRepository.save(this.order) // Middle status = BANK_AUTHORIZATION_SUCCESS

      this.orderRepository.save(this.order) // Middle status = STARTING_PAYER_WITHDRAW
      await payer.withdraw()

      this.orderRepository.save(this.order) // Middle status = STARTING_DEPOSIT
      await seller.deposit()

      this.orderRepository.save(this.order) // Final status = TRANSACTION DONE SUCCESSFULLY
      return { status: 'Success', message: 'Order Complete Successfully' }
    } catch (error) {
      await this.orderRepository.save(this.order) // Final status = TRANSACTION DONE FAILED
      return { status: 'Error', message: 'Order Failed' }
    }
  }
}
