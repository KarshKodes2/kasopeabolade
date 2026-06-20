'use client';

import { useState } from 'react';
import { Plus, MoreHorizontal, Pencil, Trash2, ExternalLink } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { DataTable } from '../../../shared/components/common/DataTable';
import { FilterBar } from '../../../shared/components/common/FilterBar';
import { AppPagination } from '../../../shared/components/common/AppPagination';
import { StatusBadge } from '../../../shared/components/common/StatusBadge';
import { useDebounce } from '../../../shared/hooks/useDebounce';
import { AddProjectDialog } from './AddProjectDialog';
import { EditProjectDialog } from './EditProjectDialog';
import { DeleteProjectDialog } from './DeleteProjectDialog';

type Project = {
  id: string;
  title: string;
  subtitle: string | null;
  slug: string;
  description: string | null;
  url: string | null;
  emoji: string | null;
  tags: string[];
  featured: boolean;
  published: boolean;
  createdAt: Date;
};

type Props = {
  projects: Project[];
};

const PAGE_SIZE = 15;

export function ProjectsPageClient({ projects }: Props) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [addOpen, setAddOpen] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [deleteProject, setDeleteProject] = useState<Project | null>(null);
  const debouncedSearch = useDebounce(search, 250);

  const filtered = projects.filter((p) => {
    const matchesSearch =
      !debouncedSearch ||
      p.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(debouncedSearch.toLowerCase()));
    const matchesStatus =
      !statusFilter ||
      (statusFilter === 'published' ? p.published : !p.published);
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const columns = [
    {
      key: 'title',
      header: 'Project',
      render: (p: Project) => (
        <div className="flex items-center gap-3">
          {p.emoji && <span style={{ fontSize: '20px' }}>{p.emoji}</span>}
          <div>
            <p className="font-medium" style={{ color: 'var(--cv-text)' }}>{p.title}</p>
            {p.subtitle && <p className="text-xs" style={{ color: 'var(--cv-text-muted)' }}>{p.subtitle}</p>}
          </div>
        </div>
      ),
    },
    {
      key: 'tags',
      header: 'Tags',
      render: (p: Project) => (
        <div className="flex flex-wrap gap-1">
          {p.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded px-2 py-0.5 text-xs"
              style={{ background: 'rgba(124,58,237,0.08)', color: 'var(--cv-brand-light)' }}
            >
              {tag}
            </span>
          ))}
          {p.tags.length > 3 && (
            <span className="text-xs" style={{ color: 'var(--cv-text-muted)' }}>+{p.tags.length - 3}</span>
          )}
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (p: Project) => (
        <div className="flex items-center gap-2">
          <StatusBadge status={p.published ? 'PUBLISHED' : 'DRAFT'} />
          {p.featured && <StatusBadge status="PRO" label="Featured" />}
        </div>
      ),
      width: '140px',
    },
    {
      key: 'url',
      header: 'URL',
      render: (p: Project) =>
        p.url ? (
          <a href={p.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs" style={{ color: 'var(--cv-brand-light)' }}>
            <ExternalLink size={11} /> View
          </a>
        ) : (
          <span className="text-xs" style={{ color: 'var(--cv-text-muted)' }}>—</span>
        ),
      width: '80px',
    },
    {
      key: 'date',
      header: 'Created',
      render: (p: Project) => (
        <span className="text-xs" style={{ color: 'var(--cv-text-muted)' }}>
          {new Date(p.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' })}
        </span>
      ),
      width: '100px',
    },
    {
      key: 'actions',
      header: '',
      render: (p: Project) => (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="btn-ghost" style={{ padding: '4px 6px', borderRadius: '6px' }}>
              <MoreHorizontal size={15} />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content className="dropdown-content" align="end" sideOffset={4}>
              <DropdownMenu.Item asChild>
                <button className="dropdown-item w-full" onClick={() => setEditProject(p)}>
                  <Pencil size={12} /> Edit
                </button>
              </DropdownMenu.Item>
              <DropdownMenu.Item asChild>
                <button className="dropdown-item danger w-full" onClick={() => setDeleteProject(p)}>
                  <Trash2 size={12} /> Delete
                </button>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      ),
      width: '48px',
    },
  ];

  return (
    <>
      <FilterBar
        search={search}
        onSearchChange={(v) => { setSearch(v); setPage(1); }}
        searchPlaceholder="Search projects…"
        filters={[
          {
            key: 'status',
            value: statusFilter,
            onChange: (v) => { setStatusFilter(v); setPage(1); },
            options: [{ value: 'published', label: 'Published' }, { value: 'draft', label: 'Draft' }],
            placeholder: 'All statuses',
          },
        ]}
        total={filtered.length}
        label={filtered.length === 1 ? 'project' : 'projects'}
        actions={
          <button className="btn-primary" onClick={() => setAddOpen(true)}>
            <Plus size={14} /> Add Project
          </button>
        }
      />

      <DataTable
        columns={columns}
        data={paginated}
        keyFn={(p) => p.id}
        emptyMessage="No projects found."
      />

      <AppPagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        pageSize={PAGE_SIZE}
        totalItems={filtered.length}
      />

      <AddProjectDialog open={addOpen} onClose={() => setAddOpen(false)} />
      {editProject && <EditProjectDialog project={editProject} onClose={() => setEditProject(null)} />}
      {deleteProject && <DeleteProjectDialog project={deleteProject} onClose={() => setDeleteProject(null)} />}
    </>
  );
}
