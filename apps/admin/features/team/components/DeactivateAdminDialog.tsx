'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Loader2, UserX } from 'lucide-react';
import { toast } from 'sonner';

type Member = { id: string; name: string | null; email: string | null };

type Props = {
  member: Member;
  onClose: () => void;
};

export function DeactivateAdminDialog({ member, onClose }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDeactivate() {
    setLoading(true);
    try {
      const res = await fetch(`/api/team/${member.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      toast.success('Admin access removed');
      router.refresh();
      onClose();
    } catch {
      toast.error('Failed to remove access');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AlertDialog.Root open onOpenChange={(o) => !o && onClose()}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="dialog-overlay animate-fade-in" />
        <AlertDialog.Content className="dialog-content animate-slide-up" style={{ maxWidth: '400px' }}>
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
            <UserX size={20} color="#ef4444" />
          </div>
          <AlertDialog.Title className="mb-2 text-base font-semibold" style={{ color: 'var(--cv-text)' }}>
            Remove Admin Access
          </AlertDialog.Title>
          <AlertDialog.Description className="mb-6 text-sm" style={{ color: 'var(--cv-text-secondary)' }}>
            This will revoke admin access for <strong style={{ color: 'var(--cv-text)' }}>{member.name ?? member.email}</strong>. They'll lose all administrative permissions immediately.
          </AlertDialog.Description>
          <div className="flex justify-end gap-3">
            <AlertDialog.Cancel asChild>
              <button className="btn-secondary">Cancel</button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button className="btn-danger" onClick={handleDeactivate} disabled={loading}>
                {loading && <Loader2 size={14} className="animate-spin" />}
                Remove Access
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
