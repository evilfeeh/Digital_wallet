import { Iuser } from '../interfaces/user';
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Users implements Iuser{
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column("varchar", { length: 50 })
  fullname: string

  @Column("varchar", { length: 14, unique: true })
  CPF_CNPJ: string

  @Column("varchar", { length: 50, unique: true })
  email: string

  @Column("varchar", { length: 100 })
  hash: string

  @Column("boolean")
  commonUser: boolean

  @Column("boolean")
  active: boolean

  @Column("varchar", { length: 11 })
  phone: string
}
