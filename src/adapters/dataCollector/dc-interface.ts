import { Iuser } from '../../interfaces/user';

export interface IdataLog {
  user_email: Iuser['email'];
  action: string;
  status: string;
}

export interface IdataCollector {
  save: (params: IdataLog) => void
}
