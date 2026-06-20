'use client';

import { useState } from 'react';
import { Plus, MoreHorizontal, Pencil, Trash2, Eye } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { DataTable } from '../../../shared/components/common/DataTable';
import { FilterBar } from '../../../shared/components/common/FilterBar';
import { AppPagination } from '../../../shared/components/common/AppPagination';
import { StatusBadge } from '../../../shared/components/common/StatusBadge';
import { useDebounce } from '../../../shared/hooks/useDebounce';
import { AddPostDialog } from './AddPostDialog';
import { EditPostDialog } from './EditPostDialog';
import { DeletePostDialog } from './DeletePostDialog';

type Post = {
  id: string;
  title: string;
  slug: string;
  context: string;
  excerpt?: string | null;
  content?: string;
  published: boolean;
  featured: boolean;
  tags: string[];
  readingTime: number | null;
  createdAt: Date;
  tenant?: { name: string; slug: string } | null;
};

type Props = {
  posts: Post[];
  context: 'PORTFOLIO' | 'KARSH_CORE' | 'TENANT';
  showTenant?: boolean;
};

const PAGE_SIZE = 15;

export function PostsPageClient({ posts, context, showTenant = false }: Props) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [addOpen, setAddOpen] = useState(false);
  const [editPost, setEditPost] = useState<Post | null>(null);
  const [deletePost, setDeletePost] = useState<Post | null>(null);
  const debouncedSearch = useDebounce(search, 250);

  const filtered = posts.filter((p) => {
    const matchesSearch =
      !debouncedSearch ||
      p.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      p.slug.toLowerCase().includes(debouncedSearch.toLowerCase());
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
      header: 'Title',
      render: (post: Post) => (
        <div>
          <p className="font-medium" style={{ color: 'var(--cv-text)' }}>{post.title}</p>
          <p className="mt-0.5 text-xs" style={{ color: 'var(--cv-text-muted)' }}>/{post.slug}</p>
        </div>
      ),
    },
    ...(showTenant
      ? [{
          key: 'tenant',
          header: 'Tenant',
          render: (post: Post) => (
            <span style={{ color: 'var(--cv-text-secondary)' }}>
              {post.tenant?.name ?? '—'}
            </span>
          ),
        }]
      : []),
    {
      key: 'status',
      header: 'Status',
      render: (post: Post) => (
        <StatusBadge status={post.published ? 'PUBLISHED' : 'DRAFT'} />
      ),
      width: '100px',
    },
    {
      key: 'featured',
      header: 'Featured',
      render: (post: Post) => (
        <span style={{ color: post.featured ? 'var(--cv-accent)' : 'var(--cv-text-muted)', fontSize: 12 }}>
          {post.featured ? 'Yes' : '—'}
        </span>
      ),
      width: '80px',
    },
    {
      key: 'tags',
      header: 'Tags',
      render: (post: Post) => (
        <span className="text-xs" style={{ color: 'var(--cv-text-muted)' }}>
          {post.tags.slice(0, 3).join(', ') || '—'}
        </span>
      ),
    },
    {
      key: 'date',
      header: 'Created',
      render: (post: Post) => (
        <span className="text-xs" style={{ color: 'var(--cv-text-muted)' }}>
          {new Date(post.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' })}
        </span>
      ),
      width: '100px',
    },
    {
      key: 'actions',
      header: '',
      render: (post: Post) => (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="btn-ghost" style={{ padding: '4px 6px', borderRadius: '6px' }}>
              <MoreHorizontal size={15} />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content className="dropdown-content" align="end" sideOffset={4}>
              <DropdownMenu.Item asChild>
                <button className="dropdown-item w-full" onClick={() => setEditPost(post)}>
                  <Pencil size={12} /> Edit
                </button>
              </DropdownMenu.Item>
              <DropdownMenu.Item asChild>
                <button className="dropdown-item danger w-full" onClick={() => setDeletePost(post)}>
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
        searchPlaceholder="Search posts…"
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
        label={filtered.length === 1 ? 'post' : 'posts'}
        actions={
          <button className="btn-primary" onClick={() => setAddOpen(true)}>
            <Plus size={14} /> New Post
          </button>
        }
      />

      <DataTable
        columns={columns}
        data={paginated}
        keyFn={(p) => p.id}
        emptyMessage="No posts found."
      />

      <AppPagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        pageSize={PAGE_SIZE}
        totalItems={filtered.length}
      />

      <AddPostDialog open={addOpen} onClose={() => setAddOpen(false)} context={context} />
      {editPost && <EditPostDialog post={editPost} onClose={() => setEditPost(null)} />}
      {deletePost && <DeletePostDialog post={deletePost} onClose={() => setDeletePost(null)} />}
    </>
  );
}
