import Link from 'next/link';
import { PERSONAL } from '@/lib/data';

export function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        padding: '48px 24px',
        background: 'var(--bg-secondary)',
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-dm-serif)',
            fontSize: 22,
            color: 'var(--text-primary)',
          }}
        >
          Kasope Abolade
        </p>

        <nav style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { href: '/#about', label: 'About' },
            { href: '/#projects', label: 'Projects' },
            { href: '/resources', label: 'Resources' },
            { href: '/search', label: 'Search' },
            { href: '/contact', label: 'Contact' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: 14,
                transition: 'color 150ms ease',
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div style={{ display: 'flex', gap: 20 }}>
          {[
            { href: PERSONAL.github, label: 'GitHub' },
            { href: PERSONAL.linkedin, label: 'LinkedIn' },
            { href: PERSONAL.twitter, label: 'Twitter' },
            { href: `mailto:${PERSONAL.email}`, label: 'Email' },
          ].map(({ href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'var(--text-muted)',
                textDecoration: 'none',
                fontSize: 13,
                transition: 'color 150ms ease',
              }}
            >
              {label}
            </a>
          ))}
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>
          © {new Date().getFullYear()} Kasope Abolade · Built with Next.js 15
        </p>
      </div>
    </footer>
  );
}
