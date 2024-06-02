type orderStatus = "pending" | "done" | "canceled";
interface Iorder {
  payer_email: string;
  seller_email: string;
  value: number;
  status: string;
}

export class Orders {
  constructor(props: Iorder, id?: string) {}

  updateStatus(status: orderStatus) {}
}
