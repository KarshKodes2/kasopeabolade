import Link from 'next/link';

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

export function DashboardSidebar({ userName }: Props) {
  return (
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
      {userName && (
        <div className="mt-auto border-t pt-4" style={{ borderColor: 'var(--cv-border)' }}>
          <p className="text-xs text-white/30">{userName}</p>
        </div>
      )}
    </aside>
  );
}
