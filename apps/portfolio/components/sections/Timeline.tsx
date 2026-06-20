'use client'

import { motion } from 'framer-motion'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { useScrollAnimation, slideInLeftVariants, slideInRightVariants, scaleUpVariants } from '@/hooks/useScrollAnimation'
import { experience } from '@/lib/data'

function TimelineCard({
  item,
  index,
}: {
  item: typeof experience[number]
  index: number
}) {
  const isLeft = index % 2 === 0
  const { ref, controls } = useScrollAnimation()

  return (
    <div className="relative flex items-start md:items-center gap-0">
      {/* Left content */}
      <div className={`w-full md:w-[calc(50%-2rem)] ${isLeft ? 'md:pr-12 md:text-right' : 'md:invisible'}`}>
        {isLeft && (
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={slideInLeftVariants}
            className="glass rounded-[var(--radius-lg)] p-6 hover:bg-[var(--surface-hover)] transition-all duration-300"
          >
            <CardContent item={item} />
          </motion.div>
        )}
      </div>

      {/* Centre node */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={scaleUpVariants}
          className="w-5 h-5 rounded-full border-2 border-[var(--bg)]"
          style={{ background: item.color, boxShadow: `0 0 12px ${item.color}60` }}
        />
      </div>

      {/* Right content */}
      <div className={`w-full md:w-[calc(50%-2rem)] md:ml-auto ${!isLeft ? 'md:pl-12' : 'md:invisible'}`}>
        {!isLeft && (
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={slideInRightVariants}
            className="glass rounded-[var(--radius-lg)] p-6 hover:bg-[var(--surface-hover)] transition-all duration-300"
          >
            <CardContent item={item} />
          </motion.div>
        )}
      </div>
    </div>
  )
}

function CardContent({ item }: { item: typeof experience[number] }) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-2 mb-1">
        <h3 className="font-bold text-[var(--text-1)] text-lg" style={{ color: item.color }}>
          {item.company}
        </h3>
      </div>
      <p className="text-[var(--text-2)] font-semibold text-sm mb-1">{item.role}</p>
      <p className="text-[var(--text-3)] text-xs mb-4">
        {item.period} · {item.location}
      </p>
      <ul className="space-y-2">
        {item.highlights.map((h, i) => (
          <li key={i} className="text-[var(--text-2)] text-sm leading-relaxed flex items-start gap-2">
            <span style={{ color: item.color }} className="mt-0.5 shrink-0">›</span>
            {h}
          </li>
        ))}
      </ul>
    </>
  )
}

export function Timeline() {
  return (
    <section id="timeline" className="section-padding bg-[var(--bg)]">
      <div className="container-xl">
        <SectionTitle
          label="Experience"
          title="Career Timeline"
          subtitle="8+ years shipping products across fintech, health, and enterprise."
        />

        <div className="relative">
          {/* Vertical spine */}
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: 'linear-gradient(to bottom, var(--blue), transparent)' }}
          />

          <div className="flex flex-col gap-10">
            {experience.map((item, i) => (
              <TimelineCard key={item.company} item={item} index={i} />
            ))}
          </div>
        </div>

        {/* Mobile stacked fallback */}
        <div className="md:hidden mt-10 flex flex-col gap-5">
          {experience.map((item) => (
            <div key={item.company} className="glass rounded-[var(--radius-lg)] p-6">
              <CardContent item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
