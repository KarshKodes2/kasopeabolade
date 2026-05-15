'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  name: string;
  bio?: string | null;
  location?: string | null;
  heroImageUrl?: string | null;
  slug: string;
}

export function HeroSection({ name, bio, location, heroImageUrl, slug }: HeroSectionProps) {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20 text-center">
      {/* Background image */}
      {heroImageUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImageUrl})` }}
        >
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(11,11,11,0.7) 0%, rgba(11,11,11,0.9) 100%)' }} />
        </div>
      )}

      {/* Radial glow */}
      <div
        className="absolute inset-0 opacity-30"
        style={{ background: 'radial-gradient(ellipse 70% 40% at 50% 60%, var(--cv-brand), transparent)' }}
      />

      <div className="relative z-10 max-w-4xl">
        {location && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-4 text-sm tracking-[0.2em] uppercase text-white/40"
          >
            {location}
          </motion.p>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mb-6 text-6xl font-black leading-none tracking-tight md:text-8xl"
        >
          {name.split('').map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.04 }}
              className="inline-block text-white"
            >
              {char === ' ' ? ' ' : char}
            </motion.span>
          ))}
        </motion.h1>

        {bio && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-white/60"
          >
            {bio}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Link
            href={`/site/${slug}/book`}
            className="rounded-xl px-8 py-4 text-base font-semibold text-white transition-all hover:opacity-90 glow-brand animate-pulse-glow"
            style={{ background: 'var(--cv-brand)' }}
          >
            Book Me →
          </Link>
          <a
            href="#mixes"
            className="rounded-xl border border-white/15 px-8 py-4 text-base font-medium text-white/70 transition-all hover:border-white/40 hover:text-white"
          >
            Listen to my mixes
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 flex flex-col items-center gap-2 text-white/20"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="h-8 w-px animate-bounce" style={{ background: 'var(--cv-brand)' }} />
      </motion.div>
    </section>
  );
}
