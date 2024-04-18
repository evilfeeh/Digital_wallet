import datasource from "../config/ormconfig";
import { DataSource } from "typeorm";
import { Orders } from "../entities";

interface IOrderRepository {
  get(order_id: string): Promise<Orders>;
  save(order: Orders): Promise<Orders["id"]>;
  update(order: any, status: string): Promise<boolean>;
}

export class OrderRepository implements IOrderRepository {
  private AppDataSource: DataSource = datasource;
  async get(order_id: string): Promise<Orders> {
    try {
      return this.AppDataSource.getRepository(Orders)
        .createQueryBuilder("user")
        .where("user.id = :order_id", { order_id })
        .getOne();
    } catch (error) {
      throw error;
    }
  }
  async save(order: Orders): Promise<Orders["id"]> {
    try {
      const inserted = await this.AppDataSource.createQueryBuilder()
        .insert()
        .into(Orders)
        .values(order)
        .execute();
      return inserted.raw[0].id;
    } catch (error) {
      throw error;
    }
  }
  async update(order_id: Orders["id"], status: string): Promise<boolean> {
    try {
      const { affected } = await this.AppDataSource.createQueryBuilder()
        .update(Orders)
        .set({ status: status })
        .where("id = :order_id", { order_id: order_id })
        .execute();
      return affected ? true : false;
    } catch (error) {
      throw error;
    }
  }
}
