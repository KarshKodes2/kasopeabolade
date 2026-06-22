export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/prisma';
import { createPaymentIntent, stripe } from '@/shared/lib/stripe';

export async function POST(req: NextRequest) {
  const { bookingId } = (await req.json()) as { bookingId: string };

  const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
  if (!booking) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (!booking.depositAmount) return NextResponse.json({ error: 'No deposit amount' }, { status: 400 });

  const intent = await createPaymentIntent(booking.depositAmount, 'usd', { bookingId });

  await prisma.booking.update({ where: { id: bookingId }, data: { stripePaymentId: intent.id } });

  return NextResponse.json({ clientSecret: intent.client_secret });
}
