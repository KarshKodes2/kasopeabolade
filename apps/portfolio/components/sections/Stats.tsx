import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { stats } from '@/lib/data'

export function Stats() {
  return (
    <section id="stats" className="section-padding bg-[var(--bg-3)] relative overflow-hidden">
      {/* Blue-deep left gradient */}
      <div
        className="absolute inset-y-0 left-0 w-1/2 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, rgba(30,58,138,0.12) 0%, transparent 100%)' }}
      />
      {/* Gold top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />

      <div className="container-xl relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s) => (
            <AnimatedCounter
              key={s.label}
              value={s.value}
              suffix={s.suffix}
              label={s.label}
              color={s.color}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
