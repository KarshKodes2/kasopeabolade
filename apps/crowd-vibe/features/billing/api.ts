export async function createBillingPortalSession(): Promise<string> {
  const res = await fetch('/api/billing/portal', { method: 'POST' });
  if (!res.ok) throw new Error('Failed to create billing portal session');
  const data = await res.json() as { url: string };
  return data.url;
}
