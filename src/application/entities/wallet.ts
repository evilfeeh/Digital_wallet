import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Iwallet } from "../../application/entities/Iwallet";

@Entity()
export class Wallet implements Iwallet {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  user_id: string;

  @Column("float", { precision: 10, scale: 2 })
  debit_amount: number;
}
