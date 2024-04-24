import { UserController, Wallet } from "../controllers";

export class InstantiateUser {
  user_email: string;
  total_amount: number;
  private user: any;
  private wallet: any;
  private readonly userManagment = new UserController();
  private readonly walletManagment = new Wallet();
  constructor(user_email: string) {
    this.user_email = user_email;
  }
  async deposit(amount: number) {
    try {
      this.user = await this.userManagment.get(this.user_email);
      this.wallet = await this.walletManagment.get(this.user.id);
      this.total_amount = this.wallet.debit_amount;
      return this.walletManagment.deposit(amount, this.user.id);
    } catch (error) {
      throw error;
    }
  }
  async withdraw(amount: number) {
    try {
      this.user = await this.userManagment.get(this.user_email);
      this.wallet = await this.walletManagment.get(this.user.id);
      this.total_amount = this.wallet.debit_amount;
      return this.walletManagment.withdraw(amount, this.user.id);
    } catch (error) {
      throw error;
    }
  }
}
