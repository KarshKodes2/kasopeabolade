'use client';

import Link from 'next/link';
import { useState } from 'react';

interface SiteNavProps {
  tenant: { name: string; logoUrl?: string | null; slug: string };
}

export function SiteNav({ tenant }: SiteNavProps) {
  const [open, setOpen] = useState(false);
  const base = `/site/${tenant.slug}`;

  const links = [
    { label: 'Home', href: base },
    { label: 'Gallery', href: `${base}/gallery` },
    { label: 'Events', href: `${base}/events` },
    { label: 'Press Kit', href: `${base}/press` },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full glass border-b border-white/5">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href={base} className="flex items-center gap-2">
          {tenant.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={tenant.logoUrl} alt={tenant.name} className="h-8 w-auto rounded" />
          ) : (
            <span className="text-lg font-bold text-white">{tenant.name}</span>
          )}
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-white/60 transition-colors hover:text-white"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href={`${base}/book`}
            className="rounded-lg px-4 py-2 text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ background: 'var(--cv-brand)' }}
          >
            Book Now
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 bg-white transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-0.5 w-6 bg-white transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-white transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-white/5 px-6 pb-6 pt-4 md:hidden" style={{ background: 'var(--cv-surface)' }}>
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-white/60 hover:text-white">
                {l.label}
              </Link>
            ))}
            <Link
              href={`${base}/book`}
              onClick={() => setOpen(false)}
              className="mt-2 rounded-lg px-4 py-3 text-center text-sm font-semibold text-white"
              style={{ background: 'var(--cv-brand)' }}
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
