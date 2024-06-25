import { Guard } from "../../utils/shared/Guard";
import { hashingPassword } from "../../utils/shared/HashingPassword";

export class Password {
  private readonly _password: string;
  constructor(password: string) {
    if (Guard.checkPassword(password)) {
      throw new Error();
    }
    this._password = password;
  }
  public toString() {
    return this._password;
  }
  public toHashed() {
    return hashingPassword(this._password);
  }
}
