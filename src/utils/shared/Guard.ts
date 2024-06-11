import validator from "validator";
import { Left } from "./Either";

export class Guard {
  static checkEmail(email: string) {
    if (validator.isEmpty(email)) {
      Left("Email cannot be empty");
      return false;
    }
    if (!validator.isEmail(email)) {
      Left("Email is not valid");
      return false;
    }
  }

  static checkFullname(fullname: string) {
    if (validator.isEmpty(fullname)) Left("Fullname cannot be empty");
    if (!validator.isAlpha(fullname, "pt-BR", { ignore: / /g }))
      Left("FullName is not valid");
    if (fullname.search(/ /g) === -1)
      Left("You should pass at least two names");
    if (!validator.isLength(fullname, { min: 6, max: 50 }))
      Left("FullName should be filled with: first name + last name");
  }

  static checkPassword(password: string) {
    const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
    if (validator.isEmpty(password)) {
      Left("Password cannot be empty");
      return false;
    }
    if (
      !validator.isAlphanumeric(password, "pt-BR", {
        ignore: specialCharacters,
      })
    ) {
      Left("Password should have letters, numbers and special charaters");
      return false;
    }
    if (password.search(specialCharacters) === -1) {
      Left("Password should have at least one special character");
      return false;
    }
    if (!validator.isLength(password, { min: 8, max: undefined })) {
      Left("password should have minimum 8 charaters");
      return false;
    }
  }

  static checkDocument(document: string) {
    if (validator.isEmpty(document)) {
      Left("Document CPF/CPNJ cannot be empty");
      return false;
    }
    if (!validator.isLength(document, { min: 11, max: 20 })) {
      Left("Document should be a valid document");
      return false;
    }
  }

  static checkPhone(phone: string) {
    if (validator.isEmpty(phone)) Left("Phone cannot be empty");
    if (!validator.isNumeric(phone)) Left("Phone should be numeric");
    if (phone.length != 11) Left("Phone should be valid");
  }
}
