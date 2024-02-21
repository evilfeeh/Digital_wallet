import { IOrder } from '../interfaces/order';
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Orders implements IOrder{
  @PrimaryGeneratedColumn("uuid")
  id: string
  
  @Column("varchar", { length: 50 })
  payer_email: string;
  
  @Column("varchar", { length: 50 })
  seller_email: string;
  
  @Column("float", { precision: 10, scale: 2 })
  value: number;
}
