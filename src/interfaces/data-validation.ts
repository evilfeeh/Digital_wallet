export interface messageStatus {
  message: string;
  hasError: boolean;
}

export interface IdataValidation {
  checkEmail: (email: string) => messageStatus;
  checkFullname: (fullname: string) => messageStatus;
  checkPassword: (password: string) => messageStatus;
  checkDocument: (document: string) => messageStatus;
  checkPhone: (phone: string) => messageStatus;
}
