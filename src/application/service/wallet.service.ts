import { Iwallet, Wallet } from "../entities/Wallet";
import { Iuser } from "../entities/User";
export class WalletService {
  async create(user_id: any): Promise<Iwallet> {
    try {
      const properties = {
        user_id,
        debit_amount: 0,
      };

      return Wallet.create(properties);
    } catch (error) {
      throw error;
    }
  }

  async get(wallet_id: any): Promise<Iwallet> {
    try {
      return Wallet.create({}, wallet_id);
    } catch (error) {
      throw error;
    }
  }

  async deposit(amount: number, wallet_id: any): Promise<number> {
    try {
      const wallet = Wallet.create({ debit_amount: amount }, wallet_id);
      return wallet.deposit(amount);
    } catch (error) {
      throw error;
    }
  }

  async withdraw(amount: number, wallet_id: any): Promise<number> {
    try {
      const wallet = Wallet.create({ debit_amount: amount }, wallet_id);
      return wallet.withdraw(amount);
    } catch (error) {
      throw error;
    }
  }
}
