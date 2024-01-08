import { Wallet } from '../entities/wallet';
import { DataSource } from 'typeorm'
import { IWalletRepository } from '../interfaces/wallet-repository'
import { postgres } from '../config/databases'

export class WalletRepository implements IWalletRepository{
  AppDataSource: DataSource
  constructor () {
    this.AppDataSource = new DataSource({ ...postgres, type: 'postgres' })
  }
  async get (userId: Wallet['user_id']): Promise<Wallet> {
    return this.AppDataSource
    .getRepository(Wallet)
    .createQueryBuilder('wallet')
    .where('user_id = :user_id', { userId })
    .getOne()
  }
  async save (wallet: Wallet): Promise<boolean> {
    const { raw } = await this.AppDataSource
    .createQueryBuilder()
    .insert()
    .into(Wallet)
    .values(wallet)
    .execute()

    return (raw.affected) ? true : false
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
