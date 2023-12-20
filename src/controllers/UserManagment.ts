import { Iuser } from '../interfaces/user'
import DataValidation from '../adapters/DataValidation'
import { SqlDatabase } from '../adapters/SqlDatabase'
import { hashingPassword } from '../utils/hashing'

export default class UserManagment {
  dataValidation = new DataValidation()
  database = new SqlDatabase()
  user: Iuser
  salt: string
  hash: string
  constructor (user: Iuser) {
    this.user = user
    this.user.active = true
    this.user.commonUser = this._isCommonUser();
    [this.salt, this.hash] = hashingPassword(this.user.password).split(':')
  }
  async new () {
    const { status, message } = this.dataValidation.newUser(this.user)
    if (status == 'Error') return { status, message }

    const clientExists = await this.database.userAlreadyExists(this.user.email)
    if (clientExists) {
      return { stauts: 'Error', message: 'Email already exists' }
    }

    const insertedObj = await this.database.insert('User', this.user)

    if (insertedObj.status === 'Success') {
      // salvar log de novo usuário cadastrado
    }

    return insertedObj
  }
  _isCommonUser () {
    const document = this.user.CPF_CNPJ.replace(/.\/-/g, '');
    return document.length === 11 ? true : false;
  }
}
