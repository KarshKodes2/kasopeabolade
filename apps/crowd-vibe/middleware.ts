import { NextRequest, NextResponse } from 'next/server';

const PLATFORM_HOSTNAME = process.env.NEXT_PUBLIC_PLATFORM_HOSTNAME ?? 'crowdvibe.io';
const PLATFORM_HOSTNAME_DEV = 'localhost';

// Paths that should never be rewritten to tenant sites
const PASSTHROUGH_PREFIXES = [
  '/api/',
  '/_next/',
  '/dashboard',
  '/auth',
  '/pricing',
  '/favicon',
  '/robots',
  '/sitemap',
];

function shouldPassthrough(pathname: string) {
  return PASSTHROUGH_PREFIXES.some((p) => pathname.startsWith(p));
}

function extractSubdomainSlug(hostname: string): string | null {
  // e.g. dj-randy.crowdvibe.io → "dj-randy"
  const withoutPort = hostname.split(':')[0];
  const parts = withoutPort.split('.');
  if (parts.length >= 3) {
    const sub = parts[0];
    // Exclude www and the platform's own root
    if (sub !== 'www' && sub !== 'crowdvibe') return sub;
  }
  return null;
}

async function getTenantSlugByCustomDomain(domain: string): Promise<string | null> {
  // Edge-compatible fetch to our own API to resolve custom domain → tenant slug.
  // Returns null on any failure so the middleware degrades gracefully.
  try {
    const base =
      process.env.NODE_ENV === 'development'
        ? `http://localhost:3003`
        : `https://${PLATFORM_HOSTNAME}`;
    const res = await fetch(`${base}/api/tenants/by-domain?domain=${encodeURIComponent(domain)}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { slug?: string };
    return data.slug ?? null;
  } catch {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const hostname = req.headers.get('host') ?? '';
  const { pathname } = req.nextUrl;

  if (shouldPassthrough(pathname)) return NextResponse.next();

  const isLocalhost = hostname.startsWith(PLATFORM_HOSTNAME_DEV);
  const isPlatformRoot =
    hostname === PLATFORM_HOSTNAME ||
    hostname === `www.${PLATFORM_HOSTNAME}` ||
    (isLocalhost && !hostname.includes('---'));

  // Platform root — serve normally (marketing, dashboard, auth)
  if (isPlatformRoot) return NextResponse.next();

  // 1. Try subdomain slug first (fast, no DB)
  const subSlug = extractSubdomainSlug(hostname);
  if (subSlug) {
    const url = req.nextUrl.clone();
    url.pathname = `/site/${subSlug}${pathname === '/' ? '' : pathname}`;
    return NextResponse.rewrite(url);
  }

  // 2. Try custom domain (DB lookup)
  const customSlug = await getTenantSlugByCustomDomain(hostname);
  if (customSlug) {
    const url = req.nextUrl.clone();
    url.pathname = `/site/${customSlug}${pathname === '/' ? '' : pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
