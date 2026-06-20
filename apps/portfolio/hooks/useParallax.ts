import { useEffect } from 'react'
import { useMotionValue, useSpring, type MotionValue } from 'framer-motion'

export function useParallax(strength = 20): { x: MotionValue<number>; y: MotionValue<number> } {
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 60, damping: 20 })
  const y = useSpring(rawY, { stiffness: 60, damping: 20 })

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      rawX.set(((e.clientX - cx) / cx) * strength)
      rawY.set(((e.clientY - cy) / cy) * strength)
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [rawX, rawY, strength])

  return { x, y }
}

export function useTilt(maxTilt = 12): {
  rotateX: MotionValue<number>
  rotateY: MotionValue<number>
  handleMouseMove: (e: React.MouseEvent<HTMLElement>) => void
  handleMouseLeave: () => void
} {
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const rotateX = useSpring(rawX, { stiffness: 120, damping: 18 })
  const rotateY = useSpring(rawY, { stiffness: 120, damping: 18 })

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    rawX.set(-dy * maxTilt)
    rawY.set(dx * maxTilt)
  }

  const handleMouseLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  return { rotateX, rotateY, handleMouseMove, handleMouseLeave }
}
