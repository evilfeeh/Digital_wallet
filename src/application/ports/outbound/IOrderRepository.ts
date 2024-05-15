import { Orders } from "../../entities/order";

export interface UserTransaction {
  debit_amount: number;
  user_id: string;
}

export interface IOrderRepository {
  get(order_id: string): Promise<Orders>;
  save(order: Orders): Promise<Orders["id"]>;
  update(order: any, status: string): Promise<boolean>;
  transaction(
    payer: UserTransaction,
    seller: UserTransaction,
    value: number
  ): void;
}
