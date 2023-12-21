import { Iuser } from '../interfaces/user'
import DataValidation from '../adapters/DataValidation'
import { hashingPassword } from '../utils/hashing'
import { UserRepository } from '../domain/userRepository'

export default class UserManagment {
  dataValidation = new DataValidation()
  userRepository = new UserRepository()
  user: Iuser
  salt: string
  hash: string
  constructor (user: Iuser, password: string) {
    this.user = user
    this.user.active = true
    this.user.commonUser = this._isCommonUser();
    [this.salt, this.hash] = hashingPassword(password).split(':')
  }
  async new () {
    const { status, message } = this.dataValidation.newUser(this.user)
    if (status == 'Error') return { status, message }

    const clientExists = await this.userRepository.get(this.user.email)

    if (clientExists) {
      return { stauts: 'Error', message: 'Email already registered' }
    }

    const insertedObj = await this.userRepository.save(this.user)

    if (insertedObj) {
      // salvar log de novo usuário cadastrado
    }

    return insertedObj
  }
  _isCommonUser () {
    const document = this.user.CPF_CNPJ.replace(/.\/-/g, '');
    return document.length === 11 ? true : false;
  }
}
