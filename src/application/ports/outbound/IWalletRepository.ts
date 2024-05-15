import { Iwallet } from "../../entities/Iwallet";

export interface IWalletRepository {
  get: (walletId: Iwallet["user_id"]) => Promise<Iwallet>;
  save: (wallet: Iwallet) => Promise<Iwallet>;
  update: (amount: number, id: Iwallet["id"]) => Promise<boolean>;
}
