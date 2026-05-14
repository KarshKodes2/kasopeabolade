import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { sendBookingConfirmation } from '../../../lib/resend';
import { format } from 'date-fns';

export async function GET(req: NextRequest) {
  const tenantId = req.nextUrl.searchParams.get('tenantId');
  if (!tenantId) return NextResponse.json({ error: 'tenantId required' }, { status: 400 });

  const bookings = await prisma.booking.findMany({
    where: { tenantId },
    orderBy: { eventDate: 'asc' },
  });

  return NextResponse.json(bookings);
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as {
    tenantId: string;
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    eventType: string;
    eventDate: string;
    startTime: string;
    venue: string;
    venueAddress?: string;
    guestCount?: string;
    services?: string[];
    equipmentNeeded?: boolean;
    specialRequests?: string;
  };

  const {
    tenantId, clientName, clientEmail, clientPhone,
    eventType, eventDate, startTime, venue,
    venueAddress, guestCount, services, equipmentNeeded, specialRequests,
  } = body;

  if (!tenantId || !clientName || !clientEmail || !clientPhone || !eventType || !eventDate || !startTime || !venue) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const tenant = await prisma.tenant.findUnique({ where: { id: tenantId }, select: { name: true } });
  if (!tenant) return NextResponse.json({ error: 'Tenant not found' }, { status: 404 });

  const booking = await prisma.booking.create({
    data: {
      tenantId,
      clientName,
      clientEmail,
      clientPhone,
      eventType: eventType as never,
      eventDate: new Date(eventDate),
      startTime,
      venue,
      venueAddress,
      guestCount: guestCount ? parseInt(guestCount, 10) : null,
      services: (services ?? []) as never,
      equipmentNeeded: equipmentNeeded ?? false,
      specialRequests,
    },
  });

  // Send confirmation email (non-blocking)
  sendBookingConfirmation({
    to: clientEmail,
    clientName,
    djName: tenant.name,
    eventType: eventType.replace('_', ' '),
    eventDate: format(new Date(eventDate), 'PPP'),
    venue,
  }).catch(() => {});

  return NextResponse.json({ id: booking.id }, { status: 201 });
}
