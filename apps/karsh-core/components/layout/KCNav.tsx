'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function KCNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: scrolled ? 'rgba(255,255,255,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--kc-border)' : '1px solid transparent',
        transition: 'all 250ms ease',
      }}
    >
      <div className="kc-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontWeight: 900, fontSize: '18px', color: 'var(--kc-text)' }}>
            Karsh <span className="kc-text-gradient">Core</span>
          </span>
        </Link>

        {/* Desktop */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                fontSize: '14px',
                fontWeight: 500,
                textDecoration: 'none',
                color: pathname === l.href ? 'var(--kc-blue)' : 'var(--kc-text-2)',
                transition: 'color 150ms',
              }}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/contact" className="kc-btn-primary" style={{ padding: '9px 22px', fontSize: '13px' }}>
            Start a project
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((o) => !o)}
          style={{ display: 'none', flexDirection: 'column', gap: '5px', padding: '4px', background: 'none', border: 'none', cursor: 'pointer' }}
          aria-label="Menu"
          className="kc-hamburger"
        >
          {[0, 1, 2].map((i) => (
            <span key={i} style={{ display: 'block', width: '20px', height: '2px', background: 'var(--kc-text)', borderRadius: '1px' }} />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, type: 'tween', ease: 'easeOut' }}
            style={{ overflow: 'hidden', background: '#fff', borderBottom: '1px solid var(--kc-border)' }}
          >
            <div className="kc-container" style={{ paddingTop: '16px', paddingBottom: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {links.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ fontSize: '15px', fontWeight: 500, color: 'var(--kc-text-2)', textDecoration: 'none', padding: '8px 0' }}>
                  {l.label}
                </Link>
              ))}
              <Link href="/contact" onClick={() => setOpen(false)} className="kc-btn-primary" style={{ justifyContent: 'center', marginTop: '4px' }}>
                Start a project
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
