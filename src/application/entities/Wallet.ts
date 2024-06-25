import { Entity, UniqueEntityID } from "../../utils/shared/Entity";

export type Iwallet = {
  user_id?: string;
  debit_amount?: number;
};

export class Wallet extends Entity<Iwallet> {
  private constructor(props: Iwallet, id?: UniqueEntityID) {
    super(props, id);
  }

  public get id() {
    return this._id;
  }

  get user_id() {
    return this.properties.user_id;
  }

  get amount() {
    return this.properties.debit_amount;
  }

  withdraw(valueToSubtract: number) {
    this.properties.debit_amount -= valueToSubtract;
    return this.properties.debit_amount;
  }

  deposit(valueToAdd: number) {
    this.properties.debit_amount += valueToAdd;
    return valueToAdd;
  }

  public static create(properties: Iwallet, id?: UniqueEntityID): Wallet {
    return new Wallet(properties);
  }
}
