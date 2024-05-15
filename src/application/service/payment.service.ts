import { OrderRepository, UserRepository, WalletRepository } from "../model";
import { IOrder } from "../interfaces/order";
import { Logger } from "../adapters/logger/logger";

export class Payment {
  private readonly logger = new Logger();
  private readonly orderRepository = new OrderRepository();
  private readonly userRepository = new UserRepository();
  private readonly walletRepository = new WalletRepository();

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

      const [payer, seller] = await Promise.all([
        this.userRepository.get(order.payer_email),
        this.userRepository.get(order.seller_email),
      ]);

      const [payer_wallet, seller_wallet] = await Promise.all([
        this.walletRepository.get(payer.id),
        this.walletRepository.get(seller.id),
      ]);

      if (payer_wallet.debit_amount < order.value) {
        this.orderRepository.update(
          insertedOrderId,
          "BANK AUTHORIZATION FAILED - NO DEBIT"
        );
        return { status: "Failed", message: "Insuficient debit amount" };
      }

      await this.orderRepository.transaction(
        {
          user_id: payer.id,
          debit_amount: payer_wallet.debit_amount,
        },
        {
          user_id: seller.id,
          debit_amount: seller_wallet.debit_amount,
        },
        order.value
      );

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
