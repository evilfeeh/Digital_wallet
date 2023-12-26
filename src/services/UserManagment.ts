import { Iuser } from '../interfaces/user'
import { hashingPassword, IsPasswordValid } from '../utils/hashing'
import { UserRepository } from '../model/userRepository'

export default class UserManagment {
  private readonly userRepository = new UserRepository()
  user: Iuser
  salt: string
  hash: string

  constructor (user: Iuser, password: string) {
    this.user = user
    this.user.active = true
    this.user.commonUser = this.isCommonUser();
    this.user.hashPassword = hashingPassword(password)
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
  async get () {
    const user = await this.userRepository.get(this.user.email)
    if (!user) return { status: 'Error', message: 'User or password invalid' }

    const isPasswordValid = IsPasswordValid(user.hashPassword, this.user.hashPassword)
    if (!isPasswordValid) return { status: 'Error', message: 'Invalid Password' }

    return { status: 'Success', message: 'User Found', value: user  }
  }
}
