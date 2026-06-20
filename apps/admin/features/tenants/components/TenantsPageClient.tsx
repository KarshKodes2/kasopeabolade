'use client';

import { useState } from 'react';
import { MoreHorizontal, Pencil, Ban, Globe } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { DataTable } from '../../../shared/components/common/DataTable';
import { FilterBar } from '../../../shared/components/common/FilterBar';
import { AppPagination } from '../../../shared/components/common/AppPagination';
import { StatusBadge } from '../../../shared/components/common/StatusBadge';
import { useDebounce } from '../../../shared/hooks/useDebounce';
import { EditTenantDialog } from './EditTenantDialog';
import { SuspendTenantDialog } from './SuspendTenantDialog';

type Tenant = {
  id: string;
  name: string;
  slug: string;
  plan: string;
  status: string;
  siteType: string;
  customDomain: string | null;
  _count: { bookings: number };
  createdAt: Date;
};

type Props = {
  tenants: Tenant[];
};

const PAGE_SIZE = 20;

const PLAN_OPTIONS = [
  { value: 'FREE', label: 'Free' },
  { value: 'STARTER', label: 'Starter' },
  { value: 'PRO', label: 'Pro' },
  { value: 'ENTERPRISE', label: 'Enterprise' },
];

const STATUS_OPTIONS = [
  { value: 'ACTIVE', label: 'Active' },
  { value: 'SUSPENDED', label: 'Suspended' },
  { value: 'CANCELLED', label: 'Cancelled' },
];

export function TenantsPageClient({ tenants }: Props) {
  const [search, setSearch] = useState('');
  const [planFilter, setPlanFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [editTenant, setEditTenant] = useState<Tenant | null>(null);
  const [suspendTenant, setSuspendTenant] = useState<Tenant | null>(null);
  const debouncedSearch = useDebounce(search, 250);

  const filtered = tenants.filter((t) => {
    const matchesSearch =
      !debouncedSearch ||
      t.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      t.slug.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      (t.customDomain ?? '').toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesPlan = !planFilter || t.plan === planFilter;
    const matchesStatus = !statusFilter || t.status === statusFilter;
    return matchesSearch && matchesPlan && matchesStatus;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const columns = [
    {
      key: 'name',
      header: 'Tenant',
      render: (t: Tenant) => (
        <div>
          <p className="font-medium" style={{ color: 'var(--cv-text)' }}>{t.name}</p>
          <p className="text-xs" style={{ color: 'var(--cv-text-muted)' }}>/{t.slug}</p>
        </div>
      ),
    },
    {
      key: 'siteType',
      header: 'Type',
      render: (t: Tenant) => <StatusBadge status={t.siteType} />,
      width: '110px',
    },
    {
      key: 'plan',
      header: 'Plan',
      render: (t: Tenant) => <StatusBadge status={t.plan} />,
      width: '100px',
    },
    {
      key: 'status',
      header: 'Status',
      render: (t: Tenant) => <StatusBadge status={t.status} />,
      width: '100px',
    },
    {
      key: 'bookings',
      header: 'Bookings',
      render: (t: Tenant) => (
        <span style={{ color: 'var(--cv-text-secondary)' }}>{t._count.bookings}</span>
      ),
      width: '80px',
    },
    {
      key: 'domain',
      header: 'Domain',
      render: (t: Tenant) =>
        t.customDomain ? (
          <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--cv-brand-light)' }}>
            <Globe size={11} /> {t.customDomain}
          </div>
        ) : (
          <span className="text-xs" style={{ color: 'var(--cv-text-muted)' }}>—</span>
        ),
    },
    {
      key: 'actions',
      header: '',
      render: (t: Tenant) => (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="btn-ghost" style={{ padding: '4px 6px', borderRadius: '6px' }}>
              <MoreHorizontal size={15} />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content className="dropdown-content" align="end" sideOffset={4}>
              <DropdownMenu.Item asChild>
                <button className="dropdown-item w-full" onClick={() => setEditTenant(t)}>
                  <Pencil size={12} /> Edit Plan / Type
                </button>
              </DropdownMenu.Item>
              {t.status === 'ACTIVE' && (
                <DropdownMenu.Item asChild>
                  <button className="dropdown-item danger w-full" onClick={() => setSuspendTenant(t)}>
                    <Ban size={12} /> Suspend
                  </button>
                </DropdownMenu.Item>
              )}
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
        searchPlaceholder="Search tenants…"
        filters={[
          {
            key: 'plan',
            value: planFilter,
            onChange: (v) => { setPlanFilter(v); setPage(1); },
            options: PLAN_OPTIONS,
            placeholder: 'All plans',
          },
          {
            key: 'status',
            value: statusFilter,
            onChange: (v) => { setStatusFilter(v); setPage(1); },
            options: STATUS_OPTIONS,
            placeholder: 'All statuses',
          },
        ]}
        total={filtered.length}
        label={filtered.length === 1 ? 'tenant' : 'tenants'}
      />

      <DataTable
        columns={columns}
        data={paginated}
        keyFn={(t) => t.id}
        emptyMessage="No tenants found."
      />

      <AppPagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        pageSize={PAGE_SIZE}
        totalItems={filtered.length}
      />

      {editTenant && <EditTenantDialog tenant={editTenant} onClose={() => setEditTenant(null)} />}
      {suspendTenant && <SuspendTenantDialog tenant={suspendTenant} onClose={() => setSuspendTenant(null)} />}
    </>
  );
}
