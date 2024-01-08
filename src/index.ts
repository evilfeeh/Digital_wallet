import { User } from './services/User'
import DataValidation from './utils/DataValidation'
import { UserRepository } from './model/userRepository'
import { hashingPassword } from './utils/hashing'


class Creation { // POST /v1/user
  dataValidation = new DataValidation
  async new (candidate: any): Promise<{ status: string, message: string, value?: any }> {
    let userValidated = this.dataValidation.user(candidate)
    if (userValidated.status == 'Error') return userValidated

    let passwordValidated = this.dataValidation.password(candidate.password);
    if (passwordValidated.status == 'Error') return passwordValidated

    let user = {
      ...candidate,
      hash: hashingPassword(candidate.password),
      common_user:(candidate.type === 'common') ? true : false
    }

    const userCreated = await new User().create(user)

    return {status: 'Success', message: "User created successfully", value: userCreated }
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
