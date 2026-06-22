import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

let prismaClient: PrismaClient;

const connectionString = process.env.DATABASE_URL;

if (connectionString) {
  const pool = new pg.Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  prismaClient = new PrismaClient({ adapter });
} else {
  prismaClient = new PrismaClient();
}

export const prisma: PrismaClient = globalForPrisma.prisma ?? prismaClient;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export * from '@prisma/client';
