import { Iuser } from '../interfaces/user'

export interface IUserRepository {
  get: (email: Iuser['email']) => Promise<Iuser>;
  getAll: () => Promise<Iuser[]>;
  save: (user: Iuser) => Promise<boolean>;
  update: (id: Iuser['id'], params: any) => Promise<boolean>;
  delete: (id: Iuser['id']) => Promise<boolean>;
}
