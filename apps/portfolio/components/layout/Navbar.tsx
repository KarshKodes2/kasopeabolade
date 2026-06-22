'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, type Theme } from '@/components/providers/ThemeProvider';

const NAV_LINKS = [
  { href: '/#about', label: 'About' },
  { href: '/#projects', label: 'Projects' },
  { href: '/resources', label: 'Resources' },
  { href: '/contact', label: 'Contact' },
];

const THEME_SWATCHES: { theme: Theme; color: string; label: string }[] = [
  { theme: 'dark', color: '#1a1a1a', label: 'Dark' },
  { theme: 'light', color: '#f8f9fa', label: 'Light' },
  { theme: 'forest', color: '#162519', label: 'Forest' },
  { theme: 'ocean', color: '#0f2444', label: 'Ocean' },
  { theme: 'rose', color: '#2c1220', label: 'Rose' },
  { theme: 'slate', color: '#1e293b', label: 'Slate' },
];

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: scrolled ? 'var(--bg)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'background 200ms ease, border-color 200ms ease, backdrop-filter 200ms ease',
      }}
    >
      <nav
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '0 24px',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-dm-serif)',
            fontSize: 20,
            color: 'var(--text-primary)',
            textDecoration: 'none',
            letterSpacing: '-0.02em',
          }}
        >
          Kasope.
        </Link>

        {/* Desktop nav */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: 32 }}
          className="hidden md:flex"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: 500,
                transition: 'color 150ms ease',
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = 'var(--text-primary)')
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = 'var(--text-secondary)')
              }
            >
              {link.label}
            </Link>
          ))}

          {/* Theme switcher */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setThemeOpen((o) => !o)}
              aria-label="Switch theme"
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                border: '1px solid var(--border)',
                background: 'var(--surface)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontSize: 14 }}>◐</span>
            </button>

            <AnimatePresence>
              {themeOpen && (
                <>
                  <div
                    style={{
                      position: 'fixed',
                      inset: 0,
                      zIndex: 10,
                    }}
                    onClick={() => setThemeOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      marginTop: 8,
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: 10,
                      padding: '8px',
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr 1fr',
                      gap: 6,
                      zIndex: 20,
                      minWidth: 120,
                    }}
                  >
                    {THEME_SWATCHES.map(({ theme: t, color, label }) => (
                      <button
                        key={t}
                        onClick={() => {
                          setTheme(t);
                          setThemeOpen(false);
                        }}
                        title={label}
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 6,
                          background: color,
                          border: theme === t ? '2px solid var(--accent)' : '2px solid transparent',
                          cursor: 'pointer',
                          transition: 'transform 100ms ease',
                        }}
                        onMouseEnter={(e) =>
                          ((e.target as HTMLElement).style.transform = 'scale(1.1)')
                        }
                        onMouseLeave={(e) =>
                          ((e.target as HTMLElement).style.transform = 'scale(1)')
                        }
                      />
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* CTA */}
          <a
            href="/#contact"
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              background: 'var(--accent)',
              color: '#fff',
              fontSize: 13,
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'background 150ms ease, opacity 150ms ease',
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.opacity = '0.85')
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.opacity = '1')
            }
          >
            Hire me
          </a>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-primary)',
            padding: 4,
          }}
          aria-label="Toggle menu"
        >
          <span style={{ fontSize: 20 }}>{mobileOpen ? '✕' : '☰'}</span>
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              background: 'var(--bg)',
              borderTop: '1px solid var(--border)',
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    fontSize: 16,
                    fontWeight: 500,
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <div
                style={{
                  display: 'flex',
                  gap: 8,
                  paddingTop: 8,
                  borderTop: '1px solid var(--border)',
                }}
              >
                {THEME_SWATCHES.map(({ theme: t, color, label }) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    title={label}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 6,
                      background: color,
                      border: theme === t ? '2px solid var(--accent)' : '2px solid var(--border)',
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
