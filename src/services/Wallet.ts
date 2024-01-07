import { Iwallet } from '../interfaces/wallet'
import { Iuser } from '../interfaces/user'
import { WalletRepository } from '../model/walletRepository'

export class Wallet {
  walletRepository = new WalletRepository
  user: Iuser
  wallet: Iwallet
  constructor(user: Iuser) {
    this.user = user
  }
  async new (): Promise<{status: string, message: string}>  {
    this.wallet.debit_amount = 0;
    this.wallet.user_id = this.user.id
    const wallet = await this.walletRepository.save(this.wallet)
    if (!wallet) return { status: 'Error', message: 'Can\'t create wallet' }

    return { status: 'Success', message: 'Wallet created successfully' }
  }
  async get (): Promise<Iwallet> {
    return this.walletRepository.get(this.user.id)
  }

  async consult (): Promise<number> { return 0 }
  async deposit (amount: number): Promise<boolean> { return true }
  async withdraw (amount: number): Promise<boolean> { return true }
  async transfer (amount: number): Promise<boolean> { return true }
}