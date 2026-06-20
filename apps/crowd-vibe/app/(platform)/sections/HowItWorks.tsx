'use client';

import { motion, type Variants } from 'framer-motion';
import { UserPlus, LayoutTemplate, Globe } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Sign up free',
    desc: 'Create your account in under a minute. No credit card required. Your brand, your rules.',
    color: '#7C3AED',
  },
  {
    number: '02',
    icon: LayoutTemplate,
    title: 'Choose your site type',
    desc: 'Personal creator, professional portfolio, or corporate brand. Pick the template that fits.',
    color: '#F59E0B',
  },
  {
    number: '03',
    icon: Globe,
    title: 'Customize & publish',
    desc: 'Add your content, connect your domain, and go live. Bookings and payments ready from day one.',
    color: '#3B82F6',
  },
];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: 'tween', ease: 'easeOut' } },
};

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative px-6 py-24 overflow-hidden" style={{ background: 'var(--cv-surface)', borderTop: '1px solid var(--cv-border)', borderBottom: '1px solid var(--cv-border)' }}>
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: 'tween', ease: 'easeOut' }}
          className="mb-16 text-center"
        >
          <span
            className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold tracking-widest uppercase"
            style={{ background: 'rgba(124,58,237,0.12)', color: 'var(--cv-brand)', border: '1px solid rgba(124,58,237,0.25)' }}
          >
            How it works
          </span>
          <h2 className="mt-4 text-3xl font-black text-white md:text-4xl">
            Up and running in minutes
          </h2>
          <p className="mt-3 text-base" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Three steps from sign-up to a live, professional web presence.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="relative grid gap-8 md:grid-cols-3"
        >
          {/* Connector line — desktop only */}
          <div
            className="pointer-events-none absolute top-10 left-1/6 right-1/6 hidden h-px md:block"
            style={{ background: 'linear-gradient(90deg, var(--cv-border), rgba(124,58,237,0.5), var(--cv-border))' }}
          />

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                variants={item}
                className="relative flex flex-col items-center text-center"
              >
                {/* Step number */}
                <div className="relative mb-6">
                  <div
                    className="flex h-20 w-20 items-center justify-center rounded-2xl border"
                    style={{ background: `${step.color}14`, borderColor: `${step.color}35` }}
                  >
                    <Icon size={28} style={{ color: step.color }} />
                  </div>
                  <span
                    className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full text-xs font-black text-white"
                    style={{ background: step.color, fontSize: '10px' }}
                  >
                    {step.number}
                  </span>
                </div>
                <h3 className="mb-3 text-lg font-bold text-white">{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
