import dotenv from 'dotenv';

dotenv.config();

export const DEVELOPMENT = process.env.NODE_ENV === 'developlent';
export const TEST = process.env.NODE_ENV === 'test';
export const PRODUCTION = process.env.NODE_ENV === 'production';

export const HOSTNAME = process.env.HOST || '127.0.0.1';
export const PORT = Number(process.env.PORT || 8000);

export const JWT_SECRET = process.env.JWT_SECRET || '';
export const BCRYPT_SECRET = process.env.BCRYPT_SECRET || '';

export const DB_TYPE = process.env.DB_TYPE || 'sql';

export const MONGODB_URI = process.env.MONGODB_URI || '';