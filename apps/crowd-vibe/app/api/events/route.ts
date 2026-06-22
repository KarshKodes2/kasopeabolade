export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/prisma';
import { auth } from '@/shared/lib/auth';

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.tenantId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const events = await prisma.event.findMany({
    where: { tenantId: session.user.tenantId },
    orderBy: { eventDate: 'asc' },
  });
  return NextResponse.json(events);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.tenantId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const event = await prisma.event.create({
    data: {
      tenantId: session.user.tenantId,
      title: body.title,
      description: body.description,
      venue: body.venue,
      city: body.city,
      eventDate: new Date(body.eventDate),
      startTime: body.startTime,
      endTime: body.endTime,
      ticketUrl: body.ticketUrl,
      imageUrl: body.imageUrl,
      published: body.published ?? false,
      featured: body.featured ?? false,
    },
  });
  return NextResponse.json(event, { status: 201 });
}
