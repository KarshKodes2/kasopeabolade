'use client';

import { useState } from 'react';
import { Plus, MoreHorizontal, Pencil, UserX } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Image from 'next/image';
import { DataTable } from '../../../shared/components/common/DataTable';
import { FilterBar } from '../../../shared/components/common/FilterBar';
import { StatusBadge } from '../../../shared/components/common/StatusBadge';
import { useDebounce } from '../../../shared/hooks/useDebounce';
import { AddAdminDialog } from './AddAdminDialog';
import { DeactivateAdminDialog } from './DeactivateAdminDialog';

type Member = {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: string;
  createdAt: Date;
};

type Props = {
  members: Member[];
};

export function TeamPageClient({ members }: Props) {
  const [search, setSearch] = useState('');
  const [addOpen, setAddOpen] = useState(false);
  const [deactivateMember, setDeactivateMember] = useState<Member | null>(null);
  const debouncedSearch = useDebounce(search, 250);

  const filtered = members.filter((m) => {
    if (!debouncedSearch) return true;
    return (
      m.name?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      m.email?.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  });

  const columns = [
    {
      key: 'member',
      header: 'Member',
      render: (m: Member) => (
        <div className="flex items-center gap-3">
          {m.image ? (
            <Image src={m.image} alt={m.name ?? ''} width={32} height={32} className="rounded-full" />
          ) : (
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold"
              style={{ background: 'var(--cv-brand)', color: 'white' }}
            >
              {m.name?.[0] ?? m.email?.[0] ?? '?'}
            </div>
          )}
          <div>
            <p className="font-medium" style={{ color: 'var(--cv-text)' }}>{m.name ?? '—'}</p>
            <p className="text-xs" style={{ color: 'var(--cv-text-muted)' }}>{m.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      render: (m: Member) => <StatusBadge status={m.role} />,
      width: '120px',
    },
    {
      key: 'joined',
      header: 'Joined',
      render: (m: Member) => (
        <span className="text-xs" style={{ color: 'var(--cv-text-muted)' }}>
          {new Date(m.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' })}
        </span>
      ),
      width: '100px',
    },
    {
      key: 'actions',
      header: '',
      render: (m: Member) => (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="btn-ghost" style={{ padding: '4px 6px', borderRadius: '6px' }}>
              <MoreHorizontal size={15} />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content className="dropdown-content" align="end" sideOffset={4}>
              <DropdownMenu.Item asChild>
                <button className="dropdown-item danger w-full" onClick={() => setDeactivateMember(m)}>
                  <UserX size={12} /> Remove Access
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
        onSearchChange={setSearch}
        searchPlaceholder="Search members…"
        total={filtered.length}
        label={filtered.length === 1 ? 'member' : 'members'}
        actions={
          <button className="btn-primary" onClick={() => setAddOpen(true)}>
            <Plus size={14} /> Add Admin
          </button>
        }
      />

      <DataTable
        columns={columns}
        data={filtered}
        keyFn={(m) => m.id}
        emptyMessage="No team members found."
      />

      <AddAdminDialog open={addOpen} onClose={() => setAddOpen(false)} />
      {deactivateMember && (
        <DeactivateAdminDialog member={deactivateMember} onClose={() => setDeactivateMember(null)} />
      )}
    </>
  );
}
