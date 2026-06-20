'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const pillars = [
  {
    id: 'PERSONAL',
    emoji: '🎧',
    label: 'Personal',
    desc: 'DJs, musicians, artists — a site that matches your energy.',
    color: '#7C3AED',
    glow: 'rgba(124,58,237,0.3)',
  },
  {
    id: 'PORTFOLIO',
    emoji: '💼',
    label: 'Portfolio',
    desc: 'Professionals showcasing work, skills, and experience.',
    color: '#F59E0B',
    glow: 'rgba(245,158,11,0.3)',
  },
  {
    id: 'CORPORATE',
    emoji: '🏢',
    label: 'Corporate',
    desc: 'Businesses and agencies with a polished brand presence.',
    color: '#3B82F6',
    glow: 'rgba(59,130,246,0.3)',
  },
];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.6 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: 'tween', ease: 'easeOut' } },
};

const pillarVariant: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, type: 'tween', ease: 'easeOut' } },
};

export function PlatformHero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16 text-center">
      {/* Background radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(124,58,237,0.22), transparent 70%)' }}
      />
      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'linear-gradient(var(--cv-border) 1px, transparent 1px), linear-gradient(90deg, var(--cv-border) 1px, transparent 1px)', backgroundSize: '64px 64px' }}
      />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48" style={{ background: 'linear-gradient(to top, var(--cv-bg), transparent)' }} />

      <div className="relative z-10 max-w-5xl w-full">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, type: 'tween', ease: 'easeOut' }}
          className="mb-7 inline-flex items-center gap-2"
        >
          <span
            className="rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase inline-flex items-center gap-2"
            style={{ background: 'rgba(124,58,237,0.12)', color: 'var(--cv-brand)', border: '1px solid rgba(124,58,237,0.28)' }}
          >
            <Sparkles size={11} />
            Your digital presence, your way
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.25, type: 'tween', ease: 'easeOut' }}
          className="mb-6 font-black leading-[1.05] tracking-tight"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}
        >
          <span className="block text-white">Your digital presence,</span>
          <span className="block text-gradient">all in one place.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, type: 'tween', ease: 'easeOut' }}
          className="mx-auto mb-10 max-w-2xl text-base leading-relaxed sm:text-lg"
          style={{ color: 'rgba(255,255,255,0.5)' }}
        >
          Build your personal brand, showcase your portfolio, or launch your company site.
          CrowdVibe gives every creator and business a powerful, fully-branded web presence
          — with bookings, payments, and custom domains built in.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.55, type: 'tween', ease: 'easeOut' }}
          className="mb-16 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center"
        >
          <Link
            href="/auth/signup"
            className="inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-base font-bold text-white transition-opacity hover:opacity-90 glow-brand"
            style={{ background: 'var(--cv-brand)' }}
          >
            Start free — no card required
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/site/dj-karsh"
            className="rounded-xl border px-8 py-4 text-base font-medium transition-all hover:border-white/25 hover:text-white"
            style={{ borderColor: 'var(--cv-border)', color: 'rgba(255,255,255,0.5)' }}
          >
            See a live demo
          </Link>
        </motion.div>

        {/* Site type pillars */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid gap-4 sm:grid-cols-3"
        >
          {pillars.map((p) => (
            <motion.div
              key={p.id}
              variants={pillarVariant}
              whileHover={{ y: -4, transition: { duration: 0.2, type: 'tween' } }}
              className="group relative rounded-2xl border p-6 text-left cursor-pointer"
              style={{ background: 'var(--cv-surface)', borderColor: 'var(--cv-border)' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = p.color;
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 24px ${p.glow}`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--cv-border)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              <div
                className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl text-xl"
                style={{ background: `${p.color}18` }}
              >
                {p.emoji}
              </div>
              <p className="mb-1.5 font-bold text-white">{p.label}</p>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                {p.desc}
              </p>
              <div
                className="absolute bottom-0 left-0 right-0 h-px rounded-b-2xl"
                style={{ background: `linear-gradient(90deg, transparent, ${p.color}, transparent)`, opacity: 0 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 flex flex-col items-center gap-2"
        style={{ color: 'rgba(255,255,255,0.2)' }}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          className="h-8 w-px"
          style={{ background: 'var(--cv-brand)' }}
        />
      </motion.div>
    </section>
  );
}
