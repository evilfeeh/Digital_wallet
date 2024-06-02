import { verifyToken } from "../../../utils/jwtToken";
import { Request, Response, NextFunction } from "express";

export function validAuthentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers["authorization"];
  try {
    verifyToken(token);
    next();
  } catch (error) {
    res.status(403).send("Invalid token").end();
    return;
  }
}
