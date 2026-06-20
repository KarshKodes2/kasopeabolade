'use client';

import type { BookingFormData } from '../../types';

interface Props {
  value: Partial<BookingFormData>;
  onChange: (v: Partial<BookingFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function ContactStep({ value, onChange, onNext, onBack }: Props) {
  const valid = value.clientName && value.clientEmail && value.clientPhone;

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-white">Your contact info</h2>
        <p className="mt-1 text-sm text-white/40">We'll send the quote and confirmation here.</p>
      </div>

      {(['clientName', 'clientEmail', 'clientPhone'] as const).map((field) => {
        const labels = { clientName: 'Full name', clientEmail: 'Email address', clientPhone: 'Phone number' };
        const types = { clientName: 'text', clientEmail: 'email', clientPhone: 'tel' };
        const placeholders = { clientName: 'Tunde Adeyemi', clientEmail: 'tunde@email.com', clientPhone: '+234 800 000 0000' };
        return (
          <div key={field}>
            <label className="mb-1.5 block text-sm font-medium text-white/80">{labels[field]} *</label>
            <input
              type={types[field]}
              value={value[field] ?? ''}
              onChange={(e) => onChange({ [field]: e.target.value })}
              placeholder={placeholders[field]}
              className="w-full rounded-lg border px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-(--cv-brand)"
              style={{ background: 'var(--cv-elevated)', borderColor: 'var(--cv-border)' }}
            />
          </div>
        );
      })}

      <div className="flex gap-3 pt-2">
        <button onClick={onBack} className="flex-1 rounded-xl border py-3 text-sm font-medium text-white/50 hover:text-white" style={{ borderColor: 'var(--cv-border)' }}>← Back</button>
        <button onClick={onNext} disabled={!valid} className="flex-1 rounded-xl py-3 text-sm font-semibold text-white disabled:opacity-30" style={{ background: 'var(--cv-brand)' }}>Continue →</button>
      </div>
    </div>
  );
}
