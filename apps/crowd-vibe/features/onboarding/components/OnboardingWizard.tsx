'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const STEPS = ['Your Identity', 'Brand Colors', 'Your Story', 'Launch'];

interface FormData {
  name: string;
  slug: string;
  bio: string;
  location: string;
  brandColor: string;
  accentColor: string;
}

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// ─── Step 1: Identity ─────────────────────────────────────────────────────────

function IdentityStep({ value, onChange }: { value: Partial<FormData>; onChange: (v: Partial<FormData>) => void }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-black text-white">What's your artist name?</h2>
        <p className="mt-1 text-sm text-white/40">This appears on your public booking site.</p>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-white/70">Artist / Stage name *</label>
        <input
          value={value.name ?? ''}
          onChange={(e) => onChange({ name: e.target.value, slug: slugify(e.target.value) })}
          placeholder="DJ Karsh"
          className="w-full rounded-xl border px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[var(--cv-brand)] text-lg font-medium"
          style={{ background: 'var(--cv-elevated)', borderColor: 'var(--cv-border)' }}
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-white/70">Your URL *</label>
        <div className="flex items-center gap-0 overflow-hidden rounded-xl border" style={{ background: 'var(--cv-elevated)', borderColor: 'var(--cv-border)' }}>
          <span className="shrink-0 px-3 py-3 text-sm text-white/30">crowdvibe.io/site/</span>
          <input
            value={value.slug ?? ''}
            onChange={(e) => onChange({ slug: slugify(e.target.value) })}
            placeholder="dj-karsh"
            className="flex-1 bg-transparent py-3 pr-4 text-sm text-white placeholder:text-white/20 focus:outline-none"
          />
        </div>
        {value.slug && (
          <p className="mt-1.5 text-xs text-white/30">Your site: crowdvibe.io/site/{value.slug}</p>
        )}
      </div>
    </div>
  );
}

// ─── Step 2: Brand ────────────────────────────────────────────────────────────

function BrandStep({ value, onChange }: { value: Partial<FormData>; onChange: (v: Partial<FormData>) => void }) {
  const PRESETS = [
    { brand: '#7C3AED', accent: '#F59E0B', label: 'Purple & Gold' },
    { brand: '#EC4899', accent: '#06B6D4', label: 'Pink & Cyan' },
    { brand: '#EF4444', accent: '#F97316', label: 'Red & Orange' },
    { brand: '#10B981', accent: '#3B82F6', label: 'Green & Blue' },
    { brand: '#6366F1', accent: '#A855F7', label: 'Indigo & Violet' },
    { brand: '#F59E0B', accent: '#EF4444', label: 'Gold & Red' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-white">Choose your brand colors</h2>
        <p className="mt-1 text-sm text-white/40">These power the look of your entire booking site.</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {PRESETS.map((p) => {
          const active = value.brandColor === p.brand;
          return (
            <button
              key={p.brand}
              onClick={() => onChange({ brandColor: p.brand, accentColor: p.accent })}
              className="flex flex-col items-center gap-2 rounded-xl border p-3 transition-all"
              style={{
                background: active ? 'rgba(255,255,255,0.06)' : 'var(--cv-elevated)',
                borderColor: active ? p.brand : 'var(--cv-border)',
              }}
            >
              <div className="flex gap-1.5">
                <div className="h-6 w-6 rounded-full" style={{ background: p.brand }} />
                <div className="h-6 w-6 rounded-full" style={{ background: p.accent }} />
              </div>
              <span className="text-xs text-white/50">{p.label}</span>
            </button>
          );
        })}
      </div>

      <div className="flex gap-4">
        {[
          { key: 'brandColor' as const, label: 'Primary' },
          { key: 'accentColor' as const, label: 'Accent' },
        ].map(({ key, label }) => (
          <div key={key} className="flex-1">
            <label className="mb-1.5 block text-xs font-medium text-white/50">{label} (custom)</label>
            <div className="flex items-center gap-2 rounded-xl border px-3 py-2" style={{ background: 'var(--cv-elevated)', borderColor: 'var(--cv-border)' }}>
              <input type="color" value={value[key] ?? '#7C3AED'} onChange={(e) => onChange({ [key]: e.target.value })}
                className="h-6 w-6 cursor-pointer rounded border-0 bg-transparent p-0" />
              <span className="text-xs text-white/40 font-mono">{value[key]}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Live preview strip */}
      <div className="overflow-hidden rounded-xl border" style={{ borderColor: 'var(--cv-border)' }}>
        <div className="p-4 text-center text-sm text-white/40" style={{ background: '#0B0B0B' }}>
          Preview
        </div>
        <div className="flex items-center justify-between px-5 py-4" style={{ background: 'var(--cv-surface)' }}>
          <span className="font-bold text-white">{value.name ?? 'Your Name'}</span>
          <div className="rounded-lg px-4 py-1.5 text-sm font-semibold text-white" style={{ background: value.brandColor ?? '#7C3AED' }}>
            Book Me
          </div>
        </div>
        <div className="h-1 w-full" style={{ background: `linear-gradient(to right, ${value.brandColor ?? '#7C3AED'}, ${value.accentColor ?? '#F59E0B'})` }} />
      </div>
    </div>
  );
}

// ─── Step 3: Story ────────────────────────────────────────────────────────────

function StoryStep({ value, onChange }: { value: Partial<FormData>; onChange: (v: Partial<FormData>) => void }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-black text-white">Tell your story</h2>
        <p className="mt-1 text-sm text-white/40">This appears on your public site and press kit.</p>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-white/70">Bio</label>
        <textarea
          rows={5}
          value={value.bio ?? ''}
          onChange={(e) => onChange({ bio: e.target.value })}
          placeholder="Nigeria's premier Afrobeats DJ. Performing across Lagos, Abuja, and beyond — from intimate lounges to 10,000-seat festivals..."
          className="w-full resize-none rounded-xl border px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[var(--cv-brand)]"
          style={{ background: 'var(--cv-elevated)', borderColor: 'var(--cv-border)' }}
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-white/70">Based in</label>
        <input
          value={value.location ?? ''}
          onChange={(e) => onChange({ location: e.target.value })}
          placeholder="Lagos, Nigeria"
          className="w-full rounded-xl border px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[var(--cv-brand)]"
          style={{ background: 'var(--cv-elevated)', borderColor: 'var(--cv-border)' }}
        />
      </div>
    </div>
  );
}

// ─── Step 4: Launch ───────────────────────────────────────────────────────────

function LaunchStep({ value }: { value: Partial<FormData> }) {
  return (
    <div className="space-y-6 text-center">
      <div className="text-6xl">🚀</div>
      <div>
        <h2 className="text-2xl font-black text-white">You're ready to launch!</h2>
        <p className="mt-2 text-white/40">Here's what gets created when you hit Launch:</p>
      </div>
      <div className="space-y-3 text-left">
        {[
          { icon: '🌐', text: `Your site at crowdvibe.io/site/${value.slug}` },
          { icon: '📅', text: 'A live booking wizard clients can use right now' },
          { icon: '🎵', text: 'A media hub for your mixes and photos' },
          { icon: '📄', text: `A press kit at crowdvibe.io/site/${value.slug}/press` },
          { icon: '📊', text: 'A dashboard to manage bookings and revenue' },
        ].map((item) => (
          <div key={item.text} className="flex items-start gap-3 rounded-xl border px-4 py-3" style={{ background: 'var(--cv-elevated)', borderColor: 'var(--cv-border)' }}>
            <span className="text-lg">{item.icon}</span>
            <span className="text-sm text-white/70">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Wizard ──────────────────────────────────────────────────────────────

export function OnboardingWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Partial<FormData>>({
    brandColor: '#7C3AED',
    accentColor: '#F59E0B',
  });
  const [error, setError] = useState('');
  const [launching, setLaunching] = useState(false);

  function update(patch: Partial<FormData>) {
    setForm((f) => ({ ...f, ...patch }));
  }

  function canProceed() {
    if (step === 0) return !!(form.name?.trim() && form.slug?.trim());
    if (step === 1) return !!(form.brandColor && form.accentColor);
    return true;
  }

  async function handleLaunch() {
    setLaunching(true);
    setError('');
    try {
      const res = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Something went wrong.');
        return;
      }
      router.push('/dashboard');
      router.refresh();
    } finally {
      setLaunching(false);
    }
  }

  const stepComponents = [
    <IdentityStep key="identity" value={form} onChange={update} />,
    <BrandStep key="brand" value={form} onChange={update} />,
    <StoryStep key="story" value={form} onChange={update} />,
    <LaunchStep key="launch" value={form} />,
  ];

  return (
    <div className="w-full max-w-lg">
      {/* Progress */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-xs text-white/30">
          <span>Step {step + 1} of {STEPS.length}</span>
          <span>{STEPS[step]}</span>
        </div>
        <div className="h-1 rounded-full" style={{ background: 'var(--cv-border)' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%`, background: 'var(--cv-brand)' }}
          />
        </div>
      </div>

      {/* Step card */}
      <div className="rounded-2xl border p-6 sm:p-8" style={{ background: 'var(--cv-surface)', borderColor: 'var(--cv-border)' }}>
        {stepComponents[step]}

        {error && (
          <p className="mt-4 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
            {error}
          </p>
        )}

        <div className="mt-8 flex gap-3">
          {step > 0 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="flex-1 rounded-xl border py-3 text-sm font-medium text-white/40 hover:text-white transition-colors"
              style={{ borderColor: 'var(--cv-border)' }}
            >
              ← Back
            </button>
          )}
          {step < STEPS.length - 1 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canProceed()}
              className="flex-1 rounded-xl py-3 text-sm font-semibold text-white disabled:opacity-30 transition-all hover:opacity-90"
              style={{ background: 'var(--cv-brand)' }}
            >
              Continue →
            </button>
          ) : (
            <button
              onClick={handleLaunch}
              disabled={launching}
              className="flex-1 rounded-xl py-3 text-sm font-bold text-white disabled:opacity-50 transition-all hover:opacity-90"
              style={{ background: 'var(--cv-brand)' }}
            >
              {launching ? 'Launching...' : '🚀 Launch my site'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
