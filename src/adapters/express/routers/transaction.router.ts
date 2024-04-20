import { Router, Request, Response } from "express";
import { Payment } from "../../../controllers";
import { Logger } from "../../logger/logger";

const logger = new Logger();
const router = Router();

router.post("/transaction", async (req: Request, res: Response) => {
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

export default router;
