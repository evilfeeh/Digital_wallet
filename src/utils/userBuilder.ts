import { hashingPassword, DataValidation } from ".";

export class UserBuilder {
  private readonly dataValidation = new DataValidation();
  user = {
    fullname: "",
    CPF_CNPJ: "",
    email: "",
    hash: "",
    commonUser: false,
    active: true,
    phone: "",
  };

  fullname(name: string) {
    const { status, message } = this.dataValidation.checkFullname(name);
    if (status === "Error") throw new Error(message);
    this.user.fullname = name;
    return this;
  }

  cpfCnpj(CPF_CNPJ: string) {
    const { status, message } = this.dataValidation.checkDocument(CPF_CNPJ);
    if (status === "Error") throw new Error(message);
    this.user.CPF_CNPJ = CPF_CNPJ;
    return this;
  }

  password(password: string) {
    const { status, message } = this.dataValidation.checkPassword(password);
    if (status === "Error") throw new Error(message);
    this.user.hash = hashingPassword(password);
    return this;
  }

  email(email: string) {
    const { status, message } = this.dataValidation.checkEmail(email);
    if (status === "Error") throw new Error(message);
    this.user.email = email;
    return this;
  }

  phone(phone: string) {
    const { status, message } = this.dataValidation.checkPhone(phone);
    if (status === "Error") throw new Error(message);
    this.user.phone = phone;
    return this;
  }

  commonUser() {
    if (this.user.CPF_CNPJ.length === 11) this.user.commonUser = true;
    this.user.commonUser = false;
    return this;
  }

  async build() {
    return this.user;
  }
}
