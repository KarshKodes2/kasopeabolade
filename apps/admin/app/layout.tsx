import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import { QueryProvider } from '../shared/providers/QueryProvider';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'Admin — Karsh Core Solutions', template: '%s | Admin' },
  description: 'Central command for Karsh Core Solutions.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <QueryProvider>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: 'var(--cv-elevated)',
                border: '1px solid var(--cv-border)',
                color: 'var(--cv-text)',
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
              },
            }}
          />
        </QueryProvider>
      </body>
    </html>
  );
}
