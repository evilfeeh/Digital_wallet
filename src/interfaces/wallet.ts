import { Iuser } from '../interfaces/user'

export type Iwallet = {
  id: string
  user_id: Iuser['id']
  debit_amount: number
}
