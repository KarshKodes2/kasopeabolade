import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CrowdVibe — Power the Crowd. Own the Vibe.',
  description: 'The all-in-one SaaS platform for DJs, MCs, and entertainers. Automate bookings, accept payments, showcase your brand.',
};

const features = [
  {
    icon: '🎯',
    title: 'Smart Booking Engine',
    desc: 'Automated multi-step booking flow with real-time availability and instant client confirmations.',
  },
  {
    icon: '💳',
    title: 'Built-in Payments',
    desc: 'Accept deposits via Paystack (Nigeria) or Stripe (international). Zero setup hassle.',
  },
  {
    icon: '🎵',
    title: 'Media Hub',
    desc: 'Host your mixes, videos, and photos. Beautiful waveform players. Zero storage limits.',
  },
  {
    icon: '📊',
    title: 'Business Analytics',
    desc: 'Track revenue, booking conversion rates, and audience engagement all in one dashboard.',
  },
  {
    icon: '🌐',
    title: 'Custom Domain',
    desc: 'Use your own domain (djrandyuniverse.com). Fully branded. Zero CrowdVibe branding on your site.',
  },
  {
    icon: '📄',
    title: 'Digital Press Kit',
    desc: 'Auto-generated EPK with bio, stats, gallery, and downloadable press assets for bookings.',
  },
];

const testimonials = [
  {
    name: 'DJ Randy Universe',
    handle: '@djrandyuniverse',
    text: 'CrowdVibe turned my weekend inquiries into confirmed, paid bookings. My revenue doubled in 3 months.',
  },
  {
    name: 'MC Hype Lagos',
    handle: '@mchypelagos',
    text: 'The booking system handles everything. I just show up and perform. Game changer for Nigeria.',
  },
];

export default function PlatformLanding() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--cv-bg)' }}>
      {/* Nav */}
      <nav className="fixed top-0 z-50 w-full glass border-b border-white/5">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="text-xl font-bold text-gradient font-display">CrowdVibe</span>
          <div className="flex items-center gap-4">
            <Link href="/pricing" className="text-sm text-white/60 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link
              href="/auth/signin"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/auth/signup"
              className="rounded-lg px-4 py-2 text-sm font-medium text-white transition-all"
              style={{ background: 'var(--cv-brand)' }}
            >
              Get started free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 text-center">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              'radial-gradient(ellipse 80% 50% at 50% -10%, var(--cv-brand), transparent)',
          }}
        />
        <div className="relative z-10 max-w-4xl">
          <p
            className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-medium tracking-wider uppercase"
            style={{ background: 'rgba(124,58,237,0.15)', color: 'var(--cv-brand)', border: '1px solid rgba(124,58,237,0.3)' }}
          >
            Built for African Entertainers
          </p>
          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight md:text-7xl">
            <span className="text-white">Power the Crowd.</span>
            <br />
            <span className="text-gradient">Own the Vibe.</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-white/60">
            CrowdVibe is the all-in-one platform for DJs, MCs, and entertainers. Automated bookings,
            built-in payments, media hub, and your own branded site — under your domain.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/auth/signup"
              className="rounded-xl px-8 py-4 text-base font-semibold text-white transition-all hover:opacity-90 glow-brand"
              style={{ background: 'var(--cv-brand)' }}
            >
              Start free — no card required
            </Link>
            <Link
              href="/site/dj-randy"
              className="rounded-xl border border-white/10 px-8 py-4 text-base font-medium text-white/70 transition-all hover:border-white/30 hover:text-white"
            >
              See a live example →
            </Link>
          </div>
        </div>
        <div className="mt-16 text-sm text-white/25">
          Powered by Karsh Core Solutions
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="mb-4 text-center text-3xl font-bold text-white md:text-4xl">
          Everything you need to run your entertainment business
        </h2>
        <p className="mb-16 text-center text-white/50">
          One platform. Zero friction. Full ownership.
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border p-6 transition-colors hover:border-[var(--cv-brand)]"
              style={{ background: 'var(--cv-surface)', borderColor: 'var(--cv-border)' }}
            >
              <div className="mb-3 text-3xl">{f.icon}</div>
              <h3 className="mb-2 text-base font-semibold text-white">{f.title}</h3>
              <p className="text-sm leading-relaxed text-white/50">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-y px-6 py-20" style={{ borderColor: 'var(--cv-border)', background: 'var(--cv-surface)' }}>
        <h2 className="mb-12 text-center text-2xl font-bold text-white">
          Trusted by entertainers across Africa
        </h2>
        <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <div
              key={t.handle}
              className="rounded-2xl border p-6"
              style={{ background: 'var(--cv-elevated)', borderColor: 'var(--cv-border)' }}
            >
              <p className="mb-4 text-sm leading-relaxed text-white/70">"{t.text}"</p>
              <div>
                <p className="text-sm font-semibold text-white">{t.name}</p>
                <p className="text-xs text-white/40">{t.handle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 text-center">
        <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
          Ready to own your entertainment business?
        </h2>
        <p className="mb-8 text-white/50">
          Join DJs, MCs, and entertainers building their brand on CrowdVibe.
        </p>
        <Link
          href="/auth/signup"
          className="inline-block rounded-xl px-10 py-4 text-base font-semibold text-white transition-all hover:opacity-90 glow-brand"
          style={{ background: 'var(--cv-brand)' }}
        >
          Get started free →
        </Link>
      </section>

      <footer className="border-t px-6 py-8 text-center text-sm text-white/25" style={{ borderColor: 'var(--cv-border)' }}>
        © {new Date().getFullYear()} CrowdVibe by Karsh Core Solutions. All rights reserved.
      </footer>
    </main>
  );
}
