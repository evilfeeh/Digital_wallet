import UserManagment from './controllers/UserManagment'
import DataValidation from './adapters/DataValidation'

class Index {
  dataValidation = new DataValidation
  createNewUser (user: any) {
    const userManagment = new UserManagment(user, user.password)
    return userManagment.new()
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
