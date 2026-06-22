'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Metadata } from 'next';
import { PERSONAL } from '@/lib/data';

const PROJECT_TYPES = [
  'Full-Stack Web Application',
  'SaaS Product',
  'API / Backend',
  'Frontend / UI',
  'Technical Consultation',
  'Other',
];

export default function ContactPage() {
  const [form, setForm] = useState({
    contactName: '',
    email: '',
    companyName: '',
    projectType: '',
    budget: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMsg(data.error ?? 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please try again.');
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: 10,
    border: '1px solid var(--border)',
    background: 'var(--surface)',
    color: 'var(--text-primary)',
    fontSize: 15,
    outline: 'none',
    transition: 'border-color 150ms',
    boxSizing: 'border-box',
  };

  return (
    <div style={{ paddingTop: 96, minHeight: '100vh', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '64px 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
            Contact
          </p>

          <h1
            style={{
              fontFamily: 'var(--font-dm-serif)',
              fontSize: 'clamp(36px, 6vw, 56px)',
              color: 'var(--text-primary)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: 16,
            }}
          >
            Let&apos;s talk.
          </h1>

          <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 48 }}>
            Tell me about your project and I&apos;ll get back to you within 24 hours. Or reach me
            directly at{' '}
            <a href={`mailto:${PERSONAL.email}`} style={{ color: 'var(--accent)' }}>
              {PERSONAL.email}
            </a>
            .
          </p>
        </motion.div>

        {status === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              padding: '32px',
              borderRadius: 16,
              background: 'rgba(74, 222, 128, 0.08)',
              border: '1px solid rgba(74, 222, 128, 0.3)',
              textAlign: 'center',
            }}
          >
            <p style={{ fontSize: 32, marginBottom: 12 }}>✓</p>
            <h2
              style={{
                fontFamily: 'var(--font-dm-serif)',
                fontSize: 24,
                color: '#4ade80',
                marginBottom: 8,
              }}
            >
              Message received!
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
              I&apos;ll get back to you within 24 hours.
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: 16,
              }}
            >
              <div>
                <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8, fontWeight: 500 }}>
                  Name *
                </label>
                <input
                  name="contactName"
                  value={form.contactName}
                  onChange={handleChange}
                  required
                  placeholder="Kasope Abolade"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8, fontWeight: 500 }}>
                  Email *
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  style={inputStyle}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8, fontWeight: 500 }}>
                Company / Organisation
              </label>
              <input
                name="companyName"
                value={form.companyName}
                onChange={handleChange}
                placeholder="Acme Inc."
                style={inputStyle}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8, fontWeight: 500 }}>
                Project type *
              </label>
              <select
                name="projectType"
                value={form.projectType}
                onChange={handleChange}
                required
                style={{ ...inputStyle, cursor: 'pointer' }}
              >
                <option value="" disabled>
                  Select a project type…
                </option>
                {PROJECT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8, fontWeight: 500 }}>
                Budget (optional)
              </label>
              <input
                name="budget"
                value={form.budget}
                onChange={handleChange}
                placeholder="e.g. $5,000 – $15,000"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8, fontWeight: 500 }}>
                Message *
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Tell me about your project, timeline, and what you're looking for…"
                style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
              />
            </div>

            {errorMsg && (
              <p style={{ color: '#f87171', fontSize: 14 }}>{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              style={{
                padding: '14px 28px',
                borderRadius: 10,
                background: 'var(--accent)',
                color: '#fff',
                border: 'none',
                fontSize: 16,
                fontWeight: 600,
                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                opacity: status === 'loading' ? 0.7 : 1,
                transition: 'opacity 150ms',
                alignSelf: 'flex-start',
              }}
            >
              {status === 'loading' ? 'Sending…' : 'Send message →'}
            </button>
          </motion.form>
        )}
      </div>
    </div>
  );
}
