import { NextResponse } from 'next/server';
import { auth } from '@/shared/lib/auth';
import { prisma } from '@/shared/lib/prisma';
import { sendInvoiceEmail } from '@/features/invoices';

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.tenantId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;

  // Verify booking belongs to this tenant
  const booking = await prisma.booking.findUnique({ where: { id }, select: { tenantId: true, status: true } });
  if (!booking) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (booking.tenantId !== session.user.tenantId) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const INVOICE_ELIGIBLE = ['CONFIRMED', 'DEPOSIT_PAID', 'COMPLETED'];
  if (!INVOICE_ELIGIBLE.includes(booking.status)) {
    return NextResponse.json({ error: 'Invoice can only be sent for confirmed bookings' }, { status: 422 });
  }

  try {
    await sendInvoiceEmail(id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[resend-invoice]', err);
    return NextResponse.json({ error: 'Failed to send invoice' }, { status: 500 });
  }
}
