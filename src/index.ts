import UserManagment from './controllers/UserManagment'
import { Iuser } from './interfaces/user'
import DataValidation from './adapters/DataValidation'

class Index {
  dataValidation = new DataValidation
  createNewUser (user: Iuser) {
    const { status, message } = this.dataValidation.newUser(user)

    if (status == 'Error') {
      return { status, message }
    }

    const userManagment = new UserManagment(user)
    userManagment.create()
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

