'use client';

import { motion, type Variants } from 'framer-motion';

const stats = [
  { value: '500+', label: 'Active creators', color: '#7C3AED' },
  { value: '₦50M+', label: 'Revenue processed', color: '#F59E0B' },
  { value: '3,200+', label: 'Bookings completed', color: '#3B82F6' },
  { value: '4.9★', label: 'Average rating', color: '#10B981' },
];

const testimonials = [
  {
    name: 'DJ Randy Universe',
    handle: '@djrandyuniverse',
    type: 'Personal',
    text: 'CrowdVibe turned my weekend inquiries into confirmed, paid bookings. My revenue doubled in 3 months — I barely touch my DMs anymore.',
    initials: 'DR',
    color: '#7C3AED',
  },
  {
    name: 'Tolu Adeyemi',
    handle: '@toludev',
    type: 'Portfolio',
    text: 'I replaced my Notion portfolio with CrowdVibe in an afternoon. Clients actually reach out now — the booking flow converts way better than a PDF.',
    initials: 'TA',
    color: '#F59E0B',
  },
  {
    name: 'Apex Events Lagos',
    handle: '@apexevents',
    type: 'Corporate',
    text: 'We needed a site that looked as serious as our business. CrowdVibe\'s corporate template + custom domain made us look like a top-tier agency overnight.',
    initials: 'AE',
    color: '#3B82F6',
  },
];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, type: 'tween', ease: 'easeOut' } },
};

export function SocialProof() {
  return (
    <section style={{ background: 'var(--cv-surface)', borderTop: '1px solid var(--cv-border)', borderBottom: '1px solid var(--cv-border)' }}>
      {/* Stats bar */}
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 divide-x divide-y md:grid-cols-4 md:divide-y-0"
          style={{ borderColor: 'var(--cv-border)' }}
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={item}
              className="flex flex-col items-center justify-center py-10"
            >
              <span
                className="text-3xl font-black"
                style={{ color: s.color }}
              >
                {s.value}
              </span>
              <span className="mt-1.5 text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                {s.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Testimonials */}
      <div className="px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, type: 'tween', ease: 'easeOut' }}
          className="mb-12 text-center"
        >
          <h2 className="text-2xl font-black text-white md:text-3xl">
            Trusted by creators across Africa
          </h2>
          <p className="mt-2 text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Real users. Real results.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mx-auto grid max-w-4xl gap-5 md:grid-cols-3"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.handle}
              variants={item}
              className="rounded-2xl border p-6"
              style={{ background: 'var(--cv-elevated)', borderColor: 'var(--cv-border)' }}
            >
              <div className="mb-1 flex items-center gap-2">
                <span
                  className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                  style={{ background: `${t.color}18`, color: t.color, border: `1px solid ${t.color}30` }}
                >
                  {t.type}
                </span>
              </div>
              <p className="my-4 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ background: t.color }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>{t.handle}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
