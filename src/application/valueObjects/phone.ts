import { Guard } from "../../utils/shared/Guard";

export class Phone {
  private readonly _phone: string;

  constructor(phone: string) {
    if (!Guard.checkPhone(phone)) {
      throw new Error();
    }
    this._phone = phone;
  }

  public toString() {
    return this._phone;
  }
}
