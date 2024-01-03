import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm"
import { Iwallet } from '../interfaces/wallet'
import { User } from './user'

@Entity()
export class Wallet implements Iwallet{
  @PrimaryGeneratedColumn("uuid")
  id: string

  @OneToOne(() => User, (user) => user.id)
  user_id: User['id']

  @Column("float", { precision: 10, scale: 2 })
  debit_amount: number
} 