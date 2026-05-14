import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const booking = await prisma.booking.findUnique({ where: { id } });
  if (!booking) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(booking);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = (await req.json()) as {
    status?: string;
    adminNotes?: string;
    totalPrice?: number;
    depositAmount?: number;
  };

  const booking = await prisma.booking.update({
    where: { id },
    data: {
      ...(body.status && { status: body.status as never }),
      ...(body.adminNotes !== undefined && { adminNotes: body.adminNotes }),
      ...(body.totalPrice !== undefined && { totalPrice: body.totalPrice }),
      ...(body.depositAmount !== undefined && { depositAmount: body.depositAmount }),
    },
  });

  return NextResponse.json(booking);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.booking.update({ where: { id }, data: { status: 'CANCELLED' } });
  return NextResponse.json({ ok: true });
}
