'use client';

import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Calendar, CreditCard, Globe, FileText, Image, BarChart3 } from 'lucide-react';

const features = [
  {
    id: 'bookings',
    icon: Calendar,
    title: 'Smart Booking Engine',
    desc: 'Multi-step booking wizard with real-time availability, client confirmations, deposit collection, and auto-generated invoices sent immediately after payment.',
    highlight: 'No more back-and-forth DMs to confirm a gig.',
    color: '#7C3AED',
    preview: {
      label: 'Live booking wizard',
      lines: [
        { w: '60%', label: 'Event Type' },
        { w: '80%', label: 'Date & Time' },
        { w: '50%', label: 'Venue' },
        { w: '70%', label: 'Client Details' },
      ],
    },
  },
  {
    id: 'payments',
    icon: CreditCard,
    title: 'Built-in Payments',
    desc: 'Accept deposits and full payments via Paystack (₦ Nigeria) or Stripe (international). Funds land directly in your account. Zero middleman.',
    highlight: 'Nigerian naira and international currencies, both supported.',
    color: '#F59E0B',
    preview: {
      label: 'Payment dashboard',
      lines: [
        { w: '90%', label: '₦45,000 deposit received' },
        { w: '65%', label: 'Invoice #0042 sent' },
        { w: '78%', label: '$250 via Stripe' },
        { w: '55%', label: 'Payout scheduled' },
      ],
    },
  },
  {
    id: 'domain',
    icon: Globe,
    title: 'Custom Domain',
    desc: 'Point yourname.com straight to your CrowdVibe site. Full SSL, no watermarks, and your visitors never see "crowdvibe" in the URL.',
    highlight: 'Your brand. Your domain. Your audience.',
    color: '#3B82F6',
    preview: {
      label: 'Domain settings',
      lines: [
        { w: '85%', label: 'djrandyuniverse.com → ✓ Live' },
        { w: '60%', label: 'SSL certificate active' },
        { w: '70%', label: 'CDN edge: Lagos, London, NYC' },
        { w: '45%', label: '0ms domain resolution' },
      ],
    },
  },
  {
    id: 'epk',
    icon: FileText,
    title: 'Digital Press Kit',
    desc: 'Auto-generated EPK with your bio, stats, gallery highlights, and downloadable assets — ready to send to event promoters, media, and venues.',
    highlight: 'One shareable link. Everything they need to book you.',
    color: '#10B981',
    preview: {
      label: 'Press kit preview',
      lines: [
        { w: '75%', label: 'Bio & career highlights' },
        { w: '90%', label: 'Performance stats' },
        { w: '60%', label: 'Press photos (4 assets)' },
        { w: '80%', label: 'Booking contact embedded' },
      ],
    },
  },
  {
    id: 'media',
    icon: Image,
    title: 'Media Hub',
    desc: 'Upload mixes, promo videos, event photos, and press images. Waveform audio players. Cloudinary-powered for instant global delivery.',
    highlight: 'No compression. No storage limits. Just your best work.',
    color: '#EC4899',
    preview: {
      label: 'Media library',
      lines: [
        { w: '95%', label: '48 files · 2.1 GB used' },
        { w: '70%', label: 'Mix — Afrobeats Session.mp3' },
        { w: '80%', label: 'Promo Video 2025.mp4' },
        { w: '55%', label: '12 event photos uploaded' },
      ],
    },
  },
  {
    id: 'analytics',
    icon: BarChart3,
    title: 'Analytics',
    desc: 'See who visits your site, which pages they land on, where they come from, and how many bookings you convert. All in your dashboard.',
    highlight: 'Know your audience. Grow your brand.',
    color: '#6366F1',
    preview: {
      label: 'Analytics overview',
      lines: [
        { w: '88%', label: '1,240 site visits this month' },
        { w: '64%', label: '62% from Instagram referral' },
        { w: '75%', label: '18 booking form opens' },
        { w: '50%', label: '9 converted to paid bookings' },
      ],
    },
  },
];

const fadeIn: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, type: 'tween', ease: 'easeOut' } },
};

export function FeatureShowcase() {
  const [active, setActive] = useState(features[0].id);
  const current = features.find((f) => f.id === active) ?? features[0];
  const Icon = current.icon;

  return (
    <section id="features" className="px-6 py-24 mx-auto max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, type: 'tween', ease: 'easeOut' }}
        className="mb-14 text-center"
      >
        <span
          className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold tracking-widest uppercase"
          style={{ background: 'rgba(124,58,237,0.12)', color: 'var(--cv-brand)', border: '1px solid rgba(124,58,237,0.25)' }}
        >
          Features
        </span>
        <h2 className="mt-4 text-3xl font-black text-white md:text-4xl">
          Everything your business needs
        </h2>
        <p className="mt-3 text-base" style={{ color: 'rgba(255,255,255,0.4)' }}>
          One platform. Zero friction. Full ownership.
        </p>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
        {/* Feature selector */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: 'tween', ease: 'easeOut' }}
          className="flex flex-col gap-2"
        >
          {features.map((f) => {
            const FIcon = f.icon;
            const isActive = active === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setActive(f.id)}
                className="flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-150"
                style={{
                  background: isActive ? `${f.color}12` : 'transparent',
                  borderColor: isActive ? f.color : 'var(--cv-border)',
                }}
              >
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                  style={{ background: `${f.color}18` }}
                >
                  <FIcon size={15} style={{ color: f.color }} />
                </div>
                <span
                  className="text-sm font-semibold"
                  style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.5)' }}
                >
                  {f.title}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Feature detail panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, type: 'tween', ease: 'easeOut' }}
            className="rounded-2xl border p-8"
            style={{ background: 'var(--cv-surface)', borderColor: 'var(--cv-border)' }}
          >
            <div className="flex items-start gap-4 mb-6">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                style={{ background: `${current.color}18`, border: `1px solid ${current.color}30` }}
              >
                <Icon size={22} style={{ color: current.color }} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{current.title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {current.desc}
                </p>
              </div>
            </div>

            {/* Highlight callout */}
            <div
              className="mb-6 rounded-xl px-4 py-3 text-sm font-medium"
              style={{ background: `${current.color}10`, borderLeft: `3px solid ${current.color}`, color: current.color }}
            >
              {current.highlight}
            </div>

            {/* Mock preview */}
            <div
              className="rounded-xl border p-5"
              style={{ background: 'var(--cv-elevated)', borderColor: 'var(--cv-border)' }}
            >
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.25)' }}>
                {current.preview.label}
              </p>
              <div className="space-y-3">
                {current.preview.lines.map((line, i) => (
                  <motion.div
                    key={i}
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: i * 0.07 }}
                    className="flex items-center gap-3"
                  >
                    <div
                      className="h-2.5 rounded-full"
                      style={{ width: line.w, background: `linear-gradient(90deg, ${current.color}55, ${current.color}22)` }}
                    />
                    <span className="text-xs shrink-0" style={{ color: 'rgba(255,255,255,0.3)' }}>{line.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
