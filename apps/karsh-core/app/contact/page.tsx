import type { Metadata } from 'next';
import { KCContactForm } from '@/components/sections/KCContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Start a project with Karsh Core Solutions. Tell us what you\'re building.',
};

export default function ContactPage() {
  return (
    <section className="kc-section" style={{ background: 'var(--kc-bg)', paddingTop: '120px' }}>
      <div className="kc-container" style={{ maxWidth: '680px' }}>
        <div style={{ marginBottom: '48px' }}>
          <span className="kc-label">Get in touch</span>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, color: 'var(--kc-text)', lineHeight: 1.1, marginBottom: '14px' }}>
            Start a project
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--kc-text-2)', lineHeight: 1.7 }}>
            Tell us about what you&rsquo;re building. We typically respond within 24 hours.
          </p>
        </div>
        <KCContactForm />
      </div>
    </section>
  );
}
