import { prisma } from 'db'
import { BlogList } from '@/components/sections/BlogList'

export const metadata = {
  title: 'Blog',
  description: 'Thoughts on software engineering, AI, and building products.',
}

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { context: 'PORTFOLIO', published: true },
    orderBy: [{ featured: 'desc' }, { publishedAt: 'desc' }],
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      coverImage: true,
      tags: true,
      readingTime: true,
      featured: true,
      publishedAt: true,
    },
  })

  return (
    <div className="section-padding" style={{ paddingTop: '6rem' }}>
      <div className="container-xl">
        <div className="mb-12">
          <span className="section-label">Writing</span>
          <h1
            className="font-serif"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 400, color: 'var(--text-primary)', marginBottom: '12px' }}
          >
            Blog
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '520px' }}>
            Thoughts on software engineering, AI-powered workflows, and building products that scale.
          </p>
        </div>

        <BlogList posts={posts} />
      </div>
    </div>
  )
}
