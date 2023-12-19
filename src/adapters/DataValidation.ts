import validator from 'validator';
import { IdataValidation, IdataValidationResponse } from '../interfaces/data-validation'
import { Iuser } from '../interfaces/user'


export default class DataValidation implements IdataValidation {
  dataResponse: IdataValidationResponse = {
    status: 'Success',
    message: ''
  };
  newUser (user: Iuser): IdataValidationResponse {
    this._checkDocument(user.CPF_CNPJ)
    this._checkEmail(user.email)
    this._checkFullname(user.fullname)
    this._checkPhone(user.phone)
    this._checkPassword(user.password)

    if (this.dataResponse.message) this.dataResponse.status = 'Error'

    return this.dataResponse
  }
  _checkEmail (email: string) {
    if (validator.isEmpty(email)) {
      this.dataResponse.message = 'Email cannot be empty'
    }

    if (!validator.isEmail(email)) {
      this.dataResponse.message = 'Email is not valid'
    }
  }
  _checkFullname (fullname: string) {
    if (validator.isEmpty(fullname)) {
      this.dataResponse.message = 'Fullname cannot be empty'
    }

    if (!validator.isAlpha(fullname, 'pt-BR')) {
      this.dataResponse.message = 'FullName is not valid'
    }

    if (!validator.isLength(fullname, { min: 6, max: 50 })) {
      this.dataResponse.message = 'FullName should be filled with: first name + last name'
    }
  }
  _checkPassword (password: string) {
    if (validator.isEmpty(password)) {
      this.dataResponse.message = 'Password cannot be empty'
    }

    if (!validator.isAlphanumeric(password)) {
      console.log(validator.isAlphanumeric(password))
      this.dataResponse.message = 'Password must have letters, numbers and special caracters'
    }

    if (!validator.isLength(password, { min: 8, max: undefined })) {
    this.dataResponse.message = 'password should have minimum 8 caracters'
    }
  }
  _checkDocument (document: string) {
    if (validator.isEmpty(document)) {
      this.dataResponse.message = 'Document CPF/CPNJ cannot be empty'
    }
    if (validator.isNumeric(document)) {
      this.dataResponse.message = 'Document should be numeric'
    }
    if (!validator.isLength(document, {min: 11, max: 20})) {
      this.dataResponse.message = 'Document should be a valid document'
    }
  }
  _checkPhone (phone: string) {
    if (validator.isEmpty(phone)) {
      this.dataResponse.message = 'Phone cannot be empty'
    }
    if (validator.isNumeric(phone)) {
      this.dataResponse.message = 'Phone should be numeric'
    }
    if (phone.length != 11) {
      this.dataResponse.message = 'Phone should be a valid document'
    }
  }
}
