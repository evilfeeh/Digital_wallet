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

  public get id() {
    return this._id;
  }

  public get value() {
    return this.properties.value;
  }

  public get status() {
    return this.properties.status;
  }

  public get payer_id() {
    return this.properties.payer_id;
  }

  public get seller_id() {
    return this.properties.seller_id;
  }

  public get fee() {
    return this.properties.fee;
  }

  public static create(properties: Iorder, id?: UniqueEntityID) {
    return new Order(properties, id);
  }
}
