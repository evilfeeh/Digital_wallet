import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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

  @Column("float", { precision: 10, scale: 2 })
  fee: number;

  @Column("varchar", { length: 30 })
  status: string;
}
