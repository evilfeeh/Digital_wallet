import { scryptSync, randomBytes, timingSafeEqual } from 'crypto'

export function hashingPassword (password: string) {
  const salt = randomBytes(16).toString('hex');
  const hashedPassword = scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hashedPassword}`
}
