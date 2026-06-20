'use client'

import { motion } from 'framer-motion'

type Variant = 'primary' | 'gold' | 'ghost'
type Size    = 'sm' | 'md' | 'lg'

interface GlowButtonProps {
  variant?:  Variant
  size?:     Size
  href?:     string
  onClick?:  () => void
  className?: string
  download?:  boolean
  target?:   string
  rel?:      string
  children:  React.ReactNode
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-[var(--blue)] border border-[var(--blue)] text-white hover:shadow-[0_0_24px_var(--glow-blue)]',
  gold:    'bg-transparent border border-[var(--gold)] text-[var(--gold)] hover:shadow-[0_0_24px_var(--glow-gold)]',
  ghost:   'bg-transparent border border-[var(--border)] text-[var(--text-2)] hover:text-[var(--text-1)] hover:border-[rgba(255,255,255,0.2)]',
}

export function GlowButton({
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  download,
  target,
  rel,
  children,
}: GlowButtonProps) {
  const classes = `inline-flex items-center gap-2 rounded-[var(--radius)] font-semibold transition-all duration-200 cursor-pointer ${sizeClasses[size]} ${variantClasses[variant]} ${className}`

  const motionProps = {
    whileHover: { scale: 1.03 },
    whileTap:   { scale: 0.97 },
  }

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        download={download}
        className={classes}
        {...motionProps}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button onClick={onClick} className={classes} {...motionProps}>
      {children}
    </motion.button>
  )
}
