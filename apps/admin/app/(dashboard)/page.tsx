import { prisma } from 'db';

export default async function AdminOverviewPage() {
  const [tenantCount, bookingCount, leadCount, projectCount] = await Promise.all([
    prisma.tenant.count(),
    prisma.booking.count(),
    prisma.lead.count(),
    prisma.project.count(),
  ]);

  const pendingBookings = await prisma.booking.count({ where: { status: 'PENDING' } });
  const newLeads = await prisma.lead.count({ where: { status: 'NEW' } });

  const stats = [
    { label: 'CrowdVibe Tenants', value: tenantCount, sub: 'active accounts', color: 'var(--cv-brand)' },
    { label: 'Total Bookings', value: bookingCount, sub: `${pendingBookings} pending`, color: '#F59E0B' },
    { label: 'Leads (Karsh Core)', value: leadCount, sub: `${newLeads} new`, color: 'var(--cv-accent)' },
    { label: 'Portfolio Projects', value: projectCount, sub: 'published', color: '#8B5CF6' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Command Center</h1>
        <p className="mt-1 text-sm text-white/40">Karsh Core Solutions — all products in one view.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border p-5" style={{ background: 'var(--cv-surface)', borderColor: 'var(--cv-border)' }}>
            <div className="mb-1 h-1.5 w-8 rounded-full" style={{ background: s.color }} />
            <p className="mt-3 text-3xl font-bold text-white">{s.value}</p>
            <p className="mt-1 text-sm font-medium text-white">{s.label}</p>
            <p className="text-xs text-white/30">{s.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
