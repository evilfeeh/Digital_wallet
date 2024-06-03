import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  user_id: string;

  @Column("float", { precision: 10, scale: 2 })
  debit_amount: number;
}
