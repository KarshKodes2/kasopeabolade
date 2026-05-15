'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface BookingCTASectionProps {
  name: string;
  slug: string;
}

export function BookingCTASection({ name, slug }: BookingCTASectionProps) {
  return (
    <section className="relative overflow-hidden px-6 py-32 text-center">
      <div
        className="absolute inset-0 opacity-15"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, var(--cv-brand), transparent)' }}
      />
      <div className="relative z-10 mx-auto max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 text-4xl font-black text-white md:text-5xl"
        >
          Ready to book {name}?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-10 text-lg text-white/50"
        >
          Fill out the booking form and we'll get back to you with a quote within 24 hours.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Link
            href={`/site/${slug}/book`}
            className="inline-block rounded-xl px-10 py-4 text-lg font-semibold text-white transition-all hover:opacity-90 glow-brand animate-pulse-glow"
            style={{ background: 'var(--cv-brand)' }}
          >
            Book Now →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
