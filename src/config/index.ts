import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';

export const {
  NODE_ENV,
  PORT,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  UPLOAD_CLOUD_NAME,
  UPLOAD_API_KEY,
  UPLOAD_API_SECRET,
  LOG_DIR,
  LOG_FORMAT,
  ORIGIN,
} = process.env;
