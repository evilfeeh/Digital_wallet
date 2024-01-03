import { Iwallet } from '../interfaces/wallet'

export interface IWalletRepository {
  get: (walletId: Iwallet['id']) => Promise<Iwallet>;
  save: (wallet: Iwallet) => Promise<boolean>;
  update: (wallet: Iwallet, cashAmount: number) => Promise<boolean>;
  delete: (walletId: Iwallet['id']) => Promise<boolean>;
}
