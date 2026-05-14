import { prisma } from 'db';

const STATUS_STYLES: Record<string, { bg: string; text: string }> = {
  NEW:           { bg: 'rgba(59,130,246,0.15)',  text: '#60a5fa' },
  CONTACTED:     { bg: 'rgba(168,85,247,0.15)',  text: '#c084fc' },
  PROPOSAL_SENT: { bg: 'rgba(245,158,11,0.15)',  text: '#fbbf24' },
  NEGOTIATION:   { bg: 'rgba(249,115,22,0.15)',  text: '#fb923c' },
  WON:           { bg: 'rgba(16,185,129,0.15)',  text: '#34d399' },
  LOST:          { bg: 'rgba(239,68,68,0.15)',   text: '#f87171' },
};

export default async function LeadsPage() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: 'desc' } });
  const newCount = leads.filter((l) => l.status === 'NEW').length;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Leads — Karsh Core</h1>
          <p className="mt-1 text-sm text-white/40">{leads.length} total · {newCount} new</p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border" style={{ borderColor: 'var(--cv-border)' }}>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-xs text-white/40" style={{ borderColor: 'var(--cv-border)', background: 'var(--cv-surface)' }}>
              {['Contact', 'Company', 'Project Type', 'Budget', 'Status', 'Date'].map((h) => (
                <th key={h} className="px-4 py-3 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody style={{ background: 'var(--cv-surface)' }}>
            {leads.length === 0 ? (
              <tr><td colSpan={6} className="px-4 py-10 text-center text-white/30">No leads yet.</td></tr>
            ) : (
              leads.map((l) => {
                const s = STATUS_STYLES[l.status] ?? STATUS_STYLES.NEW;
                return (
                  <tr key={l.id} className="border-b last:border-0 hover:bg-white/3" style={{ borderColor: 'var(--cv-border)' }}>
                    <td className="px-4 py-3">
                      <p className="font-medium text-white">{l.contactName}</p>
                      <p className="text-xs text-white/30">{l.email}</p>
                    </td>
                    <td className="px-4 py-3 text-white/60">{l.companyName ?? '—'}</td>
                    <td className="px-4 py-3 text-white/60">{l.projectType}</td>
                    <td className="px-4 py-3 text-white/60">{l.budget ?? '—'}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full px-2 py-0.5 text-xs font-medium" style={{ background: s.bg, color: s.text }}>
                        {l.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-white/40 text-xs">{new Date(l.createdAt).toLocaleDateString()}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
