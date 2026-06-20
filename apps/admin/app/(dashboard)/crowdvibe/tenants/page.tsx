import { prisma } from 'db';
import { TenantsPageClient } from '../../../../features/tenants/components/TenantsPageClient';

export const metadata = { title: 'Tenants' };

export default async function TenantsPage() {
  const tenants = await prisma.tenant.findMany({
    include: { _count: { select: { bookings: true } } },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--cv-text)' }}>CrowdVibe Tenants</h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--cv-text-secondary)' }}>
          {tenants.length} registered {tenants.length === 1 ? 'tenant' : 'tenants'}
        </p>
      </div>
      <TenantsPageClient tenants={tenants} />
    </div>
  );
}
