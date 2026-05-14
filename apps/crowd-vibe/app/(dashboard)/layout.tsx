import { redirect } from 'next/navigation';
import Link from 'next/link';
import { auth } from '../../lib/auth';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Dashboard — CrowdVibe' };

const NAV = [
  { href: '/dashboard', label: 'Overview', icon: '📊' },
  { href: '/dashboard/bookings', label: 'Bookings', icon: '📅' },
  { href: '/dashboard/media', label: 'Media', icon: '🎵' },
  { href: '/dashboard/settings', label: 'Settings', icon: '⚙️' },
  { href: '/dashboard/billing', label: 'Billing', icon: '💳' },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect('/auth/signin');

  return (
    <div className="flex min-h-screen" style={{ background: 'var(--cv-bg)' }}>
      {/* Sidebar */}
      <aside
        className="hidden w-56 shrink-0 border-r p-6 md:flex md:flex-col"
        style={{ background: 'var(--cv-surface)', borderColor: 'var(--cv-border)' }}
      >
        <Link href="/dashboard" className="mb-8 text-lg font-bold text-gradient">
          CrowdVibe
        </Link>
        <nav className="flex flex-1 flex-col gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-white"
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto border-t pt-4" style={{ borderColor: 'var(--cv-border)' }}>
          <p className="text-xs text-white/30">
            {session.user?.name ?? session.user?.email}
          </p>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto p-6 md:p-8">{children}</main>
    </div>
  );
}
