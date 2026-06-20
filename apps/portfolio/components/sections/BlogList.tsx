'use client'

import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'
import { Calendar, Clock, ArrowUpRight } from 'lucide-react'
import { useState } from 'react'

type Post = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  coverImage: string | null
  tags: string[]
  readingTime: number | null
  featured: boolean
  publishedAt: Date | null
}

function formatDate(date: Date | null) {
  if (!date) return ''
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(date))
}

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export function BlogList({ posts }: { posts: Post[] }) {
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)))
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filtered = activeTag ? posts.filter((p) => p.tags.includes(activeTag)) : posts

  if (posts.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
        <p style={{ fontSize: '1.1rem' }}>No posts yet. Check back soon.</p>
      </div>
    )
  }

  return (
    <div>
      {/* Tag filter */}
      {allTags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '40px' }}>
          <button
            onClick={() => setActiveTag(null)}
            style={{
              padding: '4px 14px',
              borderRadius: '100px',
              border: '1px solid',
              borderColor: activeTag === null ? 'var(--accent)' : 'var(--border)',
              background: activeTag === null ? 'var(--accent)' : 'transparent',
              color: activeTag === null ? '#fff' : 'var(--text-secondary)',
              fontSize: '12px',
              cursor: 'pointer',
              transition: 'all 150ms ease',
            }}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              style={{
                padding: '4px 14px',
                borderRadius: '100px',
                border: '1px solid',
                borderColor: activeTag === tag ? 'var(--accent)' : 'var(--border)',
                background: activeTag === tag ? 'var(--accent)' : 'transparent',
                color: activeTag === tag ? '#fff' : 'var(--text-secondary)',
                fontSize: '12px',
                cursor: 'pointer',
                transition: 'all 150ms ease',
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        style={{ display: 'grid', gap: '20px' }}
      >
        {filtered.map((post, i) => (
          <motion.div key={post.id} variants={item}>
            <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
              <div
                className="card"
                style={{
                  padding: '28px',
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: '24px',
                  alignItems: 'start',
                  transition: 'transform 200ms ease, border-color 200ms ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)'
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'
                }}
              >
                <div>
                  {post.featured && i === 0 && (
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '2px 10px',
                        borderRadius: '100px',
                        background: 'var(--accent)',
                        color: '#fff',
                        fontSize: '11px',
                        fontWeight: 600,
                        marginBottom: '10px',
                        letterSpacing: '0.05em',
                      }}
                    >
                      Featured
                    </span>
                  )}

                  <h2
                    style={{
                      fontSize: '1.15rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      marginBottom: '8px',
                      lineHeight: 1.4,
                    }}
                  >
                    {post.title}
                  </h2>

                  {post.excerpt && (
                    <p
                      style={{
                        fontSize: '14px',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.6,
                        marginBottom: '16px',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {post.excerpt}
                    </p>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                    {post.publishedAt && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: 'var(--text-muted)' }}>
                        <Calendar size={12} />
                        {formatDate(post.publishedAt)}
                      </span>
                    )}
                    {post.readingTime && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: 'var(--text-muted)' }}>
                        <Clock size={12} />
                        {post.readingTime} min read
                      </span>
                    )}
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: '11px',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          background: 'var(--surface-hover)',
                          color: 'var(--text-muted)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <ArrowUpRight
                  size={18}
                  style={{ color: 'var(--text-muted)', flexShrink: 0, marginTop: '4px' }}
                />
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px 0' }}>
          No posts with tag &quot;{activeTag}&quot;
        </p>
      )}
    </div>
  )
}
