import { Router, Request, Response } from "express";
import { Wallet } from "../../../controllers";
import { Logger } from "../../logger/logger";

const logger = new Logger();
const router = Router();

router.post("/deposit", async (req: Request, res: Response) => {
  try {
    const { amount, user_email } = req.body;
    if (amount <= 0) res.status(401).json("Amount must be greater than zero");

    const wallet = new Wallet();
    const wasDeposited = await wallet.deposit(amount, user_email);
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

    const wallet = new Wallet();
    const wasWithdrawn = await wallet.withdraw(amount, user_email);
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
