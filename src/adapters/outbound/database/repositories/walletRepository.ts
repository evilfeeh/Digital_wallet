import { Wallet } from "../../../application/entities";
import { DataSource } from "typeorm";
import { IWalletRepository } from "../../../../application/ports/outbound/IWalletRepository";
import datasource from "../ormconfig";

export class WalletRepository implements IWalletRepository {
  AppDataSource: DataSource = datasource;
  async get(userId: Wallet["user_id"]): Promise<Wallet> {
    try {
      return this.AppDataSource.getRepository(Wallet)
        .createQueryBuilder("wallet")
        .where("wallet.user_id = :userId", { userId })
        .getOne();
    } catch (error) {
      throw error;
    }
  }
  async save(wallet: any): Promise<any> {
    try {
      const insertedUsers = await this.AppDataSource.createQueryBuilder()
        .insert()
        .into(Wallet)
        .values(wallet)
        .execute();

      return insertedUsers;
    } catch (error) {
      throw error;
    }
  }
  async update(amount: number, id: Wallet["id"]): Promise<boolean> {
    try {
      const { raw } = await this.AppDataSource.createQueryBuilder()
        .update(Wallet)
        .set({ debit_amount: amount })
        .where("id = :id", { id })
        .execute();

      return raw.affected ? true : false;
    } catch (error) {
      throw error;
    }
  }
}
