import { Iwallet } from "../interfaces/wallet";
import { Iuser } from "../interfaces/user";
import { WalletRepository } from "../model/walletRepository";

export class Wallet {
  private walletRepository = new WalletRepository();
  async create(user_id: Iuser["id"]): Promise<Iwallet> {
    try {
      const wallet = {
        user_id,
        debit_amount: 0,
      };

      const walletExists = await this.walletRepository.get(user_id);
      if (walletExists) return walletExists;

      return this.walletRepository.save(wallet);
    } catch (error) {
      throw error;
    }
  }

  async get(user_id: Iuser["id"]): Promise<Iwallet> {
    try {
      return this.walletRepository.get(user_id);
    } catch (error) {
      throw error;
    }
  }

  async deposit(amount: number, user_id: Iwallet["user_id"]): Promise<boolean> {
    try {
      const wallet = await this.walletRepository.get(user_id);

      const newAmount = wallet.debit_amount + amount;
      await this.walletRepository.update(newAmount, wallet.id);

      return true;
    } catch (error) {
      throw error;
    }
  }

  async withdraw(
    amount: number,
    user_id: Iwallet["user_id"]
  ): Promise<boolean> {
    const wallet = await this.walletRepository.get(user_id);

    const newAmount = wallet.debit_amount - amount;
    const wasDeposited = await this.walletRepository.update(
      newAmount,
      wallet.id
    );

    if (!wasDeposited) return false;
    return true;
  }
}
