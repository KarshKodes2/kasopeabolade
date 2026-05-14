import { prisma } from 'db';
import Link from 'next/link';

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Portfolio Projects</h1>
          <p className="mt-1 text-sm text-white/40">{projects.length} projects</p>
        </div>
        <Link href="/dashboard/portfolio/projects/new" className="rounded-xl px-4 py-2 text-sm font-medium text-white" style={{ background: 'var(--cv-brand)' }}>
          + New project
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.length === 0 ? (
          <div className="col-span-3 rounded-xl border p-10 text-center text-white/30" style={{ borderColor: 'var(--cv-border)' }}>
            No projects yet. Add your first project.
          </div>
        ) : (
          projects.map((p) => (
            <div key={p.id} className="rounded-xl border p-5" style={{ background: 'var(--cv-surface)', borderColor: 'var(--cv-border)' }}>
              {p.featuredImg && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.featuredImg} alt={p.title} className="mb-3 aspect-video w-full rounded-lg object-cover" />
              )}
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-white">{p.title}</h3>
                <span className={`rounded-full px-2 py-0.5 text-xs ${p.published ? 'bg-emerald-500/15 text-emerald-400' : 'bg-white/10 text-white/40'}`}>
                  {p.published ? 'Live' : 'Draft'}
                </span>
              </div>
              {p.description && <p className="mt-1 text-sm text-white/40 line-clamp-2">{p.description}</p>}
              <div className="mt-3 flex gap-1 flex-wrap">
                {p.tags.map((tag) => (
                  <span key={tag} className="rounded px-2 py-0.5 text-xs bg-white/5 text-white/40">{tag}</span>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <Link href={`/dashboard/portfolio/projects/${p.id}`} className="text-xs" style={{ color: 'var(--cv-brand)' }}>Edit →</Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
