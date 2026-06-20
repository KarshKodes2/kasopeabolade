'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function PlatformCTA() {
  return (
    <section
      className="relative overflow-hidden px-6 py-24 text-center"
      style={{ background: 'var(--cv-surface)', borderTop: '1px solid var(--cv-border)' }}
    >
      {/* Glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(124,58,237,0.12), transparent)' }}
      />
      {/* Accent ring */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ width: '600px', height: '600px', border: '1px solid rgba(124,58,237,0.08)' }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ width: '400px', height: '400px', border: '1px solid rgba(124,58,237,0.12)' }}
      />

      <div className="relative z-10 mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, type: 'tween', ease: 'easeOut' }}
        >
          <h2
            className="mb-5 font-black text-white leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 5vw, 3.5rem)' }}
          >
            Ready to own your<br />
            <span className="text-gradient">digital presence?</span>
          </h2>
          <p className="mb-10 text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Join creators, professionals, and businesses who build their brand on CrowdVibe.
            Start free — your first site is live in minutes.
          </p>

          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/auth/signup"
                className="inline-flex items-center justify-center gap-2 rounded-xl px-9 py-4 text-base font-bold text-white transition-opacity hover:opacity-90 glow-brand"
                style={{ background: 'var(--cv-brand)' }}
              >
                Get started free
                <ArrowRight size={16} />
              </Link>
            </motion.div>
            <Link
              href="/pricing"
              className="rounded-xl border px-9 py-4 text-base font-medium transition-all hover:border-white/25 hover:text-white"
              style={{ borderColor: 'var(--cv-border)', color: 'rgba(255,255,255,0.45)' }}
            >
              View pricing
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
