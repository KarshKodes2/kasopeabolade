'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function KCCTA() {
  return (
    <section className="kc-section" style={{ background: 'var(--kc-bg)' }}>
      <div className="kc-container">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, type: 'tween', ease: 'easeOut' }}
          style={{
            textAlign: 'center',
            padding: '80px 40px',
            background: 'linear-gradient(135deg, #0f1729 0%, #1a2444 100%)',
            borderRadius: '24px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '360px', height: '360px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.25), transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '280px', height: '280px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,158,11,0.15), transparent 70%)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <span style={{ display: 'inline-block', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#60a5fa', marginBottom: '20px' }}>
              Let&rsquo;s work together
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#fff', lineHeight: 1.1, marginBottom: '20px' }}>
              Ready to build something<br />
              <span style={{ background: 'linear-gradient(135deg, #2563EB, #F59E0B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>remarkable?</span>
            </h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, maxWidth: '440px', margin: '0 auto 36px' }}>
              Whether you&rsquo;re a startup looking for your first engineer or an enterprise needing expert reinforcements — we should talk.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/contact" className="kc-btn-primary" style={{ padding: '14px 32px', fontSize: '15px' }}>
                Start a project <ArrowRight size={16} />
              </Link>
              <Link href="/about" className="kc-btn-secondary"
                style={{ padding: '14px 32px', fontSize: '15px', borderColor: 'rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.6)' }}
              >
                Learn about us
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
