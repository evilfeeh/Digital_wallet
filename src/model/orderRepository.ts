import datasource from '../config/ormconfig'
import { DataSource } from 'typeorm'
import { Orders } from '../entities'

interface IOrderRepository {
  get(order_id: string): Promise<Orders>
  save(order: Orders): Promise<Orders>
  update(order: any, status: string): Promise<boolean>
}

export class OrderRepository implements IOrderRepository {
  private AppDataSource: DataSource = datasource
  async get (order_id: string): Promise<Orders> {
    try {
      return this.AppDataSource
      .getRepository(Orders)
      .createQueryBuilder('user')
      .where('user.id = :order_id', { order_id })
      .getOne()
    } catch (error) {
      throw new Error(error.message)
    }
  }
  async save (order: any): Promise<Orders> {
    try {
      const insertedUsers = await this.AppDataSource
      .createQueryBuilder()
      .insert()
      .into(Orders)
      .values(order)
      .execute()
      return insertedUsers.raw
    } catch (error) {
      throw new Error(error.message)
    }
  }
  async update (order: any, status: string): Promise<boolean> {
    const { affected } = await this.AppDataSource
    .createQueryBuilder()
    .update(Orders)
    .set(status)
    .where("email = :order_id", { order_id: order.id })
    .execute()
    return (affected) ? true : false
  }
}
