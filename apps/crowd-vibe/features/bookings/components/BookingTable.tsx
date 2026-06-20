import Link from 'next/link';
import type { Booking } from '../types';

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  PENDING:      { bg: 'rgba(234,179,8,0.15)',  text: '#eab308' },
  QUOTE_SENT:   { bg: 'rgba(168,85,247,0.15)', text: '#a855f7' },
  CONFIRMED:    { bg: 'rgba(59,130,246,0.15)', text: '#3b82f6' },
  DEPOSIT_PAID: { bg: 'rgba(34,197,94,0.15)',  text: '#22c55e' },
  COMPLETED:    { bg: 'rgba(16,185,129,0.15)', text: '#10b981' },
  CANCELLED:    { bg: 'rgba(239,68,68,0.15)',  text: '#ef4444' },
};

function StatusBadge({ status }: { status: string }) {
  const colors = STATUS_COLORS[status] ?? STATUS_COLORS.PENDING;
  return (
    <span className="rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap" style={{ background: colors.bg, color: colors.text }}>
      {status.replace(/_/g, ' ')}
    </span>
  );
}

interface Props {
  bookings: Booking[];
}

export function BookingTable({ bookings }: Props) {
  if (bookings.length === 0) {
    return (
      <div
        className="rounded-xl border px-6 py-16 text-center"
        style={{ background: 'var(--cv-surface)', borderColor: 'var(--cv-border)' }}
      >
        <p className="text-4xl mb-3">📅</p>
        <p className="text-white font-medium">No bookings yet</p>
        <p className="mt-1 text-sm text-white/30">Share your booking page link with clients to get started.</p>
      </div>
    );
  }

  return (
    <>
      {/* Mobile card list */}
      <div className="flex flex-col gap-3 md:hidden">
        {bookings.map((b) => (
          <Link
            key={b.id}
            href={`/bookings/${b.id}`}
            className="block rounded-xl border p-4 transition-colors hover:border-(--cv-brand)"
            style={{ background: 'var(--cv-surface)', borderColor: 'var(--cv-border)' }}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <p className="font-medium text-white">{b.clientName}</p>
                <p className="text-xs text-white/30">{b.clientEmail}</p>
              </div>
              <StatusBadge status={b.status} />
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/40">
              <span>{b.eventType.replace(/_/g, ' ')}</span>
              <span>{new Date(b.eventDate).toLocaleDateString()}</span>
              <span>{b.venue}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-x-auto rounded-xl border md:block" style={{ borderColor: 'var(--cv-border)' }}>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-xs text-white/40" style={{ borderColor: 'var(--cv-border)', background: 'var(--cv-surface)' }}>
              {['Client', 'Event', 'Date', 'Venue', 'Status', ''].map((h, i) => (
                <th key={i} className="px-4 py-3 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody style={{ background: 'var(--cv-surface)' }}>
            {bookings.map((b) => (
              <tr key={b.id} className="border-b last:border-0 hover:bg-white/2" style={{ borderColor: 'var(--cv-border)' }}>
                <td className="px-4 py-3">
                  <p className="font-medium text-white">{b.clientName}</p>
                  <p className="text-xs text-white/30">{b.clientEmail}</p>
                </td>
                <td className="px-4 py-3 text-white/70">{b.eventType.replace(/_/g, ' ')}</td>
                <td className="px-4 py-3 text-white/70 whitespace-nowrap">{new Date(b.eventDate).toLocaleDateString()}</td>
                <td className="px-4 py-3 text-white/70">{b.venue}</td>
                <td className="px-4 py-3"><StatusBadge status={b.status} /></td>
                <td className="px-4 py-3">
                  <Link href={`/bookings/${b.id}`} className="text-xs hover:text-white" style={{ color: 'var(--cv-brand)' }}>
                    View →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
