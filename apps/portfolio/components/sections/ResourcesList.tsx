'use client'

import { useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { type Resource, RESOURCE_CATEGORIES } from '@/lib/resources'

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function ResourcesList({ resources }: { resources: Resource[] }) {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? resources
    : resources.filter((r) => r.category === activeCategory)

  return (
    <div>
      {/* Category tabs */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '40px' }}>
        {RESOURCE_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '6px 16px',
              borderRadius: '100px',
              border: '1px solid',
              borderColor: activeCategory === cat ? 'var(--accent)' : 'var(--border)',
              background: activeCategory === cat ? 'var(--accent)' : 'transparent',
              color: activeCategory === cat ? '#fff' : 'var(--text-secondary)',
              fontSize: '13px',
              fontWeight: activeCategory === cat ? 600 : 400,
              cursor: 'pointer',
              transition: 'all 150ms ease',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div
        key={activeCategory}
        variants={container}
        initial="hidden"
        animate="visible"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}
      >
        {filtered.map((resource) => (
          <motion.div key={resource.id} variants={item}>
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', display: 'block', height: '100%' }}
            >
              <div
                className="card"
                style={{
                  padding: '20px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  transition: 'transform 200ms ease, border-color 200ms ease',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = 'translateY(-3px)'
                  el.style.borderColor = 'var(--accent)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = 'translateY(0)'
                  el.style.borderColor = 'var(--border)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {resource.name}
                      </h3>
                      {!resource.free && (
                        <span style={{ fontSize: '10px', padding: '1px 6px', borderRadius: '4px', background: 'rgba(245,158,11,0.15)', color: '#F59E0B', border: '1px solid rgba(245,158,11,0.3)', fontWeight: 600 }}>
                          PAID
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                      {resource.category}
                    </p>
                  </div>
                  <ExternalLink size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                </div>

                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, flex: 1 }}>
                  {resource.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {resource.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{ fontSize: '11px', padding: '2px 7px', borderRadius: '4px', background: 'var(--surface-hover)', color: 'var(--text-muted)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
