'use client'

import { motion } from 'framer-motion'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { useScrollAnimation, staggerContainerVariants, fadeUpVariants } from '@/hooks/useScrollAnimation'
import { useTilt } from '@/hooks/useParallax'
import type { ProjectDisplay } from '@/lib/projects'

function ProjectCard({ project }: { project: ProjectDisplay }) {
  const { rotateX, rotateY, handleMouseMove, handleMouseLeave } = useTilt(8)

  return (
    <motion.div
      variants={fadeUpVariants}
      style={{ rotateX, rotateY, perspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="glass rounded-[var(--radius-lg)] overflow-hidden group relative flex flex-col transition-all duration-300 cursor-default"
    >
      {/* Top accent line */}
      <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }} />

      {/* Visual area */}
      <div
        className="h-44 relative flex items-center justify-center overflow-hidden"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${project.color}18 0%, transparent 70%)`,
          backgroundImage: `radial-gradient(circle at 50% 50%, ${project.color}18 0%, transparent 70%), linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
          backgroundSize: 'auto, 32px 32px, 32px 32px',
        }}
      >
        <span className="text-5xl group-hover:scale-110 transition-transform duration-300">{project.emoji}</span>
        {/* Hover glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `radial-gradient(circle at 50% 50%, ${project.color}20 0%, transparent 70%)` }}
        />
      </div>

      <div className="p-6 flex flex-col flex-1 gap-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-[var(--text-1)] text-lg leading-tight">{project.title}</h3>
            {project.subtitle && (
              <p className="text-xs font-semibold mt-0.5" style={{ color: project.color }}>{project.subtitle}</p>
            )}
          </div>
          {project.url && (
            <motion.a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ rotate: 10 }}
              className="text-[var(--text-3)] hover:text-[var(--text-1)] transition-colors text-lg shrink-0"
            >
              ↗
            </motion.a>
          )}
        </div>

        <p className="text-[var(--text-2)] text-sm leading-relaxed line-clamp-3 flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-xs rounded-full border font-medium"
              style={{ color: project.color, borderColor: `${project.color}40`, backgroundColor: `${project.color}10` }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

interface ProjectsProps {
  projects: ProjectDisplay[]
}

export function Projects({ projects }: ProjectsProps) {
  const { ref, controls } = useScrollAnimation()

  return (
    <section id="projects" className="section-padding bg-[var(--bg-2)]">
      <div className="container-xl">
        <SectionTitle
          label="Selected Work"
          title="Projects & Products"
          subtitle="From pharmaceutical ERPs to fintech apps — built to perform."
          align="center"
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={staggerContainerVariants(0.12)}
          className="grid sm:grid-cols-2 gap-6"
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
