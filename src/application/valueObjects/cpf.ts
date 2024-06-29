import { Guard } from "../../utils/shared/Guard";

export class CPF {
  private readonly _cpf: string;

  constructor(cpf: string) {
    const rawCpf = cpf.replace(/\D/g, "");
    if (!Guard.checkDocument(rawCpf)) {
      throw new Error();
    }
    this._cpf = rawCpf;
  }

  public toString() {
    return this._cpf;
  }
}
