'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight, MapPin, Calendar, Code2 } from 'lucide-react';

const values = [
  { title: 'Craft over speed', body: 'We ship fast — but never at the cost of quality. Every line of code is a commitment to the people who will maintain it tomorrow.' },
  { title: 'Honesty first', body: 'We\'ll tell you when your idea won\'t work as described. Our job is to build the right thing, not the first thing you asked for.' },
  { title: 'Long-term partners', body: 'We measure success in years, not sprints. Our best client relationships have lasted longer than most startups.' },
  { title: 'Africa-first ambition', body: 'Built in Lagos. Solving African problems with African context — while building for the global stage.' },
];

const timeline = [
  { year: '2016', event: 'Started building for the web — HTML, CSS, early JavaScript projects.' },
  { year: '2019', event: 'Went deep on React and Node.js. First commercial SaaS contract.' },
  { year: '2021', event: 'Led engineering at a Nigerian fintech startup. Built the core wallet infrastructure.' },
  { year: '2023', event: 'Founded Karsh Core Solutions. First three client engagements simultaneously.' },
  { year: '2024', event: 'Launched CrowdVibe — a multi-tenant digital presence platform for creators and businesses.' },
  { year: '2025+', event: 'Scaling CrowdVibe. Taking on enterprise consulting and AI product engagements.' },
];

const container: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const item: Variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, type: 'tween', ease: 'easeOut' } } };

export function KCAbout() {
  return (
    <div style={{ paddingTop: '100px', background: 'var(--kc-bg)' }}>
      {/* Header */}
      <section className="kc-section">
        <div className="kc-container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: 'tween', ease: 'easeOut' }}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}
          >
            <div>
              <span className="kc-label">Who we are</span>
              <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 900, color: 'var(--kc-text)', lineHeight: 1.1, marginBottom: '20px' }}>
                Engineering built on<br />
                <span className="kc-text-gradient">honesty and craft.</span>
              </h1>
              <p style={{ fontSize: '15px', color: 'var(--kc-text-2)', lineHeight: 1.8, marginBottom: '24px' }}>
                Karsh Core Solutions is an independent software engineering studio founded by Kasope Abolade in Lagos, Nigeria. We build digital products for founders, startups, and enterprises — from SaaS platforms to fintech systems to AI-powered tools.
              </p>
              <p style={{ fontSize: '15px', color: 'var(--kc-text-2)', lineHeight: 1.8 }}>
                We work lean, move fast, and take full ownership of what we ship. Most of our clients stay long-term — which tells us everything.
              </p>
            </div>
            <div
              style={{
                background: 'linear-gradient(145deg, #0f1729, #1a2444)',
                borderRadius: '20px',
                padding: '40px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.2), transparent 70%)' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <Code2 size={18} style={{ color: '#60a5fa' }} />
                  <p style={{ fontWeight: 800, fontSize: '18px', color: '#fff' }}>Kasope Abolade</p>
                </div>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '24px' }}>Founder & Principal Engineer</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.55)' }}>
                    <MapPin size={13} style={{ color: '#F59E0B', flexShrink: 0 }} /> Lagos, Nigeria
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.55)' }}>
                    <Calendar size={13} style={{ color: '#F59E0B', flexShrink: 0 }} /> 8+ years in production engineering
                  </div>
                </div>
                <div style={{ marginTop: '24px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {['TypeScript', 'Next.js', 'Prisma', 'React Native', 'AWS', 'AI/ML'].map((t) => (
                    <span key={t} style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '100px', background: 'rgba(37,99,235,0.18)', color: '#93c5fd', border: '1px solid rgba(37,99,235,0.25)' }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '80px 0', background: 'var(--kc-bg-2)', borderTop: '1px solid var(--kc-border)', borderBottom: '1px solid var(--kc-border)' }}>
        <div className="kc-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, type: 'tween', ease: 'easeOut' }}
            style={{ marginBottom: '48px' }}
          >
            <span className="kc-label">What we believe</span>
            <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 900, color: 'var(--kc-text)' }}>Our values</h2>
          </motion.div>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}
          >
            {values.map((v) => (
              <motion.div key={v.title} variants={item} className="kc-card">
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--kc-text)', marginBottom: '10px' }}>{v.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--kc-text-2)', lineHeight: 1.7 }}>{v.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="kc-section">
        <div className="kc-container" style={{ maxWidth: '680px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, type: 'tween', ease: 'easeOut' }}
            style={{ marginBottom: '48px' }}
          >
            <span className="kc-label">Our journey</span>
            <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 900, color: 'var(--kc-text)' }}>Timeline</h2>
          </motion.div>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ display: 'flex', flexDirection: 'column', gap: '0' }}
          >
            {timeline.map((t, i) => (
              <motion.div key={t.year} variants={item} style={{ display: 'flex', gap: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--kc-blue)', marginTop: '4px' }} />
                  {i < timeline.length - 1 && <div style={{ width: '2px', flexGrow: 1, background: 'var(--kc-border)', marginTop: '4px' }} />}
                </div>
                <div style={{ paddingBottom: i < timeline.length - 1 ? '28px' : '0' }}>
                  <span style={{ display: 'inline-block', fontSize: '12px', fontWeight: 700, color: 'var(--kc-blue)', marginBottom: '6px' }}>{t.year}</span>
                  <p style={{ fontSize: '14px', color: 'var(--kc-text-2)', lineHeight: 1.7 }}>{t.event}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <div style={{ padding: '0 0 80px', textAlign: 'center' }}>
        <div className="kc-container">
          <Link href="/contact" className="kc-btn-primary" style={{ padding: '14px 32px', fontSize: '15px' }}>
            Work with us <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
