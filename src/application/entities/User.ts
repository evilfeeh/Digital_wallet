import { Entity, UniqueEntityID } from "../../utils/shared/Entity";

export interface Ipassword {
  password: string;
}

export type Iuser = {
  fullname: string;
  CPF_CNPJ: string;
  email: string;
  hash: string;
  commonUser: boolean;
  active: boolean;
  phone: string;
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

  public get document() {
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

  public create(properties: Iuser, id?: UniqueEntityID, password?: string) {}
}
