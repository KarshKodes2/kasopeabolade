'use client';

import Link from 'next/link';

const links = [
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function KCFooter() {
  return (
    <footer style={{ background: 'var(--kc-bg-dark)', color: 'rgba(255,255,255,0.85)', padding: '64px 0 32px' }}>
      <div className="kc-container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', marginBottom: '48px' }}>
          <div>
            <p style={{ fontWeight: 900, fontSize: '20px', marginBottom: '12px' }}>
              Karsh <span style={{ background: 'linear-gradient(135deg, #2563EB, #F59E0B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Core</span>
            </p>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, maxWidth: '320px' }}>
              Engineering excellence for startups and enterprises. SaaS, fintech, mobile, and AI-powered products — built for scale.
            </p>
          </div>
          <div>
            <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', marginBottom: '14px', fontWeight: 700 }}>Navigation</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {links.map((l) => (
                <Link key={l.href} href={l.href} style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 150ms' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#fff' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)' }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.25)' }}>
          <span>© {new Date().getFullYear()} Karsh Core Solutions. All rights reserved.</span>
          <span>Built by <a href="https://linkedin.com/in/kasopeabolade" target="_blank" rel="noopener noreferrer" style={{ color: '#2563EB', textDecoration: 'none' }}>Kasope Abolade</a></span>
        </div>
      </div>
    </footer>
  );
}
