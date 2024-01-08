export interface Ipassword {
  password: string;
}

export interface Iuser {
  id: string;
  fullname: string;
  CPF_CNPJ: string;
  email: string;
  hash: string;
  commonUser: boolean;
  active: boolean;
  phone: string;
}

