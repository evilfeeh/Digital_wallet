export type IOrder = {
  payer_email: string;
  seller_email: string;
  value: number;
  status?: string;
}