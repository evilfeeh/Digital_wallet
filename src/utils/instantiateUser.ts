import { User, Wallet } from '../services'

export async function instantiateUser (user_id: string) {
  const user = await new User().get(user_id)
  const wallet = await new Wallet().get(user_id)
  const debit_amount = wallet.debit_amount
  async function deposit () {
    return this.wallet.deposit(this.order.payment_amount, user.id)
  }
  async function withdraw() {
    return this.wallet.withdraw(this.order.payment_amount, user_id)
  }

  return {
    user,
    wallet,
    debit_amount,
    deposit,
    withdraw
  }
}
