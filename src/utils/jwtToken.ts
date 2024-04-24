import { sign, verify } from "jsonwebtoken";

export function generateToken(id: string) {
  return sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
}

export function verifyToken(token: string) {
  return verify(token, process.env.JWT_SECRET_KEY);
}
