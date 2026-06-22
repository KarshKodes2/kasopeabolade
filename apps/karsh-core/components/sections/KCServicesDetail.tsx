'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';

const services = [
  {
    emoji: '🚀', title: 'SaaS Development', color: '#2563EB',
    description: 'We design and engineer multi-tenant SaaS platforms end-to-end — from database schema through to billing infrastructure. Our stack of choice: Next.js 15, TypeScript, Prisma, and PostgreSQL, deployed on Vercel and Railway.',
    capabilities: [
      'Multi-tenant architecture with row-level isolation',
      'Authentication (OAuth, magic links, passkeys)',
      'Stripe & Paystack billing with subscription management',
      'Admin dashboards with role-based access control',
      'API design (REST + tRPC)',
    ],
  },
  {
    emoji: '💳', title: 'Fintech Engineering', color: '#F59E0B',
    description: 'Financial products that are compliant, secure, and fast. We\'ve built payment infrastructure, digital wallets, and KYC pipelines for West African and global markets.',
    capabilities: [
      'Paystack, Stripe, Flutterwave integrations',
      'Digital wallet and ledger design',
      'KYC/AML compliance flows',
      'Regulatory-aware data architecture',
      'Fraud detection and transaction monitoring',
    ],
  },
  {
    emoji: '📱', title: 'Mobile Applications', color: '#10B981',
    description: 'Cross-platform mobile apps that feel native. We use React Native and Flutter to deliver iOS and Android apps with offline-first architecture and deep device integrations.',
    capabilities: [
      'React Native (Expo + bare workflow)',
      'Flutter for performance-critical apps',
      'Push notifications and background sync',
      'Biometric auth and device security',
      'App Store and Play Store release management',
    ],
  },
  {
    emoji: '🤖', title: 'AI Integration', color: '#8B5CF6',
    description: 'We wire LLMs and agent frameworks into your product so AI becomes a multiplier for your team. From semantic search to autonomous agents, we do it end-to-end.',
    capabilities: [
      'OpenAI, Anthropic, and Gemini integrations',
      'RAG pipelines with vector search (pgvector, Pinecone)',
      'AI agent orchestration (LangChain, Claude Agent SDK)',
      'Fine-tuning and prompt engineering',
      'AI-augmented engineering workflows',
    ],
  },
  {
    emoji: '☁️', title: 'Cloud & DevOps', color: '#3B82F6',
    description: 'Infrastructure that scales without drama. We provision, automate, and monitor cloud environments so you can ship fast without fear of downtime.',
    capabilities: [
      'AWS (EC2, ECS, RDS, S3, CloudFront)',
      'Vercel and Railway for modern web apps',
      'Docker and container orchestration',
      'CI/CD pipelines (GitHub Actions)',
      'Monitoring and alerting (Datadog, Grafana)',
    ],
  },
  {
    emoji: '🔍', title: 'Technical Consulting', color: '#EC4899',
    description: 'Sometimes you need a second opinion — or a first. We advise on architecture decisions, conduct code audits, and provide strategic technical leadership for teams and founders.',
    capabilities: [
      'Architecture design reviews',
      'Code and security audits',
      'Technical due diligence for investors',
      'CTO-as-a-service for early-stage startups',
      'Team augmentation and onboarding',
    ],
  },
];

const container: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const item: Variants = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: 'tween', ease: 'easeOut' } } };

export function KCServicesDetail() {
  return (
    <div style={{ paddingTop: '100px', background: 'var(--kc-bg)' }}>
      {/* Header */}
      <div className="kc-section" style={{ paddingBottom: '60px' }}>
        <div className="kc-container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: 'tween', ease: 'easeOut' }}
            style={{ maxWidth: '580px' }}
          >
            <span className="kc-label">What we do</span>
            <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--kc-text)', lineHeight: 1.1, marginBottom: '16px' }}>
              Services
            </h1>
            <p style={{ fontSize: '16px', color: 'var(--kc-text-2)', lineHeight: 1.75 }}>
              Six core disciplines. One team. We build the technology stack that powers your business — from day one through scale.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Services grid */}
      <div style={{ background: 'var(--kc-bg-2)', borderTop: '1px solid var(--kc-border)', borderBottom: '1px solid var(--kc-border)', padding: '80px 0' }}>
        <div className="kc-container">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}
          >
            {services.map((s) => (
              <motion.div key={s.title} variants={item} className="kc-card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: `${s.color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>
                    {s.emoji}
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--kc-text)' }}>{s.title}</h3>
                </div>
                <p style={{ fontSize: '14px', color: 'var(--kc-text-2)', lineHeight: 1.7, marginBottom: '20px' }}>{s.description}</p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: 'auto' }}>
                  {s.capabilities.map((c) => (
                    <li key={c} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: 'var(--kc-text-2)' }}>
                      <CheckCircle size={13} style={{ color: s.color, marginTop: '2px', flexShrink: 0 }} />
                      {c}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* CTA */}
      <div className="kc-section" style={{ textAlign: 'center' }}>
        <div className="kc-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, type: 'tween', ease: 'easeOut' }}
          >
            <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 900, color: 'var(--kc-text)', marginBottom: '14px' }}>
              Not sure which service fits?
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--kc-text-2)', marginBottom: '28px' }}>
              Tell us about your project and we&rsquo;ll figure it out together.
            </p>
            <Link href="/contact" className="kc-btn-primary" style={{ padding: '14px 32px', fontSize: '15px' }}>
              Start a conversation <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
