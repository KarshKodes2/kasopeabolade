import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { initiatePayment, verifyPayment } from '../../../../lib/paystack';
import { nanoid } from 'nanoid';

export async function POST(req: NextRequest) {
  const { bookingId, callbackUrl } = (await req.json()) as { bookingId: string; callbackUrl: string };

  const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
  if (!booking) return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
  if (!booking.depositAmount) return NextResponse.json({ error: 'No deposit amount set' }, { status: 400 });

  const reference = `cvb-${nanoid(12)}`;
  const result = await initiatePayment({
    email: booking.clientEmail,
    amount: booking.depositAmount * 100, // NGN to Kobo
    reference,
    callbackUrl,
    metadata: { bookingId },
  });

  await prisma.booking.update({ where: { id: bookingId }, data: { paystackRef: reference } });

  return NextResponse.json({ authorizationUrl: result.authorizationUrl });
}

export async function GET(req: NextRequest) {
  const reference = req.nextUrl.searchParams.get('reference');
  if (!reference) return NextResponse.json({ error: 'reference required' }, { status: 400 });

  const result = await verifyPayment(reference);

  if (result.paid) {
    await prisma.booking.updateMany({
      where: { paystackRef: reference },
      data: { depositPaid: true, status: 'DEPOSIT_PAID' },
    });
  }

  return NextResponse.json({ paid: result.paid });
}
