'use client';

import { useState } from 'react';
import { MoreHorizontal, Eye, RefreshCw } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { DataTable } from '../../../shared/components/common/DataTable';
import { FilterBar } from '../../../shared/components/common/FilterBar';
import { AppPagination } from '../../../shared/components/common/AppPagination';
import { StatusBadge } from '../../../shared/components/common/StatusBadge';
import { useDebounce } from '../../../shared/hooks/useDebounce';
import { ViewLeadDialog } from './ViewLeadDialog';
import { UpdateLeadStatusDialog } from './UpdateLeadStatusDialog';

type Lead = {
  id: string;
  contactName: string;
  email: string;
  phone: string | null;
  companyName: string | null;
  projectType: string;
  budget: string | null;
  message: string | null;
  status: string;
  source: string | null;
  createdAt: Date;
};

type Props = {
  leads: Lead[];
};

const PAGE_SIZE = 20;

const STATUS_OPTIONS = [
  { value: 'NEW', label: 'New' },
  { value: 'CONTACTED', label: 'Contacted' },
  { value: 'PROPOSAL_SENT', label: 'Proposal Sent' },
  { value: 'NEGOTIATION', label: 'Negotiation' },
  { value: 'WON', label: 'Won' },
  { value: 'LOST', label: 'Lost' },
];

export function LeadsPageClient({ leads }: Props) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [viewLead, setViewLead] = useState<Lead | null>(null);
  const [statusLead, setStatusLead] = useState<Lead | null>(null);
  const debouncedSearch = useDebounce(search, 250);

  const filtered = leads.filter((l) => {
    const matchesSearch =
      !debouncedSearch ||
      l.contactName.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      l.email.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      (l.companyName ?? '').toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesStatus = !statusFilter || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const columns = [
    {
      key: 'contact',
      header: 'Contact',
      render: (l: Lead) => (
        <div>
          <p className="font-medium" style={{ color: 'var(--cv-text)' }}>{l.contactName}</p>
          <p className="text-xs" style={{ color: 'var(--cv-text-muted)' }}>{l.email}</p>
        </div>
      ),
    },
    {
      key: 'company',
      header: 'Company',
      render: (l: Lead) => (
        <span style={{ color: 'var(--cv-text-secondary)' }}>{l.companyName ?? '—'}</span>
      ),
    },
    {
      key: 'project',
      header: 'Project Type',
      render: (l: Lead) => (
        <span style={{ color: 'var(--cv-text-secondary)' }}>{l.projectType}</span>
      ),
    },
    {
      key: 'budget',
      header: 'Budget',
      render: (l: Lead) => (
        <span style={{ color: l.budget ? 'var(--cv-accent)' : 'var(--cv-text-muted)' }}>
          {l.budget ?? '—'}
        </span>
      ),
      width: '100px',
    },
    {
      key: 'status',
      header: 'Status',
      render: (l: Lead) => <StatusBadge status={l.status} />,
      width: '120px',
    },
    {
      key: 'date',
      header: 'Date',
      render: (l: Lead) => (
        <span className="text-xs" style={{ color: 'var(--cv-text-muted)' }}>
          {new Date(l.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' })}
        </span>
      ),
      width: '90px',
    },
    {
      key: 'actions',
      header: '',
      render: (l: Lead) => (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="btn-ghost" style={{ padding: '4px 6px', borderRadius: '6px' }}>
              <MoreHorizontal size={15} />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content className="dropdown-content" align="end" sideOffset={4}>
              <DropdownMenu.Item asChild>
                <button className="dropdown-item w-full" onClick={() => setViewLead(l)}>
                  <Eye size={12} /> View Details
                </button>
              </DropdownMenu.Item>
              <DropdownMenu.Item asChild>
                <button className="dropdown-item w-full" onClick={() => setStatusLead(l)}>
                  <RefreshCw size={12} /> Update Status
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
        searchPlaceholder="Search leads…"
        filters={[
          {
            key: 'status',
            value: statusFilter,
            onChange: (v) => { setStatusFilter(v); setPage(1); },
            options: STATUS_OPTIONS,
            placeholder: 'All statuses',
          },
        ]}
        total={filtered.length}
        label={filtered.length === 1 ? 'lead' : 'leads'}
      />

      <DataTable
        columns={columns}
        data={paginated}
        keyFn={(l) => l.id}
        emptyMessage="No leads yet. They'll appear here when someone fills out the contact form."
      />

      <AppPagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        pageSize={PAGE_SIZE}
        totalItems={filtered.length}
      />

      {viewLead && <ViewLeadDialog lead={viewLead} onClose={() => setViewLead(null)} />}
      {statusLead && <UpdateLeadStatusDialog lead={statusLead} onClose={() => setStatusLead(null)} />}
    </>
  );
}
