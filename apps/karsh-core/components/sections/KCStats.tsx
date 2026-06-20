'use client';

import { motion, type Variants } from 'framer-motion';

const stats = [
  { value: '8+', label: 'Years shipping production code' },
  { value: '40+', label: 'Products launched globally' },
  { value: '3', label: 'Flagship SaaS platforms' },
  { value: '₦0→∞', label: 'MVPs scaled to enterprise' },
];

const container: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const item: Variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, type: 'tween', ease: 'easeOut' } } };

export function KCStats() {
  return (
    <section
      style={{
        padding: '80px 0',
        background: 'linear-gradient(135deg, #1a2444 0%, #0f1729 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none' }} />
      <div className="kc-container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', textAlign: 'center' }}
        >
          {stats.map((s) => (
            <motion.div key={s.label} variants={item}>
              <p style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#fff', lineHeight: 1, marginBottom: '10px' }}>
                <span style={{ background: 'linear-gradient(135deg, #60a5fa, #F59E0B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{s.value}</span>
              </p>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
