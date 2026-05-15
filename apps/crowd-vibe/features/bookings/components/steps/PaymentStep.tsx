'use client';

import { format } from 'date-fns';
import type { BookingFormData } from '../../types';

interface Props {
  value: Partial<BookingFormData>;
  tenantName: string;
  onChange: (v: Partial<BookingFormData>) => void;
  onSubmit: () => void;
  onBack: () => void;
  submitting: boolean;
}

export function PaymentStep({ value, tenantName, onChange, onSubmit, onBack, submitting }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">Review & submit</h2>
        <p className="mt-1 text-sm text-white/40">Check the details below, then submit your request.</p>
      </div>

      {/* Summary */}
      <div className="rounded-xl border p-4 space-y-2 text-sm" style={{ background: 'var(--cv-elevated)', borderColor: 'var(--cv-border)' }}>
        <SummaryRow label="Artist" value={tenantName} />
        <SummaryRow label="Event" value={value.eventType?.replace('_', ' ') ?? ''} />
        <SummaryRow label="Date" value={value.eventDate ? format(new Date(value.eventDate), 'PPP') : ''} />
        <SummaryRow label="Time" value={value.startTime ?? ''} />
        <SummaryRow label="Venue" value={value.venue ?? ''} />
        <SummaryRow label="Contact" value={`${value.clientName} · ${value.clientEmail}`} />
        {(value.services ?? []).length > 0 && (
          <SummaryRow label="Services" value={(value.services ?? []).join(', ')} />
        )}
      </div>

      {/* Payment method */}
      <div>
        <p className="mb-3 text-sm font-medium text-white/80">Preferred deposit payment</p>
        <div className="flex gap-3">
          {(['paystack', 'stripe'] as const).map((method) => (
            <button
              key={method}
              onClick={() => onChange({ paymentMethod: method })}
              className="flex-1 rounded-xl border py-3 text-sm font-medium transition-all"
              style={{
                background: value.paymentMethod === method ? 'rgba(124,58,237,0.15)' : 'var(--cv-elevated)',
                borderColor: value.paymentMethod === method ? 'var(--cv-brand)' : 'var(--cv-border)',
                color: 'white',
              }}
            >
              {method === 'paystack' ? '₦ Paystack (Nigeria)' : '$ Stripe (International)'}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-white/30">Deposit amount will be in the quote. No payment collected now.</p>
      </div>

      <div className="flex gap-3 pt-2">
        <button onClick={onBack} disabled={submitting} className="flex-1 rounded-xl border py-3 text-sm font-medium text-white/50 hover:text-white disabled:opacity-30" style={{ borderColor: 'var(--cv-border)' }}>← Back</button>
        <button onClick={onSubmit} disabled={submitting} className="flex-1 rounded-xl py-3 text-sm font-semibold text-white disabled:opacity-50" style={{ background: 'var(--cv-brand)' }}>
          {submitting ? 'Sending...' : 'Submit Booking Request →'}
        </button>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex justify-between">
      <span className="text-white/40">{label}</span>
      <span className="text-white capitalize">{value.toLowerCase()}</span>
    </div>
  );
}
