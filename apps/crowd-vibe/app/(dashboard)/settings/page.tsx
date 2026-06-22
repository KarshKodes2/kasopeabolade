import { auth } from '@/shared/lib/auth';
import { prisma } from '@/shared/lib/prisma';
import { redirect } from 'next/navigation';
import { TenantSettingsForm } from '@/features/tenants';
import { GoogleCalendarConnect } from '@/features/calendar/components/GoogleCalendarConnect';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Settings' };

export default async function SettingsPage({ searchParams }: { searchParams: Promise<{ calendar?: string }> }) {
  const session = await auth();
  if (!session) redirect('/auth/signin');

  const tenantId = session.user?.tenantId as string | null;
  const { calendar } = await searchParams;

  const tenant = tenantId
    ? await prisma.tenant.findUnique({ where: { id: tenantId } })
    : null;

  const calendarConnected = !!tenant?.googleCalendarId;

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Site Settings</h1>
        <p className="mt-1 text-sm text-white/40">Customise your public booking site.</p>
      </div>

      <TenantSettingsForm tenant={tenant} />

      {/* Google Calendar integration */}
      <div
        className="mt-8 rounded-2xl border p-6"
        style={{ background: 'var(--cv-surface)', borderColor: 'var(--cv-border)' }}
      >
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-white">Google Calendar</h2>
            <p className="mt-0.5 text-sm text-white/40">
              Confirmed bookings are automatically added to your calendar.
            </p>
          </div>
          <span
            className="rounded-full px-2.5 py-0.5 text-xs font-medium"
            style={{
              background: calendarConnected ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.06)',
              color: calendarConnected ? '#22c55e' : 'rgba(255,255,255,0.3)',
            }}
          >
            {calendarConnected ? 'Connected' : 'Not connected'}
          </span>
        </div>

        {calendar === 'connected' && (
          <p className="mb-4 rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-2.5 text-sm text-green-400">
            Google Calendar connected successfully.
          </p>
        )}
        {calendar === 'error' && (
          <p className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
            Could not connect Google Calendar. Please try again.
          </p>
        )}

        <GoogleCalendarConnect connected={calendarConnected} />
      </div>
    </div>
  );
}
