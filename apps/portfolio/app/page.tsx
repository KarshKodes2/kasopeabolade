import { Suspense } from 'react'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { TechStack } from '@/components/sections/TechStack'
import { Timeline } from '@/components/sections/Timeline'
import { Projects } from '@/components/sections/Projects'
import { AIEngineering } from '@/components/sections/AIEngineering'
import { Stats } from '@/components/sections/Stats'
import { Contact } from '@/components/sections/Contact'
import { Newsletter } from '@/components/sections/Newsletter'
import { getProjects } from '@/lib/projects'

function SectionSkeleton() {
  return (
    <div className="section-padding">
      <div className="container-xl">
        <div className="h-10 w-48 bg-[var(--surface)] rounded-[var(--radius)] mb-6 animate-pulse" />
        <div className="grid md:grid-cols-2 gap-5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-40 bg-[var(--surface)] rounded-[var(--radius-lg)] animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default async function Home() {
  const projects = await getProjects()

  return (
    <>
      <Hero />
      <Suspense fallback={<SectionSkeleton />}>
        <About />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <TechStack />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <Timeline />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <Projects projects={projects} />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <AIEngineering />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <Stats />
      </Suspense>
      <Newsletter />
      <Suspense fallback={<SectionSkeleton />}>
        <Contact />
      </Suspense>
    </>
  )
}
