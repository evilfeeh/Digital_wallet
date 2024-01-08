import { Iwallet } from '../interfaces/wallet'

export interface IWalletRepository {
  get: (walletId: Iwallet['user_id']) => Promise<Iwallet>;
  save: (wallet: Iwallet) => Promise<boolean>;
}
