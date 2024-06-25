import { Router, Request, Response } from "express";
import { WalletService } from "../../../../application/service/wallet.service";
import { Logger } from "../../../outbound/logger/logger";

const logger = new Logger();
const walletService = new WalletService();
const router = Router();

router.put("/deposit", async (req: Request, res: Response) => {
  try {
    const { amount, user_email } = req.body;
    if (amount <= 0) res.status(401).json("Amount must be greater than zero");

    const wasDeposited = await walletService.deposit(amount, user_email);
    if (!wasDeposited)
      res
        .status(401)
        .json({ status: "Error", message: "Deposit cannot be done" });

    res.status(200).json({
      status: "Success",
      message: "Cash deposited successfully",
      value: amount,
    });
  } catch (error) {
    logger.log("error", error.message);
    res.status(500).json({ status: "Error", message: "Internal error server" });
  }
});

router.post("/withdraw", async (req: Request, res: Response) => {
  try {
    const { amount, user_email } = req.body;
    if (amount <= 0) res.status(401).json("Amount must be greater than zero");

    const wasWithdrawn = await walletService.withdraw(amount, user_email);
    if (!wasWithdrawn)
      res
        .status(401)
        .json({ status: "Error", message: "Withdraw cannot be done" });

    res.status(200).json({
      status: "Success",
      message: "Cash withdrawn successfully",
      value: amount,
    });
  } catch (error) {
    logger.log("error", error.message);
    res.status(500).json({ status: "Error", message: "Internal error server" });
  }
});

export default router;
