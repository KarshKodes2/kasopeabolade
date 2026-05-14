import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '../../lib/auth';

const NAV = [
  { section: 'Overview', items: [{ href: '/dashboard', label: 'Home', icon: '📊' }] },
  {
    section: 'CrowdVibe',
    items: [
      { href: '/dashboard/crowdvibe', label: 'Overview', icon: '🎵' },
      { href: '/dashboard/crowdvibe/tenants', label: 'Tenants', icon: '👥' },
      { href: '/dashboard/crowdvibe/bookings', label: 'All Bookings', icon: '📅' },
    ],
  },
  {
    section: 'Portfolio',
    items: [
      { href: '/dashboard/portfolio/projects', label: 'Projects', icon: '🗂️' },
    ],
  },
  {
    section: 'Karsh Core',
    items: [
      { href: '/dashboard/karsh-core/leads', label: 'Leads', icon: '💼' },
    ],
  },
  { section: 'System', items: [{ href: '/dashboard/settings', label: 'Settings', icon: '⚙️' }] },
];

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect('/auth/signin');

  return (
    <div className="flex min-h-screen" style={{ background: 'var(--cv-bg)' }}>
      <aside className="hidden w-60 shrink-0 border-r p-4 md:flex md:flex-col" style={{ background: 'var(--cv-surface)', borderColor: 'var(--cv-border)' }}>
        <div className="mb-6 px-2">
          <p className="text-xs font-bold tracking-widest uppercase text-white/30">Karsh Core Admin</p>
        </div>
        <nav className="flex flex-1 flex-col gap-4">
          {NAV.map((group) => (
            <div key={group.section}>
              <p className="mb-1 px-2 text-xs font-medium text-white/25">{group.section}</p>
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-white"
                >
                  <span>{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>
      </aside>
      <main className="flex-1 overflow-auto p-6 md:p-8">{children}</main>
    </div>
  );
}
