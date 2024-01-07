import { Iuser } from '../interfaces/user'
import { IsPasswordValid } from '../utils/hashing'
import { UserRepository } from '../model/userRepository'

export class User {
  private readonly userRepository = new UserRepository()
  user: Iuser
  salt: string
  hash: string

  constructor (user: Iuser) {
    this.user = user
    this.user.active = true
    this.user.commonUser = this.isCommonUser();
  }

  async create (user: Iuser) {
    const clientExists = await this.userRepository.get(user.email)
    if (clientExists) return false

    const insertedObj = await this.userRepository.save(user)
    if (!insertedObj) return false

    return true
  }

  private isCommonUser () {
    const document = this.user.CPF_CNPJ.replace(/.\/-/g, '');
    return document.length === 11 ? true : false;
  }

  async get (email: string) {
    const user = await this.userRepository.get(email)
    if (!user) return { status: 'Error', message: 'User or password invalid' }

    const isPasswordValid = IsPasswordValid(user.hashPassword, this.user.hashPassword)
    if (!isPasswordValid) return { status: 'Error', message: 'Invalid Password' }

    return user
  }
  async update (email: string, toUpdate: any) {
    const updated = await this.userRepository.update(email, toUpdate)
    if (!updated) return false

    return true
  }
  async delete (email: string) {
    const deleted = await this.userRepository.delete(email)
    if (!deleted) false

    return true
  }
}
