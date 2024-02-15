import * as express from 'express'
import { Request, Response, json } from 'express'
import { UserBuilder } from '../../utils'
import { Payment } from '../../services'
const app = express();

app.use(json())

app.post('/v1/user', async (req: Request, res: Response) => {
  const userBuilder = new UserBuilder()
  const candidate = req.body
  try {
    const user = await userBuilder
    .fullname(candidate.fullname)
    .commonUser(candidate.commonUser)
    .cpfCnpj(candidate.CPF_CNPJ)
    .email(candidate.email)
    .phone(candidate.phone)
    .password(candidate.password)
    .build()

    res.status(200).json({ status: 'Success', message: "User created successfully", value: user })
  } catch (error) {
    res.status(500).json({ status: 'Error', message: "User creation", value: error.message })
  }
})

app.post('/transaction', (req: Request, res: Response) => {
  const order = req.body
  try {
    const payment = new Payment(order)
    const response = payment.start()
    res.status(200).json(response)

  } catch (error) {
    res.status(500).json({ status: 'Error', message: "Transaction", value: error.message })
  }
})

app.listen(process.env.PORT, () => {
  console.log(`Server is listening into ${process.env.PORT}`)
})