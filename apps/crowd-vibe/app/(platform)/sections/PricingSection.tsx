'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '₦0',
    period: 'forever',
    desc: 'Get started, no card required',
    highlight: false,
    cta: 'Get started free',
    features: [
      'Full booking wizard',
      'Public site on crowdvibe.io subdomain',
      '5 media uploads',
      'Email booking notifications',
      'Basic analytics',
    ],
    missing: [
      'Custom domain',
      'Unlimited media',
      'Google Calendar sync',
      'PDF invoices',
      'Priority support',
    ],
  },
  {
    name: 'Pro',
    price: '₦15,000',
    period: '/month',
    desc: 'For growing creators & businesses',
    highlight: true,
    cta: 'Start Pro free for 14 days',
    features: [
      'Everything in Free',
      'Custom domain (yourname.com)',
      'Unlimited media uploads',
      'Google Calendar sync',
      'PDF invoices auto-sent',
      'Priority support',
      'Remove CrowdVibe branding',
    ],
    missing: [],
  },
];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.16 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, type: 'tween', ease: 'easeOut' } },
};

export function PricingSection() {
  return (
    <section className="px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, type: 'tween', ease: 'easeOut' }}
        className="mb-14 text-center"
      >
        <span
          className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold tracking-widest uppercase"
          style={{ background: 'rgba(124,58,237,0.12)', color: 'var(--cv-brand)', border: '1px solid rgba(124,58,237,0.25)' }}
        >
          Pricing
        </span>
        <h2 className="mt-4 text-3xl font-black text-white md:text-4xl">
          Simple, transparent pricing
        </h2>
        <p className="mt-3 text-base" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Start free. Upgrade when your business grows.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2"
      >
        {plans.map((plan) => (
          <motion.div
            key={plan.name}
            variants={item}
            className="relative flex flex-col rounded-2xl border p-7"
            style={{
              background: plan.highlight
                ? 'linear-gradient(145deg, rgba(124,58,237,0.14), rgba(245,158,11,0.05))'
                : 'var(--cv-surface)',
              borderColor: plan.highlight ? 'var(--cv-brand)' : 'var(--cv-border)',
            }}
          >
            {plan.highlight && (
              <span
                className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold text-white"
                style={{ background: 'var(--cv-brand)' }}
              >
                Most popular
              </span>
            )}

            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.35)' }}>
                {plan.desc}
              </p>
              <p className="mt-1 text-xl font-black text-white">{plan.name}</p>
              <div className="mt-3 flex items-end gap-1.5">
                <span className="text-4xl font-black text-white">{plan.price}</span>
                <span className="mb-1 text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>{plan.period}</span>
              </div>
            </div>

            <ul className="mb-7 flex-1 space-y-3">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  <Check size={14} style={{ color: '#10B981', flexShrink: 0, marginTop: '2px' }} />
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href="/auth/signup"
              className="block rounded-xl py-3 text-center text-sm font-bold text-white transition-all hover:opacity-90"
              style={{
                background: plan.highlight ? 'var(--cv-brand)' : 'var(--cv-elevated)',
                border: plan.highlight ? 'none' : '1px solid var(--cv-border)',
                boxShadow: plan.highlight ? '0 0 24px rgba(124,58,237,0.35)' : 'none',
              }}
            >
              {plan.cta}
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Trust note */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-10 text-center text-sm"
        style={{ color: 'rgba(255,255,255,0.25)' }}
      >
        No contracts. Cancel anytime. Stripe & Paystack secured.
      </motion.p>
    </section>
  );
}
