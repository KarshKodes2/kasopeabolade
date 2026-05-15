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

interface Props {
  bookings: Booking[];
}

export function BookingTable({ bookings }: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border" style={{ borderColor: 'var(--cv-border)' }}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-left text-xs text-white/40" style={{ borderColor: 'var(--cv-border)', background: 'var(--cv-surface)' }}>
            {['Client', 'Event', 'Date', 'Venue', 'Status', 'Actions'].map((h) => (
              <th key={h} className="px-4 py-3 font-medium">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody style={{ background: 'var(--cv-surface)' }}>
          {bookings.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-4 py-10 text-center text-white/30">No bookings yet.</td>
            </tr>
          ) : (
            bookings.map((b) => {
              const colors = STATUS_COLORS[b.status] ?? STATUS_COLORS.PENDING;
              return (
                <tr key={b.id} className="border-b last:border-0" style={{ borderColor: 'var(--cv-border)' }}>
                  <td className="px-4 py-3">
                    <p className="font-medium text-white">{b.clientName}</p>
                    <p className="text-xs text-white/30">{b.clientEmail}</p>
                  </td>
                  <td className="px-4 py-3 text-white/70">{b.eventType.replace(/_/g, ' ')}</td>
                  <td className="px-4 py-3 text-white/70">{new Date(b.eventDate).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-white/70">{b.venue}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full px-2.5 py-0.5 text-xs font-medium" style={{ background: colors.bg, color: colors.text }}>
                      {b.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/bookings/${b.id}`} className="text-xs hover:text-white" style={{ color: 'var(--cv-brand)' }}>
                      View →
                    </Link>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
