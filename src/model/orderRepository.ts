import { IOrder } from '../interfaces/order'

export class OrderRepository {
  async get (order_id: string): Promise<IOrder> {
    return
  }
  async save (order: IOrder, status: string): Promise<IOrder> {
    return
  }
  async update (order: IOrder, status: string): Promise<boolean> {
    return
  }
  async delete (order: IOrder): Promise<boolean> {
    return
  }
}
