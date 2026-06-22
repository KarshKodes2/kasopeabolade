'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { RESOURCES } from '@/lib/data';
import { buildMetadata } from '@/lib/metadata';

const ALL_CATEGORIES = ['All', ...Array.from(new Set(RESOURCES.map((r) => r.category)))];

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All' ? RESOURCES : RESOURCES.filter((r) => r.category === activeCategory);

  return (
    <div style={{ paddingTop: 96, minHeight: '100vh', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '64px 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p
            style={{
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.12em',
              color: 'var(--accent)',
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            Resources
          </p>

          <h1
            style={{
              fontFamily: 'var(--font-dm-serif)',
              fontSize: 'clamp(36px, 6vw, 56px)',
              color: 'var(--text-primary)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: 16,
            }}
          >
            Curated resources.
          </h1>

          <p
            style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 40 }}
          >
            The tools, docs, and learning resources I actually use and recommend.
          </p>
        </motion.div>

        {/* Category filter */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 40 }}>
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '7px 16px',
                borderRadius: 100,
                border: '1px solid',
                borderColor: activeCategory === cat ? 'var(--accent)' : 'var(--border)',
                background: activeCategory === cat ? 'var(--accent-dim)' : 'var(--surface)',
                color: activeCategory === cat ? 'var(--accent)' : 'var(--text-secondary)',
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 150ms ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Resources grid */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 16,
          }}
        >
          {filtered.map((resource, i) => (
            <motion.a
              key={resource.id}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              style={{
                display: 'block',
                padding: 20,
                borderRadius: 12,
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                textDecoration: 'none',
                transition: 'border-color 150ms, box-shadow 150ms',
              }}
              whileHover={{
                borderColor: 'var(--accent)' as string,
                boxShadow: '0 0 20px var(--glow)' as string,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 10,
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    color: 'var(--accent)',
                    textTransform: 'uppercase',
                  }}
                >
                  {resource.category}
                </span>
                <span style={{ color: 'var(--text-muted)', fontSize: 14 }}>↗</span>
              </div>

              <h3
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  lineHeight: 1.3,
                  marginBottom: 8,
                }}
              >
                {resource.title}
              </h3>

              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {resource.description}
              </p>

              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 14 }}>
                {resource.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: '2px 8px',
                      borderRadius: 4,
                      background: 'var(--bg)',
                      border: '1px solid var(--border)',
                      fontSize: 11,
                      color: 'var(--text-muted)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
