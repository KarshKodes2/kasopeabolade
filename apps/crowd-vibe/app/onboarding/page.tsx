import { auth } from '@/shared/lib/auth';
import { redirect } from 'next/navigation';
import { OnboardingWizard } from '@/features/onboarding';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Set up your site — CrowdVibe' };

export default async function OnboardingPage() {
  const session = await auth();
  if (!session) redirect('/auth/signin');
  if (session.user?.tenantId) redirect('/dashboard');

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center px-6 py-16"
      style={{ background: 'var(--cv-bg)' }}
    >
      <div className="mb-10 text-center">
        <span className="text-2xl font-black text-gradient">CrowdVibe</span>
        <p className="mt-2 text-sm text-white/40">Let's build your entertainment platform.</p>
      </div>
      <OnboardingWizard />
    </main>
  );
}
