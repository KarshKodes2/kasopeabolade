import { prisma } from 'db'
import { SearchClient } from '@/components/sections/SearchClient'
import { resources } from '@/lib/resources'
import { STATIC_PROJECTS } from '@/lib/data'

export const metadata = {
  title: 'Search',
  description: 'Search across all posts, projects, and resources.',
}

export default async function SearchPage() {
  const posts = await prisma.post.findMany({
    where: { context: 'PORTFOLIO', published: true },
    select: { id: true, title: true, slug: true, excerpt: true, tags: true },
  })

  return (
    <div className="section-padding" style={{ paddingTop: '6rem' }}>
      <div className="container-xl">
        <div className="mb-10">
          <span className="section-label">Find anything</span>
          <h1
            className="font-serif"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 400, color: 'var(--text-primary)' }}
          >
            Search
          </h1>
        </div>

        <SearchClient
          posts={posts}
          projects={STATIC_PROJECTS}
          resources={resources}
        />
      </div>
    </div>
  )
}
