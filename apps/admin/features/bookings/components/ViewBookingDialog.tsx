'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { StatusBadge } from '../../../shared/components/common/StatusBadge';

type Booking = {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string | null;
  eventType: string;
  eventDate: Date;
  venue: string;
  venueAddress?: string | null;
  guestCount?: number | null;
  status: string;
  totalPrice?: number | null;
  depositAmount?: number | null;
  depositPaid: boolean;
  specialRequests?: string | null;
  adminNotes?: string | null;
  tenant: { name: string };
};

type Props = { booking: Booking; onClose: () => void };

export function ViewBookingDialog({ booking, onClose }: Props) {
  const row = (label: string, value: React.ReactNode) => (
    <div className="flex justify-between gap-4 py-2.5" style={{ borderBottom: '1px solid var(--cv-border-subtle)' }}>
      <span className="text-xs" style={{ color: 'var(--cv-text-muted)', minWidth: '110px' }}>{label}</span>
      <span className="text-sm text-right" style={{ color: 'var(--cv-text-secondary)' }}>{value}</span>
    </div>
  );

  return (
    <Dialog.Root open onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay animate-fade-in" />
        <Dialog.Content className="dialog-content animate-slide-up" style={{ maxWidth: '560px' }}>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <Dialog.Title className="text-base font-semibold" style={{ color: 'var(--cv-text)' }}>
                Booking Details
              </Dialog.Title>
              <p className="text-xs" style={{ color: 'var(--cv-text-muted)' }}>#{booking.id.slice(-8)}</p>
            </div>
            <Dialog.Close asChild>
              <button className="btn-ghost" style={{ padding: '4px' }}><X size={16} /></button>
            </Dialog.Close>
          </div>

          <div className="space-y-0">
            {row('Tenant', <span style={{ color: 'var(--cv-brand-light)' }}>{booking.tenant.name}</span>)}
            {row('Status', <StatusBadge status={booking.status} />)}
            {row('Client', booking.clientName)}
            {row('Email', booking.clientEmail)}
            {row('Phone', booking.clientPhone)}
            {row('Event Type', booking.eventType.replace(/_/g, ' '))}
            {row('Event Date', new Date(booking.eventDate).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }))}
            {row('Venue', booking.venue)}
            {booking.venueAddress && row('Address', booking.venueAddress)}
            {booking.guestCount && row('Guest Count', booking.guestCount.toLocaleString())}
            {row('Total Price', booking.totalPrice ? `₦${booking.totalPrice.toLocaleString()}` : '—')}
            {row('Deposit', booking.depositAmount ? `₦${booking.depositAmount.toLocaleString()} (${booking.depositPaid ? 'Paid' : 'Unpaid'})` : '—')}
            {booking.specialRequests && row('Requests', booking.specialRequests)}
            {booking.adminNotes && row('Admin Notes', booking.adminNotes)}
          </div>

          <div className="mt-5 flex justify-end">
            <Dialog.Close asChild>
              <button className="btn-secondary">Close</button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
