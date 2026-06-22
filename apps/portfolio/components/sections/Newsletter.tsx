'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation, fadeUp } from '@/hooks/useScrollAnimation';

export function Newsletter() {
  const { ref, isInView } = useScrollAnimation();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage('You\'re in. Thanks for subscribing!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error ?? 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  return (
    <section
      ref={ref}
      style={{
        padding: '80px 24px',
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        style={{ maxWidth: 540, margin: '0 auto', textAlign: 'center' }}
      >
        <p
          style={{
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: '0.12em',
            color: 'var(--accent)',
            textTransform: 'uppercase',
            marginBottom: 16,
          }}
        >
          Newsletter
        </p>

        <h2
          style={{
            fontFamily: 'var(--font-dm-serif)',
            fontSize: 'clamp(28px, 4vw, 40px)',
            color: 'var(--text-primary)',
            marginBottom: 12,
            lineHeight: 1.15,
          }}
        >
          Stay in the loop.
        </h2>

        <p
          style={{
            fontSize: 15,
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            marginBottom: 32,
          }}
        >
          Occasional emails on what I&apos;m building, lessons learned shipping SaaS, and tools I
          actually use.
        </p>

        {status === 'success' ? (
          <motion.p
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              padding: '14px 20px',
              borderRadius: 10,
              background: 'rgba(74, 222, 128, 0.1)',
              border: '1px solid rgba(74, 222, 128, 0.3)',
              color: '#4ade80',
              fontSize: 15,
              fontWeight: 500,
            }}
          >
            ✓ {message}
          </motion.p>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              style={{
                flex: 1,
                minWidth: 200,
                padding: '12px 16px',
                borderRadius: 10,
                border: '1px solid var(--border)',
                background: 'var(--surface)',
                color: 'var(--text-primary)',
                fontSize: 15,
                outline: 'none',
              }}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              style={{
                padding: '12px 24px',
                borderRadius: 10,
                background: 'var(--accent)',
                color: '#fff',
                border: 'none',
                fontSize: 15,
                fontWeight: 600,
                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                opacity: status === 'loading' ? 0.7 : 1,
                transition: 'opacity 150ms',
              }}
            >
              {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p style={{ marginTop: 12, color: '#f87171', fontSize: 14 }}>{message}</p>
        )}

        <p style={{ marginTop: 16, fontSize: 12, color: 'var(--text-muted)' }}>
          No spam. Unsubscribe any time.
        </p>
      </motion.div>
    </section>
  );
}
