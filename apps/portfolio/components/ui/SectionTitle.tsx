'use client'

import { motion } from 'framer-motion'
import { useScrollAnimation, fadeUpVariants } from '@/hooks/useScrollAnimation'

interface SectionTitleProps {
  label:     string
  title:     string
  subtitle?: string
  align?:    'left' | 'center'
}

export function SectionTitle({ label, title, subtitle, align = 'left' }: SectionTitleProps) {
  const { ref, controls } = useScrollAnimation()
  const isCenter = align === 'center'

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={fadeUpVariants}
      className={`mb-12 ${isCenter ? 'text-center' : 'text-left'}`}
    >
      <div className={`flex items-center gap-3 mb-4 ${isCenter ? 'justify-center' : ''}`}>
        <span className="w-6 h-px bg-[var(--gold)]" />
        <span
          className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--gold)]"
        >
          {label}
        </span>
        <span className="w-6 h-px bg-[var(--gold)]" />
      </div>

      <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-1)] leading-tight">
        {title}
      </h2>

      <div className={`mt-4 h-1 w-6 rounded-full bg-gradient-to-r from-[var(--blue)] to-[var(--gold)] ${isCenter ? 'mx-auto' : ''}`} />

      {subtitle && (
        <p className={`mt-5 text-[var(--text-2)] text-lg max-w-2xl ${isCenter ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
