import { OrderRepository } from '../model/orderRepository'
import { PayInRepository } from '../model/payinRepository'
import { buildUser } from '../utils/buildUser';
interface IOrder {
  payer_id: string;
  seller_id: string;
  payment_amount: number;
  id: string;
  date: string;
  status: string;
}

export class payment {
  order: IOrder
  payInRepository: PayInRepository
  orderRepository: OrderRepository
  constructor (order: IOrder) {
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

      const payer = await buildUser(this.order.payer_id)
      const seller = await buildUser(this.order.seller_id)

      if (payer.debit_amount < this.order.payment_amount) {
        // debit recused
      }
      this.orderRepository.save(this.order) // Middle status = BANK_AUTHORIZATION_SUCCESS

      this.orderRepository.save(this.order) // Middle status = STARTING_PAYER_WITHDRAW
      await payer.withdraw()

      this.orderRepository.save(this.order) // Middle status = STARTING_DEPOSIT
      await seller.deposit()

      this.orderRepository.save(this.order) // Final status = TRANSACTION DONE SUCCESSFULLY
    } catch (error) {
      await this.orderRepository.save(this.order) // Final status = TRANSACTION DONE FAILED
    }
  }
}
