'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { STATS } from '@/lib/data';

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.floor(v));
  const { ref, isInView } = useScrollAnimation(0.5);

  useEffect(() => {
    if (isInView) {
      animate(count, target, { duration: 1.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] });
    }
  }, [isInView, count, target]);

  return (
    <span ref={ref} style={{ display: 'inline' }}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export function Stats() {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section
      ref={ref}
      style={{ padding: '80px 24px', borderTop: '1px solid var(--border)' }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 40,
        }}
      >
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            style={{ textAlign: 'center' }}
          >
            <p
              style={{
                fontFamily: 'var(--font-dm-serif)',
                fontSize: 'clamp(40px, 6vw, 56px)',
                lineHeight: 1,
                color: 'var(--text-primary)',
                marginBottom: 8,
              }}
            >
              <CountUp target={stat.value} suffix={stat.suffix} />
            </p>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
