import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/prisma';
import { resend } from '@/shared/lib/resend';
import { createCalendarEvent } from '@/features/calendar';
import { generateInvoicePdf, buildInvoiceData } from '@/features/invoices';

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
    basePrice?: number;
  };

  const booking = await prisma.booking.update({
    where: { id },
    data: {
      ...(body.status && { status: body.status as never }),
      ...(body.adminNotes !== undefined && { adminNotes: body.adminNotes }),
      ...(body.totalPrice !== undefined && { totalPrice: body.totalPrice }),
      ...(body.depositAmount !== undefined && { depositAmount: body.depositAmount }),
      ...(body.basePrice !== undefined && { basePrice: body.basePrice }),
    },
    include: { tenant: true },
  });

  if (body.status === 'CONFIRMED') {
    // Run calendar + invoice concurrently, don't block response on failures
    Promise.all([
      triggerCalendarEvent(booking),
      triggerInvoiceEmail(booking),
    ]).catch(console.error);
  }

  return NextResponse.json(booking);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.booking.update({ where: { id }, data: { status: 'CANCELLED' } });
  return NextResponse.json({ ok: true });
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function triggerCalendarEvent(booking: {
  id: string;
  tenant: {
    googleAccessToken: string | null;
    googleRefreshToken: string | null;
    googleCalendarId: string | null;
  };
  eventDate: Date;
  startTime: string;
  venue: string;
  eventType: string;
  clientName: string;
  clientEmail: string;
  tenantId: string;
}) {
  const { tenant } = booking;
  if (!tenant.googleAccessToken || !tenant.googleRefreshToken || !tenant.googleCalendarId) return;

  const [hours, minutes] = booking.startTime.split(':').map(Number);
  const start = new Date(booking.eventDate);
  start.setHours(hours, minutes, 0, 0);
  const end = new Date(start);
  end.setHours(end.getHours() + 4); // default 4-hour event

  const eventId = await createCalendarEvent(
    tenant.googleAccessToken,
    tenant.googleRefreshToken,
    tenant.googleCalendarId,
    {
      summary: `Booking: ${booking.eventType.replace(/_/g, ' ')} — ${booking.clientName}`,
      description: `Client: ${booking.clientName}\nEmail: ${booking.clientEmail}\nVenue: ${booking.venue}`,
      location: booking.venue,
      startDateTime: start.toISOString(),
      endDateTime: end.toISOString(),
      attendeeEmail: booking.clientEmail,
    }
  );

  if (eventId) {
    await prisma.booking.update({
      where: { id: booking.id },
      data: { googleCalendarEventId: eventId },
    });
  }
}

async function triggerInvoiceEmail(booking: {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  eventType: string;
  eventDate: Date;
  startTime: string;
  venue: string;
  services: string[];
  basePrice: number | null;
  depositAmount: number | null;
  totalPrice: number | null;
  tenant: {
    name: string;
    location: string | null;
    brandColor: string | null;
  };
}) {
  const invoiceData = buildInvoiceData(booking, booking.tenant);
  const pdfBuffer = await generateInvoicePdf(invoiceData);
  const filename = `invoice-${invoiceData.invoiceNumber}.pdf`;

  await resend.emails.send({
    from: 'CrowdVibe <invoices@crowdvibe.io>',
    to: booking.clientEmail,
    subject: `Your booking with ${booking.tenant.name} is confirmed — ${invoiceData.invoiceNumber}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px;background:#0a0a0a;color:#fff;">
        <h2 style="color:#7C3AED;margin-bottom:8px;">Booking Confirmed! 🎉</h2>
        <p style="color:#ffffff80;margin-bottom:24px;">
          Hi ${booking.clientName}, your booking with <strong style="color:#fff">${booking.tenant.name}</strong> has been confirmed.
          Your invoice is attached to this email.
        </p>
        <table style="width:100%;border-collapse:collapse;background:#ffffff08;border-radius:8px;overflow:hidden;">
          <tr><td style="padding:12px 16px;color:#ffffff50;font-size:12px;">Event</td><td style="padding:12px 16px;color:#fff;">${booking.eventType.replace(/_/g, ' ')}</td></tr>
          <tr><td style="padding:12px 16px;color:#ffffff50;font-size:12px;">Venue</td><td style="padding:12px 16px;color:#fff;">${booking.venue}</td></tr>
          <tr><td style="padding:12px 16px;color:#ffffff50;font-size:12px;">Date</td><td style="padding:12px 16px;color:#fff;">${new Date(booking.eventDate).toLocaleDateString('en-NG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td></tr>
          <tr><td style="padding:12px 16px;color:#ffffff50;font-size:12px;">Time</td><td style="padding:12px 16px;color:#fff;">${booking.startTime}</td></tr>
          ${booking.depositAmount ? `<tr><td style="padding:12px 16px;color:#ffffff50;font-size:12px;">Deposit Due</td><td style="padding:12px 16px;color:#7C3AED;font-weight:bold;">₦${booking.depositAmount.toLocaleString()}</td></tr>` : ''}
        </table>
        <p style="color:#ffffff40;font-size:12px;margin-top:24px;">Powered by CrowdVibe · crowdvibe.io</p>
      </div>
    `,
    attachments: [{ filename, content: pdfBuffer }],
  });

  await prisma.booking.update({
    where: { id: booking.id },
    data: { invoiceUrl: filename },
  });
}
