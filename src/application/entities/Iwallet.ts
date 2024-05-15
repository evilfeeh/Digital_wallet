import { Iuser } from "./Iuser";

export interface Iwallet {
  id?: string;
  user_id: Iuser["id"];
  debit_amount: number;
}
