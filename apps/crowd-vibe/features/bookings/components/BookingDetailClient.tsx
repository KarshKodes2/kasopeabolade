'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { CheckCircle, Mail, Send } from 'lucide-react';
import type { BookingStatus } from '../types';

interface BookingDetail {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  eventType: string;
  eventDate: string | Date;
  startTime: string;
  venue: string;
  venueAddress?: string | null;
  guestCount?: number | null;
  services: string[];
  specialRequests?: string | null;
  status: BookingStatus;
  adminNotes?: string | null;
  basePrice?: number | null;
  depositAmount?: number | null;
  totalPrice?: number | null;
  depositPaid: boolean;
  invoiceUrl?: string | null;
}

const STATUS_ORDER: BookingStatus[] = ['PENDING', 'QUOTE_SENT', 'CONFIRMED', 'DEPOSIT_PAID', 'COMPLETED', 'CANCELLED'];
const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  PENDING:      { bg: 'rgba(234,179,8,0.15)',  text: '#eab308' },
  QUOTE_SENT:   { bg: 'rgba(168,85,247,0.15)', text: '#a855f7' },
  CONFIRMED:    { bg: 'rgba(59,130,246,0.15)', text: '#3b82f6' },
  DEPOSIT_PAID: { bg: 'rgba(34,197,94,0.15)',  text: '#22c55e' },
  COMPLETED:    { bg: 'rgba(16,185,129,0.15)', text: '#10b981' },
  CANCELLED:    { bg: 'rgba(239,68,68,0.15)',  text: '#ef4444' },
};

const INVOICE_ELIGIBLE: BookingStatus[] = ['CONFIRMED', 'DEPOSIT_PAID', 'COMPLETED'];

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  if (!value && value !== 0) return null;
  return (
    <div>
      <p className="text-xs mb-1" style={{ color: 'var(--cv-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</p>
      <p className="text-sm font-medium text-white">{value}</p>
    </div>
  );
}

export function BookingDetailClient({ booking }: { booking: BookingDetail }) {
  const router = useRouter();
  const [status, setStatus] = useState<BookingStatus>(booking.status);
  const [adminNotes, setAdminNotes] = useState(booking.adminNotes ?? '');
  const [basePrice, setBasePrice] = useState(booking.basePrice?.toString() ?? '');
  const [depositAmount, setDepositAmount] = useState(booking.depositAmount?.toString() ?? '');
  const [totalPrice, setTotalPrice] = useState(booking.totalPrice?.toString() ?? '');
  const [saving, setSaving] = useState(false);
  const [resending, setResending] = useState(false);

  const colors = STATUS_COLORS[status] ?? STATUS_COLORS.PENDING;

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch(`/api/bookings/${booking.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          adminNotes,
          basePrice: basePrice ? parseFloat(basePrice) : undefined,
          depositAmount: depositAmount ? parseFloat(depositAmount) : undefined,
          totalPrice: totalPrice ? parseFloat(totalPrice) : undefined,
        }),
      });
      if (!res.ok) throw new Error('Update failed');
      toast.success('Booking updated');
      router.refresh();
    } catch {
      toast.error('Failed to update booking');
    } finally {
      setSaving(false);
    }
  }

  async function handleResendInvoice() {
    setResending(true);
    try {
      const res = await fetch(`/api/bookings/${booking.id}/resend-invoice`, { method: 'POST' });
      if (!res.ok) throw new Error('Failed');
      toast.success('Invoice sent to ' + booking.clientEmail);
    } catch {
      toast.error('Failed to send invoice');
    } finally {
      setResending(false);
    }
  }

  const inputStyle = 'w-full rounded-lg border px-3 py-2 text-sm text-white bg-transparent outline-none focus:border-[--cv-brand] transition-colors';
  const borderStyle = { borderColor: 'var(--cv-border)' };

  return (
    <div className="flex flex-col gap-4">
      {/* Client + event info */}
      <div className="rounded-xl border p-5" style={{ background: 'var(--cv-surface)', ...borderStyle }}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">Booking details</h2>
          <span className="rounded-full px-2.5 py-0.5 text-xs font-medium" style={{ background: colors.bg, color: colors.text }}>
            {status.replace(/_/g, ' ')}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Client" value={booking.clientName} />
          <Field label="Email" value={<a href={`mailto:${booking.clientEmail}`} className="underline" style={{ color: 'var(--cv-brand)' }}>{booking.clientEmail}</a>} />
          <Field label="Phone" value={booking.clientPhone} />
          <Field label="Event type" value={booking.eventType.replace(/_/g, ' ')} />
          <Field label="Date" value={new Date(booking.eventDate).toLocaleDateString('en-NG', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })} />
          <Field label="Time" value={booking.startTime} />
          <Field label="Venue" value={booking.venue} />
          {booking.venueAddress && <Field label="Address" value={booking.venueAddress} />}
          {booking.guestCount && <Field label="Guest count" value={booking.guestCount} />}
          {booking.services?.length > 0 && <Field label="Services" value={booking.services.join(', ')} />}
          {booking.specialRequests && <Field label="Special requests" value={booking.specialRequests} />}
        </div>
      </div>

      {/* Status + pricing update */}
      <div className="rounded-xl border p-5" style={{ background: 'var(--cv-surface)', ...borderStyle }}>
        <h2 className="mb-4 text-sm font-semibold text-white">Update booking</h2>
        <div className="flex flex-col gap-3">
          <div>
            <label className="block text-xs mb-1" style={{ color: 'var(--cv-text-secondary)' }}>Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as BookingStatus)}
              className={inputStyle}
              style={borderStyle}
            >
              {STATUS_ORDER.map((s) => (
                <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs mb-1" style={{ color: 'var(--cv-text-secondary)' }}>Base price (₦)</label>
              <input type="number" className={inputStyle} style={borderStyle} placeholder="0" value={basePrice} onChange={(e) => setBasePrice(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs mb-1" style={{ color: 'var(--cv-text-secondary)' }}>Deposit (₦)</label>
              <input type="number" className={inputStyle} style={borderStyle} placeholder="0" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs mb-1" style={{ color: 'var(--cv-text-secondary)' }}>Total (₦)</label>
              <input type="number" className={inputStyle} style={borderStyle} placeholder="0" value={totalPrice} onChange={(e) => setTotalPrice(e.target.value)} />
            </div>
          </div>

          <div>
            <label className="block text-xs mb-1" style={{ color: 'var(--cv-text-secondary)' }}>Admin notes</label>
            <textarea
              rows={3}
              className={inputStyle}
              style={{ ...borderStyle, resize: 'vertical' }}
              placeholder="Internal notes..."
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
            />
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-opacity disabled:opacity-60"
            style={{ background: 'var(--cv-brand)' }}
          >
            {saving ? (
              <span style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.6s linear infinite' }} />
            ) : (
              <CheckCircle size={14} />
            )}
            Save changes
          </button>
        </div>
      </div>

      {/* Invoice resend */}
      {INVOICE_ELIGIBLE.includes(status) && (
        <div className="rounded-xl border p-5" style={{ background: 'var(--cv-surface)', ...borderStyle }}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-white">Invoice</h2>
              <p className="mt-0.5 text-xs" style={{ color: 'var(--cv-text-secondary)' }}>
                {booking.invoiceUrl ? `Last sent: ${booking.invoiceUrl}` : 'Not yet sent'}
              </p>
            </div>
            <button
              onClick={handleResendInvoice}
              disabled={resending}
              className="flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/5 disabled:opacity-60"
              style={borderStyle}
            >
              {resending ? (
                <span style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.6s linear infinite' }} />
              ) : (
                <Send size={14} />
              )}
              {booking.invoiceUrl ? 'Resend invoice' : 'Send invoice'}
            </button>
          </div>
          <p className="mt-3 text-xs" style={{ color: 'var(--cv-text-secondary)' }}>
            Sends a PDF invoice to <span className="text-white">{booking.clientEmail}</span>
          </p>
        </div>
      )}
    </div>
  );
}
