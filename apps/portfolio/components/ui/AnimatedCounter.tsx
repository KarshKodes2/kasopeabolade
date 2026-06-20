'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

interface AnimatedCounterProps {
  value:     number
  suffix?:   string
  label:     string
  duration?: number
  color?:    string
}

export function AnimatedCounter({
  value,
  suffix = '',
  label,
  duration = 2000,
  color = '#2563EB',
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const rafRef = useRef<number | null>(null)
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true })

  useEffect(() => {
    if (!inView) return

    const start = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * value))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [inView, value, duration])

  return (
    <div
      ref={ref}
      className="glass rounded-[var(--radius-lg)] p-8 flex flex-col items-center gap-3 group transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,0,0,0.4)]"
      style={{ '--counter-color': color } as React.CSSProperties}
    >
      <span
        className="text-5xl font-bold font-mono tabular-nums"
        style={{ color }}
      >
        {count}{suffix}
      </span>
      <span className="text-[var(--text-2)] text-sm font-medium text-center">{label}</span>
    </div>
  )
}
