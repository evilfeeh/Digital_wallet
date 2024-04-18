import { OrderRepository } from "../model";
import { InstantiateUser } from "../utils/instantiateUser";
import { IOrder } from "../interfaces/order";
import { Logger } from "../adapters/logger/logger";

export class Payment {
  private readonly order: IOrder;
  private readonly logger = new Logger();
  private readonly orderRepository = new OrderRepository();
  constructor(order: IOrder) {
    this.order = order;
  }

  private async authorizator(): Promise<boolean> {
    const randomNumber = Math.floor(Math.random() * 10);
    if (randomNumber < 3) {
      return false;
    }
    return true;
  }

  async start() {
    const insertedOrderId = await this.orderRepository.save(this.order);
    try {
      const isAuthorized = await this.authorizator();

      if (!isAuthorized) {
        this.orderRepository.update(insertedOrderId, "BANK UNATHORIZED");
        return { status: "Failed", message: "bank unathorized transaction" };
      }

      const payer = new InstantiateUser(this.order.payer_email);
      const seller = new InstantiateUser(this.order.seller_email);

      if (payer.total_amount < this.order.value) {
        this.orderRepository.update(
          insertedOrderId,
          "BANK AUTHORIZATION FAILED - NO DEBIT"
        );
        return { status: "Failed", message: "Insuficient debit amount" };
      }

      await payer.withdraw(this.order.value);
      await seller.deposit(this.order.value);

      this.orderRepository.update(
        insertedOrderId,
        "TRANSACTION DONE SUCCESSFULLY"
      );
      this.logger.log("info", "Order Complete Successfully");
      return { status: "Success", message: "Order Complete Successfully" };
    } catch (error) {
      await this.orderRepository.update(insertedOrderId, "TRANSACTION FAILED");
      this.logger.log("error", error.message);
      throw new Error("Order Failed");
    }
  }
}
