import { UserRepository } from './model/userRepository'
import { UserBuilder } from './utils/UserBuilder'

class Creation { // POST /v1/user

  userBuilder = new UserBuilder
  async new (candidate: any): Promise<{ status: string, message: string, value?: any }> {
    try {
      const user = this.userBuilder
      .fullname(candidate.fullname)
      .commonUser(candidate.commonUser)
      .cpfCnpj(candidate.CPF_CNPJ)
      .email(candidate.email)
      .phone(candidate.phone)
      .password(candidate.password)
      .build()
      return {status: 'Success', message: "User created successfully", value: user }
    } catch (error) {
      return {status: 'Error', message: "User created error", value: error.message }
    }
  }
}

class WalletManagment {
  dataValidation = new DataValidation
  userRepository = new UserRepository

  async addCash (order: any) {
    const payer = await this.userRepository.get(order.payer)
    const seller = await this.userRepository.get(order.seller)

    let payerValidated = this.dataValidation.user(payer)
    if (payerValidated.status == 'Error') return payerValidated

    let payeeValidated = this.dataValidation.user(seller)
    if (payeeValidated.status == 'Error') return payeeValidated

    let cashValidated = this.dataValidation.cash(order.payment_amount)
    if (cashValidated.status == 'Error') return cashValidated
  }
}

const creation = new Creation()
const payment = new WalletManagment()
try {
  creation.new({
    fullname: "Felipe Santos",
    CPF_CNPJ: "425.609.398-27",
    password: "SENHAsenha#123",
    email: "felipe@gmail.com",
    phone: '11984686451',
    type: 'common' // seller
  })

  payment.addCash({
    payer: 1,
    seller: 2,
    payment_amount: 33.5
  })
} catch (err) {
  console.error(err)
}
