import { prisma } from '@karsh/db';
import { BookingSchema } from '@karsh/utils/validation';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = BookingSchema.parse(body);
    const booking = await prisma.booking.create({ data: parsed });
    return NextResponse.json(booking);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function GET() {
  const bookings = await prisma.booking.findMany();
  return NextResponse.json(bookings);
}
