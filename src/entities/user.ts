import { Iuser } from '../interfaces/user';
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User implements Iuser{
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  fullname: string

  @Column()
  CPF_CNPJ: string

  @Column()
  email: string

  @Column()
  hashPassword: string

  @Column()
  commonUser?: boolean | undefined

  @Column()
  active?: boolean | undefined

  @Column()
  phone: string
}
