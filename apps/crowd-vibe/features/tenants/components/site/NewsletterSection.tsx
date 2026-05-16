'use client';

import { useState } from 'react';

interface Props {
  slug: string;
  artistName: string;
}

export function NewsletterSection({ slug, artistName }: Props) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setState('loading');
    setError('');

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, slug }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? 'Something went wrong');
      }
      setState('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to subscribe');
      setState('error');
    }
  }

  return (
    <section className="px-6 py-20" style={{ background: 'var(--cv-surface)' }}>
      <div className="mx-auto max-w-xl text-center">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/30">Stay Connected</p>
        <h2 className="mb-3 text-3xl font-black text-white">
          Join the {artistName} Crowd
        </h2>
        <p className="mb-8 text-sm text-white/50">
          Get first access to new mixes, event announcements, and exclusive offers.
        </p>

        {state === 'success' ? (
          <div className="rounded-2xl border px-8 py-10" style={{ borderColor: 'var(--cv-border)' }}>
            <p className="text-3xl mb-3">🎉</p>
            <p className="font-semibold text-white">You're in!</p>
            <p className="mt-1 text-sm text-white/40">Watch your inbox for updates from {artistName}.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Your name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-white/30 transition-colors"
              style={{ background: 'var(--cv-elevated)', borderColor: 'var(--cv-border)' }}
            />
            <div className="flex gap-2">
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-xl border px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-white/30 transition-colors"
                style={{ background: 'var(--cv-elevated)', borderColor: 'var(--cv-border)' }}
              />
              <button
                type="submit"
                disabled={state === 'loading'}
                className="rounded-xl px-6 py-3 text-sm font-bold text-white transition-all hover:opacity-90 disabled:opacity-50"
                style={{ background: 'var(--cv-brand)' }}
              >
                {state === 'loading' ? '…' : 'Subscribe'}
              </button>
            </div>
            {state === 'error' && (
              <p className="text-xs text-red-400">{error}</p>
            )}
            <p className="text-xs text-white/20">No spam, ever. Unsubscribe anytime.</p>
          </form>
        )}
      </div>
    </section>
  );
}
