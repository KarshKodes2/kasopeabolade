'use client'

import { motion } from 'framer-motion'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { useScrollAnimation, slideInLeftVariants, slideInRightVariants, scaleUpVariants, staggerContainerVariants } from '@/hooks/useScrollAnimation'

const pillars = [
  { icon: '⚡', title: 'Frontend Architecture', desc: 'Scalable React & Next.js systems built for performance.' },
  { icon: '🤖', title: 'AI-Assisted Dev',        desc: 'Leveraging AI agents to ship faster and smarter.' },
  { icon: '📱', title: 'Cross-Platform Mobile',   desc: 'React Native & Flutter apps that users love.' },
  { icon: '🔒', title: 'Fintech & Security',       desc: 'Hardened banking & payment-grade code.' },
]

function Avatar() {
  return (
    <div className="relative flex items-center justify-center w-72 h-72 mx-auto">
      {[72, 56, 40].map((size, i) => (
        <motion.div
          key={i}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: [12, 16, 20][i], repeat: Infinity, ease: 'linear' }}
          className="absolute rounded-full border border-[var(--border)]"
          style={{ width: `${size * 4}px`, height: `${size * 4}px` }}
        />
      ))}
      <div className="glass-gold rounded-full w-44 h-44 flex flex-col items-center justify-center z-10 relative">
        <span className="text-3xl font-bold text-gradient font-mono">KA</span>
        <span className="text-[var(--text-3)] text-xs mt-1">Kasope Abolade</span>
      </div>
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-6 -right-4 glass rounded-full px-3 py-1.5 text-xs font-semibold text-[var(--gold)]"
      >
        8+ yrs
      </motion.div>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute bottom-6 -left-4 glass rounded-full px-3 py-1.5 text-xs font-semibold text-[var(--text-1)]"
      >
        Lagos 🇳🇬
      </motion.div>
    </div>
  )
}

export function About() {
  const { ref: leftRef, controls: leftControls } = useScrollAnimation()
  const { ref: rightRef, controls: rightControls } = useScrollAnimation()
  const { ref: pillarsRef, controls: pillarsControls } = useScrollAnimation()

  return (
    <section id="about" className="section-padding bg-[var(--bg)]">
      <div className="container-xl">
        <SectionTitle
          label="About Me"
          title="Engineer. Creator. Optimist."
        />

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <motion.div
            ref={leftRef}
            initial="hidden"
            animate={leftControls}
            variants={slideInLeftVariants}
            className="space-y-5"
          >
            <p className="text-[var(--text-2)] text-lg leading-relaxed">
              I&apos;m Kasope Abolade, a Senior Frontend &amp; AI-Enabled Software Engineer with 8+ years of experience building
              high-performance web and mobile applications for startups, fintechs, and enterprise teams across Africa and globally.
            </p>
            <p className="text-[var(--text-2)] leading-relaxed">
              From architecting real-time supply chain ERPs at Solab Technologies, to engineering wallet infrastructure at SystemSpecs, to
              delivering AI-powered recommendation engines at Polaris Bank — I bring full product ownership to every project I touch.
            </p>
            <p className="text-[var(--text-2)] leading-relaxed">
              Today I orchestrate multi-agent AI systems that compress weeks of development work into hours, while maintaining the craft
              standards that make software feel exceptional.
            </p>
            <blockquote className="border-l-2 border-[var(--gold)] pl-4 italic text-[var(--text-2)]">
              &ldquo;Questions, not answers, create knowledge.&rdquo;
            </blockquote>
            <p className="text-[var(--text-3)] text-sm">
              aboladekasope@gmail.com · Lagos, Nigeria
            </p>
          </motion.div>

          <motion.div
            ref={rightRef}
            initial="hidden"
            animate={rightControls}
            variants={slideInRightVariants}
          >
            <Avatar />
          </motion.div>
        </div>

        {/* Pillars */}
        <motion.div
          ref={pillarsRef}
          initial="hidden"
          animate={pillarsControls}
          variants={staggerContainerVariants(0.1)}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {pillars.map((p) => (
            <motion.div
              key={p.title}
              variants={scaleUpVariants}
              className="glass rounded-[var(--radius-lg)] p-6 group hover:bg-[var(--surface-hover)] hover:shadow-[0_0_30px_var(--glow-blue)] transition-all duration-300"
            >
              <div className="text-3xl mb-3">{p.icon}</div>
              <h3 className="font-semibold text-[var(--text-1)] mb-2">{p.title}</h3>
              <p className="text-[var(--text-3)] text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
