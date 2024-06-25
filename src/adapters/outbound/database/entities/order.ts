import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

enum orderStatus {
  "pending",
  "done",
  "canceled",
}

@Entity()
export class Orders {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { length: 50 })
  payer_id: string;

  @Column("varchar", { length: 50 })
  seller_id: string;

  @Column("float", { precision: 10, scale: 2 })
  value: number;

  @Column({
    type: "enum",
    enum: orderStatus,
    default: orderStatus.pending,
  })
  status: orderStatus;

  @Column("float", { precision: 10, scale: 2 })
  fee: number;
}
