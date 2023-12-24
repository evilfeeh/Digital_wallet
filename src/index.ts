import UserManagment from './services/UserManagment'
import DataValidation from './adapters/DataValidation'

class Index {
  dataValidation = new DataValidation
  createNewUser (user: any) {
    let userValidated = this.dataValidation.user(user)
    if (userValidated.status == 'Error') return userValidated
    
    let passwordValidated = this.dataValidation.password(user.password);
    if (passwordValidated.status == 'Error') return passwordValidated

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
