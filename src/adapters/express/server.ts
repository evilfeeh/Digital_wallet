import * as express from "express";
import { Request, Response, json } from "express";
import { Payment, Wallet, User } from "../../controllers";
import { Logger } from "../../adapters/logger/logger";
const logger = new Logger();

const app = express();

app.use(json());

app.get("/ping", (req: Request, res: Response) => {
  res.send("pong");
});

app.post("/v1/user", async (req: Request, res: Response) => {
  try {
    const userManagment = new User();
    const user = await userManagment.create(req.body);

    res.status(200).json({
      status: "Success",
      message: "User created successfully",
      value: user,
    });
  } catch (error) {
    logger.log("error", error.message);
    res.status(500).json({ status: "Error", message: "Internal error server" });
  }
});

app.post("/deposit", async (req: Request, res: Response) => {
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

app.post("/withdraw", async (req: Request, res: Response) => {
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

app.post("/transaction", async (req: Request, res: Response) => {
  try {
    const payment = new Payment(req.body);
    const response = await payment.start();

    if (response.status === "Failed") {
      res.status(401).json(response);
    }

    res.status(200).json(response);
  } catch (error) {
    logger.log("error", error.message);
    res.status(500).json({ status: "Error", message: "Internal error server" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is listening into ${process.env.PORT}`);
});
