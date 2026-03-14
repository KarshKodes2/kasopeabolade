import { PrismaClient } from '@prisma/client';

declare global {
  // Prevent multiple instances in dev
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query', 'error', 'warn'],
  });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

// Example: inject tenantId automatically if needed
prisma.$use(async (params: { model: string; }, next: (arg0: any) => any) => {
  if (params.model && ['Project', 'Booking'].includes(params.model)) {
    // attach currentTenantId (you’ll fetch this per user session)
  }
  return next(params);
});

