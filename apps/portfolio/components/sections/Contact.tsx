'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useScrollAnimation, fadeUp } from '@/hooks/useScrollAnimation';
import { PERSONAL } from '@/lib/data';

export function Contact() {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section
      id="contact"
      ref={ref}
      style={{ padding: '120px 24px', maxWidth: 800, margin: '0 auto', textAlign: 'center' }}
    >
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
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
          Get in touch
        </p>

        <h2
          style={{
            fontFamily: 'var(--font-dm-serif)',
            fontSize: 'clamp(36px, 6vw, 64px)',
            lineHeight: 1.1,
            color: 'var(--text-primary)',
            marginBottom: 20,
            letterSpacing: '-0.02em',
          }}
        >
          Let&apos;s build
          <br />
          <em>something.</em>
        </h2>

        <p
          style={{
            fontSize: 17,
            lineHeight: 1.7,
            color: 'var(--text-secondary)',
            marginBottom: 44,
            maxWidth: 500,
            margin: '0 auto 44px',
          }}
        >
          Have a project in mind, a role to fill, or just want to say hello?
          I&apos;m always open to a conversation.
        </p>

        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/contact"
            style={{
              padding: '14px 32px',
              borderRadius: 10,
              background: 'var(--accent)',
              color: '#fff',
              fontSize: 16,
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'opacity 150ms',
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = '0.85')}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = '1')}
          >
            Send a message
          </Link>

          <a
            href={`mailto:${PERSONAL.email}`}
            style={{
              padding: '14px 32px',
              borderRadius: 10,
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              fontSize: 16,
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'border-color 150ms, background 150ms',
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
            {PERSONAL.email}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
