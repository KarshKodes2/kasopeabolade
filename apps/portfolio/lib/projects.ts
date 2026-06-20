import { STATIC_PROJECTS } from './data'

export type ProjectDisplay = {
  id:          string
  title:       string
  subtitle?:   string
  description: string
  url?:        string
  tags:        string[]
  color:       string
  emoji:       string
}

const PROJECT_COLORS = ['#2563EB', '#D4AF37', '#EC4899', '#7C3AED', '#059669', '#F59E0B', '#EF4444']
const PROJECT_EMOJIS = ['🚀', '💡', '⚡', '🔥', '🌟', '🎯', '🛠️']

export async function getProjects(): Promise<ProjectDisplay[]> {
  try {
    const { prisma } = await import('db')
    const rows = await prisma.project.findMany({
      where:   { published: true },
      orderBy: { createdAt: 'desc' },
    })
    if (rows.length === 0) return STATIC_PROJECTS
    return rows.map((p, i) => ({
      id:          p.id,
      title:       p.title,
      description: p.description ?? '',
      tags:        p.tags,
      color:       PROJECT_COLORS[i % PROJECT_COLORS.length],
      emoji:       PROJECT_EMOJIS[i % PROJECT_EMOJIS.length],
    }))
  } catch {
    return STATIC_PROJECTS
  }
}
