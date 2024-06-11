import { Order } from "../../entities/Order";

export interface UserTransaction {
  debit_amount: number;
  user_id: string;
}

export interface IOrderRepository {
  get(order_id: string): Promise<Order>;
  save(order: Order): Promise<Order["id"]>;
  update(order: any, status: string): Promise<boolean>;
  transaction(
    payer: UserTransaction,
    seller: UserTransaction,
    value: number
  ): void;
}
