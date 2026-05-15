'use client';

import { useState } from 'react';
import type { Tenant } from '@prisma/client';

interface Props {
  tenant: Tenant | null;
}

export function TenantSettingsForm({ tenant }: Props) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: tenant?.name ?? '',
    slug: tenant?.slug ?? '',
    bio: tenant?.bio ?? '',
    location: tenant?.location ?? '',
    brandColor: tenant?.brandColor ?? '#7C3AED',
    accentColor: tenant?.accentColor ?? '#F59E0B',
    instagramUrl: tenant?.instagramUrl ?? '',
    tiktokUrl: tenant?.tiktokUrl ?? '',
    youtubeUrl: tenant?.youtubeUrl ?? '',
    audiomackUrl: tenant?.audiomackUrl ?? '',
    soundcloudUrl: tenant?.soundcloudUrl ?? '',
    spotifyUrl: tenant?.spotifyUrl ?? '',
    customDomain: tenant?.customDomain ?? '',
  });

  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const save = async () => {
    setSaving(true);
    try {
      await fetch('/api/tenants', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  const inputClass = "w-full rounded-lg border px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--cv-brand)]";
  const inputStyle = { background: 'var(--cv-elevated)', borderColor: 'var(--cv-border)' } as React.CSSProperties;
  const labelClass = "mb-1.5 block text-sm font-medium text-white/80";

  return (
    <div className="space-y-8">
      {/* Profile */}
      <section className="rounded-xl border p-5 space-y-4" style={{ background: 'var(--cv-surface)', borderColor: 'var(--cv-border)' }}>
        <h2 className="text-sm font-semibold text-white">Profile</h2>
        <div>
          <label className={labelClass}>Artist / DJ Name</label>
          <input value={form.name} onChange={(e) => update('name', e.target.value)} className={inputClass} style={inputStyle} placeholder="DJ Randy Universe" />
        </div>
        <div>
          <label className={labelClass}>URL Slug</label>
          <div className="flex items-center rounded-lg border overflow-hidden" style={{ borderColor: 'var(--cv-border)' }}>
            <span className="px-3 py-2.5 text-sm text-white/30" style={{ background: 'var(--cv-bg)' }}>crowdvibe.io/site/</span>
            <input value={form.slug} onChange={(e) => update('slug', e.target.value.toLowerCase().replace(/\s+/g, '-'))} className="flex-1 px-4 py-2.5 text-sm text-white focus:outline-none" style={{ background: 'var(--cv-elevated)' }} placeholder="dj-randy" />
          </div>
        </div>
        <div>
          <label className={labelClass}>Bio</label>
          <textarea value={form.bio} onChange={(e) => update('bio', e.target.value)} rows={3} className={inputClass + ' resize-none'} style={inputStyle} placeholder="Short bio shown on your public site..." />
        </div>
        <div>
          <label className={labelClass}>Location</label>
          <input value={form.location} onChange={(e) => update('location', e.target.value)} className={inputClass} style={inputStyle} placeholder="Lagos, Nigeria" />
        </div>
      </section>

      {/* Brand colours */}
      <section className="rounded-xl border p-5 space-y-4" style={{ background: 'var(--cv-surface)', borderColor: 'var(--cv-border)' }}>
        <h2 className="text-sm font-semibold text-white">Brand Colours</h2>
        <div className="grid grid-cols-2 gap-4">
          {[{ key: 'brandColor', label: 'Primary colour' }, { key: 'accentColor', label: 'Accent colour' }].map(({ key, label }) => (
            <div key={key}>
              <label className={labelClass}>{label}</label>
              <div className="flex items-center gap-2">
                <input type="color" value={form[key as keyof typeof form]} onChange={(e) => update(key, e.target.value)} className="h-10 w-16 cursor-pointer rounded-lg border p-1" style={{ borderColor: 'var(--cv-border)', background: 'var(--cv-elevated)' }} />
                <input value={form[key as keyof typeof form]} onChange={(e) => update(key, e.target.value)} className="flex-1 rounded-lg border px-3 py-2 text-sm text-white focus:outline-none" style={{ background: 'var(--cv-elevated)', borderColor: 'var(--cv-border)' }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Social links */}
      <section className="rounded-xl border p-5 space-y-4" style={{ background: 'var(--cv-surface)', borderColor: 'var(--cv-border)' }}>
        <h2 className="text-sm font-semibold text-white">Streaming & Social Links</h2>
        {[
          { key: 'instagramUrl', label: 'Instagram' },
          { key: 'tiktokUrl', label: 'TikTok' },
          { key: 'youtubeUrl', label: 'YouTube' },
          { key: 'audiomackUrl', label: 'Audiomack' },
          { key: 'soundcloudUrl', label: 'SoundCloud' },
          { key: 'spotifyUrl', label: 'Spotify' },
        ].map(({ key, label }) => (
          <div key={key}>
            <label className={labelClass}>{label}</label>
            <input value={form[key as keyof typeof form]} onChange={(e) => update(key, e.target.value)} className={inputClass} style={inputStyle} placeholder={`https://${label.toLowerCase()}.com/yourhandle`} />
          </div>
        ))}
      </section>

      {/* Custom domain */}
      <section className="rounded-xl border p-5 space-y-4" style={{ background: 'var(--cv-surface)', borderColor: 'var(--cv-border)' }}>
        <h2 className="text-sm font-semibold text-white">Custom Domain</h2>
        <p className="text-xs text-white/40">Point your domain's CNAME to <code className="text-white/60">crowd-vibe.vercel.app</code>, then enter it below.</p>
        <input value={form.customDomain} onChange={(e) => update('customDomain', e.target.value)} className={inputClass} style={inputStyle} placeholder="djrandyuniverse.com" />
      </section>

      <button
        onClick={save}
        disabled={saving}
        className="w-full rounded-xl py-3 text-sm font-semibold text-white disabled:opacity-50 transition-all hover:opacity-90"
        style={{ background: 'var(--cv-brand)' }}
      >
        {saving ? 'Saving...' : saved ? '✓ Saved!' : 'Save settings'}
      </button>
    </div>
  );
}
