import { prisma } from 'db';
import { ProjectsPageClient } from '../../../../features/projects/components/ProjectsPageClient';

export const metadata = { title: 'Projects' };

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--cv-text)' }}>Portfolio Projects</h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--cv-text-secondary)' }}>
          {projects.length} {projects.length === 1 ? 'project' : 'projects'}
        </p>
      </div>
      <ProjectsPageClient projects={projects} />
    </div>
  );
}
