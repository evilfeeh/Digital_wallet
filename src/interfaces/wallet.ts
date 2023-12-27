import { Iuser } from '../interfaces/user'

export interface Iwallet {
  id: string
  user_id: Iuser
  debit_amount: string
}
