'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight, CheckCircle, Mail, MapPin, Phone } from 'lucide-react';

type Tenant = {
  id: string;
  name: string;
  slug: string;
  bio: string | null;
  location: string | null;
  logoUrl: string | null;
  heroImageUrl: string | null;
  brandColor: string | null;
  accentColor: string | null;
  instagramUrl: string | null;
  tiktokUrl: string | null;
  youtubeUrl: string | null;
  audiomackUrl: string | null;
  soundcloudUrl: string | null;
  spotifyUrl: string | null;
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: 'tween', ease: 'easeOut' } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const services = [
  { emoji: '⚡', title: 'Strategy', desc: 'Goal-driven plans aligned with your business objectives.' },
  { emoji: '🎨', title: 'Design', desc: 'Brand identity and digital experiences that stand out.' },
  { emoji: '🔧', title: 'Development', desc: 'Robust, scalable technology built for growth.' },
  { emoji: '📈', title: 'Growth', desc: 'Data-driven marketing that drives real results.' },
];

export function CorporateSite({ tenant }: { tenant: Tenant }) {
  const brand = tenant.brandColor ?? '#2563EB';
  const accent = tenant.accentColor ?? '#F59E0B';

  return (
    <div style={{ background: '#fff', minHeight: '100vh', color: '#111', fontFamily: 'system-ui, sans-serif' }}>
      {/* Brand accent bar */}
      <div style={{ height: '4px', background: `linear-gradient(90deg, ${brand}, ${accent})` }} />

      {/* Nav */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #f0f0f0', padding: '0 32px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
          <span style={{ fontWeight: 900, fontSize: '20px', color: '#111' }}>{tenant.name}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
            {['#services', '#about', '#contact'].map((href) => (
              <a key={href} href={href} style={{ fontSize: '14px', color: '#666', textDecoration: 'none', fontWeight: 500, transition: 'color 150ms' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = brand }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#666' }}
              >
                {href.slice(1).charAt(0).toUpperCase() + href.slice(2)}
              </a>
            ))}
            <Link
              href={`/site/${tenant.slug}/book`}
              style={{ padding: '10px 22px', borderRadius: '8px', background: brand, color: '#fff', fontSize: '14px', fontWeight: 700, textDecoration: 'none' }}
            >
              Get in touch
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ background: `linear-gradient(135deg, #0f1729 0%, #1a1a2e 100%)`, padding: '120px 32px 100px', textAlign: 'center' }}>
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          style={{ maxWidth: '760px', margin: '0 auto' }}
        >
          <motion.div
            variants={fadeUp}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px', padding: '6px 16px', borderRadius: '100px', background: `${brand}22`, border: `1px solid ${brand}44`, color: brand, fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}
          >
            Trusted by leading businesses
          </motion.div>
          <motion.h1
            variants={fadeUp}
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 900, lineHeight: 1.08, color: '#fff', marginBottom: '20px' }}
          >
            {tenant.name}
          </motion.h1>
          {tenant.bio && (
            <motion.p
              variants={fadeUp}
              style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.6)', marginBottom: '36px', maxWidth: '560px', margin: '0 auto 36px' }}
            >
              {tenant.bio}
            </motion.p>
          )}
          <motion.div
            variants={fadeUp}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}
          >
            <Link
              href={`/site/${tenant.slug}/book`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', borderRadius: '10px', background: brand, color: '#fff', fontWeight: 700, fontSize: '15px', textDecoration: 'none' }}
            >
              Start a project <ArrowRight size={16} />
            </Link>
            <a
              href="#services"
              style={{ display: 'inline-flex', alignItems: 'center', padding: '14px 28px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)', fontSize: '15px', textDecoration: 'none' }}
            >
              Our services
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Services */}
      <section id="services" style={{ padding: '96px 32px', background: '#fafafa', borderBottom: '1px solid #f0f0f0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: 'tween', ease: 'easeOut' }}
            style={{ textAlign: 'center', marginBottom: '56px' }}
          >
            <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.12em', color: brand, fontWeight: 700, marginBottom: '12px' }}>What we do</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, color: '#111', marginBottom: '12px' }}>Services</h2>
            <p style={{ fontSize: '15px', color: '#666', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
              Comprehensive solutions to help your business grow and stand out.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, type: 'tween', ease: 'easeOut' }}
                style={{ padding: '28px', borderRadius: '16px', background: '#fff', border: '1px solid #e8e8e8', transition: 'box-shadow 200ms, border-color 200ms' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px ${brand}18`;
                  (e.currentTarget as HTMLElement).style.borderColor = `${brand}40`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  (e.currentTarget as HTMLElement).style.borderColor = '#e8e8e8';
                }}
              >
                <div style={{ fontSize: '28px', marginBottom: '16px' }}>{s.emoji}</div>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#111', marginBottom: '8px' }}>{s.title}</h3>
                <p style={{ fontSize: '14px', color: '#777', lineHeight: 1.6 }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section id="about" style={{ padding: '96px 32px', background: '#fff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, type: 'tween', ease: 'easeOut' }}
          >
            <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.12em', color: brand, fontWeight: 700, marginBottom: '12px' }}>About us</p>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)', fontWeight: 900, color: '#111', marginBottom: '16px', lineHeight: 1.2 }}>
              Why work with {tenant.name}?
            </h2>
            {tenant.bio && (
              <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.8, marginBottom: '28px' }}>
                {tenant.bio}
              </p>
            )}
            {tenant.location && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#888' }}>
                <MapPin size={14} /> {tenant.location}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, type: 'tween', ease: 'easeOut' }}
            style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
          >
            {[
              'Proven track record across industries',
              'Dedicated account management',
              'Results-driven approach',
              'Transparent pricing, no surprises',
              'Fast turnaround, quality guaranteed',
            ].map((point) => (
              <div key={point} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px', borderRadius: '10px', background: '#fafafa', border: '1px solid #f0f0f0' }}>
                <CheckCircle size={16} style={{ color: brand, flexShrink: 0 }} />
                <span style={{ fontSize: '14px', color: '#333', fontWeight: 500 }}>{point}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA / Contact */}
      <section id="contact" style={{ padding: '96px 32px', background: `linear-gradient(135deg, ${brand}08, ${accent}06)`, borderTop: `1px solid ${brand}18` }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: 'tween', ease: 'easeOut' }}
          >
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, color: '#111', marginBottom: '14px' }}>
              Ready to get started?
            </h2>
            <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.7, marginBottom: '32px' }}>
              Tell us about your project and we&apos;ll get back to you within 24 hours.
            </p>
            <Link
              href={`/site/${tenant.slug}/book`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 32px', borderRadius: '12px', background: brand, color: '#fff', fontWeight: 800, fontSize: '15px', textDecoration: 'none' }}
            >
              Start a project <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #e8e8e8', padding: '28px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', fontSize: '13px', color: '#aaa' }}>
        <span>© {new Date().getFullYear()} {tenant.name}</span>
        <span>Powered by <span style={{ color: brand, fontWeight: 600 }}>CrowdVibe</span></span>
      </footer>
    </div>
  );
}
