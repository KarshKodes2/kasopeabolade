import { auth } from '../../../lib/auth';

export const metadata = { title: 'Settings' };

export default async function SettingsPage() {
  const session = await auth();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--cv-text)' }}>Settings</h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--cv-text-secondary)' }}>
          Platform configuration and account settings.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Account */}
        <div className="admin-card p-6">
          <h2 className="mb-4 text-base font-semibold" style={{ color: 'var(--cv-text)' }}>
            Account
          </h2>
          <div className="space-y-3">
            <div>
              <p className="text-xs" style={{ color: 'var(--cv-text-muted)' }}>Name</p>
              <p className="mt-0.5 text-sm" style={{ color: 'var(--cv-text)' }}>{session?.user?.name ?? '—'}</p>
            </div>
            <div>
              <p className="text-xs" style={{ color: 'var(--cv-text-muted)' }}>Email</p>
              <p className="mt-0.5 text-sm" style={{ color: 'var(--cv-text)' }}>{session?.user?.email ?? '—'}</p>
            </div>
            <div>
              <p className="text-xs" style={{ color: 'var(--cv-text-muted)' }}>Role</p>
              <p className="mt-0.5 text-sm font-medium" style={{ color: 'var(--cv-brand-light)' }}>
                {/* @ts-expect-error extended */}
                {session?.user?.role ?? '—'}
              </p>
            </div>
          </div>
        </div>

        {/* Platform */}
        <div className="admin-card p-6">
          <h2 className="mb-4 text-base font-semibold" style={{ color: 'var(--cv-text)' }}>
            Platform
          </h2>
          <div className="space-y-3">
            {[
              { key: 'CrowdVibe Domain', val: 'crowdvibe.io' },
              { key: 'Admin Port', val: '3001 (dev)' },
              { key: 'Database', val: 'PostgreSQL + Prisma 6' },
              { key: 'Auth', val: 'NextAuth.js v5 + GitHub OAuth' },
            ].map(({ key, val }) => (
              <div key={key}>
                <p className="text-xs" style={{ color: 'var(--cv-text-muted)' }}>{key}</p>
                <p className="mt-0.5 text-sm" style={{ color: 'var(--cv-text-secondary)' }}>{val}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
