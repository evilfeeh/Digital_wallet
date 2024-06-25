import { Router, Request, Response } from "express";
import { UserService } from "../../../../application/service";
import { Logger } from "../../../outbound/logger/logger";

const router = Router();
const logger = new Logger();
const userManagment = new UserService();

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const login = await userManagment.login(email, password);
    if (!login.status) {
      return res
        .status(401)
        .json({ status: "Error", message: "Invalid credentials" });
    }
    res
      .set("x-access-token", login.token)
      .status(200)
      .json({ status: "Success", message: "Login success" });
  } catch (error) {
    logger.log("error", error.message);
    res.status(500).json({ status: "Error", message: "Internal error server" });
  }
});

export default router;
