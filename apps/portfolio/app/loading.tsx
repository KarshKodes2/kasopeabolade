export default function Loading() {
  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <span className="text-3xl font-bold font-mono text-gradient">KA.</span>
        <div className="w-32 h-0.5 bg-[var(--surface)] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[var(--blue)] to-[var(--gold)] animate-pulse"
            style={{ width: '60%' }}
          />
        </div>
      </div>
    </div>
  )
}
