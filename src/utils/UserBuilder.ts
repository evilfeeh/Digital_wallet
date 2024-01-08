import { User } from '../services'
import { Iuser } from '../interfaces/user'
import { hashingPassword, DataValidation } from './'

export class UserBuilder {
  user: Iuser
  dataValidation = new DataValidation
  constructor() {
    this.user.fullname = ''
    this.user.CPF_CNPJ = ''
    this.user.hash = ''
    this.user.email = ''
    this.user.phone = ''
    this.user.commonUser = false
    this.user.active = true
  }

  fullname(name: string) {
    this.user.fullname = name
    return this
  }

  cpfCnpj(CPF_CNPJ: string) {
    this.user.CPF_CNPJ = CPF_CNPJ
    return this
  }

  password(password: string) {
    this.user.hash = hashingPassword(password)
    return this
  }

  email(email: string) {
    this.user.email = email
    return  this
  }

  phone(phone: string) {
    this.user.phone = phone
    return  this
  }

  commonUser(commonUser: string) {
    if (commonUser === 'common') this.user.commonUser = true
    this.user.commonUser = false
    return  this
  }

  async build() {
    const creator = new User()
    await creator.create(this.user)
    return this.user
  }
}
