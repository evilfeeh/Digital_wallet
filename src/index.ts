import { UserBuilder } from './utils/UserBuilder'
import { Payment } from './services'

class Creation { // POST /v1/user
  userBuilder = new UserBuilder
  async new (candidate: any): Promise<{ status: string, message: string, value?: any }> {
    try {
      const user = this.userBuilder
      .fullname(candidate.fullname)
      .commonUser(candidate.commonUser)
      .cpfCnpj(candidate.CPF_CNPJ)
      .email(candidate.email)
      .phone(candidate.phone)
      .password(candidate.password)
      .build()

      return { status: 'Success', message: "User created successfully", value: user }
    } catch (error) {
      return { status: 'Error', message: "User created error", value: error.message }
    }
  }
}

const order = {
  payer_id: 1,
  seller_id: 1,
  payment_amount: 25.5
}

const creation = new Creation()
const payment = new Payment(order)

try {
  creation.new({
    fullname: "Felipe Santos",
    CPF_CNPJ: "425.609.398-27",
    password: "SENHAsenha#123",
    email: "felipe@gmail.com",
    phone: '11984686451',
    type: 'common' // seller
  })

  const result = (async () => { await payment.start() })()

} catch (err) {
  console.error(err)
}
