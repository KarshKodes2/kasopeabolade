import { prisma } from 'db';
import { LeadsPageClient } from '../../../../features/leads/components/LeadsPageClient';

export const metadata = { title: 'Leads' };

export default async function LeadsPage() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: 'desc' } });
  const newCount = leads.filter((l) => l.status === 'NEW').length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--cv-text)' }}>Leads — Karsh Core</h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--cv-text-secondary)' }}>
          {leads.length} total · {newCount} new
        </p>
      </div>
      <LeadsPageClient leads={leads} />
    </div>
  );
}
