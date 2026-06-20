'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { StatusBadge } from '../../../shared/components/common/StatusBadge';

type Lead = {
  id: string;
  contactName: string;
  email: string;
  phone: string | null;
  companyName: string | null;
  projectType: string;
  budget: string | null;
  message: string | null;
  status: string;
  source: string | null;
  createdAt: Date;
};

type Props = { lead: Lead; onClose: () => void };

export function ViewLeadDialog({ lead, onClose }: Props) {
  const row = (label: string, value: React.ReactNode) => (
    <div className="flex justify-between gap-4 py-2.5" style={{ borderBottom: '1px solid var(--cv-border-subtle)' }}>
      <span className="text-xs" style={{ color: 'var(--cv-text-muted)', minWidth: '110px' }}>{label}</span>
      <span className="text-sm text-right" style={{ color: 'var(--cv-text-secondary)' }}>{value ?? '—'}</span>
    </div>
  );

  return (
    <Dialog.Root open onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay animate-fade-in" />
        <Dialog.Content className="dialog-content animate-slide-up" style={{ maxWidth: '520px' }}>
          <div className="mb-5 flex items-center justify-between">
            <Dialog.Title className="text-base font-semibold" style={{ color: 'var(--cv-text)' }}>Lead Details</Dialog.Title>
            <Dialog.Close asChild><button className="btn-ghost" style={{ padding: '4px' }}><X size={16} /></button></Dialog.Close>
          </div>
          <div className="space-y-0">
            {row('Status', <StatusBadge status={lead.status} />)}
            {row('Contact', lead.contactName)}
            {row('Email', lead.email)}
            {row('Phone', lead.phone)}
            {row('Company', lead.companyName)}
            {row('Project Type', lead.projectType)}
            {row('Budget', lead.budget)}
            {row('Source', lead.source)}
            {row('Received', new Date(lead.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }))}
          </div>
          {lead.message && (
            <div className="mt-4">
              <p className="mb-2 text-xs font-medium" style={{ color: 'var(--cv-text-muted)' }}>Message</p>
              <p className="rounded-lg p-3 text-sm" style={{ background: 'var(--cv-bg)', color: 'var(--cv-text-secondary)' }}>
                {lead.message}
              </p>
            </div>
          )}
          <div className="mt-5 flex justify-end">
            <Dialog.Close asChild><button className="btn-secondary">Close</button></Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
