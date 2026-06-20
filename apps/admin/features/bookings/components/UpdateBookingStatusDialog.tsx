'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

type Booking = { id: string; clientName: string; status: string };
type Props = { booking: Booking; onClose: () => void };

const STATUSES = ['PENDING', 'QUOTE_SENT', 'CONFIRMED', 'DEPOSIT_PAID', 'COMPLETED', 'CANCELLED'];

export function UpdateBookingStatusDialog({ booking, onClose }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(booking.status);
  const [notes, setNotes] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/crowdvibe/bookings/${booking.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, adminNotes: notes || undefined }),
      });
      if (!res.ok) throw new Error();
      toast.success('Booking status updated');
      router.refresh();
      onClose();
    } catch {
      toast.error('Failed to update status');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog.Root open onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay animate-fade-in" />
        <Dialog.Content className="dialog-content animate-slide-up" style={{ maxWidth: '400px' }}>
          <div className="mb-5 flex items-center justify-between">
            <Dialog.Title className="text-base font-semibold" style={{ color: 'var(--cv-text)' }}>
              Update Status
            </Dialog.Title>
            <Dialog.Close asChild><button className="btn-ghost" style={{ padding: '4px' }}><X size={16} /></button></Dialog.Close>
          </div>
          <p className="mb-4 text-sm" style={{ color: 'var(--cv-text-secondary)' }}>
            Booking for <strong style={{ color: 'var(--cv-text)' }}>{booking.clientName}</strong>
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium" style={{ color: 'var(--cv-text-secondary)' }}>Status</label>
              <select className="admin-select w-full" value={status} onChange={(e) => setStatus(e.target.value)}>
                {STATUSES.map((s) => <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium" style={{ color: 'var(--cv-text-secondary)' }}>Admin Notes (optional)</label>
              <textarea className="admin-input" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Internal notes…" style={{ resize: 'vertical' }} />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Dialog.Close asChild><button type="button" className="btn-secondary">Cancel</button></Dialog.Close>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading && <Loader2 size={14} className="animate-spin" />}
                Update
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
