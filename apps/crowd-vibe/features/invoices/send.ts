import { prisma } from '@/shared/lib/prisma';
import { resend } from '@/shared/lib/resend';
import { generateInvoicePdf, buildInvoiceData } from './api';

export async function sendInvoiceEmail(bookingId: string): Promise<void> {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { tenant: true },
  });
  if (!booking) throw new Error(`Booking ${bookingId} not found`);

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
    where: { id: bookingId },
    data: { invoiceUrl: filename },
  });
}
