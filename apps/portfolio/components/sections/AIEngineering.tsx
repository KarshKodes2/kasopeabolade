'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { useScrollAnimation, fadeUpVariants, staggerContainerVariants } from '@/hooks/useScrollAnimation'

const nodes = [
  { id: 'Architect', x: 0.5,  y: 0.5,  color: '#D4AF37', r: 28 },
  { id: 'Builder',   x: 0.15, y: 0.25, color: '#2563EB', r: 22 },
  { id: 'Tester',    x: 0.85, y: 0.25, color: '#059669', r: 22 },
  { id: 'Reviewer',  x: 0.15, y: 0.75, color: '#7C3AED', r: 22 },
  { id: 'Deployer',  x: 0.85, y: 0.75, color: '#EC4899', r: 22 },
  { id: 'DocWriter', x: 0.5,  y: 0.9,  color: '#F59E0B', r: 20 },
]

const edges = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5],
  [1, 2], [3, 4], [1, 3], [2, 4],
]

function AgentNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let t = 0

    const setSize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio
      canvas.height = canvas.offsetHeight * devicePixelRatio
      ctx.scale(devicePixelRatio, devicePixelRatio)
    }
    setSize()
    window.addEventListener('resize', setSize)

    const draw = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)
      t += 0.012

      const pts = nodes.map((n) => ({ x: n.x * w, y: n.y * h, color: n.color, r: n.r, id: n.id }))

      // Draw edges
      for (const [a, b] of edges) {
        const pa = pts[a], pb = pts[b]
        const grad = ctx.createLinearGradient(pa.x, pa.y, pb.x, pb.y)
        grad.addColorStop(0, `${pa.color}60`)
        grad.addColorStop(1, `${pb.color}60`)
        ctx.beginPath()
        ctx.moveTo(pa.x, pa.y)
        ctx.lineTo(pb.x, pb.y)
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.5
        ctx.stroke()

        // Pulse dot
        const progress = ((t * 0.5 + edges.indexOf([a, b])) % 1 + 1) % 1
        const px = pa.x + (pb.x - pa.x) * progress
        const py = pa.y + (pb.y - pa.y) * progress
        ctx.beginPath()
        ctx.arc(px, py, 3, 0, Math.PI * 2)
        ctx.fillStyle = pa.color
        ctx.fill()
      }

      // Draw nodes
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]
        const pulse = 1 + Math.sin(t * 2 + i) * 0.06

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * pulse, 0, Math.PI * 2)
        ctx.fillStyle = `${p.color}22`
        ctx.fill()

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * pulse, 0, Math.PI * 2)
        ctx.strokeStyle = p.color
        ctx.lineWidth = 2
        ctx.stroke()

        ctx.fillStyle = '#F8F8F8'
        ctx.font = `bold ${p.r > 24 ? 11 : 9}px system-ui`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(p.id, p.x, p.y)
      }

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', setSize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-80 md:h-96"
    />
  )
}

const capabilities = [
  { icon: '🧠', title: 'Agent Orchestration',    desc: 'Multi-agent systems that coordinate complex tasks autonomously — architect, build, test, and deploy with AI.' },
  { icon: '⚡', title: 'AI-Assisted Workflows',   desc: 'Compressing weeks of dev work into hours by wiring AI into every phase of the engineering lifecycle.' },
  { icon: '🔁', title: 'Automation Pipelines',    desc: 'End-to-end CI/CD with intelligent gates that adapt to context, not just static rules.' },
  { icon: '📚', title: 'Knowledge Engineering',   desc: 'Structured knowledge bases that make AI agents smarter with every iteration.' },
]

export function AIEngineering() {
  const { ref, controls } = useScrollAnimation()

  return (
    <section id="ai-engineering" className="section-padding bg-[var(--bg)]" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      <div className="container-xl">
        <SectionTitle
          label="AI Engineering"
          title="Building with Intelligence"
          subtitle="Orchestrating AI agents to build, test, and ship software at machine speed."
        />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="glass rounded-[var(--radius-lg)] p-4 overflow-hidden">
            <AgentNetwork />
          </div>

          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={staggerContainerVariants(0.12)}
            className="grid sm:grid-cols-2 gap-4"
          >
            {capabilities.map((cap) => (
              <motion.div
                key={cap.title}
                variants={fadeUpVariants}
                whileHover={{ x: 6, transition: { duration: 0.2 } }}
                className="glass rounded-[var(--radius)] p-5 group transition-all duration-300 hover:bg-[var(--surface-hover)]"
              >
                <div className="text-2xl mb-3">{cap.icon}</div>
                <h3 className="font-semibold text-[var(--text-1)] mb-2 text-sm">{cap.title}</h3>
                <p className="text-[var(--text-3)] text-xs leading-relaxed">{cap.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
