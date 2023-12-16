export interface Ipassword {
  password: String;
}

export interface Iuser {
  id?: String;
  fullname: String;
  CPF_CNPJ: String;
  email: String;
  commonUser?: boolean;
  active?: boolean;
  password: string;
}

