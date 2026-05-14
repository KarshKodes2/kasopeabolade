import { prisma } from 'db';
import Link from 'next/link';

export default async function TenantsPage() {
  const tenants = await prisma.tenant.findMany({
    include: { _count: { select: { bookings: true } } },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">CrowdVibe Tenants</h1>
        <p className="mt-1 text-sm text-white/40">{tenants.length} registered artists</p>
      </div>

      <div className="overflow-x-auto rounded-xl border" style={{ borderColor: 'var(--cv-border)' }}>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-xs text-white/40" style={{ borderColor: 'var(--cv-border)', background: 'var(--cv-surface)' }}>
              {['Artist', 'Slug', 'Plan', 'Status', 'Bookings', 'Domain', 'Actions'].map((h) => (
                <th key={h} className="px-4 py-3 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody style={{ background: 'var(--cv-surface)' }}>
            {tenants.map((t) => (
              <tr key={t.id} className="border-b last:border-0 hover:bg-white/3" style={{ borderColor: 'var(--cv-border)' }}>
                <td className="px-4 py-3 font-medium text-white">{t.name}</td>
                <td className="px-4 py-3 text-white/50">/{t.slug}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full px-2 py-0.5 text-xs font-medium" style={{ background: 'rgba(37,99,235,0.15)', color: '#60a5fa' }}>{t.plan}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="rounded-full px-2 py-0.5 text-xs font-medium" style={{ background: t.status === 'ACTIVE' ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)', color: t.status === 'ACTIVE' ? '#10b981' : '#ef4444' }}>{t.status}</span>
                </td>
                <td className="px-4 py-3 text-white/70">{t._count.bookings}</td>
                <td className="px-4 py-3 text-white/40 text-xs">{t.customDomain ?? '—'}</td>
                <td className="px-4 py-3">
                  <Link href={`/dashboard/crowdvibe/tenants/${t.id}`} className="text-xs hover:text-white" style={{ color: 'var(--cv-brand)' }}>Manage →</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
