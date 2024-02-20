import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm"
import { Iwallet } from '../interfaces/wallet'
import { Users } from './user'

@Entity()
export class Wallet implements Iwallet{
  @PrimaryGeneratedColumn("uuid")
  id: string

  @OneToOne(() => Users, (user) => user.id)
  user_id: Users['id']

  @Column("float", { precision: 10, scale: 2 })
  debit_amount: number
} 