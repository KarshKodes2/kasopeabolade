'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, FileText, Folder, BookOpen } from 'lucide-react'
import { type Resource } from '@/lib/resources'

type Post = { id: string; title: string; slug: string; excerpt: string | null; tags: string[] }
type Project = { id: string; title: string; subtitle?: string; description: string; url?: string; tags: string[]; color: string; emoji: string }

type SearchResult =
  | { type: 'post'; data: Post }
  | { type: 'project'; data: Project }
  | { type: 'resource'; data: Resource }

function highlight(text: string, query: string) {
  if (!query) return text
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return text
  return (
    <>
      {text.slice(0, idx)}
      <mark style={{ background: 'var(--accent)', color: '#fff', borderRadius: '2px', padding: '0 2px' }}>
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  )
}

export function SearchClient({
  posts,
  projects,
  resources,
}: {
  posts: Post[]
  projects: Project[]
  resources: Resource[]
}) {
  const [query, setQuery] = useState('')

  const results = useMemo<SearchResult[]>(() => {
    if (query.length < 2) return []
    const q = query.toLowerCase()

    const postResults: SearchResult[] = posts
      .filter((p) => p.title.toLowerCase().includes(q) || p.excerpt?.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q)))
      .map((p) => ({ type: 'post', data: p }))

    const projectResults: SearchResult[] = projects
      .filter((p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q)))
      .map((p) => ({ type: 'project', data: p }))

    const resourceResults: SearchResult[] = resources
      .filter((r) => r.name.toLowerCase().includes(q) || r.description.toLowerCase().includes(q) || r.tags.some((t) => t.toLowerCase().includes(q)))
      .map((r) => ({ type: 'resource', data: r }))

    return [...postResults, ...projectResults, ...resourceResults]
  }, [query, posts, projects, resources])

  return (
    <div style={{ maxWidth: '680px' }}>
      {/* Search input */}
      <div style={{ position: 'relative', marginBottom: '40px' }}>
        <Search
          size={18}
          style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }}
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts, projects, resources..."
          autoFocus
          style={{
            width: '100%',
            padding: '14px 16px 14px 46px',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            color: 'var(--text-primary)',
            fontSize: '16px',
            outline: 'none',
            transition: 'border-color 150ms ease',
            boxSizing: 'border-box',
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--accent)' }}
          onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border)' }}
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '18px', lineHeight: 1 }}
          >
            ×
          </button>
        )}
      </div>

      {/* Results */}
      <AnimatePresence mode="wait">
        {query.length < 2 ? (
          <motion.p key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
            Type at least 2 characters to search...
          </motion.p>
        ) : results.length === 0 ? (
          <motion.p key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
            No results for &ldquo;{query}&rdquo;
          </motion.p>
        ) : (
          <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>
              {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
            </p>

            {results.map((result, i) => {
              if (result.type === 'post') {
                return (
                  <Link key={`post-${result.data.id}`} href={`/blog/${result.data.slug}`} style={{ textDecoration: 'none' }}>
                    <div className="card" style={{ padding: '16px', display: 'flex', alignItems: 'flex-start', gap: '12px', transition: 'border-color 150ms ease' }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)' }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)' }}
                    >
                      <FileText size={16} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                          <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Post</span>
                        </div>
                        <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                          {highlight(result.data.title, query)}
                        </p>
                        {result.data.excerpt && (
                          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                            {highlight(result.data.excerpt.slice(0, 120), query)}...
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                )
              }

              if (result.type === 'project') {
                return (
                  <a key={`project-${result.data.id}`} href={result.data.url ?? '#'} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <div className="card" style={{ padding: '16px', display: 'flex', alignItems: 'flex-start', gap: '12px', transition: 'border-color 150ms ease' }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)' }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)' }}
                    >
                      <Folder size={16} style={{ color: result.data.color, flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <div style={{ marginBottom: '2px' }}>
                          <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Project</span>
                        </div>
                        <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                          {result.data.emoji} {highlight(result.data.title, query)}
                        </p>
                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                          {highlight(result.data.description.slice(0, 100), query)}...
                        </p>
                      </div>
                    </div>
                  </a>
                )
              }

              return (
                <a key={`resource-${result.data.id}`} href={result.data.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <div className="card" style={{ padding: '16px', display: 'flex', alignItems: 'flex-start', gap: '12px', transition: 'border-color 150ms ease' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)' }}
                  >
                    <BookOpen size={16} style={{ color: 'var(--text-muted)', flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <div style={{ marginBottom: '2px' }}>
                        <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Resource · {result.data.category}</span>
                      </div>
                      <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                        {highlight(result.data.name, query)}
                      </p>
                      <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                        {highlight(result.data.description.slice(0, 100), query)}...
                      </p>
                    </div>
                  </div>
                </a>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
