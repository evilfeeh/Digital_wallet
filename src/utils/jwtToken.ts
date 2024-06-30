import { sign, verify, JwtPayload } from "jsonwebtoken";

export function generateToken(id: string) {
  return sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
}

export function verifyToken(token: string): string | JwtPayload {
  try {
    return verify(token, process.env.JWT_SECRET_KEY);
  } catch (e) {
    throw new Error(e);
  }
}
