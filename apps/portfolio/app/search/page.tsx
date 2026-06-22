'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { STATIC_PROJECTS, RESOURCES } from '@/lib/data';

type ResultType = 'project' | 'resource';

interface SearchResult {
  id: string;
  type: ResultType;
  title: string;
  description: string;
  href: string;
  tags: string[];
}

const ALL_ITEMS: SearchResult[] = [
  ...STATIC_PROJECTS.map((p) => ({
    id: p.id,
    type: 'project' as ResultType,
    title: p.title,
    description: p.description,
    href: '/#projects',
    tags: p.tags,
  })),
  ...RESOURCES.map((r) => ({
    id: r.id,
    type: 'resource' as ResultType,
    title: r.title,
    description: r.description,
    href: r.url,
    tags: r.tags,
  })),
];

function highlight(text: string, query: string) {
  if (!query) return text;
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark
        key={i}
        style={{ background: 'var(--accent-dim)', color: 'var(--accent)', borderRadius: 3 }}
      >
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

export default function SearchPage() {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return ALL_ITEMS.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }, [query]);

  return (
    <div style={{ paddingTop: 96, minHeight: '100vh', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '64px 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1
            style={{
              fontFamily: 'var(--font-dm-serif)',
              fontSize: 'clamp(36px, 6vw, 56px)',
              color: 'var(--text-primary)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: 32,
            }}
          >
            Search
          </h1>

          <div style={{ position: 'relative', marginBottom: 40 }}>
            <span
              style={{
                position: 'absolute',
                left: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)',
                fontSize: 18,
                pointerEvents: 'none',
              }}
            >
              ⌕
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects, resources, tags…"
              autoFocus
              style={{
                width: '100%',
                padding: '16px 16px 16px 48px',
                borderRadius: 12,
                border: '1px solid var(--border)',
                background: 'var(--surface)',
                color: 'var(--text-primary)',
                fontSize: 16,
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {query.trim() === '' ? (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ color: 'var(--text-muted)', fontSize: 15 }}
            >
              Start typing to search across projects and resources.
            </motion.p>
          ) : results.length === 0 ? (
            <motion.p
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ color: 'var(--text-secondary)', fontSize: 15 }}
            >
              No results for &ldquo;{query}&rdquo;.
            </motion.p>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
            >
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>
                {results.length} result{results.length !== 1 ? 's' : ''}
              </p>

              {results.map((result, i) => {
                const isExternal = result.href.startsWith('http');
                const content = (
                  <div
                    style={{
                      padding: '16px 20px',
                      borderRadius: 12,
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      textDecoration: 'none',
                      display: 'block',
                      transition: 'border-color 150ms',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 6,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: 'var(--accent)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                        }}
                      >
                        {result.type}
                      </span>
                      {isExternal && (
                        <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>↗</span>
                      )}
                    </div>
                    <h3
                      style={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        marginBottom: 6,
                      }}
                    >
                      {highlight(result.title, query)}
                    </h3>
                    <p
                      style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}
                    >
                      {highlight(result.description, query)}
                    </p>
                  </div>
                );

                return (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    {isExternal ? (
                      <a
                        href={result.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none', display: 'block' }}
                      >
                        {content}
                      </a>
                    ) : (
                      <Link href={result.href} style={{ textDecoration: 'none', display: 'block' }}>
                        {content}
                      </Link>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
