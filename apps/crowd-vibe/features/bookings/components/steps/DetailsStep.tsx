'use client';

import type { BookingFormData } from '../../types';

const SERVICES = [
  { value: 'DJ', label: 'DJ Performance' },
  { value: 'MC_HOST', label: 'MC / Host' },
  { value: 'LIGHTING', label: 'Lighting' },
  { value: 'SOUND_SYSTEM', label: 'Sound System' },
  { value: 'PHOTO_BOOTH', label: 'Photo Booth' },
];

interface Props {
  value: Partial<BookingFormData>;
  onChange: (v: Partial<BookingFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function DetailsStep({ value, onChange, onNext, onBack }: Props) {
  const toggleService = (svc: string) => {
    const current = value.services ?? [];
    onChange({ services: current.includes(svc) ? current.filter((s) => s !== svc) : [...current, svc] });
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-white">Event details</h2>
        <p className="mt-1 text-sm text-white/40">Tell us more about your event.</p>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-white/80">Venue name *</label>
        <input
          value={value.venue ?? ''}
          onChange={(e) => onChange({ venue: e.target.value })}
          placeholder="e.g. Eko Hotel & Suites"
          className="w-full rounded-lg border px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-(--cv-brand)"
          style={{ background: 'var(--cv-elevated)', borderColor: 'var(--cv-border)' }}
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-white/80">Venue address</label>
        <input
          value={value.venueAddress ?? ''}
          onChange={(e) => onChange({ venueAddress: e.target.value })}
          placeholder="Full address"
          className="w-full rounded-lg border px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-(--cv-brand)"
          style={{ background: 'var(--cv-elevated)', borderColor: 'var(--cv-border)' }}
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-white/80">Expected guest count</label>
        <input
          type="number"
          value={value.guestCount ?? ''}
          onChange={(e) => onChange({ guestCount: e.target.value })}
          placeholder="e.g. 200"
          className="w-full rounded-lg border px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-(--cv-brand)"
          style={{ background: 'var(--cv-elevated)', borderColor: 'var(--cv-border)' }}
        />
      </div>

      <div>
        <label className="mb-3 block text-sm font-medium text-white/80">Services needed</label>
        <div className="flex flex-wrap gap-2">
          {SERVICES.map((svc) => {
            const active = (value.services ?? []).includes(svc.value);
            return (
              <button
                key={svc.value}
                type="button"
                onClick={() => toggleService(svc.value)}
                className="rounded-lg border px-3 py-1.5 text-sm transition-all"
                style={{
                  background: active ? 'rgba(124,58,237,0.2)' : 'var(--cv-elevated)',
                  borderColor: active ? 'var(--cv-brand)' : 'var(--cv-border)',
                  color: active ? 'white' : 'rgba(255,255,255,0.5)',
                }}
              >
                {svc.label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-white/80">Special requests</label>
        <textarea
          value={value.specialRequests ?? ''}
          onChange={(e) => onChange({ specialRequests: e.target.value })}
          rows={3}
          placeholder="Specific songs, themes, setup requirements..."
          className="w-full resize-none rounded-lg border px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-(--cv-brand)"
          style={{ background: 'var(--cv-elevated)', borderColor: 'var(--cv-border)' }}
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button onClick={onBack} className="flex-1 rounded-xl border py-3 text-sm font-medium text-white/50 hover:text-white" style={{ borderColor: 'var(--cv-border)' }}>← Back</button>
        <button onClick={onNext} disabled={!value.venue} className="flex-1 rounded-xl py-3 text-sm font-semibold text-white disabled:opacity-30" style={{ background: 'var(--cv-brand)' }}>Continue →</button>
      </div>
    </div>
  );
}
