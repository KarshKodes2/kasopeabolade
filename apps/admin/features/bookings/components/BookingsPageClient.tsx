'use client';

import { useState } from 'react';
import { MoreHorizontal, Eye, RefreshCw } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { DataTable } from '../../../shared/components/common/DataTable';
import { FilterBar } from '../../../shared/components/common/FilterBar';
import { AppPagination } from '../../../shared/components/common/AppPagination';
import { StatusBadge } from '../../../shared/components/common/StatusBadge';
import { useDebounce } from '../../../shared/hooks/useDebounce';
import { ViewBookingDialog } from './ViewBookingDialog';
import { UpdateBookingStatusDialog } from './UpdateBookingStatusDialog';

type Booking = {
  id: string;
  clientName: string;
  clientEmail: string;
  eventType: string;
  eventDate: Date;
  venue: string;
  status: string;
  totalPrice: number | null;
  depositPaid: boolean;
  tenant: { name: string; slug: string };
};

type Props = {
  bookings: Booking[];
};

const PAGE_SIZE = 20;

const STATUS_OPTIONS = [
  { value: 'PENDING', label: 'Pending' },
  { value: 'QUOTE_SENT', label: 'Quote Sent' },
  { value: 'CONFIRMED', label: 'Confirmed' },
  { value: 'DEPOSIT_PAID', label: 'Deposit Paid' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'CANCELLED', label: 'Cancelled' },
];

export function BookingsPageClient({ bookings }: Props) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [viewBooking, setViewBooking] = useState<Booking | null>(null);
  const [statusBooking, setStatusBooking] = useState<Booking | null>(null);
  const debouncedSearch = useDebounce(search, 250);

  const filtered = bookings.filter((b) => {
    const matchesSearch =
      !debouncedSearch ||
      b.clientName.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      b.tenant.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      b.venue.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesStatus = !statusFilter || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const columns = [
    {
      key: 'tenant',
      header: 'Tenant',
      render: (b: Booking) => (
        <span className="text-sm font-medium" style={{ color: 'var(--cv-brand-light)' }}>
          {b.tenant.name}
        </span>
      ),
    },
    {
      key: 'client',
      header: 'Client',
      render: (b: Booking) => (
        <div>
          <p className="font-medium" style={{ color: 'var(--cv-text)' }}>{b.clientName}</p>
          <p className="text-xs" style={{ color: 'var(--cv-text-muted)' }}>{b.clientEmail}</p>
        </div>
      ),
    },
    {
      key: 'event',
      header: 'Event',
      render: (b: Booking) => (
        <div>
          <p className="text-sm" style={{ color: 'var(--cv-text-secondary)' }}>
            {b.eventType.replace(/_/g, ' ')}
          </p>
          <p className="text-xs" style={{ color: 'var(--cv-text-muted)' }}>{b.venue}</p>
        </div>
      ),
    },
    {
      key: 'date',
      header: 'Date',
      render: (b: Booking) => (
        <span className="text-sm" style={{ color: 'var(--cv-text-secondary)' }}>
          {new Date(b.eventDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
        </span>
      ),
      width: '110px',
    },
    {
      key: 'price',
      header: 'Total',
      render: (b: Booking) => (
        <span className="text-sm" style={{ color: b.totalPrice ? 'var(--cv-accent)' : 'var(--cv-text-muted)' }}>
          {b.totalPrice ? `₦${b.totalPrice.toLocaleString()}` : '—'}
        </span>
      ),
      width: '100px',
    },
    {
      key: 'status',
      header: 'Status',
      render: (b: Booking) => <StatusBadge status={b.status} />,
      width: '120px',
    },
    {
      key: 'actions',
      header: '',
      render: (b: Booking) => (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="btn-ghost" style={{ padding: '4px 6px', borderRadius: '6px' }}>
              <MoreHorizontal size={15} />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content className="dropdown-content" align="end" sideOffset={4}>
              <DropdownMenu.Item asChild>
                <button className="dropdown-item w-full" onClick={() => setViewBooking(b)}>
                  <Eye size={12} /> View Details
                </button>
              </DropdownMenu.Item>
              <DropdownMenu.Item asChild>
                <button className="dropdown-item w-full" onClick={() => setStatusBooking(b)}>
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
        searchPlaceholder="Search bookings…"
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
        label={filtered.length === 1 ? 'booking' : 'bookings'}
      />

      <DataTable
        columns={columns}
        data={paginated}
        keyFn={(b) => b.id}
        emptyMessage="No bookings found."
      />

      <AppPagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        pageSize={PAGE_SIZE}
        totalItems={filtered.length}
      />

      {viewBooking && <ViewBookingDialog booking={viewBooking} onClose={() => setViewBooking(null)} />}
      {statusBooking && <UpdateBookingStatusDialog booking={statusBooking} onClose={() => setStatusBooking(null)} />}
    </>
  );
}
