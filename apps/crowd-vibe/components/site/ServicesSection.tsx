import Link from 'next/link';

interface ServicesSectionProps {
  slug: string;
}

const eventTypes = [
  { type: 'WEDDING', label: 'Weddings', icon: '💍', desc: 'Sophisticated sets for your special day' },
  { type: 'CORPORATE', label: 'Corporate', icon: '🏢', desc: 'Professional entertainment for events' },
  { type: 'CLUB_NIGHT', label: 'Club Nights', icon: '🎉', desc: 'High-energy Afrobeats & amapiano sets' },
  { type: 'BIRTHDAY', label: 'Birthdays', icon: '🎂', desc: 'Personalized playlist for your celebration' },
  { type: 'FESTIVAL', label: 'Festivals', icon: '🎪', desc: 'Large-scale festival performances' },
  { type: 'PRIVATE_PARTY', label: 'Private Parties', icon: '🥂', desc: 'Exclusive private entertainment' },
];

export function ServicesSection({ slug }: ServicesSectionProps) {
  return (
    <section className="px-6 py-24" style={{ background: 'var(--cv-surface)' }}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm tracking-widest uppercase" style={{ color: 'var(--cv-accent)' }}>
            Services
          </p>
          <h2 className="text-3xl font-bold text-white md:text-4xl">Events I perform at</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {eventTypes.map((event) => (
            <Link
              key={event.type}
              href={`/site/${slug}/book?type=${event.type}`}
              className="group rounded-2xl border p-6 transition-all hover:border-[var(--cv-brand)] hover:scale-[1.02]"
              style={{ background: 'var(--cv-elevated)', borderColor: 'var(--cv-border)' }}
            >
              <div className="mb-4 text-3xl">{event.icon}</div>
              <h3 className="mb-1 font-semibold text-white">{event.label}</h3>
              <p className="text-sm text-white/40">{event.desc}</p>
              <p
                className="mt-4 text-xs font-medium opacity-0 transition-opacity group-hover:opacity-100"
                style={{ color: 'var(--cv-brand)' }}
              >
                Get a quote →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
