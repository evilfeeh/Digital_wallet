import { Guard } from "../../utils/shared/Guard";

export class CPF {
  private readonly _cpf: string;

  constructor(cpf: string) {
    if (!Guard.checkDocument(this._cpf)) {
      throw new Error();
    }
    this._cpf = cpf;
  }

  public toString() {
    return this._cpf;
  }
}
