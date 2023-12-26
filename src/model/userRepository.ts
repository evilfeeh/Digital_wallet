import { IUserRepository } from '../interfaces/user-repository'
import { DataSource } from 'typeorm'
import { User } from '../entities/user'
import { postgres } from '../config/databases'

export class UserRepository implements IUserRepository {
  AppDataSource: DataSource
  constructor () {
    this.AppDataSource = new DataSource({ ...postgres, type: 'postgres' })
  }
  async get(email: User['email']): Promise<User> {
    return this.AppDataSource
    .getRepository(User)
    .createQueryBuilder('user')
    .where('user.email = :email', { email })
    .getOne()
  }
  async getAll(): Promise<User[]> {
    return this.AppDataSource
    .getRepository(User)
    .createQueryBuilder('user')
    .getMany()
  }
  async save(user: User): Promise<boolean> {
    const { raw } = await this.AppDataSource
    .createQueryBuilder()
    .insert()
    .into(User)
    .values(user)
    .execute()
    return (raw.affected) ? true : false
  }
  async update(email: User['email'], toUpdate: any): Promise<boolean> {
    const { affected } = await this.AppDataSource
    .createQueryBuilder()
    .update(User)
    .set(toUpdate)
    .where("email = :email", { email })
    .execute()
    return (affected) ? true : false
  }
  async delete(email: User['email']): Promise<boolean> {
    const { affected } = await this.AppDataSource
    .getRepository(User)
    .createQueryBuilder('user')
    .update(User)
    .set({ active: false })
    .where("email = :email", { email })
    .execute()
    return (affected) ? true : false
  }
}
