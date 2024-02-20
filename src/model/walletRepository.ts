import { Wallet } from '../entities';
import { DataSource } from 'typeorm'
import { IWalletRepository } from '../interfaces/wallet-repository'
import datasource from '../config/ormconfig';

export class WalletRepository implements IWalletRepository{
  AppDataSource: DataSource = datasource
  async get (userId: Wallet['user_id']): Promise<Wallet> {
    return this.AppDataSource
    .getRepository(Wallet)
    .createQueryBuilder('wallet')
    .where('wallet.user_id = :userId', { userId })
    .getOne()
  }
  async save (wallet: any): Promise<any> {
    try {
      const insertedUsers = await this.AppDataSource
      .createQueryBuilder()
      .insert()
      .into(Wallet)
      .values(wallet)
      .execute()
      
      return insertedUsers
    } catch (error) {
      throw new Error(error.message)
    }
  }
  async deposit (amount: number, id: Wallet['id']): Promise<boolean> {
    const { raw } = await this.AppDataSource
    .createQueryBuilder()
    .update(Wallet)
    .set({ debit_amount: amount })
    .where("id = :id", { id })
    .execute()

    return (raw.affected) ? true : false
  }
}
