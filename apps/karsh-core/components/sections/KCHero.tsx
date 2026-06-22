'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';

const stagger: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } };
const fadeUp: Variants = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: 'tween', ease: 'easeOut' } } };

const pillars = [
  '8+ years shipping production code',
  'SaaS, fintech, and mobile specialists',
  'AI-augmented engineering workflows',
];

export function KCHero() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(145deg, #0f1729 0%, #1a2444 60%, #0f1729 100%)',
        paddingTop: '80px',
      }}
    >
      {/* Grid bg */}
      <div
        style={{
          position: 'absolute', inset: 0, opacity: 0.05,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }}
      />
      {/* Glow orbs */}
      <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.18), transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-100px', right: '-80px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,158,11,0.12), transparent 70%)', pointerEvents: 'none' }} />

      <div className="kc-container" style={{ position: 'relative', zIndex: 1, paddingTop: '40px', paddingBottom: '80px' }}>
        <motion.div variants={stagger} initial="hidden" animate="visible" style={{ maxWidth: '780px' }}>
          <motion.div variants={fadeUp}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 16px',
                borderRadius: '100px',
                background: 'rgba(37,99,235,0.18)',
                border: '1px solid rgba(37,99,235,0.35)',
                color: '#60a5fa',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '24px',
              }}
            >
              Karsh Core Solutions
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 900, lineHeight: 1.05, color: '#fff', marginBottom: '24px' }}
          >
            Engineering excellence<br />
            <span style={{ background: 'linear-gradient(135deg, #2563EB, #F59E0B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              for the digital age.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            style={{ fontSize: '1.1rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.55)', maxWidth: '560px', marginBottom: '32px' }}
          >
            We build world-class SaaS platforms, fintech systems, and AI-powered products
            that scale from MVP to enterprise. Based in Lagos. Working globally.
          </motion.p>

          <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '36px' }}>
            {pillars.map((p) => (
              <div key={p} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'rgba(255,255,255,0.65)' }}>
                <CheckCircle size={15} style={{ color: '#2563EB', flexShrink: 0 }} />
                {p}
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/contact" className="kc-btn-primary" style={{ padding: '14px 32px', fontSize: '15px' }}>
              Start a project <ArrowRight size={16} />
            </Link>
            <Link href="/services" className="kc-btn-secondary"
              style={{ padding: '14px 32px', fontSize: '15px', borderColor: 'rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.7)' }}
            >
              Our services
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
