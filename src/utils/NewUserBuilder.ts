import { Iuser } from '../interfaces/user'
import { hashingPassword } from '../utils/hashing'

export default class NewUserBuilder {
  user: Iuser
  constructor() {
    this.user.fullname = '';
    this.user.CPF_CNPJ = '';
    this.user.hash = '';
    this.user.email = '';
    this.user.phone = '';
    this.user.commonUser = false;
  }

  fullname(name: string) {
    this.user.fullname = name;
    return this;
  }

  cpfCnpj(CPF_CNPJ: string) {
    this.user.CPF_CNPJ = CPF_CNPJ;
    return this;
  }

  hash(password: string) {
    this.user.hash = hashingPassword(password)
    return this;
  }

  email(email: string) {
    this.user.email = email;
    return  this;
  }

  phone(phone: string) {
    this.user.phone = phone;
    return  this;
  }

  commonUser(commonUser: boolean) {
    this.user.commonUser = commonUser;
    return  this;
  }

  build() {
    return {
      fullname: this.user.fullname,
      CPF_CNPJ: this.user.CPF_CNPJ,
      hash: this.user.hash,
      email: this.user.email,
      phone: this.user.phone,
      commonUser: this.user.commonUser
    }
  }
}
