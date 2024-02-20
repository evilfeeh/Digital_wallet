import { OrderRepository } from '../model'
import { instantiateUser } from '../utils/instantiateUser'
import { IOrder } from '../interfaces/order'
import { Logger } from 'winston'

export class Payment {
  private readonly order: IOrder
  private readonly logger = new Logger
  private readonly orderRepository = new OrderRepository
  constructor (order: IOrder) {
    this.order = order
  }

  private async authorizator (): Promise<boolean> {
    return true
  }

  async start () {
    try {
      await this.orderRepository.save(this.order, 'STARTING TRANSACTION');

      const isAuthorized = await this.authorizator()

      if (!isAuthorized) {
        this.orderRepository.update(this.order, 'BANK UNATHORIZED') 
        return { status: 'Failed', message: 'bank unathorized transaction' }
      }

      const payer = await instantiateUser(this.order.payer_email)
      const seller = await instantiateUser(this.order.seller_email)

      if (payer.debit_amount < this.order.value) {
        this.orderRepository.update(this.order, 'BANK AUTHORIZATION FAILED NO DEBIT') 
        return { status: 'Failed', message: 'Insuficient debit amount' }
      }

      await payer.withdraw()
      await seller.deposit()

      this.orderRepository.update(this.order, 'TRANSACTION DONE SUCCESSFULLY')
      return { status: 'Success', message: 'Order Complete Successfully' }
    } catch (error) {
      await this.orderRepository.update(this.order, 'TRANSACTION FAILED')
      this.logger.log('error', error.message)
      throw new Error('Order Failed')
    }
  }
}
