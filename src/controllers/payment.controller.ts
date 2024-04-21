import { OrderRepository } from "../model";
import { InstantiateUser } from "../utils/instantiateUser";
import { IOrder } from "../interfaces/order";
import { Logger } from "../adapters/logger/logger";

export class Payment {
  private readonly logger = new Logger();
  private readonly orderRepository = new OrderRepository();

  private async authorizator(): Promise<boolean> {
    const randomNumber = Math.floor(Math.random() * 10);
    if (randomNumber < 3) {
      return false;
    }
    return true;
  }

  async start(order: IOrder): Promise<{ status: string; message: string }> {
    const insertedOrderId = await this.orderRepository.save(order);
    try {
      const isAuthorized = await this.authorizator();

      if (!isAuthorized) {
        this.orderRepository.update(insertedOrderId, "BANK UNATHORIZED");
        return { status: "Failed", message: "bank unathorized transaction" };
      }

      const payer = new InstantiateUser(order.payer_email);
      const seller = new InstantiateUser(order.seller_email);

      if (payer.total_amount < order.value) {
        this.orderRepository.update(
          insertedOrderId,
          "BANK AUTHORIZATION FAILED - NO DEBIT"
        );
        return { status: "Failed", message: "Insuficient debit amount" };
      }

      await payer.withdraw(order.value);
      await seller.deposit(order.value);

      this.orderRepository.update(
        insertedOrderId,
        "TRANSACTION DONE SUCCESSFULLY"
      );
      this.logger.log("info", "Order Complete Successfully");
      return { status: "Success", message: "Order Complete Successfully" };
    } catch (error) {
      await this.orderRepository.update(insertedOrderId, "TRANSACTION FAILED");
      throw error;
    }
  }
}
