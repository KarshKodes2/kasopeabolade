'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const NAV = [
  { href: '/dashboard', label: 'Overview', icon: '📊' },
  { href: '/bookings', label: 'Bookings', icon: '📅' },
  { href: '/media', label: 'Media', icon: '🎵' },
  { href: '/settings', label: 'Settings', icon: '⚙️' },
  { href: '/billing', label: 'Billing', icon: '💳' },
];

interface Props {
  userName?: string | null;
}

function NavLink({ href, label, icon, onClick }: { href: string; label: string; icon: string; onClick?: () => void }) {
  const pathname = usePathname();
  const active = href === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(href);

  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all"
      style={{
        background: active ? 'rgba(124,58,237,0.12)' : 'transparent',
        color: active ? 'white' : 'rgba(255,255,255,0.5)',
        borderLeft: active ? '2px solid var(--cv-brand)' : '2px solid transparent',
      }}
    >
      <span className="text-base">{icon}</span>
      {label}
    </Link>
  );
}

export function DashboardSidebar({ userName }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <div
        className="fixed left-0 right-0 top-0 z-40 flex items-center justify-between border-b px-4 py-3 md:hidden"
        style={{ background: 'var(--cv-surface)', borderColor: 'var(--cv-border)' }}
      >
        <Link href="/dashboard" className="text-base font-bold text-gradient">
          CrowdVibe
        </Link>
        <button
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
          className="flex flex-col gap-1.5 p-1"
        >
          <span className={`block h-0.5 w-5 bg-white transition-transform duration-200 ${mobileOpen ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block h-0.5 bg-white w-5 transition-opacity duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-5 bg-white transition-transform duration-200 ${mobileOpen ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setMobileOpen(false)} />
          <div
            className="fixed left-0 right-0 top-14 z-40 border-b p-4 md:hidden"
            style={{ background: 'var(--cv-surface)', borderColor: 'var(--cv-border)' }}
          >
            <nav className="flex flex-col gap-1">
              {NAV.map((item) => (
                <NavLink key={item.href} {...item} onClick={() => setMobileOpen(false)} />
              ))}
            </nav>
            {userName && (
              <div className="mt-4 border-t pt-4" style={{ borderColor: 'var(--cv-border)' }}>
                <p className="truncate text-xs text-white/30">{userName}</p>
              </div>
            )}
          </div>
        </>
      )}

      {/* Desktop sidebar */}
      <aside
        className="hidden w-56 shrink-0 flex-col border-r p-6 md:flex"
        style={{ background: 'var(--cv-surface)', borderColor: 'var(--cv-border)' }}
      >
        <Link href="/dashboard" className="mb-8 text-lg font-bold text-gradient">
          CrowdVibe
        </Link>
        <nav className="flex flex-1 flex-col gap-1">
          {NAV.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </nav>
        {userName && (
          <div className="mt-auto border-t pt-4" style={{ borderColor: 'var(--cv-border)' }}>
            <p className="truncate text-xs text-white/30">{userName}</p>
          </div>
        )}
      </aside>
    </>
  );
}
