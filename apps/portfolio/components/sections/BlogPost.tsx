'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react'
import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { useEffect, useState } from 'react'

type Post = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  coverImage: string | null
  tags: string[]
  readingTime: number | null
  publishedAt: Date | null
}

function formatDate(date: Date | null) {
  if (!date) return ''
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(date))
}

const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="font-serif" style={{ fontSize: '2rem', fontWeight: 400, color: 'var(--text-primary)', margin: '2rem 0 1rem' }} {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="font-serif" style={{ fontSize: '1.5rem', fontWeight: 400, color: 'var(--text-primary)', margin: '2rem 0 0.75rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border)' }} {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-primary)', margin: '1.5rem 0 0.5rem' }} {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--text-secondary)', margin: '0 0 1.25rem' }} {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a style={{ color: 'var(--accent)', textDecoration: 'underline', textUnderlineOffset: '3px' }} {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code style={{ fontFamily: 'monospace', fontSize: '0.875rem', background: 'var(--surface-hover)', padding: '2px 6px', borderRadius: '4px', color: 'var(--accent)' }} {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '10px', padding: '20px', overflowX: 'auto', margin: '1.5rem 0', fontSize: '0.875rem', lineHeight: 1.7 }} {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote style={{ borderLeft: '3px solid var(--accent)', paddingLeft: '20px', margin: '1.5rem 0', color: 'var(--text-secondary)', fontStyle: 'italic' }} {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul style={{ paddingLeft: '1.5rem', margin: '0 0 1.25rem', color: 'var(--text-secondary)', lineHeight: 1.8 }} {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol style={{ paddingLeft: '1.5rem', margin: '0 0 1.25rem', color: 'var(--text-secondary)', lineHeight: 1.8 }} {...props} />
  ),
  hr: () => <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '2.5rem 0' }} />,
}

export function BlogPost({ post }: { post: Post }) {
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null)

  useEffect(() => {
    serialize(post.content).then(setMdxSource)
  }, [post.content])

  return (
    <div className="section-padding" style={{ paddingTop: '6rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          style={{ marginBottom: '40px' }}
        >
          <Link
            href="/blog"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', textDecoration: 'none', fontSize: '14px', transition: 'color 150ms ease' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)' }}
          >
            <ArrowLeft size={14} />
            Back to Blog
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ marginBottom: '48px' }}
        >
          <h1
            className="font-serif"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 400, color: 'var(--text-primary)', lineHeight: 1.25, marginBottom: '16px' }}
          >
            {post.title}
          </h1>

          {post.excerpt && (
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
              {post.excerpt}
            </p>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', paddingBottom: '24px', borderBottom: '1px solid var(--border)' }}>
            {post.publishedAt && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-muted)' }}>
                <Calendar size={13} />
                {formatDate(post.publishedAt)}
              </span>
            )}
            {post.readingTime && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-muted)' }}>
                <Clock size={13} />
                {post.readingTime} min read
              </span>
            )}
            {post.tags.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                <Tag size={12} style={{ color: 'var(--text-muted)' }} />
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{ fontSize: '12px', padding: '2px 8px', borderRadius: '4px', background: 'var(--surface-hover)', color: 'var(--text-muted)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.header>

        {/* Content */}
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {mdxSource ? (
            <MDXRemote {...mdxSource} components={mdxComponents} />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[120, 80, 100, 60].map((w, i) => (
                <div key={i} style={{ height: '16px', background: 'var(--surface-hover)', borderRadius: '4px', width: `${w}%`, maxWidth: '100%', animation: 'pulse 1.5s ease-in-out infinite' }} />
              ))}
            </div>
          )}
        </motion.article>
      </div>
    </div>
  )
}
