import { Entity, UniqueEntityID } from "../../utils/shared/Entity";
import { CPF } from "../valueObjects/cpf";
import { Email } from "../valueObjects/email";
import { Password } from "../valueObjects/password";

export interface Ipassword {
  password: string;
}

export type Iuser = {
  fullname?: string;
  CPF_CNPJ?: string;
  email?: string;
  hash?: string;
  password?: string;
  commonUser?: boolean;
  active?: boolean;
  phone?: string;
};

export class User extends Entity<Iuser> {
  private constructor(props: Iuser, id?: UniqueEntityID) {
    super(props, id);
  }

  public get id() {
    return this._id;
  }

  public get fullname() {
    return this.properties.fullname;
  }

  public get CPF_CNPJ() {
    return this.properties.CPF_CNPJ;
  }

  public get email() {
    return this.properties.email;
  }

  public get hash() {
    return this.properties.hash;
  }

  public get phone() {
    return this.properties.phone;
  }

  public get active() {
    return this.properties.active;
  }

  public get commonUser() {
    return this.properties.commonUser;
  }

  toggleCommonUser() {
    this.properties.commonUser = !this.properties.commonUser;
  }

  toggleActive() {
    this.properties.active = !this.properties.active;
  }

  private static defineCommonUser(CPF_CNPJ: string): boolean {
    const commonUser = CPF_CNPJ.length <= 11 ? true : false;
    return commonUser;
  }

  private static defineHash(properties: Iuser) {
    const hash = new Password(properties.password).toHashed();
    delete properties.password;
    return hash;
  }

  public static create(properties: Iuser, id?: UniqueEntityID): User {
    properties.CPF_CNPJ = new CPF(properties.CPF_CNPJ).toString();
    properties.email = new Email(properties.email).toString();
    properties.commonUser = this.defineCommonUser(properties.CPF_CNPJ);
    properties.hash = this.defineHash(properties);

    properties.active = true;
    return new User(properties, id);
  }
}
