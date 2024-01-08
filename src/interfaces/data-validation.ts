import { Iuser } from './user'

export interface IdataValidationResponse {
  status: string;
  message: string;
}

export interface IdataValidation {
  password: (password: string) => IdataValidationResponse
  cash: (amount: number) => {status: string, message: string}
  checkEmail: (email: string) => {status: string, message: string}
  checkFullname: (fullname: string) => {status: string, message: string}
  checkPassword: (password: string) => {status: string, message: string}
  checkDocument: (document: string) => {status: string, message: string}
  checkPhone: (phone: string) => {status: string, message: string}
}
