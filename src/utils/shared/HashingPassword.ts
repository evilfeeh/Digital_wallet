import { scryptSync, randomBytes, timingSafeEqual, BinaryLike } from "crypto";

export function hashingPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hashedPassword = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hashedPassword}`;
}

export function IsPasswordValid(
  passwordUnderValidation: BinaryLike,
  correctedHash: string
): boolean {
  const [salt, key] = correctedHash.split(":");
  const hashedPassword = Buffer.from(
    scryptSync(passwordUnderValidation, salt, 64).toString("hex")
  );
  const keyBuffer = Buffer.from(key);
  return timingSafeEqual(keyBuffer, hashedPassword);
}
