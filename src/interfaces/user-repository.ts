import { Iuser } from '../interfaces/user'

export interface IUserRepository {
  Get: (id: Iuser['id']) => Iuser;
  GetAll: (id: Iuser['id']) => Iuser[];
  Save: (user: Iuser) => boolean;
  Update: (user: Iuser) => boolean;
  Delete: (user: Iuser) => boolean;
}
