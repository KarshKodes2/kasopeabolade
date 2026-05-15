import { redirect } from 'next/navigation';
import { auth } from '@/shared/lib/auth';
import { DashboardSidebar } from '@/features/dashboard';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Dashboard — CrowdVibe' };

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect('/auth/signin');

  return (
    <div className="flex min-h-screen" style={{ background: 'var(--cv-bg)' }}>
      <DashboardSidebar userName={session.user?.name ?? session.user?.email} />
      <main className="flex-1 overflow-auto p-6 pt-20 md:p-8 md:pt-8">{children}</main>
    </div>
  );
}
