import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/prisma';

export async function GET(req: NextRequest) {
  const tenantId = req.nextUrl.searchParams.get('tenantId');
  if (!tenantId) return NextResponse.json({ error: 'tenantId required' }, { status: 400 });

  const bookings = await prisma.booking.findMany({
    where: { tenantId, status: { notIn: ['CANCELLED'] } },
    select: { eventDate: true },
  });

  return NextResponse.json({ bookedDates: bookings.map((b) => b.eventDate) });
}
