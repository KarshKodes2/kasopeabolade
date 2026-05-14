import { prisma } from 'db';

export default async function AllBookingsPage() {
  const bookings = await prisma.booking.findMany({
    include: { tenant: { select: { name: true, slug: true } } },
    orderBy: { eventDate: 'asc' },
    take: 100,
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">All Bookings</h1>
        <p className="mt-1 text-sm text-white/40">{bookings.length} total across all tenants</p>
      </div>

      <div className="overflow-x-auto rounded-xl border" style={{ borderColor: 'var(--cv-border)' }}>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-xs text-white/40" style={{ borderColor: 'var(--cv-border)', background: 'var(--cv-surface)' }}>
              {['Tenant', 'Client', 'Event', 'Date', 'Status'].map((h) => (
                <th key={h} className="px-4 py-3 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody style={{ background: 'var(--cv-surface)' }}>
            {bookings.map((b) => (
              <tr key={b.id} className="border-b last:border-0" style={{ borderColor: 'var(--cv-border)' }}>
                <td className="px-4 py-3 text-white/60">{b.tenant.name}</td>
                <td className="px-4 py-3 text-white">{b.clientName}</td>
                <td className="px-4 py-3 text-white/60">{b.eventType.replace(/_/g, ' ')}</td>
                <td className="px-4 py-3 text-white/60">{new Date(b.eventDate).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full px-2 py-0.5 text-xs font-medium bg-white/10 text-white/60">{b.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
