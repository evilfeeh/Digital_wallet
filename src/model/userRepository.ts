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
  async update(id: User['id'], toUpdate: any): Promise<boolean> {
    const { affected } = await this.AppDataSource
    .createQueryBuilder()
    .update(User)
    .set(toUpdate)
    .where("id = :id", { id })
    .execute()
    return (affected) ? true : false
  }
  async delete(id: User['id']): Promise<boolean> {
    const { affected } = await this.AppDataSource
    .getRepository(User)
    .createQueryBuilder('user')
    .delete()
    .from(User)
    .where("id = :id", { id })
    .execute()
    return (affected) ? true : false
  }
}
