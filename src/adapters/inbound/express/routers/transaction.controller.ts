import { Router, Request, Response } from "express";
import { Payment } from "../../../../application/service/payment.service";
import { Logger } from "../../../outbound/logger/logger";

const payment = new Payment();
const logger = new Logger();
const router = Router();

router.post("/transaction", async (req: Request, res: Response) => {
  try {
    const response = await payment.start(req.body);

    if (response.status === "Failed") {
      return res.status(401).json(response);
    }

    res.status(200).json(response);
  } catch (error) {
    logger.log("error", error.message);
    res.status(500).json({ status: "Error", message: "Internal error server" });
  }
});

export default router;
