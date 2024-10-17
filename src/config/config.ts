import dotenv from 'dotenv';

dotenv.config();

export const DEVELOPMENT = process.env.NODE_ENV === 'developlent';
export const TEST = process.env.NODE_ENV === 'test';


export const HOSTNAME = process.env.HOST;
export const PORT = Number(process.env.PORT);