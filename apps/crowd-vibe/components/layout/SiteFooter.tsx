import Link from 'next/link';

interface SiteFooterProps {
  tenant: { name: string; slug: string };
}

export function SiteFooter({ tenant }: SiteFooterProps) {
  const base = `/site/${tenant.slug}`;
  return (
    <footer className="border-t px-6 py-12" style={{ borderColor: 'var(--cv-border)', background: 'var(--cv-surface)' }}>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-lg font-bold text-white">{tenant.name}</p>
          <div className="flex items-center gap-6 text-sm text-white/40">
            <Link href={base} className="hover:text-white">Home</Link>
            <Link href={`${base}/gallery`} className="hover:text-white">Gallery</Link>
            <Link href={`${base}/press`} className="hover:text-white">Press Kit</Link>
            <Link href={`${base}/book`} className="hover:text-white">Book</Link>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center justify-between gap-2 text-xs text-white/20 md:flex-row">
          <p>© {new Date().getFullYear()} {tenant.name}. All rights reserved.</p>
          <p>
            Powered by{' '}
            <a href="https://crowdvibe.io" className="text-white/40 hover:text-white">
              CrowdVibe
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
