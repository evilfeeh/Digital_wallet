import { Iuser } from './user'

export interface IdataValidationResponse {
  status: string;
  message: string;
}

export interface IdataValidation {
  newUser: (user: Iuser) => IdataValidationResponse
}
