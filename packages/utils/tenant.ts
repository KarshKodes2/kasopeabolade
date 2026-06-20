import { prisma } from 'db';

export async function getTenantBySlug(slug: string) {
  return prisma.tenant.findUnique({ where: { slug } });
}

export async function getTenantByDomain(domain: string) {
  return prisma.tenant.findFirst({ where: { customDomain: domain, status: 'ACTIVE' } });
}

export async function getTenantWithMedia(slug: string) {
  return prisma.tenant.findUnique({
    where: { slug },
    include: {
      mediaAssets: {
        where: { type: { in: ['MIX', 'PODCAST', 'LIVE_SET', 'PROMO_VIDEO', 'PHOTO'] } },
        orderBy: [{ featured: 'desc' }, { publishedAt: 'desc' }],
        take: 20,
      },
    },
  });
}

export async function getBookedDates(tenantId: string): Promise<string[]> {
  const bookings = await prisma.booking.findMany({
    where: {
      tenantId,
      status: { in: ['CONFIRMED', 'DEPOSIT_PAID'] },
      eventDate: { gte: new Date() },
    },
    select: { eventDate: true },
  });
  return bookings.map((b) => b.eventDate.toISOString().split('T')[0]);
}
