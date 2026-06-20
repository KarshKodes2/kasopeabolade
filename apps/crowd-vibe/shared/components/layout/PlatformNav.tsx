'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Features', href: '/#features' },
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Pricing', href: '/pricing' },
];

export function PlatformNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 z-50 w-full transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(11,11,11,0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-black text-gradient font-display">
          CrowdVibe
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-sm transition-colors"
              style={{ color: 'rgba(255,255,255,0.55)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#fff' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)' }}
            >
              {l.label}
            </Link>
          ))}
          <div className="ml-2 h-4 w-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
          <Link
            href="/auth/signin"
            className="text-sm transition-colors"
            style={{ color: 'rgba(255,255,255,0.55)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#fff' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)' }}
          >
            Sign in
          </Link>
          <Link
            href="/auth/signup"
            className="rounded-lg px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-85"
            style={{ background: 'var(--cv-brand)' }}
          >
            Get started free
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex flex-col gap-1.5 p-1 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span
            className="block h-0.5 w-5 bg-white transition-transform duration-200"
            style={{ transform: open ? 'translateY(8px) rotate(45deg)' : 'none' }}
          />
          <span
            className="block h-0.5 w-5 bg-white transition-opacity duration-200"
            style={{ opacity: open ? 0 : 1 }}
          />
          <span
            className="block h-0.5 w-5 bg-white transition-transform duration-200"
            style={{ transform: open ? 'translateY(-8px) rotate(-45deg)' : 'none' }}
          />
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
            className="overflow-hidden border-t md:hidden"
            style={{ background: 'rgba(11,11,11,0.97)', borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <div className="flex flex-col gap-1 px-6 py-5">
              {navLinks.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm transition-colors"
                  style={{ color: 'rgba(255,255,255,0.6)' }}
                >
                  {l.label}
                </Link>
              ))}
              <div className="my-2 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
              <Link
                href="/auth/signin"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm"
                style={{ color: 'rgba(255,255,255,0.6)' }}
              >
                Sign in
              </Link>
              <Link
                href="/auth/signup"
                onClick={() => setOpen(false)}
                className="mt-1 rounded-xl px-4 py-3 text-center text-sm font-bold text-white"
                style={{ background: 'var(--cv-brand)' }}
              >
                Get started free
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
