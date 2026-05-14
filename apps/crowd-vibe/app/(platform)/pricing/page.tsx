import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Pricing — CrowdVibe' };

const plans = [
  {
    name: 'Free',
    price: '₦0',
    period: 'forever',
    description: 'Get started. No card required.',
    features: [
      '1 booking per month',
      'Basic public site',
      'CrowdVibe subdomain',
      'Email notifications',
    ],
    cta: 'Start free',
    href: '/auth/signup',
    featured: false,
  },
  {
    name: 'Starter',
    price: '₦15,000',
    period: 'per month',
    description: 'For DJs taking their first bookings seriously.',
    features: [
      'Unlimited bookings',
      'Paystack payments',
      'Custom subdomain',
      'Media hub (10GB)',
      'Basic analytics',
    ],
    cta: 'Start Starter',
    href: '/auth/signup?plan=starter',
    featured: false,
  },
  {
    name: 'Pro',
    price: '₦35,000',
    period: 'per month',
    description: 'For working entertainers building a real business.',
    features: [
      'Everything in Starter',
      'Custom domain',
      'Stripe + Paystack',
      'Unlimited media',
      'Digital press kit',
      'Advanced analytics',
      'Priority support',
    ],
    cta: 'Go Pro',
    href: '/auth/signup?plan=pro',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For agencies and entertainment companies managing multiple artists.',
    features: [
      'Multiple artists',
      'White-label branding',
      'Dedicated support',
      'Custom integrations',
      'SLA guarantee',
    ],
    cta: 'Contact us',
    href: 'mailto:hello@crowdvibe.io',
    featured: false,
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen px-6 py-24" style={{ background: 'var(--cv-bg)' }}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">Simple, transparent pricing</h1>
          <p className="text-white/50">Start free. Upgrade when you&apos;re ready.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="relative flex flex-col rounded-2xl border p-6"
              style={{
                background: plan.featured ? 'rgba(124,58,237,0.1)' : 'var(--cv-surface)',
                borderColor: plan.featured ? 'var(--cv-brand)' : 'var(--cv-border)',
                boxShadow: plan.featured ? '0 0 30px var(--cv-glow)' : undefined,
              }}
            >
              {plan.featured && (
                <span
                  className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs font-semibold text-white"
                  style={{ background: 'var(--cv-brand)' }}
                >
                  Most popular
                </span>
              )}
              <div className="mb-6">
                <h2 className="mb-1 text-lg font-bold text-white">{plan.name}</h2>
                <p className="text-sm text-white/40">{plan.description}</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                {plan.period && (
                  <span className="ml-1 text-sm text-white/40">/{plan.period}</span>
                )}
              </div>
              <ul className="mb-8 flex-1 space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-white/60">
                    <span style={{ color: 'var(--cv-accent)' }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={plan.href}
                className="block rounded-lg py-2.5 text-center text-sm font-semibold transition-all"
                style={{
                  background: plan.featured ? 'var(--cv-brand)' : 'var(--cv-elevated)',
                  color: 'white',
                  border: plan.featured ? 'none' : '1px solid var(--cv-border)',
                }}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
