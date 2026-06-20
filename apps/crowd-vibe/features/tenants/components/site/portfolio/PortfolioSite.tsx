'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { ArrowUpRight, MapPin, Mail } from 'lucide-react';

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

export function PortfolioSite({ tenant }: { tenant: Tenant }) {
  const brand = tenant.brandColor ?? '#7C3AED';
  const accent = tenant.accentColor ?? '#F59E0B';

  const socials = [
    tenant.instagramUrl && { label: 'Instagram', href: tenant.instagramUrl },
    tenant.youtubeUrl && { label: 'YouTube', href: tenant.youtubeUrl },
    tenant.tiktokUrl && { label: 'TikTok', href: tenant.tiktokUrl },
    tenant.spotifyUrl && { label: 'Spotify', href: tenant.spotifyUrl },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <div style={{ background: '#0B0B0B', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      {/* Brand top bar */}
      <div style={{ height: '3px', background: `linear-gradient(90deg, ${brand}, ${accent})` }} />

      {/* Nav */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(11,11,11,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '0 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '60px' }}>
          <span style={{ fontWeight: 800, fontSize: '18px' }}>{tenant.name}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            {['#about', '#skills', '#contact'].map((href) => (
              <a key={href} href={href} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 150ms' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#fff' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)' }}
              >
                {href.slice(1).charAt(0).toUpperCase() + href.slice(2)}
              </a>
            ))}
            <Link
              href={`/site/${tenant.slug}/book`}
              style={{ padding: '8px 18px', borderRadius: '8px', background: brand, color: '#fff', fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}
            >
              Hire me
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '96px 24px 80px' }}>
        <motion.div variants={stagger} initial="hidden" animate="visible">
          <motion.p
            variants={fadeUp}
            style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.14em', color: brand, fontWeight: 700, marginBottom: '16px' }}
          >
            Available for hire
          </motion.p>
          <motion.h1
            variants={fadeUp}
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, lineHeight: 1.05, marginBottom: '20px' }}
          >
            {tenant.name}
          </motion.h1>
          {tenant.bio && (
            <motion.p
              variants={fadeUp}
              style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.55)', maxWidth: '560px', marginBottom: '32px' }}
            >
              {tenant.bio}
            </motion.p>
          )}
          <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {tenant.location && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>
                <MapPin size={13} /> {tenant.location}
              </span>
            )}
            <Link
              href={`/site/${tenant.slug}/book`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '11px 24px', borderRadius: '10px', background: brand, color: '#fff', fontWeight: 700, fontSize: '14px', textDecoration: 'none' }}
            >
              Book a session <ArrowUpRight size={15} />
            </Link>
            <a
              href="#contact"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '11px 24px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.6)', fontSize: '14px', textDecoration: 'none' }}
            >
              <Mail size={14} /> Contact
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* About */}
      <section id="about" style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '80px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: 'tween', ease: 'easeOut' }}
          >
            <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: brand, fontWeight: 700, marginBottom: '12px' }}>
              About
            </p>
            <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: '20px' }}>
              Who I am
            </h2>
            {tenant.bio && (
              <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.6)', maxWidth: '640px' }}>
                {tenant.bio}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Skills placeholder */}
      <section id="skills" style={{ maxWidth: '900px', margin: '0 auto', padding: '80px 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: 'tween', ease: 'easeOut' }}
        >
          <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: brand, fontWeight: 700, marginBottom: '12px' }}>
            Skills & expertise
          </p>
          <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: '32px' }}>
            What I do
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
            {['Strategy', 'Design', 'Development', 'Marketing', 'Consulting', 'Training'].map((skill, i) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.45, type: 'tween', ease: 'easeOut' }}
                style={{ padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)', fontSize: '14px', fontWeight: 500 }}
              >
                {skill}
              </motion.div>
            ))}
          </div>
          <p style={{ marginTop: '20px', fontSize: '13px', color: 'rgba(255,255,255,0.3)' }}>
            Update your skills from the dashboard.
          </p>
        </motion.div>
      </section>

      {/* Contact / CTA */}
      <section id="contact" style={{ background: `${brand}0D`, borderTop: `1px solid ${brand}25`, padding: '80px 24px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: 'tween', ease: 'easeOut' }}
          >
            <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: '12px' }}>
              Let&apos;s work together
            </h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', marginBottom: '28px', lineHeight: 1.7 }}>
              Available for freelance projects, consulting, and long-term collaborations.
            </p>
            <Link
              href={`/site/${tenant.slug}/book`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', borderRadius: '12px', background: brand, color: '#fff', fontWeight: 700, fontSize: '15px', textDecoration: 'none' }}
            >
              Book a session <ArrowUpRight size={16} />
            </Link>

            {socials.length > 0 && (
              <div style={{ marginTop: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', transition: 'color 150ms' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#fff' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)' }}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '24px', textAlign: 'center', fontSize: '12px', color: 'rgba(255,255,255,0.2)' }}>
        <span style={{ display: 'inline-block', width: '20px', height: '2px', background: `linear-gradient(90deg, ${brand}, ${accent})`, marginRight: '8px', verticalAlign: 'middle', borderRadius: '1px' }} />
        {tenant.name} · Powered by CrowdVibe
      </footer>
    </div>
  );
}
