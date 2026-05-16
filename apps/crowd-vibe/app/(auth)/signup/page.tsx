import { signIn } from '@/shared/lib/auth';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Create your account — CrowdVibe' };

export default function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  return (
    <main
      className="flex min-h-screen items-center justify-center px-6"
      style={{ background: 'var(--cv-bg)' }}
    >
      <div
        className="w-full max-w-sm rounded-2xl border p-8"
        style={{ background: 'var(--cv-surface)', borderColor: 'var(--cv-border)' }}
      >
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-white">Power the Crowd.</h1>
          <p className="mt-1 text-sm text-white/50">
            Create your CrowdVibe account. Free, no card required.
          </p>
        </div>

        <form
          action={async () => {
            'use server';
            await signIn('github', { redirectTo: '/onboarding' });
          }}
        >
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-3 rounded-xl py-3 text-sm font-semibold text-white transition-all hover:opacity-90 glow-brand"
            style={{ background: 'var(--cv-brand)' }}
          >
            <svg className="h-5 w-5 fill-white" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            Sign up with GitHub
          </button>
        </form>

        <div className="mt-6 rounded-xl border p-4 text-xs text-white/40" style={{ borderColor: 'var(--cv-border)' }}>
          <p className="font-medium text-white/60">What happens next:</p>
          <ol className="mt-2 list-decimal list-inside space-y-1">
            <li>Connect with GitHub (takes 10 seconds)</li>
            <li>Set up your DJ/artist profile</li>
            <li>Your booking site goes live instantly</li>
          </ol>
        </div>

        <p className="mt-4 text-center text-xs text-white/30">
          Already have an account?{' '}
          <a href="/auth/signin" className="underline hover:text-white">
            Sign in
          </a>
        </p>
      </div>
    </main>
  );
}
