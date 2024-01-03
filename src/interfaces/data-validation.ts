import { Iuser } from './user'

export interface IdataValidationResponse {
  status: string;
  message: string;
}

export interface IdataValidation {
  user: (user: Iuser) => IdataValidationResponse
  password: (password: string) => IdataValidationResponse
}
