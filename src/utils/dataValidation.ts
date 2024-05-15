import validator from "validator";
import { IdataValidation } from "./data-validation";

export class DataValidation implements IdataValidation {
  private message: string = "";
  private hasError: boolean = false;

  checkEmail(email: string) {
    if (validator.isEmpty(email)) this.message = "Email cannot be empty";
    if (!validator.isEmail(email)) this.message = "Email is not valid";
    return {
      message: this.message,
      hasError: this.message.length > 0 ? true : false,
    };
  }

  checkFullname(fullname: string) {
    if (validator.isEmpty(fullname)) this.message = "Fullname cannot be empty";
    if (!validator.isAlpha(fullname, "pt-BR", { ignore: / /g }))
      this.message = "FullName is not valid";
    if (fullname.search(/ /g) === -1)
      this.message = "You should pass at least two names";
    if (!validator.isLength(fullname, { min: 6, max: 50 }))
      this.message = "FullName should be filled with: first name + last name";
    return {
      message: this.message,
      hasError: this.message.length > 0 ? true : false,
    };
  }

  checkPassword(password: string) {
    const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
    if (validator.isEmpty(password)) this.message = "Password cannot be empty";
    if (
      !validator.isAlphanumeric(password, "pt-BR", {
        ignore: specialCharacters,
      })
    )
      this.message =
        "Password should have letters, numbers and special charaters";
    if (password.search(specialCharacters) === -1)
      this.message = "Password should have at least one special character";
    if (!validator.isLength(password, { min: 8, max: undefined }))
      this.message = "password should have minimum 8 charaters";
    return {
      message: this.message,
      hasError: this.message.length > 0 ? true : false,
    };
  }

  checkDocument(document: string) {
    if (validator.isEmpty(document))
      this.message = "Document CPF/CPNJ cannot be empty";
    if (!validator.isLength(document, { min: 11, max: 20 }))
      this.message = "Document should be a valid document";
    if (document.search(/[.\/-]/g) != -1) {
      const justNumbers = document.replace(/[.\/-]/g, "");
      if (justNumbers.length >= 11)
        this.message = "Document should be a valid document";
    }
    return {
      message: this.message,
      hasError: this.message.length > 0 ? true : false,
    };
  }
  checkPhone(phone: string) {
    if (validator.isEmpty(phone)) this.message = "Phone cannot be empty";
    if (!validator.isNumeric(phone)) this.message = "Phone should be numeric";
    if (phone.length != 11) this.message = "Phone should be valid";
    return {
      message: this.message,
      hasError: this.message.length > 0 ? true : false,
    };
  }
}
