import { Iwallet } from "../interfaces/wallet";
import { Iuser } from "../interfaces/user";
import { WalletRepository } from "../model/walletRepository";

export class Wallet {
  private walletRepository = new WalletRepository();
  user = {
    fullname: "",
    CPF_CNPJ: "",
    email: "",
    hash: "",
    commonUser: false,
    active: false,
    phone: "",
  };
  wallet = {
    user_id: "",
    debit_amount: 0,
  };
  async create(user_id: Iuser["id"]): Promise<Iwallet> {
    this.wallet.debit_amount = 0;
    this.wallet.user_id = user_id;
    try {
      const walletExists = await this.walletRepository.get(user_id);
      if (walletExists) return walletExists;

      return this.walletRepository.save(this.wallet);
    } catch (error) {
      throw new Error(error);
    }
  }

  async get(user_id: Iuser["id"]): Promise<Iwallet> {
    return this.walletRepository.get(user_id);
  }

  async deposit(amount: number, user_id: Iwallet["user_id"]): Promise<boolean> {
    const wallet = await this.walletRepository.get(user_id);
    const newAmount = wallet.debit_amount + amount;
    const wasDeposited = await this.walletRepository.deposit(
      newAmount,
      wallet.id
    );

    if (!wasDeposited) return false;
    return true;
  }

  async withdraw(
    amount: number,
    user_id: Iwallet["user_id"]
  ): Promise<boolean> {
    const wallet = await this.walletRepository.get(user_id);

    const newAmount = wallet.debit_amount - amount;
    const wasDeposited = await this.walletRepository.deposit(
      newAmount,
      wallet.id
    );

    if (!wasDeposited) return false;
    return true;
  }
}
