import Link from 'next/link';
import type { Metadata } from 'next';
import { PlatformNav } from '@/shared/components/layout/PlatformNav';

export const metadata: Metadata = {
  title: 'CrowdVibe — Power the Crowd. Own the Vibe.',
  description: 'The all-in-one SaaS platform for DJs, MCs, and entertainers. Automate bookings, accept payments, showcase your brand.',
};

const features = [
  { icon: '🎯', title: 'Smart Booking Engine', desc: 'Multi-step wizard with real-time availability, instant client confirmations, and auto-generated invoices.' },
  { icon: '💳', title: 'Built-in Payments', desc: 'Accept deposits via Paystack (₦ Nigeria) or Stripe ($ International). Zero setup hassle.' },
  { icon: '📅', title: 'Google Calendar Sync', desc: 'Confirmed bookings automatically appear in your Google Calendar. Never double-book again.' },
  { icon: '🎵', title: 'Media Hub', desc: 'Host mixes, promo videos, and photos. Waveform players. Cloudinary-powered. Zero storage limits.' },
  { icon: '🌐', title: 'Custom Domain', desc: 'Use djrandyuniverse.com. Fully branded. No CrowdVibe watermark on your public site.' },
  { icon: '📄', title: 'Digital Press Kit', desc: 'Auto-generated EPK with bio, gallery, stats, and downloadable press assets.' },
];

const stats = [
  { value: '500+', label: 'Entertainers' },
  { value: '₦50M+', label: 'Revenue processed' },
  { value: '3,200+', label: 'Bookings completed' },
  { value: '4.9★', label: 'Average rating' },
];

const testimonials = [
  { name: 'DJ Randy Universe', handle: '@djrandyuniverse', text: 'CrowdVibe turned my weekend inquiries into confirmed, paid bookings. My revenue doubled in 3 months.' },
  { name: 'MC Hype Lagos', handle: '@mchypelagos', text: 'The booking system handles everything — invoice, calendar, payment. I just show up and perform.' },
  { name: 'DJ Kasope', handle: '@djkasope', text: 'My custom domain, my brand, my bookings. CrowdVibe is built for African entertainers.' },
];

const plans = [
  { name: 'Starter', price: '₦5,000', period: '/mo', desc: 'For new entertainers', features: ['Booking wizard', 'Public site', '5 media uploads', 'Email notifications'] },
  { name: 'Pro', price: '₦15,000', period: '/mo', desc: 'For growing artists', features: ['Everything in Starter', 'Custom domain', 'Unlimited media', 'Google Calendar sync', 'PDF invoices', 'Priority support'], highlight: true },
  { name: 'Enterprise', price: 'Custom', period: '', desc: 'For labels & agencies', features: ['Multiple artists', 'White-label', 'Dedicated support', 'Custom integrations'] },
];

export default function PlatformLanding() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--cv-bg)' }}>
      <PlatformNav />

      {/* Hero */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 text-center">
        {/* Glow layers */}
        <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(124,58,237,0.25), transparent)' }} />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-64" style={{ background: 'linear-gradient(to top, var(--cv-bg), transparent)' }} />

        <div className="relative z-10 max-w-4xl">
          <span
            className="mb-6 inline-block rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase"
            style={{ background: 'rgba(124,58,237,0.15)', color: 'var(--cv-brand)', border: '1px solid rgba(124,58,237,0.3)' }}
          >
            Built for African Entertainers
          </span>
          <h1 className="mb-6 text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="block text-white">Power the Crowd.</span>
            <span className="block text-gradient">Own the Vibe.</span>
          </h1>
          <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg">
            The all-in-one platform for DJs, MCs, and entertainers — automated bookings, built-in payments, Google Calendar sync, and your own branded site under your domain.
          </p>
          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
            <Link
              href="/auth/signup"
              className="rounded-xl px-8 py-4 text-base font-bold text-white transition-all hover:opacity-90 glow-brand"
              style={{ background: 'var(--cv-brand)' }}
            >
              Start free — no card required
            </Link>
            <Link
              href="/site/dj-karsh"
              className="rounded-xl border border-white/10 px-8 py-4 text-base font-medium text-white/60 transition-all hover:border-white/25 hover:text-white"
            >
              See a live demo →
            </Link>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-10 flex flex-col items-center gap-2 text-white/20">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="h-8 w-px animate-bounce" style={{ background: 'var(--cv-brand)' }} />
        </div>
      </section>

      {/* Stats bar */}
      <div className="border-y" style={{ borderColor: 'var(--cv-border)', background: 'var(--cv-surface)' }}>
        <div className="mx-auto grid max-w-4xl grid-cols-2 divide-x divide-y md:grid-cols-4 md:divide-y-0" style={{ '--tw-divide-opacity': 1, borderColor: 'var(--cv-border)' } as React.CSSProperties}>
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center justify-center py-8">
              <span className="text-3xl font-black text-white">{s.value}</span>
              <span className="mt-1 text-xs text-white/40">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-16 text-center">
          <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">Everything you need to run your entertainment business</h2>
          <p className="text-white/40">One platform. Zero friction. Full ownership.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border p-6 transition-all duration-200 hover:border-[var(--cv-brand)] hover:-translate-y-0.5"
              style={{ background: 'var(--cv-surface)', borderColor: 'var(--cv-border)' }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-2xl" style={{ background: 'rgba(124,58,237,0.1)' }}>
                {f.icon}
              </div>
              <h3 className="mb-2 font-semibold text-white">{f.title}</h3>
              <p className="text-sm leading-relaxed text-white/45">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-y px-6 py-20" style={{ borderColor: 'var(--cv-border)', background: 'var(--cv-surface)' }}>
        <h2 className="mb-12 text-center text-2xl font-bold text-white">Trusted by entertainers across Africa</h2>
        <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.handle}
              className="rounded-2xl border p-6"
              style={{ background: 'var(--cv-elevated)', borderColor: 'var(--cv-border)' }}
            >
              <p className="mb-5 text-sm leading-relaxed text-white/65">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white" style={{ background: 'var(--cv-brand)' }}>
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-white/35">{t.handle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <div className="mb-16 text-center">
          <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">Simple, transparent pricing</h2>
          <p className="text-white/40">Start free. Scale as you grow.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="relative rounded-2xl border p-6"
              style={{
                background: plan.highlight ? 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(245,158,11,0.05))' : 'var(--cv-surface)',
                borderColor: plan.highlight ? 'var(--cv-brand)' : 'var(--cv-border)',
              }}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs font-bold text-white" style={{ background: 'var(--cv-brand)' }}>
                  Most popular
                </span>
              )}
              <p className="mb-1 text-sm text-white/40">{plan.desc}</p>
              <p className="mb-1 text-lg font-bold text-white">{plan.name}</p>
              <div className="mb-5 flex items-end gap-1">
                <span className="text-3xl font-black text-white">{plan.price}</span>
                {plan.period && <span className="mb-0.5 text-sm text-white/40">{plan.period}</span>}
              </div>
              <ul className="mb-6 space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-white/60">
                    <span className="text-green-400">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/auth/signup"
                className="block rounded-xl py-2.5 text-center text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ background: plan.highlight ? 'var(--cv-brand)' : 'var(--cv-elevated)', border: plan.highlight ? 'none' : '1px solid var(--cv-border)' }}
              >
                Get started
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden px-6 py-24 text-center">
        <div className="pointer-events-none absolute inset-0 opacity-10" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, var(--cv-brand), transparent)' }} />
        <div className="relative z-10">
          <h2 className="mb-4 text-3xl font-black text-white md:text-5xl">Ready to own your entertainment business?</h2>
          <p className="mb-10 text-white/45">Join DJs, MCs, and entertainers building their brand on CrowdVibe.</p>
          <Link
            href="/auth/signup"
            className="inline-block rounded-xl px-10 py-4 text-base font-bold text-white transition-all hover:opacity-90 glow-brand"
            style={{ background: 'var(--cv-brand)' }}
          >
            Get started free →
          </Link>
        </div>
      </section>

      <footer className="border-t px-6 py-8 text-center" style={{ borderColor: 'var(--cv-border)' }}>
        <p className="text-sm text-white/25">© {new Date().getFullYear()} CrowdVibe by Karsh Core Solutions. All rights reserved.</p>
      </footer>
    </main>
  );
}
