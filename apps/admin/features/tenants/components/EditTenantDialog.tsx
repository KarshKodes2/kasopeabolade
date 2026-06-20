'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

type Tenant = { id: string; name: string; plan: string; siteType: string; redirectUrl?: string | null };
type Props = { tenant: Tenant; onClose: () => void };

const PLANS = ['FREE', 'STARTER', 'PRO', 'ENTERPRISE'];
const SITE_TYPES = ['PERSONAL', 'PORTFOLIO', 'CORPORATE', 'REDIRECT'];

export function EditTenantDialog({ tenant, onClose }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(tenant.plan);
  const [siteType, setSiteType] = useState(tenant.siteType);
  const [redirectUrl, setRedirectUrl] = useState(tenant.redirectUrl ?? '');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/crowdvibe/tenants/${tenant.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, siteType, redirectUrl: siteType === 'REDIRECT' ? redirectUrl : null }),
      });
      if (!res.ok) throw new Error();
      toast.success('Tenant updated');
      router.refresh();
      onClose();
    } catch {
      toast.error('Failed to update tenant');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog.Root open onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay animate-fade-in" />
        <Dialog.Content className="dialog-content animate-slide-up" style={{ maxWidth: '420px' }}>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <Dialog.Title className="text-base font-semibold" style={{ color: 'var(--cv-text)' }}>Edit Tenant</Dialog.Title>
              <p className="text-xs" style={{ color: 'var(--cv-text-muted)' }}>{tenant.name}</p>
            </div>
            <Dialog.Close asChild><button className="btn-ghost" style={{ padding: '4px' }}><X size={16} /></button></Dialog.Close>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium" style={{ color: 'var(--cv-text-secondary)' }}>Plan</label>
              <select className="admin-select w-full" value={plan} onChange={(e) => setPlan(e.target.value)}>
                {PLANS.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium" style={{ color: 'var(--cv-text-secondary)' }}>Site Type</label>
              <select className="admin-select w-full" value={siteType} onChange={(e) => setSiteType(e.target.value)}>
                {SITE_TYPES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            {siteType === 'REDIRECT' && (
              <div>
                <label className="mb-1.5 block text-xs font-medium" style={{ color: 'var(--cv-text-secondary)' }}>Redirect URL</label>
                <input className="admin-input" type="url" value={redirectUrl} onChange={(e) => setRedirectUrl(e.target.value)} placeholder="https://djkarsh.com" required />
              </div>
            )}
            <div className="flex justify-end gap-3 pt-2">
              <Dialog.Close asChild><button type="button" className="btn-secondary">Cancel</button></Dialog.Close>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading && <Loader2 size={14} className="animate-spin" />}
                Save Changes
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
