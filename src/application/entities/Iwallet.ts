import { Iuser } from "./Iuser";

export type Iwallet = {
  id?: string;
  user_id: Iuser["id"];
  debit_amount: number;
};
