import { redirect } from 'next/navigation';
import { auth } from '../../lib/auth';
import { SidebarProvider } from '../../shared/components/layout/SidebarProvider';

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect('/auth/signin');

  return (
    <SidebarProvider user={session.user ?? {}}>
      {children}
    </SidebarProvider>
  );
}
