import * as bcrypt from 'bcrypt';

async function encryptPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export { encryptPassword, comparePassword };