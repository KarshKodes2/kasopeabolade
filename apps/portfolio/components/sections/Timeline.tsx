'use client';

import { motion } from 'framer-motion';
import { useScrollAnimation, fadeUp, stagger } from '@/hooks/useScrollAnimation';
import { TIMELINE } from '@/lib/data';

export function Timeline() {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section
      ref={ref}
      style={{
        padding: '120px 24px',
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <motion.div
          variants={stagger(0, 0.15)}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.12em',
              color: 'var(--accent)',
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            Experience
          </motion.p>

          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-dm-serif)',
              fontSize: 'clamp(32px, 5vw, 48px)',
              lineHeight: 1.15,
              color: 'var(--text-primary)',
              marginBottom: 56,
              letterSpacing: '-0.02em',
            }}
          >
            Where I&apos;ve been.
          </motion.h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {TIMELINE.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '160px 1fr',
                  gap: 32,
                  paddingBottom: index < TIMELINE.length - 1 ? 40 : 0,
                  paddingTop: index > 0 ? 40 : 0,
                  borderBottom:
                    index < TIMELINE.length - 1 ? '1px solid var(--border)' : 'none',
                }}
              >
                {/* Year */}
                <div>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500 }}>
                    {item.year}
                  </p>
                </div>

                {/* Content */}
                <div>
                  <h3
                    style={{
                      fontSize: 18,
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      marginBottom: 4,
                    }}
                  >
                    {item.role}
                  </h3>
                  <p
                    style={{
                      fontSize: 14,
                      color: 'var(--accent)',
                      fontWeight: 500,
                      marginBottom: 12,
                    }}
                  >
                    {item.company}
                  </p>
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
