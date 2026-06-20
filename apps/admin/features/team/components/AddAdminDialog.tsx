'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

type Props = {
  open: boolean;
  onClose: () => void;
};

export function AddAdminDialog({ open, onClose }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error(await res.text());
      toast.success('Admin access granted');
      router.refresh();
      onClose();
      setEmail('');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to add admin');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay animate-fade-in" />
        <Dialog.Content className="dialog-content animate-slide-up" style={{ maxWidth: '420px' }}>
          <div className="mb-5 flex items-center justify-between">
            <Dialog.Title className="text-base font-semibold" style={{ color: 'var(--cv-text)' }}>
              Add Admin
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="btn-ghost" style={{ padding: '4px' }}><X size={16} /></button>
            </Dialog.Close>
          </div>

          <p className="mb-5 text-sm" style={{ color: 'var(--cv-text-secondary)' }}>
            The user must already have signed in with their GitHub account. They'll receive ADMIN role access.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium" style={{ color: 'var(--cv-text-secondary)' }}>
                GitHub Email *
              </label>
              <input
                required
                type="email"
                className="admin-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Dialog.Close asChild>
                <button type="button" className="btn-secondary">Cancel</button>
              </Dialog.Close>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading && <Loader2 size={14} className="animate-spin" />}
                Grant Access
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
