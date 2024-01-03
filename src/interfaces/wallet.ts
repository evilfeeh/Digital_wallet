import { Iuser } from '../interfaces/user'

export interface Iwallet {
  id: string
  user_id: Iuser['id']
  debit_amount: number
}
