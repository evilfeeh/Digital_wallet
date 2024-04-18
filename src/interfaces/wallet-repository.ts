import { Iwallet } from "../interfaces/wallet";

export interface IWalletRepository {
  get: (walletId: Iwallet["user_id"]) => Promise<Iwallet>;
  save: (wallet: Iwallet) => Promise<boolean>;
  update: (amount: number, id: Iwallet["id"]) => Promise<boolean>;
}
