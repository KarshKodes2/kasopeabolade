interface Socials {
  instagram?: string | null;
  tiktok?: string | null;
  youtube?: string | null;
  audiomack?: string | null;
  soundcloud?: string | null;
  spotify?: string | null;
}

const PLATFORMS = [
  { key: 'instagram' as const, label: 'Instagram', icon: '📸' },
  { key: 'tiktok' as const, label: 'TikTok', icon: '🎵' },
  { key: 'youtube' as const, label: 'YouTube', icon: '▶️' },
  { key: 'audiomack' as const, label: 'Audiomack', icon: '🎧' },
  { key: 'soundcloud' as const, label: 'SoundCloud', icon: '☁️' },
  { key: 'spotify' as const, label: 'Spotify', icon: '🎶' },
];

export function SocialLinksSection({ socials }: { socials: Socials }) {
  const active = PLATFORMS.filter((p) => socials[p.key]);
  if (active.length === 0) return null;

  return (
    <section className="border-t px-6 py-16 text-center" style={{ borderColor: 'var(--cv-border)', background: 'var(--cv-surface)' }}>
      <p className="mb-8 text-sm tracking-widest uppercase text-white/30">Find me on</p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {active.map((p) => (
          <a
            key={p.key}
            href={socials[p.key]!}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-medium text-white/60 transition-all hover:border-[var(--cv-brand)] hover:text-white"
            style={{ background: 'var(--cv-elevated)', borderColor: 'var(--cv-border)' }}
          >
            <span>{p.icon}</span>
            {p.label}
          </a>
        ))}
      </div>
    </section>
  );
}
