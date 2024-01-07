import { OrderRepository } from '../model/orderRepository'
import { PayInRepository } from '../model/payinRepository'
import UserManagment from './UserManagment'
import { WalletManagment } from './WalletManagment'

interface IOrder {
  payer: string;
  seller: string;
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
    this.user = new UserManagment(order.payer, '')
    this.order = order
  }
  private async authorizator (): Promise<boolean> {
    // calls AES services to approve order
    return false
  }
  async start () {
    Promise.all([
      this.payInRepository.register(this.order),
      this.orderRepository.save(this.order) // init status = OPEN_PAYMENT_ORDER
    ])

    const isAuthorized = await this.authorizator()
    if (!isAuthorized) {
      // authorization recused
    }

    await this.orderRepository.save(this.order) // Middle status = BANK_AUTHORIZATION_SUCCESS
    const payerWallet = new WalletManagment(order.payer)
    // validate with user has the amount money needled
    // extract money from buyers wallet
    // add money to seller's wallet
    // update order register
    // finish process
  }
}
