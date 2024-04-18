import { Iuser } from "../interfaces/user";
import { UserRepository } from "../model/userRepository";
import { UserBuilder } from "../utils/userBuilder";
import { Wallet } from "./Wallet";

export class User {
  private readonly userRepository = new UserRepository();
  user: Iuser;

  async create(candidate: any): Promise<Iuser> {
    const userBuilder = new UserBuilder();
    const walletManagment = new Wallet();
    try {
      const user = await userBuilder
        .fullname(candidate.fullname)
        .cpfCnpj(candidate.CPF_CNPJ)
        .email(candidate.email)
        .phone(candidate.phone)
        .password(candidate.password)
        .commonUser()
        .build();

      await walletManagment.create(user.id);
      const clientExists = await this.userRepository.get(user.email);
      if (clientExists) return clientExists;

      const insertedObj = await this.userRepository.save(user);
      if (insertedObj) return insertedObj;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async get(email: string): Promise<Iuser> {
    try {
      return await this.userRepository.get(email);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(email: string, toUpdate: any) {
    const updated = await this.userRepository.update(email, toUpdate);
    if (!updated) return false;
    return true;
  }

  async delete(email: string) {
    const deleted = await this.userRepository.delete(email);
    if (!deleted) false;
    return true;
  }
}
