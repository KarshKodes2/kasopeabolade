import { useEffect, useRef, type DependencyList, type RefObject } from 'react'

type GSAPType = typeof import('gsap').gsap

let _gsap: GSAPType | null = null

async function getGsap(): Promise<GSAPType> {
  if (!_gsap) {
    const mod = await import('gsap')
    const { ScrollTrigger } = await import('gsap/ScrollTrigger')
    mod.gsap.registerPlugin(ScrollTrigger)
    _gsap = mod.gsap
  }
  return _gsap
}

export function useGsapTimeline(
  callback: (g: GSAPType) => void,
  deps: DependencyList = [],
) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    let ctx: ReturnType<GSAPType['context']> | undefined

    getGsap().then((g) => {
      ctx = g.context(() => {
        callback(g)
      }, ref as RefObject<HTMLElement>)
    })

    return () => {
      ctx?.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return { ref }
}

export function useGsapScrollReveal(
  selector: string,
  containerRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    let ctx: ReturnType<GSAPType['context']> | undefined

    getGsap().then((g) => {
      ctx = g.context(() => {
        const elements = document.querySelectorAll(selector)
        elements.forEach((el, i) => {
          g.from(el, {
            opacity: 0,
            y: 40,
            duration: 0.7,
            delay: i * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              once: true,
            },
          })
        })
      }, containerRef as RefObject<HTMLElement>)
    })

    return () => ctx?.revert()
  }, [selector, containerRef])
}
