import { Router, Request, Response } from "express";
import { UserService } from "../../../../application/service";
import { Logger } from "../../../outbound/logger/logger";

const userManagment = new UserService();
const logger = new Logger();
const router = Router();

router.put("/user", async (req: Request, res: Response) => {
  try {
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

export default router;
