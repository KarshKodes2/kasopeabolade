import dotenv from 'dotenv';
import path from 'path';

// Load .env if not already loaded
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const DATABASE_URL = process.env.DATABASE_URL!;
