import { auth } from '@/shared/lib/auth';
import { prisma } from '@/shared/lib/prisma';
import { redirect } from 'next/navigation';
import { TenantSettingsForm } from '@/components/dashboard/TenantSettingsForm';

export default async function SettingsPage() {
  const session = await auth();
  if (!session) redirect('/auth/signin');

  const tenantId = session.user?.tenantId as string | null;

  const tenant = tenantId
    ? await prisma.tenant.findUnique({ where: { id: tenantId } })
    : null;

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Site Settings</h1>
        <p className="mt-1 text-sm text-white/40">Customise your public booking site.</p>
      </div>
      <TenantSettingsForm tenant={tenant} />
    </div>
  );
}
