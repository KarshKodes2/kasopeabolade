import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
      <div className="text-center space-y-6">
        <p className="text-[var(--text-3)] text-sm tracking-[0.2em] uppercase font-mono">404</p>
        <h1 className="text-5xl md:text-7xl font-bold text-gradient">Lost in Space</h1>
        <p className="text-[var(--text-2)] max-w-sm mx-auto">
          This page doesn&apos;t exist — but great things do back on the home page.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-[var(--radius)] bg-[var(--blue)] text-white font-semibold text-sm hover:shadow-[0_0_24px_var(--glow-blue)] transition-all duration-200"
        >
          ← Back home
        </Link>
      </div>
    </div>
  )
}
