import { Iorder } from "../../entities/Order";

export interface UserTransaction {
  debit_amount: number;
  user_id: string;
}

export interface IOrderRepository {
  get(order_id: string): Promise<Iorder>;
  save(order: Iorder): Promise<string>;
  update(order: any, status: string): Promise<boolean>;
  transaction(
    payer: UserTransaction,
    seller: UserTransaction,
    value: number
  ): void;
}
