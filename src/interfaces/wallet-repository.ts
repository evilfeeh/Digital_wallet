import { Iwallet } from '../interfaces/wallet'

export interface IWalletRepository {
  get: (walletId: Iwallet['user_id']) => Promise<Iwallet>;
  save: (wallet: Iwallet) => Promise<boolean>;
  consult: () => Promise<number>;
  deposit: (amount: number) => Promise<boolean>;
  withdraw: (amount: number) => Promise<boolean>;
  transfer: (amount: string) => Promise<boolean>;
}
