import { ResourcesList } from '@/components/sections/ResourcesList'
import { resources } from '@/lib/resources'

export const metadata = {
  title: 'Resources',
  description: 'Curated developer resources, tools, and libraries I use and recommend.',
}

export default function ResourcesPage() {
  return (
    <div className="section-padding" style={{ paddingTop: '6rem' }}>
      <div className="container-xl">
        <div className="mb-12">
          <span className="section-label">Toolkit</span>
          <h1
            className="font-serif"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 400, color: 'var(--text-primary)', marginBottom: '12px' }}
          >
            Resources
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '520px' }}>
            Curated tools, libraries, and references I use daily as a senior frontend engineer.
          </p>
        </div>

        <ResourcesList resources={resources} />
      </div>
    </div>
  )
}
