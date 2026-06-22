'use client';

import { motion } from 'framer-motion';
import { useScrollAnimation, stagger, fadeUp } from '@/hooks/useScrollAnimation';
import { useTilt } from '@/hooks/useParallax';
import type { Project } from '@/lib/projects';

function ProjectCard({ project }: { project: Project }) {
  const { rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt(6);

  return (
    <motion.div
      variants={fadeUp}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        perspective: 1000,
      }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 16,
          padding: 28,
          cursor: 'default',
          transition: 'border-color 200ms, box-shadow 200ms',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
        whileHover={{
          borderColor: 'var(--accent)',
          boxShadow: '0 0 32px var(--glow)',
        }}
      >
        {project.featured && (
          <span
            style={{
              alignSelf: 'flex-start',
              padding: '3px 10px',
              borderRadius: 100,
              background: 'var(--accent-dim)',
              color: 'var(--accent)',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            Featured
          </span>
        )}

        <h3
          style={{
            fontFamily: 'var(--font-dm-serif)',
            fontSize: 22,
            color: 'var(--text-primary)',
            lineHeight: 1.2,
          }}
        >
          {project.title}
        </h3>

        <p
          style={{
            fontSize: 14,
            lineHeight: 1.7,
            color: 'var(--text-secondary)',
            flex: 1,
          }}
        >
          {project.description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {project.tags.slice(0, 5).map((tag) => (
            <span
              key={tag}
              style={{
                padding: '3px 10px',
                borderRadius: 6,
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                fontSize: 12,
                color: 'var(--text-muted)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {'liveUrl' in project && project.liveUrl && (
          <a
            href={project.liveUrl as string}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              alignSelf: 'flex-start',
              fontSize: 13,
              color: 'var(--accent)',
              textDecoration: 'none',
              fontWeight: 500,
              transition: 'opacity 150ms',
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = '0.7')}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = '1')}
          >
            View live ↗
          </a>
        )}
      </motion.div>
    </motion.div>
  );
}

export function Projects({ projects }: { projects: Project[] }) {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section
      id="projects"
      ref={ref}
      style={{ padding: '120px 24px', maxWidth: 1100, margin: '0 auto' }}
    >
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        style={{
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: '0.12em',
          color: 'var(--accent)',
          textTransform: 'uppercase',
          marginBottom: 16,
        }}
      >
        Work
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{
          fontFamily: 'var(--font-dm-serif)',
          fontSize: 'clamp(32px, 5vw, 48px)',
          lineHeight: 1.15,
          color: 'var(--text-primary)',
          marginBottom: 56,
          letterSpacing: '-0.02em',
        }}
      >
        Things I&apos;ve shipped.
      </motion.h2>

      <motion.div
        variants={stagger(0.1, 0.12)}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 20,
        }}
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.div>
    </section>
  );
}
