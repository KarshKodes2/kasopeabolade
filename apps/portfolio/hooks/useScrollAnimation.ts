import { useRef, useEffect } from 'react'
import { useAnimation, useInView, type Variants } from 'framer-motion'

interface UseScrollAnimationOptions {
  threshold?:   number
  triggerOnce?: boolean
}

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollAnimationOptions = {},
) {
  const { threshold = 0.15, triggerOnce = true } = options
  const ref = useRef<T>(null)
  const controls = useAnimation()
  const inView = useInView(ref as React.RefObject<Element>, { amount: threshold, once: triggerOnce })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    } else if (!triggerOnce) {
      controls.start('hidden')
    }
  }, [controls, inView, triggerOnce])

  return { ref, controls, inView }
}

export const fadeUpVariants: Variants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

export const fadeInVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } },
}

export const slideInLeftVariants: Variants = {
  hidden:  { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

export const slideInRightVariants: Variants = {
  hidden:  { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

export const scaleUpVariants: Variants = {
  hidden:  { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
}

export function staggerContainerVariants(stagger = 0.1): Variants {
  return {
    hidden:  {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: 0,
      },
    },
  }
}
