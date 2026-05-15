'use client';

import Link from 'next/link';
import { useState } from 'react';

export function PlatformNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full glass border-b border-white/5">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <span className="text-xl font-bold text-gradient font-display">CrowdVibe</span>

        {/* Desktop */}
        <div className="hidden items-center gap-4 md:flex">
          <Link href="/pricing" className="text-sm text-white/60 hover:text-white transition-colors">
            Pricing
          </Link>
          <Link href="/auth/signin" className="text-sm text-white/60 hover:text-white transition-colors">
            Sign in
          </Link>
          <Link
            href="/auth/signup"
            className="rounded-lg px-4 py-2 text-sm font-medium text-white transition-all hover:opacity-90"
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
          <span className={`block h-0.5 w-5 bg-white transition-transform duration-200 ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block h-0.5 w-5 bg-white transition-opacity duration-200 ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-5 bg-white transition-transform duration-200 ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-white/5 px-6 pb-6 pt-4 md:hidden" style={{ background: 'rgba(17,17,17,0.95)' }}>
          <div className="flex flex-col gap-4">
            <Link href="/pricing" onClick={() => setOpen(false)} className="text-sm text-white/60 hover:text-white">
              Pricing
            </Link>
            <Link href="/auth/signin" onClick={() => setOpen(false)} className="text-sm text-white/60 hover:text-white">
              Sign in
            </Link>
            <Link
              href="/auth/signup"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-xl px-4 py-3 text-center text-sm font-semibold text-white"
              style={{ background: 'var(--cv-brand)' }}
            >
              Get started free
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
