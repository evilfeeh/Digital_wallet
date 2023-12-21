import { Iuser } from '../interfaces/user'
import DataValidation from '../adapters/DataValidation'
import { hashingPassword } from '../utils/hashing'
import { UserRepository } from '../domain/userRepository'
import { DataCollector } from '../adapters/dataCollector/dataCollector'

export default class UserManagment {
  private readonly dataValidation = new DataValidation()
  private readonly userRepository = new UserRepository()
  private readonly dataCollector = new DataCollector()
  private readonly password: string
  user: Iuser
  salt: string
  hash: string

  constructor (user: Iuser, password: string) {
    this.user = user
    this.user.active = true
    this.password = password
    this.user.commonUser = this.isCommonUser();
    [this.salt, this.hash] = hashingPassword(password).split(':')
  }
  async new () {
    const { status, message } = this.dataValidation.newUser(this.user, this.password)
    if (status == 'Error') return { status, message }

    const clientExists = await this.userRepository.get(this.user.email)

    if (clientExists) {
      return { stauts: 'Error', message: 'Email already registered' }
    }

    const insertedObj = await this.userRepository.save(this.user)
    if (!insertedObj) this.saveLog('failed')
    this.saveLog('Success')
  }
  private isCommonUser () {
    const document = this.user.CPF_CNPJ.replace(/.\/-/g, '');
    return document.length === 11 ? true : false;
  }

  private saveLog (status: string) {
    this.dataCollector.save({
      user_email: this.user.email,
      action: 'New User Created',
      status
    })
  }
}
