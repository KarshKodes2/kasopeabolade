import { STATIC_PROJECTS, type StaticProject } from './data';

export type Project = StaticProject;

export async function getProjects(): Promise<Project[]> {
  try {
    const { prisma } = await import('db');
    const dbProjects = await prisma.project.findMany({
      where: { published: true },
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
    });

    if (dbProjects.length > 0) {
      return dbProjects.map((p) => ({
        id: p.id,
        title: p.title,
        description: p.description ?? '',
        slug: p.slug,
        tags: p.tags,
        featuredImg: p.featuredImg ?? null,
        featured: p.featured,
      }));
    }
  } catch {
    // DB unavailable during build — fall through to static
  }

  return STATIC_PROJECTS;
}
