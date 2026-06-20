import { personal } from '@/lib/data'

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-10">
      <div className="container-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-bold text-lg font-mono">
          <span className="text-gradient">KA</span>
          <span className="text-[var(--text-2)]">.</span>
        </span>

        <p className="text-[var(--text-3)] text-sm text-center">
          © {new Date().getFullYear()} Kasope Abolade. Built with Next.js &amp; ♥
        </p>

        <div className="flex items-center gap-6">
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-3)] hover:text-[var(--text-1)] text-sm transition-colors"
          >
            GitHub
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-3)] hover:text-[var(--text-1)] text-sm transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${personal.email}`}
            className="text-[var(--text-3)] hover:text-[var(--text-1)] text-sm transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
