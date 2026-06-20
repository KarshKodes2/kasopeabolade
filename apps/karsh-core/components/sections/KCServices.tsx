'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const services = [
  { emoji: '🚀', title: 'SaaS Development', desc: 'End-to-end SaaS platforms built with Next.js, TypeScript, and Prisma. Multi-tenant architecture, auth, payments, and billing from day one.', color: '#2563EB' },
  { emoji: '💳', title: 'Fintech Engineering', desc: 'Wallet infrastructure, payment integrations (Paystack, Stripe, Flutterwave), KYC systems, and regulatory-compliant financial products.', color: '#F59E0B' },
  { emoji: '📱', title: 'Mobile Applications', desc: 'Cross-platform apps with React Native and Flutter. Native performance, offline-first design, and deep platform integrations.', color: '#10B981' },
  { emoji: '🤖', title: 'AI Integration', desc: 'LLM-powered features, agent orchestration, semantic search, and automation pipelines that multiply your team\'s output.', color: '#8B5CF6' },
  { emoji: '☁️', title: 'Cloud & DevOps', desc: 'AWS, Vercel, Railway, Docker, CI/CD pipelines. Production-grade infrastructure that scales without drama.', color: '#3B82F6' },
  { emoji: '🔍', title: 'Technical Consulting', desc: 'Architecture reviews, team augmentation, code audits, and strategic technical leadership for critical decisions.', color: '#EC4899' },
];

const container: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const item: Variants = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, type: 'tween', ease: 'easeOut' } } };

export function KCServices() {
  return (
    <section className="kc-section" style={{ background: 'var(--kc-bg-2)', borderTop: '1px solid var(--kc-border)', borderBottom: '1px solid var(--kc-border)' }}>
      <div className="kc-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: 'tween', ease: 'easeOut' }}
          style={{ marginBottom: '56px', maxWidth: '520px' }}
        >
          <span className="kc-label">What we build</span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, color: 'var(--kc-text)', lineHeight: 1.15, marginBottom: '12px' }}>
            Services
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--kc-text-2)', lineHeight: 1.7 }}>
            From MVP to enterprise. We build the products behind the products.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}
        >
          {services.map((s) => (
            <motion.div key={s.title} variants={item} className="kc-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `${s.color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 }}>
                  {s.emoji}
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--kc-text)' }}>{s.title}</h3>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--kc-text-2)', lineHeight: 1.7 }}>{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5, type: 'tween', ease: 'easeOut' }}
          style={{ marginTop: '40px', textAlign: 'center' }}
        >
          <Link href="/services" className="kc-btn-secondary">
            View all services <ArrowRight size={15} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
