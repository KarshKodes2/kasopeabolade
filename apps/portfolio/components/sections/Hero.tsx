'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Download, ArrowDown, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { personal } from '@/lib/data'
import { useParticleCanvas } from '@/hooks/useParticleCanvas'

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useParticleCanvas(canvasRef)
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}

import type { Variants } from 'framer-motion'

const stagger: { container: Variants; item: Variants } = {
  container: {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: 2.1 } },
  },
  item: {
    hidden: { opacity: 0, y: 60 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, type: 'tween', ease: 'easeOut' } },
  },
}

const taglineStagger: { container: Variants; item: Variants } = {
  container: {
    hidden: {},
    show: { transition: { staggerChildren: 0.055, delayChildren: 2.7 } },
  },
  item: {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
  },
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const nameLetters = 'Kasope'.split('')
  const surnameLetters = 'Abolade'.split('')
  const taglineWords = personal.tagline.split(' ')

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          opacity: 0.4,
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 700, height: 700,
          left: '50%', top: '50%',
          transform: 'translate(-50%, -55%)',
          background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Top accent line — reveals on mount */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, delay: 2.0, ease: 'easeInOut' }}
        style={{
          transformOrigin: 'left',
          position: 'absolute',
          top: 0, left: 0, right: 0, height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--accent), var(--accent-2), transparent)',
        }}
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 container-xl text-center"
      >
        {/* "Open to work" badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.9 }}
          className="inline-flex items-center gap-2 badge-accent mb-6"
        >
          <span
            style={{
              width: '7px', height: '7px', borderRadius: '50%',
              background: 'var(--accent-light)',
              boxShadow: '0 0 6px var(--accent-glow)',
            }}
            className="animate-float"
          />
          Open to work
        </motion.div>

        {/* Name — letter stagger */}
        <motion.h1
          variants={stagger.container}
          initial="hidden"
          animate="show"
          className="font-serif mb-6 leading-none"
          style={{ fontSize: 'clamp(3rem, 9vw, 6rem)', fontWeight: 400 }}
        >
          <span className="flex justify-center flex-wrap">
            {nameLetters.map((l, i) => (
              <motion.span
                key={`first-${i}`}
                variants={stagger.item}
                style={{ color: 'var(--text-primary)' }}
              >
                {l}
              </motion.span>
            ))}
            <span style={{ width: '0.25em' }} />
            {surnameLetters.map((l, i) => (
              <motion.span
                key={`last-${i}`}
                variants={stagger.item}
                className="text-gradient"
              >
                {l}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        {/* Role badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2.55 }}
          className="mb-5"
        >
          <span
            style={{
              display: 'inline-block',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              borderBottom: '1px solid var(--border-accent)',
              paddingBottom: '2px',
            }}
          >
            {personal.title}
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={taglineStagger.container}
          initial="hidden"
          animate="show"
          style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '560px', margin: '0 auto 2.5rem', lineHeight: 1.6, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0 6px' }}
        >
          {taglineWords.map((word, i) => (
            <motion.span key={i} variants={taglineStagger.item}>{word}</motion.span>
          ))}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 3.4 }}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px' }}
        >
          <Link href="/#projects" className="btn-accent">
            View Projects
          </Link>
          <a
            href="/cv.pdf"
            download
            className="btn-outline"
          >
            <Download size={15} />
            Download CV
          </a>
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost-portfolio"
          >
            <ExternalLink size={15} />
            GitHub
          </a>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.0, duration: 0.8 }}
          style={{ marginTop: '5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
        >
          <span style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <ArrowDown size={16} color="var(--text-muted)" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
