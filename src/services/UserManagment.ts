import { Iuser } from '../interfaces/user'
import DataValidation from '../utils/DataValidation'
import { hashingPassword } from '../utils/hashing'
import { UserRepository } from '../model/userRepository'

export default class UserManagment {
  private readonly dataValidation = new DataValidation()
  private readonly userRepository = new UserRepository()
  user: Iuser
  salt: string
  hash: string

  constructor (user: Iuser, password: string) {
    this.user = user
    this.user.active = true
    this.user.commonUser = this.isCommonUser();
    [this.salt, this.hash] = hashingPassword(password).split(':')
  }
  async new () {
    const clientExists = await this.userRepository.get(this.user.email)
    if (clientExists) return { stauts: 'Error', message: 'Email already registered' }

    const insertedObj = await this.userRepository.save(this.user)
    if (!insertedObj) return { status: 'Error', message: 'Failed to insert User'}

    return { status: 'Sucess', message: 'User Created'}
  }
  private isCommonUser () {
    const document = this.user.CPF_CNPJ.replace(/.\/-/g, '');
    return document.length === 11 ? true : false;
  }
}
