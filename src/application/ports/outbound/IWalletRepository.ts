import { Iwallet } from "../../entities/Wallet";

export interface IWalletRepository {
  get: (walletId: string) => Promise<Iwallet>;
  save: (wallet: Iwallet) => Promise<Iwallet>;
  update: (amount: number, id: string) => Promise<boolean>;
}
