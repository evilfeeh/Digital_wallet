import { randomUUID } from "crypto";
export class UniqueEntityID {
  _id: string;
  constructor() {
    this._id = randomUUID();
  }
}

export abstract class Entity<T> {
  protected readonly _id: UniqueEntityID;
  protected properties: T;

  constructor(properties: T, id?: UniqueEntityID) {
    this._id = id ? id : new UniqueEntityID();
    this.properties = properties;
  }
}
