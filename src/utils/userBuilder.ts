import { hashingPassword, DataValidation } from ".";

export class UserBuilder {
  private readonly dataValidation = new DataValidation();
  private itHasError: boolean = false;
  private messageErrors: string[] = [];
  private user = {
    fullname: "",
    CPF_CNPJ: "",
    email: "",
    hash: "",
    commonUser: false,
    active: true,
    phone: "",
  };

  fullname(name: string) {
    this.itHasError = this.dataValidation.checkFullname(name).hasError;
    this.messageErrors.push(this.dataValidation.checkFullname(name).message);
    this.user.fullname = name;
    return this;
  }

  cpfCnpj(CPF_CNPJ: string) {
    this.itHasError = this.dataValidation.checkDocument(CPF_CNPJ).hasError;
    this.messageErrors.push(
      this.dataValidation.checkDocument(CPF_CNPJ).message
    );
    this.user.CPF_CNPJ = CPF_CNPJ;
    return this;
  }

  password(password: string) {
    this.itHasError = this.dataValidation.checkPassword(password).hasError;
    this.messageErrors.push(
      this.dataValidation.checkPassword(password).message
    );

    this.user.hash = hashingPassword(password);
    return this;
  }

  email(email: string) {
    this.itHasError = this.dataValidation.checkEmail(email).hasError;
    this.messageErrors.push(this.dataValidation.checkEmail(email).message);
    this.user.email = email;
    return this;
  }

  phone(phone: string) {
    this.itHasError = this.dataValidation.checkPhone(phone).hasError;
    this.messageErrors.push(this.dataValidation.checkPhone(phone).message);
    this.user.phone = phone;
    return this;
  }

  commonUser() {
    this.user.CPF_CNPJ.length === 11
      ? (this.user.commonUser = true)
      : (this.user.commonUser = false);
    return this;
  }

  build() {
    if (this.itHasError) {
      throw new Error(`User Invalid: \n${this.messageErrors.join(", \n")}`);
    }
    return this.user;
  }
}
