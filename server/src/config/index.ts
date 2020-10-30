import dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const SALT = process.env.BCRYPT_SALT as string;

export const JWT_SECRET = process.env.APP_SECRET as string;

export const BCRYPT_SALT = Number(SALT);
