'use client';

import { motion } from 'framer-motion';
import { useScrollAnimation, fadeUp, stagger } from '@/hooks/useScrollAnimation';
import { PERSONAL, TECH_STACK } from '@/lib/data';

export function About() {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section
      id="about"
      ref={ref}
      style={{ padding: '120px 24px', maxWidth: 1100, margin: '0 auto' }}
    >
      <motion.div
        variants={stagger()}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 64,
          alignItems: 'start',
        }}
      >
        {/* Left — bio */}
        <motion.div variants={fadeUp}>
          <p
            style={{
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.12em',
              color: 'var(--accent)',
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            About
          </p>

          <h2
            style={{
              fontFamily: 'var(--font-dm-serif)',
              fontSize: 'clamp(32px, 5vw, 48px)',
              lineHeight: 1.15,
              color: 'var(--text-primary)',
              marginBottom: 24,
              letterSpacing: '-0.02em',
            }}
          >
            Building software
            <br />
            <em>that matters.</em>
          </h2>

          <p
            style={{
              fontSize: 16,
              lineHeight: 1.75,
              color: 'var(--text-secondary)',
              marginBottom: 20,
            }}
          >
            {PERSONAL.bio}
          </p>

          <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-secondary)' }}>
            Based in {PERSONAL.location}. When I&apos;m not shipping code, I&apos;m behind the
            decks as DJ Karsh — which is also how CrowdVibe was born.
          </p>

          <div style={{ marginTop: 32, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <a
              href={PERSONAL.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '8px 18px',
                borderRadius: 8,
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: 13,
                fontWeight: 500,
                transition: 'border-color 150ms, color 150ms',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.borderColor = 'var(--accent)';
                (e.target as HTMLElement).style.color = 'var(--accent)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.borderColor = 'var(--border)';
                (e.target as HTMLElement).style.color = 'var(--text-secondary)';
              }}
            >
              GitHub ↗
            </a>
            <a
              href={PERSONAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '8px 18px',
                borderRadius: 8,
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: 13,
                fontWeight: 500,
                transition: 'border-color 150ms, color 150ms',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.borderColor = 'var(--accent)';
                (e.target as HTMLElement).style.color = 'var(--accent)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.borderColor = 'var(--border)';
                (e.target as HTMLElement).style.color = 'var(--text-secondary)';
              }}
            >
              LinkedIn ↗
            </a>
          </div>
        </motion.div>

        {/* Right — tech stack */}
        <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {TECH_STACK.map((group) => (
            <div key={group.category}>
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  marginBottom: 10,
                }}
              >
                {group.category}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {group.items.map((item) => (
                  <span
                    key={item}
                    style={{
                      padding: '5px 12px',
                      borderRadius: 6,
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      fontSize: 13,
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
