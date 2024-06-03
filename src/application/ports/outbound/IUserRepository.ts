import { Iuser } from "../../entities/Iuser";

export interface IUserRepository {
  get: (email: Iuser["email"]) => Promise<Iuser>;
  getAll: () => Promise<Iuser[]>;
  save: (user: Iuser) => Promise<Iuser>;
  update: (email: Iuser["email"], params: any) => Promise<boolean>;
  delete: (email: Iuser["email"]) => Promise<boolean>;
}