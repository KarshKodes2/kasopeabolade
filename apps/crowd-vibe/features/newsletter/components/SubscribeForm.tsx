'use client';

import { useState } from 'react';

interface Props {
  tenantId: string;
  tenantName: string;
}

export function SubscribeForm({ tenantId, tenantName }: Props) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, tenantId }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-6">
        <p className="text-2xl mb-2">🎉</p>
        <p className="font-semibold text-white">You're in!</p>
        <p className="text-sm text-white/40 mt-1">You'll be the first to know about {tenantName}'s upcoming events and drops.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="flex-1 rounded-xl border px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[var(--cv-brand)]"
        style={{ background: 'var(--cv-elevated)', borderColor: 'var(--cv-border)' }}
      />
      <input
        type="email"
        required
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 rounded-xl border px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[var(--cv-brand)]"
        style={{ background: 'var(--cv-elevated)', borderColor: 'var(--cv-border)' }}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="shrink-0 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-40"
        style={{ background: 'var(--cv-brand)' }}
      >
        {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
      </button>
      {status === 'error' && (
        <p className="w-full text-xs text-red-400">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
