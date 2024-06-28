import { Guard } from "../../utils/shared/Guard";

export class Email {
  private readonly _email: string;
  constructor(email: string) {
    if (!Guard.checkEmail(email)) {
      throw new Error();
    }
    this._email = email;
  }

  public toString() {
    return this._email;
  }
}
