'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Loader2, Ban } from 'lucide-react';
import { toast } from 'sonner';

type Tenant = { id: string; name: string };
type Props = { tenant: Tenant; onClose: () => void };

export function SuspendTenantDialog({ tenant, onClose }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSuspend() {
    setLoading(true);
    try {
      const res = await fetch(`/api/crowdvibe/tenants/${tenant.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'SUSPENDED' }),
      });
      if (!res.ok) throw new Error();
      toast.success('Tenant suspended');
      router.refresh();
      onClose();
    } catch {
      toast.error('Failed to suspend tenant');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AlertDialog.Root open onOpenChange={(o) => !o && onClose()}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="dialog-overlay animate-fade-in" />
        <AlertDialog.Content className="dialog-content animate-slide-up" style={{ maxWidth: '400px' }}>
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }}>
            <Ban size={20} color="#f59e0b" />
          </div>
          <AlertDialog.Title className="mb-2 text-base font-semibold" style={{ color: 'var(--cv-text)' }}>Suspend Tenant</AlertDialog.Title>
          <AlertDialog.Description className="mb-6 text-sm" style={{ color: 'var(--cv-text-secondary)' }}>
            Suspend <strong style={{ color: 'var(--cv-text)' }}>{tenant.name}</strong>? Their public site will be taken offline. You can reactivate later.
          </AlertDialog.Description>
          <div className="flex justify-end gap-3">
            <AlertDialog.Cancel asChild><button className="btn-secondary">Cancel</button></AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                className="btn-danger"
                style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.2)' }}
                onClick={handleSuspend}
                disabled={loading}
              >
                {loading && <Loader2 size={14} className="animate-spin" />}
                Suspend
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
