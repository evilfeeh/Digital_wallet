import * as express from "express";
import { Request, Response, json } from "express";
import userRouter from "./routers/user.router";
import transactionRouter from "./routers/transaction.router";
import walletRouter from "./routers/wallet.router";

const app = express();

app.use(json());
app.use(userRouter);
app.use(transactionRouter);
app.use(walletRouter);

app.get("/ping", (req: Request, res: Response) => {
  res.send("pong");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is listening into ${process.env.PORT}`);
});
