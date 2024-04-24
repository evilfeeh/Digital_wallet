import * as express from "express";
import { Request, Response, json } from "express";
import userRouter from "./routers/user.router";
import transactionRouter from "./routers/transaction.router";
import walletRouter from "./routers/wallet.router";
import loginRouter from "./routers/login.router";
import * as swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "../swagger/config";

const app = express();

app.use(json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/v1", userRouter);
app.use("/v1", loginRouter);
app.use("/v1", transactionRouter);
app.use("/v1", walletRouter);

app.get("/v1/ping", (req: Request, res: Response) => {
  res.send("pong");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is listening into ${process.env.PORT}`);
});
