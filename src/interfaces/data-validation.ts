export interface IdataValidationResponse {
  status: string;
  message: string;
  valid: boolean
}

export interface IdataValidation {
  cash: (amount: number) => IdataValidationResponse
  checkEmail: (email: string) => IdataValidationResponse
  checkFullname: (fullname: string) => IdataValidationResponse
  checkPassword: (password: string) => IdataValidationResponse
  checkDocument: (document: string) => IdataValidationResponse
  checkPhone: (phone: string) => IdataValidationResponse
}
