import { Entity, UniqueEntityID } from "../../utils/shared/Entity";
enum orderStatus {
  "pending",
  "done",
  "canceled",
}

export interface Iorder {
  payer_id: string;
  seller_id: string;
  value: number;
  status: orderStatus;
  fee: number;
}

export class Order extends Entity<Iorder> {
  private constructor(properties: Iorder, id?: UniqueEntityID) {
    super(properties, id);
  }

  get id() {
    return this.id;
  }

  get value() {
    return this.properties.value;
  }

  get status() {
    return this.properties.status;
  }

  get payer_id() {
    return this.properties.payer_id;
  }

  get seller_id() {
    return this.properties.seller_id;
  }

  defineFee() {}

  public create(properties: Iorder, id?: UniqueEntityID) {}
}
