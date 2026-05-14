'use client';

const EVENT_TYPES = [
  { value: 'WEDDING', label: 'Wedding', icon: '💍' },
  { value: 'CORPORATE', label: 'Corporate Event', icon: '🏢' },
  { value: 'CLUB_NIGHT', label: 'Club Night', icon: '🎉' },
  { value: 'BIRTHDAY', label: 'Birthday Party', icon: '🎂' },
  { value: 'FESTIVAL', label: 'Festival', icon: '🎪' },
  { value: 'CAMPUS_EVENT', label: 'Campus Event', icon: '🎓' },
  { value: 'PRIVATE_PARTY', label: 'Private Party', icon: '🥂' },
  { value: 'FULL_PACKAGE', label: 'Full Package', icon: '⭐' },
];

interface Props {
  value: string;
  onChange: (v: string) => void;
  onNext: () => void;
}

export function EventTypeStep({ value, onChange, onNext }: Props) {
  return (
    <div>
      <h2 className="mb-2 text-xl font-bold text-white">What type of event?</h2>
      <p className="mb-6 text-sm text-white/40">Select the event category that best fits.</p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {EVENT_TYPES.map((et) => (
          <button
            key={et.value}
            onClick={() => onChange(et.value)}
            className="flex flex-col items-center rounded-xl border p-4 text-center transition-all hover:border-[var(--cv-brand)]"
            style={{
              background: value === et.value ? 'rgba(124,58,237,0.15)' : 'var(--cv-elevated)',
              borderColor: value === et.value ? 'var(--cv-brand)' : 'var(--cv-border)',
            }}
          >
            <span className="mb-2 text-2xl">{et.icon}</span>
            <span className="text-xs font-medium text-white/80">{et.label}</span>
          </button>
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={!value}
        className="mt-6 w-full rounded-xl py-3 text-sm font-semibold text-white disabled:opacity-30 transition-all hover:opacity-90"
        style={{ background: 'var(--cv-brand)' }}
      >
        Continue →
      </button>
    </div>
  );
}
