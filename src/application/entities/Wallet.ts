import { Entity, UniqueEntityID } from "../../utils/shared/Entity";

export interface Iwallet {
  id?: string;
  user_id: string;
  debit_amount: number;
}

export class Wallet extends Entity<Iwallet> {
  constructor(props: Iwallet, id?: UniqueEntityID) {
    super(props, id);
  }
  get amount() {
    return this.properties.debit_amount;
  }
  withdraw() {}

  deposit() {}

  create(properties: Iwallet, id?: UniqueEntityID) {}
}
