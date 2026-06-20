'use client'

import { motion } from 'framer-motion'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { GlowButton } from '@/components/ui/GlowButton'
import { useScrollAnimation, fadeUpVariants } from '@/hooks/useScrollAnimation'
import { personal } from '@/lib/data'

const socials = [
  { label: 'GitHub',   href: personal.github,   external: true },
  { label: 'LinkedIn', href: personal.linkedin,  external: true },
  { label: 'Email',    href: `mailto:${personal.email}`, external: false },
]

export function Contact() {
  const { ref, controls } = useScrollAnimation()

  return (
    <section id="contact" className="section-padding bg-[var(--bg-2)] relative overflow-hidden">
      {/* Pulsing blue glow at bottom */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, var(--glow-blue) 0%, transparent 70%)', filter: 'blur(40px)' }}
      />

      <div className="container-xl relative z-10">
        <SectionTitle
          label="Get In Touch"
          title="Let's Build Something"
          align="center"
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={fadeUpVariants}
          className="max-w-2xl mx-auto"
        >
          <div className="glass-gold rounded-[var(--radius-lg)] p-10 text-center flex flex-col items-center gap-6">
            <span className="text-5xl">👋</span>
            <h3 className="text-2xl font-bold text-[var(--text-1)]">Available for opportunities</h3>
            <p className="text-[var(--text-2)] leading-relaxed max-w-lg">
              Whether it&apos;s a full-time role, a contract project, or a technical consultation — I&apos;d love to hear about it.
              Let&apos;s talk about what you&apos;re building.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <GlowButton href={`mailto:${personal.email}`} variant="primary" size="lg">
                Send Email
              </GlowButton>
              <GlowButton href={personal.linkedin} variant="gold" size="lg" target="_blank" rel="noopener noreferrer">
                LinkedIn ↗
              </GlowButton>
            </div>
          </div>

          {/* Social pills */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {socials.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target={s.external ? '_blank' : undefined}
                rel={s.external ? 'noopener noreferrer' : undefined}
                whileHover={{ y: -4, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="glass px-5 py-2.5 rounded-full text-sm font-medium text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors"
              >
                {s.label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
