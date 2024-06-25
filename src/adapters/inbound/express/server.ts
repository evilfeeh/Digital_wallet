import * as express from "express";
import { Request, Response, json } from "express";
import userRouter from "./routers/user.controller";
import transactionRouter from "./routers/transaction.controller";
import walletRouter from "./routers/wallet.controller";
import loginRouter from "./routers/login.controller";
import * as swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "../swagger/config";
import { validAuthentication } from "./validAuthentication";
import RateLimit from "express-rate-limit";

let limiter = RateLimit({
  windowMs: 5 * 60 * 1000,
  max: 100,
});

const app = express();

app.use(json());
app.get("/", (req: Request, res: Response) => {
  res.redirect("/docs");
});
app.get("/v1/ping", (req: Request, res: Response) => {
  res.send("pong");
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/v1", loginRouter);

app.use(limiter);
app.use(validAuthentication);

app.use("/v1", userRouter);
app.use("/v1", transactionRouter);
app.use("/v1", walletRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening into ${process.env.PORT}`);
});
