import { User, Wallet } from '../services'
import { Iuser } from '../interfaces/user'
import { hashingPassword, DataValidation } from './'

export class UserBuilder {
  user: Iuser = {
    id: '',
    fullname: '',
    CPF_CNPJ: '',
    email: '',
    hash: '',
    commonUser: false,
    active: true,
    phone: ''
  }
  private readonly userManagment = new User()
  private readonly walletManagment = new Wallet()
  private readonly dataValidation = new DataValidation

  fullname(name: string) {
    const { status, message } = this.dataValidation.checkFullname(name)
    if (status === 'Error') throw new Error(message)
    this.user.fullname = name
    return this
  }

  cpfCnpj(CPF_CNPJ: string) {
    const { status, message } = this.dataValidation.checkDocument(CPF_CNPJ)
    if (status === 'Error') throw new Error(message)
    this.user.CPF_CNPJ = CPF_CNPJ
    return this
  }

  password(password: string) {
    const { status, message } = this.dataValidation.checkPassword(password)
    if (status === 'Error') throw new Error(message)
    this.user.hash = hashingPassword(password)
    return this
  }

  email(email: string) {
    const { status, message } = this.dataValidation.checkEmail(email)
    if (status === 'Error') throw new Error(message)
    this.user.email = email
    return  this
  }

  phone(phone: string) {
    const { status, message } = this.dataValidation.checkPhone(phone)
    if (status === 'Error') throw new Error(message)
    this.user.phone = phone
    return  this
  }

  commonUser(commonUser: string) {
    if (commonUser === 'common') this.user.commonUser = true
    this.user.commonUser = false
    return  this
  }

  async build() {
    const newUser = await this.userManagment.create(this.user)
    if (!newUser) throw new Error('Failed Atempt to create User')
    const wallet = await this.walletManagment.create(await this.userManagment.get.bind(this.user.email))
    if (!wallet) throw new Error('Failed Atempt to create User\'s wallet')

    return this.user
  }
}
