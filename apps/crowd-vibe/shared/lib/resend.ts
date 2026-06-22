import { Resend } from 'resend';

let _resend: Resend | undefined;
function getInstance(): Resend {
  _resend ??= new Resend(process.env.RESEND_API_KEY!);
  return _resend;
}

export const resend: Resend = new Proxy({} as Resend, {
  get(_target, prop: string | symbol) {
    const client = getInstance();
    const val = (client as unknown as Record<string | symbol, unknown>)[prop];
    return typeof val === 'function' ? (val as Function).bind(client) : val;
  },
});

const FROM = 'CrowdVibe <bookings@crowdvibe.io>';

export async function sendBookingConfirmation(params: {
  to: string;
  clientName: string;
  djName: string;
  eventType: string;
  eventDate: string;
  venue: string;
}) {
  return resend.emails.send({
    from: FROM,
    to: params.to,
    subject: `Booking request received — ${params.djName}`,
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;background:#0B0B0B;color:#fff;padding:40px 32px;border-radius:16px">
        <h1 style="font-size:24px;margin-bottom:8px">Hi ${params.clientName}!</h1>
        <p style="color:rgba(255,255,255,0.6);margin-bottom:24px">
          Your booking request for <strong>${params.djName}</strong> has been received.
          We&apos;ll review the details and send you a quote within 24 hours.
        </p>
        <div style="background:#111;border:1px solid #2a2a2a;border-radius:12px;padding:20px">
          <p style="color:rgba(255,255,255,0.4);font-size:12px;margin-bottom:4px">EVENT DETAILS</p>
          <p><strong>Type:</strong> ${params.eventType}</p>
          <p><strong>Date:</strong> ${params.eventDate}</p>
          <p><strong>Venue:</strong> ${params.venue}</p>
        </div>
        <p style="margin-top:24px;color:rgba(255,255,255,0.4);font-size:12px">
          Powered by <a href="https://crowdvibe.io" style="color:#7C3AED">CrowdVibe</a>
        </p>
      </div>
    `,
  });
}

export async function sendQuoteEmail(params: {
  to: string;
  clientName: string;
  djName: string;
  totalPrice: number;
  depositAmount: number;
  eventDate: string;
}) {
  return resend.emails.send({
    from: FROM,
    to: params.to,
    subject: `Quote ready from ${params.djName}`,
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;background:#0B0B0B;color:#fff;padding:40px 32px;border-radius:16px">
        <h1 style="font-size:24px;margin-bottom:8px">Your quote is ready!</h1>
        <p style="color:rgba(255,255,255,0.6)">Hi ${params.clientName}, here's the quote from ${params.djName} for your event on ${params.eventDate}.</p>
        <div style="background:#111;border:1px solid #7C3AED;border-radius:12px;padding:20px;margin:24px 0">
          <p>Total: <strong>₦${params.totalPrice.toLocaleString()}</strong></p>
          <p>Deposit to confirm: <strong>₦${params.depositAmount.toLocaleString()}</strong></p>
        </div>
        <p style="color:rgba(255,255,255,0.4);font-size:12px">Powered by CrowdVibe</p>
      </div>
    `,
  });
}
