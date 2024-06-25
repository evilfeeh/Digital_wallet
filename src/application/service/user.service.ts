import { IUserRepository } from "../ports/outbound/IUserRepository";
import { WalletService } from "./wallet.service";
import { generateToken } from "../../utils/jwtToken";
import { User, Iuser } from "../entities/User";
import { Left, Right } from "../../utils/shared/Either";
import { IsPasswordValid } from "../../utils/shared/HashingPassword";

export class UserService {
  private readonly userRepository: IUserRepository;
  async create(candidate: Iuser): Promise<any> {
    const walletService = new WalletService();
    try {
      const user = User.create(candidate);
      const clientExists = await this.userRepository.get(user.email);
      if (clientExists) return clientExists;

      await this.userRepository.save(user);
      await walletService.create(user.id);
      return Right("User Inserted Successfully");
    } catch (error) {
      Left(error);
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

      if (!IsPasswordValid(password, user.hash))
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
