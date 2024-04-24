import { Iuser } from "../interfaces/user";
import { UserRepository } from "../model/userRepository";
import { UserBuilder } from "../utils";
import { Wallet } from "./wallet.controller";
import { generateToken } from "../utils/jwtToken";

export class UserController {
  private readonly userRepository = new UserRepository();
  private readonly userBuilder = new UserBuilder();
  user: Iuser;

  async create(candidate: any): Promise<Iuser> {
    const walletManagment = new Wallet();
    try {
      const user = this.userBuilder
        .fullname(candidate.fullname)
        .cpfCnpj(candidate.CPF_CNPJ)
        .email(candidate.email)
        .phone(candidate.phone)
        .password(candidate.password)
        .commonUser()
        .build();

      const clientExists = await this.userRepository.get(user.email);
      if (clientExists) return clientExists;

      const insertedUser = await this.userRepository.save(user);
      await walletManagment.create(insertedUser.id);
      return insertedUser;
    } catch (error) {
      throw error;
    }
  }

  async get(email: string): Promise<Iuser> {
    try {
      return await this.userRepository.get(email);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async login(
    email: string,
    password: string
  ): Promise<{ status: boolean; token: string }> {
    try {
      const user = await this.userRepository.get(email);
      if (!user) return { status: false, token: "" };
      if (!user.active) return { status: false, token: "" };

      if (!this.userBuilder.validatePassword(password, user.hash))
        return { status: false, token: "" };

      const token = generateToken(email);
      return { status: true, token };
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
