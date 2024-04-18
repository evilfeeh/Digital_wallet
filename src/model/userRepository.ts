import { IUserRepository } from "../interfaces/user-repository";
import { DataSource } from "typeorm";
import { Users } from "../entities";
import datasource from "../config/ormconfig";

export class UserRepository implements IUserRepository {
  AppDataSource: DataSource = datasource;
  async get(email: Users["email"]): Promise<Users> {
    try {
      return this.AppDataSource.getRepository(Users)
        .createQueryBuilder("user")
        .where("user.email = :email", { email })
        .getOne();
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async getAll(): Promise<Users[]> {
    return this.AppDataSource.getRepository(Users)
      .createQueryBuilder("user")
      .getMany();
  }
  async save(user: Users): Promise<Users> {
    try {
      const insertedUsers = await this.AppDataSource.createQueryBuilder()
        .insert()
        .into(Users)
        .values(user)
        .execute();
      return insertedUsers.raw;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async update(email: Users["email"], toUpdate: any): Promise<boolean> {
    const { affected } = await this.AppDataSource.createQueryBuilder()
      .update(Users)
      .set(toUpdate)
      .where("email = :email", { email })
      .execute();
    return affected ? true : false;
  }
  async delete(email: Users["email"]): Promise<boolean> {
    const { affected } = await this.AppDataSource.getRepository(Users)
      .createQueryBuilder("user")
      .update(Users)
      .set({ active: false })
      .where("email = :email", { email })
      .execute();
    return affected ? true : false;
  }
}
