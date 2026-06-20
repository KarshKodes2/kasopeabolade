'use client'

import { motion } from 'framer-motion'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { useScrollAnimation, scaleUpVariants, staggerContainerVariants } from '@/hooks/useScrollAnimation'
import { skills, skillMeta } from '@/lib/data'

export function TechStack() {
  const { ref, controls } = useScrollAnimation()

  return (
    <section id="tech-stack" className="section-padding bg-[var(--bg-2)]">
      <div className="container-xl">
        <SectionTitle
          label="Technical Skills"
          title="Tools of the Trade"
          subtitle="A curated stack built for scalability, speed, and real-world impact."
          align="center"
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={staggerContainerVariants(0.1)}
          className="grid md:grid-cols-2 xl:grid-cols-3 gap-5"
        >
          {Object.entries(skills).map(([category, items]) => {
            const meta = skillMeta[category]
            return (
              <motion.div
                key={category}
                variants={scaleUpVariants}
                className="glass rounded-[var(--radius-lg)] p-6 group relative overflow-hidden transition-all duration-300 hover:border-[rgba(255,255,255,0.14)]"
                style={{ '--cat-color': meta.color } as React.CSSProperties}
              >
                {/* Hover radial glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-[var(--radius-lg)]"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${meta.color}12 0%, transparent 70%)` }}
                />

                <div className="flex items-center gap-3 mb-5">
                  <span className="text-2xl">{meta.icon}</span>
                  <span className="font-semibold text-sm tracking-wide" style={{ color: meta.color }}>
                    {category}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1 text-xs rounded-full border border-[var(--border)] text-[var(--text-2)] bg-[var(--surface)] transition-colors duration-200 hover:text-[var(--text-1)] cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-[var(--radius-lg)]"
                  style={{ background: `linear-gradient(90deg, transparent, ${meta.color}, transparent)` }}
                />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
