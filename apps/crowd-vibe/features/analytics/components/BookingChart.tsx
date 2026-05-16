'use client';

interface MonthStat {
  month: string;
  count: number;
  revenue: number;
}

interface Props {
  data: MonthStat[];
}

export function BookingChart({ data }: Props) {
  const maxCount = Math.max(...data.map((d) => d.count), 1);
  const maxRevenue = Math.max(...data.map((d) => d.revenue), 1);

  return (
    <div className="space-y-6">
      {/* Bookings bar chart */}
      <div>
        <p className="mb-4 text-xs font-medium uppercase tracking-widest text-white/30">Bookings — last 6 months</p>
        <div className="flex items-end gap-2 h-32">
          {data.map((d) => (
            <div key={d.month} className="flex flex-1 flex-col items-center gap-1.5">
              <span className="text-xs text-white/50">{d.count}</span>
              <div className="w-full rounded-t-md transition-all duration-700" style={{
                height: `${Math.max((d.count / maxCount) * 100, d.count > 0 ? 8 : 2)}%`,
                background: d.count > 0 ? 'var(--cv-brand)' : 'var(--cv-border)',
                minHeight: '4px',
              }} />
              <span className="text-xs text-white/25">{d.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue bar chart */}
      <div>
        <p className="mb-4 text-xs font-medium uppercase tracking-widest text-white/30">Revenue (₦) — last 6 months</p>
        <div className="flex items-end gap-2 h-32">
          {data.map((d) => (
            <div key={d.month} className="flex flex-1 flex-col items-center gap-1.5">
              <span className="text-xs text-white/50">{d.revenue > 0 ? `${(d.revenue / 1000).toFixed(0)}k` : '0'}</span>
              <div className="w-full rounded-t-md transition-all duration-700" style={{
                height: `${Math.max((d.revenue / maxRevenue) * 100, d.revenue > 0 ? 8 : 2)}%`,
                background: d.revenue > 0 ? 'var(--cv-accent)' : 'var(--cv-border)',
                minHeight: '4px',
              }} />
              <span className="text-xs text-white/25">{d.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
