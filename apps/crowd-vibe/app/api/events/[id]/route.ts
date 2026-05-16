import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/prisma';
import { auth } from '@/shared/lib/auth';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.tenantId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const body = await req.json();

  const event = await prisma.event.update({
    where: { id, tenantId: session.user.tenantId },
    data: {
      ...(body.title !== undefined && { title: body.title }),
      ...(body.description !== undefined && { description: body.description }),
      ...(body.venue !== undefined && { venue: body.venue }),
      ...(body.city !== undefined && { city: body.city }),
      ...(body.eventDate !== undefined && { eventDate: new Date(body.eventDate) }),
      ...(body.startTime !== undefined && { startTime: body.startTime }),
      ...(body.endTime !== undefined && { endTime: body.endTime }),
      ...(body.ticketUrl !== undefined && { ticketUrl: body.ticketUrl }),
      ...(body.imageUrl !== undefined && { imageUrl: body.imageUrl }),
      ...(body.published !== undefined && { published: body.published }),
      ...(body.featured !== undefined && { featured: body.featured }),
    },
  });
  return NextResponse.json(event);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.tenantId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  await prisma.event.delete({ where: { id, tenantId: session.user.tenantId } });
  return NextResponse.json({ ok: true });
}
