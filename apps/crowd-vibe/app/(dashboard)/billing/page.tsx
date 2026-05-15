import { auth } from '@/shared/lib/auth';
import { prisma } from 'db';
import { redirect } from 'next/navigation';

const PLAN_DETAILS = {
  FREE:       { label: 'Free',       price: '₦0',         color: '#6b7280' },
  STARTER:    { label: 'Starter',    price: '₦15,000/mo', color: '#3b82f6' },
  PRO:        { label: 'Pro',        price: '₦35,000/mo', color: '#8b5cf6' },
  ENTERPRISE: { label: 'Enterprise', price: 'Custom',      color: '#f59e0b' },
} as const;

const UPGRADE_PATH = {
  FREE:    ['STARTER', 'PRO', 'ENTERPRISE'],
  STARTER: ['PRO', 'ENTERPRISE'],
  PRO:     ['ENTERPRISE'],
  ENTERPRISE: [],
} as const;

export default async function BillingPage() {
  const session = await auth();
  if (!session?.user?.tenantId) redirect('/auth/signin');

  const tenant = await prisma.tenant.findUnique({
    where: { id: session.user.tenantId },
    include: { subscriptions: { take: 1, orderBy: { createdAt: 'desc' } } },
  });
  if (!tenant) redirect('/auth/signin');

  const plan = tenant.plan as keyof typeof PLAN_DETAILS;
  const details = PLAN_DETAILS[plan];
  const sub = tenant.subscriptions[0] ?? null;
  const upgradeTo = UPGRADE_PATH[plan] as readonly string[];

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Billing & Plan</h1>
        <p className="mt-1 text-sm text-white/40">Manage your CrowdVibe subscription</p>
      </div>

      <div className="mb-6 rounded-xl border p-6" style={{ background: 'var(--cv-surface)', borderColor: 'var(--cv-border)' }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-white/40 uppercase tracking-wider">Current Plan</p>
            <p className="mt-1 text-2xl font-bold" style={{ color: details.color }}>{details.label}</p>
            <p className="mt-0.5 text-sm text-white/50">{details.price}</p>
          </div>
          <div className="rounded-full px-4 py-1.5 text-sm font-semibold" style={{ background: `${details.color}22`, color: details.color }}>
            Active
          </div>
        </div>

        {sub && (
          <div className="mt-4 border-t pt-4" style={{ borderColor: 'var(--cv-border)' }}>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-white/40">Period ends</p>
                <p className="text-white">{sub.currentPeriodEnd ? new Date(sub.currentPeriodEnd).toLocaleDateString() : '—'}</p>
              </div>
              <div>
                <p className="text-white/40">Status</p>
                <p className="text-white capitalize">{sub.status.toLowerCase().replace('_', ' ')}</p>
              </div>
            </div>
            {sub.cancelAtPeriodEnd && (
              <p className="mt-3 text-xs text-amber-400">Your subscription will cancel at the end of the current period.</p>
            )}
          </div>
        )}
      </div>

      {upgradeTo.length > 0 && (
        <div className="mb-6">
          <p className="mb-3 text-sm font-medium text-white/60">Upgrade your plan</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {upgradeTo.map((p) => {
              const d = PLAN_DETAILS[p as keyof typeof PLAN_DETAILS];
              return (
                <div key={p} className="rounded-xl border p-5" style={{ background: 'var(--cv-surface)', borderColor: 'var(--cv-border)' }}>
                  <div className="flex items-center justify-between">
                    <p className="font-semibold" style={{ color: d.color }}>{d.label}</p>
                    <p className="text-sm text-white/60">{d.price}</p>
                  </div>
                  <form action={`/api/billing/checkout?plan=${p}`} method="POST" className="mt-4">
                    <button
                      type="submit"
                      className="w-full rounded-lg py-2 text-sm font-medium text-white"
                      style={{ background: `${d.color}33`, color: d.color, border: `1px solid ${d.color}44` }}
                    >
                      Upgrade to {d.label}
                    </button>
                  </form>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {sub?.stripeCustomerId && (
        <form action="/api/billing/portal" method="POST">
          <button type="submit" className="rounded-xl border px-4 py-2 text-sm text-white/60 hover:text-white transition-colors" style={{ borderColor: 'var(--cv-border)' }}>
            Manage billing in Stripe →
          </button>
        </form>
      )}
    </div>
  );
}
