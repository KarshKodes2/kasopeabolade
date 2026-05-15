import type { Tenant, TenantSettings } from './types';

export async function fetchTenantBySlug(slug: string): Promise<Tenant | null> {
  const res = await fetch(`/api/tenants?slug=${slug}`);
  if (!res.ok) return null;
  const data = await res.json() as { tenant: Tenant };
  return data.tenant;
}

export async function fetchTenantByDomain(domain: string): Promise<Tenant | null> {
  const res = await fetch(`/api/tenants/by-domain?domain=${domain}`);
  if (!res.ok) return null;
  const data = await res.json() as { tenant: Tenant };
  return data.tenant;
}

export async function updateTenantSettings(settings: TenantSettings): Promise<void> {
  const res = await fetch('/api/tenants', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settings),
  });
  if (!res.ok) throw new Error('Failed to update settings');
}
