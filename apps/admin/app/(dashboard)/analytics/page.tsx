import { prisma } from 'db';
import { AnalyticsCharts } from '../../../features/analytics/components/AnalyticsCharts';

export const metadata = { title: 'Analytics' };

async function getAnalyticsData() {
  const [
    tenantCount,
    bookingCount,
    leadCount,
    projectCount,
    bookingsByStatus,
    leadsByStatus,
    tenantsByPlan,
    recentBookings,
  ] = await Promise.all([
    prisma.tenant.count({ where: { status: 'ACTIVE' } }),
    prisma.booking.count(),
    prisma.lead.count(),
    prisma.project.count({ where: { published: true } }),
    prisma.booking.groupBy({ by: ['status'], _count: true }),
    prisma.lead.groupBy({ by: ['status'], _count: true }),
    prisma.tenant.groupBy({ by: ['plan'], _count: true }),
    prisma.booking.findMany({
      take: 6,
      orderBy: { createdAt: 'desc' },
      select: { createdAt: true, status: true, totalPrice: true },
    }),
  ]);

  return {
    tenantCount,
    bookingCount,
    leadCount,
    projectCount,
    bookingsByStatus,
    leadsByStatus,
    tenantsByPlan,
    recentBookings,
  };
}

export default async function AnalyticsPage() {
  const data = await getAnalyticsData();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--cv-text)' }}>Analytics</h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--cv-text-secondary)' }}>
          Platform-wide metrics across all products.
        </p>
      </div>

      {/* KPI row */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Active Tenants', value: data.tenantCount, color: 'var(--cv-brand)' },
          { label: 'Total Bookings', value: data.bookingCount, color: '#f59e0b' },
          { label: 'Leads', value: data.leadCount, color: 'var(--cv-accent)' },
          { label: 'Published Projects', value: data.projectCount, color: '#8b5cf6' },
        ].map((kpi) => (
          <div key={kpi.label} className="admin-card p-5">
            <div className="mb-3 h-1 w-8 rounded-full" style={{ background: kpi.color }} />
            <p className="text-3xl font-bold" style={{ color: 'var(--cv-text)', fontFamily: 'Sora, system-ui, sans-serif' }}>
              {kpi.value}
            </p>
            <p className="mt-1 text-sm" style={{ color: 'var(--cv-text-secondary)' }}>{kpi.label}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <AnalyticsCharts
        bookingsByStatus={data.bookingsByStatus.map((b) => ({ status: b.status, count: b._count }))}
        leadsByStatus={data.leadsByStatus.map((l) => ({ status: l.status, count: l._count }))}
        tenantsByPlan={data.tenantsByPlan.map((t) => ({ plan: t.plan, count: t._count }))}
      />
    </div>
  );
}
