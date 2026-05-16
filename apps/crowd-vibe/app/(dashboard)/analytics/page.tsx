import { auth } from '@/shared/lib/auth';
import { prisma } from '@/shared/lib/prisma';
import { redirect } from 'next/navigation';
import { BookingChart } from '@/features/analytics';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Analytics' };

export default async function AnalyticsPage() {
  const session = await auth();
  if (!session?.user?.tenantId) redirect('/dashboard');

  const tenantId = session.user.tenantId;

  // Last 6 months of bookings
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const [allBookings, subscribers, mediaCount] = await Promise.all([
    prisma.booking.findMany({
      where: { tenantId, createdAt: { gte: sixMonthsAgo } },
      select: { createdAt: true, status: true, totalPrice: true },
      orderBy: { createdAt: 'asc' },
    }),
    prisma.newsletterSubscriber.count({ where: { tenantId } }),
    prisma.mediaAsset.count({ where: { tenantId } }),
  ]);

  // Aggregate by month
  const monthMap = new Map<string, { count: number; revenue: number }>();
  for (let i = 5; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    const key = d.toLocaleString('default', { month: 'short' });
    monthMap.set(key, { count: 0, revenue: 0 });
  }

  for (const b of allBookings) {
    const key = new Date(b.createdAt).toLocaleString('default', { month: 'short' });
    if (monthMap.has(key)) {
      const m = monthMap.get(key)!;
      m.count++;
      if (b.status === 'CONFIRMED' || b.status === 'COMPLETED' || b.status === 'DEPOSIT_PAID') {
        m.revenue += b.totalPrice ?? 0;
      }
    }
  }

  const chartData = Array.from(monthMap.entries()).map(([month, stats]) => ({ month, ...stats }));

  const totalRevenue = allBookings.reduce((sum, b) => {
    if (['CONFIRMED', 'COMPLETED', 'DEPOSIT_PAID'].includes(b.status)) return sum + (b.totalPrice ?? 0);
    return sum;
  }, 0);

  const conversionRate = allBookings.length > 0
    ? Math.round((allBookings.filter((b) => ['CONFIRMED', 'COMPLETED', 'DEPOSIT_PAID'].includes(b.status)).length / allBookings.length) * 100)
    : 0;

  const statCards = [
    { label: 'Bookings (6mo)', value: allBookings.length },
    { label: 'Revenue (6mo)', value: `₦${(totalRevenue / 1000).toFixed(0)}k` },
    { label: 'Conversion Rate', value: `${conversionRate}%` },
    { label: 'Newsletter Subs', value: subscribers },
    { label: 'Media Assets', value: mediaCount },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="mt-1 text-sm text-white/40">Last 6 months performance</p>
      </div>

      {/* Stat cards */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {statCards.map((s) => (
          <div key={s.label} className="rounded-xl border p-5" style={{ background: 'var(--cv-surface)', borderColor: 'var(--cv-border)' }}>
            <p className="text-xs text-white/40">{s.label}</p>
            <p className="mt-2 text-2xl font-bold text-white">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="rounded-2xl border p-6" style={{ background: 'var(--cv-surface)', borderColor: 'var(--cv-border)' }}>
        <BookingChart data={chartData} />
      </div>

      {/* Booking status breakdown */}
      <div className="mt-6 rounded-2xl border p-6" style={{ background: 'var(--cv-surface)', borderColor: 'var(--cv-border)' }}>
        <h2 className="mb-4 text-sm font-semibold text-white/50 uppercase tracking-widest">Booking Status Breakdown</h2>
        {(['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'] as const).map((status) => {
          const count = allBookings.filter((b) => b.status === status).length;
          const pct = allBookings.length > 0 ? Math.round((count / allBookings.length) * 100) : 0;
          const colors: Record<string, string> = {
            PENDING: '#eab308', CONFIRMED: '#3b82f6', COMPLETED: '#22c55e', CANCELLED: '#ef4444',
          };
          return (
            <div key={status} className="mb-3">
              <div className="mb-1 flex justify-between text-xs">
                <span className="text-white/50">{status}</span>
                <span className="text-white/40">{count} ({pct}%)</span>
              </div>
              <div className="h-2 rounded-full" style={{ background: 'var(--cv-elevated)' }}>
                <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: colors[status] }} />
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-6 text-center text-xs text-white/20">
        Upgrade to{' '}
        <Link href="/billing" className="underline hover:text-white">Pro</Link>
        {' '}for advanced audience analytics and streaming performance data.
      </p>
    </div>
  );
}
