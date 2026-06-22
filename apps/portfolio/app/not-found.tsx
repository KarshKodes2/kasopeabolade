import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px',
        textAlign: 'center',
      }}
    >
      <div>
        <p
          style={{
            fontFamily: 'var(--font-dm-serif)',
            fontSize: 96,
            color: 'var(--border)',
            lineHeight: 1,
            marginBottom: 16,
          }}
        >
          404
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-dm-serif)',
            fontSize: 32,
            color: 'var(--text-primary)',
            marginBottom: 12,
          }}
        >
          Page not found
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 32, fontSize: 16 }}>
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          style={{
            padding: '12px 28px',
            borderRadius: 10,
            background: 'var(--accent)',
            color: '#fff',
            textDecoration: 'none',
            fontSize: 15,
            fontWeight: 600,
          }}
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
