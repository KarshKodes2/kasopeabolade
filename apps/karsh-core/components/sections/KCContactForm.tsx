'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';

type Status = 'idle' | 'loading' | 'success' | 'error';

const PROJECT_TYPES = [
  { value: 'saas', label: 'SaaS Development' },
  { value: 'fintech', label: 'Fintech Engineering' },
  { value: 'mobile', label: 'Mobile App' },
  { value: 'ai', label: 'AI Integration' },
  { value: 'devops', label: 'Cloud & DevOps' },
  { value: 'consulting', label: 'Technical Consulting' },
  { value: 'other', label: 'Something else' },
];

const BUDGETS = ['< ₦500k', '₦500k – ₦2M', '₦2M – ₦10M', '> ₦10M', 'Let\'s discuss'];

export function KCContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({ contactName: '', email: '', companyName: '', phone: '', projectType: '', budget: '', message: '' });

  function set(k: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, type: 'tween', ease: 'easeOut' }}
        style={{ textAlign: 'center', padding: '64px 32px', background: 'var(--kc-bg-2)', borderRadius: '16px', border: '1px solid var(--kc-border)' }}
      >
        <CheckCircle size={48} style={{ color: '#10B981', margin: '0 auto 20px' }} />
        <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--kc-text)', marginBottom: '10px' }}>Message received</h3>
        <p style={{ fontSize: '15px', color: 'var(--kc-text-2)', lineHeight: 1.7 }}>
          We&rsquo;ll review your project and get back to you within 24 hours.
        </p>
      </motion.div>
    );
  }

  const fieldStyle: React.CSSProperties = { marginBottom: '20px' };
  const labelStyle: React.CSSProperties = { display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--kc-text)', marginBottom: '6px' };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <div>
          <label style={labelStyle}>Name *</label>
          <input required className="kc-input" placeholder="Your full name" value={form.contactName} onChange={set('contactName')} />
        </div>
        <div>
          <label style={labelStyle}>Email *</label>
          <input required type="email" className="kc-input" placeholder="you@company.com" value={form.email} onChange={set('email')} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <div>
          <label style={labelStyle}>Company (optional)</label>
          <input className="kc-input" placeholder="Your company" value={form.companyName} onChange={set('companyName')} />
        </div>
        <div>
          <label style={labelStyle}>Phone (optional)</label>
          <input type="tel" className="kc-input" placeholder="+234 800 000 0000" value={form.phone} onChange={set('phone')} />
        </div>
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>Project type *</label>
        <select required className="kc-input" value={form.projectType} onChange={set('projectType')} style={{ cursor: 'pointer' }}>
          <option value="">Select a service...</option>
          {PROJECT_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>Budget range (optional)</label>
        <select className="kc-input" value={form.budget} onChange={set('budget')} style={{ cursor: 'pointer' }}>
          <option value="">Select a budget...</option>
          {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>Tell us about the project *</label>
        <textarea
          required
          className="kc-input"
          placeholder="What are you building? What's the timeline? Any technical constraints we should know about?"
          rows={5}
          value={form.message}
          onChange={set('message')}
          style={{ resize: 'vertical' }}
        />
      </div>

      {status === 'error' && (
        <p style={{ fontSize: '13px', color: '#EF4444', marginBottom: '16px' }}>Something went wrong. Please try again or email us directly.</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="kc-btn-primary"
        style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '15px', opacity: status === 'loading' ? 0.7 : 1 }}
      >
        {status === 'loading' ? (
          <>
            <span style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.35)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'kc-spin 0.6s linear infinite' }} />
            Sending...
          </>
        ) : (
          <>Send message <ArrowRight size={16} /></>
        )}
      </button>
    </form>
  );
}
