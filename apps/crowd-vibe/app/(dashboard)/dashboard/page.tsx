import { auth } from '@/shared/lib/auth';
import { prisma } from '@/shared/lib/prisma';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect('/auth/signin');

  const tenantId = session.user?.tenantId as string | null;
  if (!tenantId) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="mb-4 text-2xl font-bold text-white">Welcome to CrowdVibe!</h1>
        <p className="mb-6 text-white/50">Let's set up your entertainer profile to get started.</p>
        <Link
          href="/settings"
          className="rounded-xl px-6 py-3 font-medium text-white"
          style={{ background: 'var(--cv-brand)' }}
        >
          Set up my profile →
        </Link>
      </div>
    );
  }

  const [bookingStats, recentBookings, tenant] = await Promise.all([
    prisma.booking.groupBy({
      by: ['status'],
      where: { tenantId },
      _count: true,
    }),
    prisma.booking.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
    prisma.tenant.findUnique({ where: { id: tenantId }, select: { name: true, slug: true, plan: true } }),
  ]);

  const pending = bookingStats.find((s) => s.status === 'PENDING')?._count ?? 0;
  const confirmed = bookingStats.find((s) => s.status === 'CONFIRMED')?._count ?? 0;
  const total = bookingStats.reduce((sum, s) => sum + s._count, 0);

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Welcome back{tenant?.name ? `, ${tenant.name}` : ''}!</h1>
          <p className="mt-1 text-sm text-white/40">
            Your site:{' '}
            <Link href={`/site/${tenant?.slug}`} className="underline hover:text-white">
              /site/{tenant?.slug}
            </Link>
          </p>
        </div>
        <Link
          href="/bookings"
          className="rounded-xl px-4 py-2 text-sm font-medium text-white"
          style={{ background: 'var(--cv-brand)' }}
        >
          View bookings
        </Link>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: 'Total Bookings', value: total },
          { label: 'Pending', value: pending },
          { label: 'Confirmed', value: confirmed },
          { label: 'Plan', value: tenant?.plan ?? 'FREE' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border p-5"
            style={{ background: 'var(--cv-surface)', borderColor: 'var(--cv-border)' }}
          >
            <p className="text-xs text-white/40">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent bookings */}
      <div className="rounded-xl border" style={{ background: 'var(--cv-surface)', borderColor: 'var(--cv-border)' }}>
        <div className="flex items-center justify-between border-b px-5 py-4" style={{ borderColor: 'var(--cv-border)' }}>
          <h2 className="text-sm font-semibold text-white">Recent Bookings</h2>
          <Link href="/bookings" className="text-xs text-white/40 hover:text-white">View all →</Link>
        </div>
        {recentBookings.length === 0 ? (
          <div className="px-5 py-10 text-center text-sm text-white/30">
            No bookings yet.{' '}
            <Link href={`/site/${tenant?.slug}/book`} className="underline hover:text-white">Share your booking page</Link>
          </div>
        ) : (
          <div className="divide-y" style={{ borderColor: 'var(--cv-border)' }}>
            {recentBookings.map((b) => (
              <div key={b.id} className="flex items-center justify-between px-5 py-3">
                <div>
                  <p className="text-sm font-medium text-white">{b.clientName}</p>
                  <p className="text-xs text-white/30">{b.eventType.replace('_', ' ')} · {new Date(b.eventDate).toLocaleDateString()}</p>
                </div>
                <span
                  className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                  style={{ background: b.status === 'PENDING' ? 'rgba(234,179,8,0.15)' : 'rgba(34,197,94,0.15)', color: b.status === 'PENDING' ? '#eab308' : '#22c55e' }}
                >
                  {b.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
