import { Iuser } from '../interfaces/user'

export interface IUserRepository {
  get: (email: Iuser['email']) => Promise<Iuser>;
  getAll: () => Promise<Iuser[]>;
  save: (user: Iuser) => Promise<boolean>;
  update: (email: Iuser['email'], params: any) => Promise<boolean>;
  delete: (email: Iuser['email']) => Promise<boolean>;
}
