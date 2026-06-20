'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

type Props = {
  bookingsByStatus: Array<{ status: string; count: number }>;
  leadsByStatus: Array<{ status: string; count: number }>;
  tenantsByPlan: Array<{ plan: string; count: number }>;
};

const CHART_COLORS = ['#7C3AED', '#F59E0B', '#10B981', '#3B82F6', '#EF4444', '#8B5CF6'];

const TOOLTIP_STYLE = {
  background: '#161616',
  border: '1px solid #222222',
  borderRadius: '8px',
  color: '#ffffff',
  fontFamily: "'Space Grotesk', system-ui, sans-serif",
  fontSize: '12px',
};

const AXIS_STYLE = { fill: 'rgba(255,255,255,0.3)', fontSize: 11 };

export function AnalyticsCharts({ bookingsByStatus, leadsByStatus, tenantsByPlan }: Props) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Bookings by status */}
      <div className="admin-card p-5 lg:col-span-1">
        <h3 className="mb-4 text-sm font-semibold" style={{ color: 'var(--cv-text)' }}>
          Bookings by Status
        </h3>
        {bookingsByStatus.length === 0 ? (
          <p className="py-8 text-center text-xs" style={{ color: 'var(--cv-text-muted)' }}>No bookings yet</p>
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={bookingsByStatus} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <XAxis dataKey="status" tick={AXIS_STYLE} tickLine={false} axisLine={false} />
              <YAxis tick={AXIS_STYLE} tickLine={false} axisLine={false} allowDecimals={false} />
              <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
              <Bar dataKey="count" fill="#7C3AED" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Leads by status */}
      <div className="admin-card p-5 lg:col-span-1">
        <h3 className="mb-4 text-sm font-semibold" style={{ color: 'var(--cv-text)' }}>
          Leads by Status
        </h3>
        {leadsByStatus.length === 0 ? (
          <p className="py-8 text-center text-xs" style={{ color: 'var(--cv-text-muted)' }}>No leads yet</p>
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={leadsByStatus} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} layout="vertical">
              <XAxis type="number" tick={AXIS_STYLE} tickLine={false} axisLine={false} allowDecimals={false} />
              <YAxis dataKey="status" type="category" tick={AXIS_STYLE} tickLine={false} axisLine={false} width={80} />
              <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
              <Bar dataKey="count" fill="#F59E0B" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Tenants by plan */}
      <div className="admin-card p-5 lg:col-span-1">
        <h3 className="mb-4 text-sm font-semibold" style={{ color: 'var(--cv-text)' }}>
          Tenants by Plan
        </h3>
        {tenantsByPlan.length === 0 ? (
          <p className="py-8 text-center text-xs" style={{ color: 'var(--cv-text-muted)' }}>No tenants yet</p>
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={tenantsByPlan}
                dataKey="count"
                nameKey="plan"
                cx="50%"
                cy="50%"
                outerRadius={72}
                innerRadius={40}
                paddingAngle={3}
              >
                {tenantsByPlan.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Legend
                formatter={(value) => (
                  <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: 11 }}>{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
