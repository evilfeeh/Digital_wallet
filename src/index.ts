import UserManagment from './services/UserManagment'
import DataValidation from './utils/DataValidation'
import { UserRepository } from './model/userRepository'

class Index {
  dataValidation = new DataValidation
  userRepository = new UserRepository
  createNewUser (user: any) {
    let userValidated = this.dataValidation.user(user)
    if (userValidated.status == 'Error') return userValidated

    let passwordValidated = this.dataValidation.password(user.password);
    if (passwordValidated.status == 'Error') return passwordValidated

    const userManagment = new UserManagment(user, user.password)
    return userManagment
  }

  async addCashToUser (payer: any, payee: any, amount: number) {
    const payerUser = await this.userRepository.get(payer)
    const payeeUser = await this.userRepository.get(payee)

    let payerValidated = this.dataValidation.user(payerUser)
    if (payerValidated.status == 'Error') return payerValidated

    let payeeValidated = this.dataValidation.user(payeeUser)
    if (payeeValidated.status == 'Error') return payeeValidated

    let cashValidated = this.dataValidation.cash(amount)
    if (cashValidated.status == 'Error') return cashValidated
  }
}

const index = new Index()
try {
  index.createNewUser({
    fullname: "Felipe Santos",
    CPF_CNPJ: "425.609.398-27",
    email: "felipe@gmail.com",
    password: "SENHAsenha#123",
    phone: '11984686451'
  })
} catch (err) {
  console.error(err)
}
