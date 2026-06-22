'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { PERSONAL } from '@/lib/data';

const letters = PERSONAL.name.split('');

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.2 } },
};

const letterVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay },
  }),
};

export function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 24px 80px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle radial glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--glow) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', maxWidth: 760 }}>
        {/* Status badge */}
        {PERSONAL.openToWork && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 14px',
              borderRadius: 100,
              border: '1px solid rgba(74, 222, 128, 0.3)',
              background: 'rgba(74, 222, 128, 0.08)',
              marginBottom: 28,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#4ade80',
                animation: 'pulse 2s infinite',
                display: 'block',
              }}
            />
            <span style={{ fontSize: 13, color: '#4ade80', fontWeight: 500 }}>
              Open to work
            </span>
          </motion.div>
        )}

        {/* Name */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            fontFamily: 'var(--font-dm-serif)',
            fontSize: 'clamp(48px, 8vw, 88px)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: 'var(--text-primary)',
            marginBottom: 20,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0 4px',
          }}
        >
          {letters.map((letter, i) =>
            letter === ' ' ? (
              <span key={i} style={{ width: '0.35em' }} />
            ) : (
              <motion.span key={i} variants={letterVariants}>
                {letter}
              </motion.span>
            ),
          )}
        </motion.h1>

        {/* Title */}
        <motion.p
          custom={0.6}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{
            fontSize: 'clamp(16px, 3vw, 22px)',
            color: 'var(--accent)',
            fontWeight: 500,
            marginBottom: 20,
            letterSpacing: '-0.01em',
          }}
        >
          {PERSONAL.title}
        </motion.p>

        {/* Tagline */}
        <motion.p
          custom={0.75}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{
            fontSize: 'clamp(15px, 2.5vw, 19px)',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            maxWidth: 520,
            margin: '0 auto 40px',
          }}
        >
          {PERSONAL.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={0.9}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <a
            href="/#projects"
            style={{
              padding: '12px 28px',
              borderRadius: 10,
              background: 'var(--accent)',
              color: '#fff',
              fontSize: 15,
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'opacity 150ms ease',
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = '0.85')}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = '1')}
          >
            View projects
          </a>

          <a
            href={PERSONAL.cvUrl}
            download
            style={{
              padding: '12px 28px',
              borderRadius: 10,
              background: 'var(--surface)',
              color: 'var(--text-primary)',
              fontSize: 15,
              fontWeight: 600,
              textDecoration: 'none',
              border: '1px solid var(--border)',
              transition: 'border-color 150ms ease, background 150ms ease',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.borderColor = 'var(--accent)';
              (e.target as HTMLElement).style.background = 'var(--surface-hover)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.borderColor = 'var(--border)';
              (e.target as HTMLElement).style.background = 'var(--surface)';
            }}
          >
            Download CV
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          style={{
            position: 'absolute',
            bottom: -80,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span style={{ fontSize: 12, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
            SCROLL
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            style={{ color: 'var(--text-muted)', fontSize: 16 }}
          >
            ↓
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}
