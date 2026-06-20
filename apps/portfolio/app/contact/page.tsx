import { ContactForm } from '@/components/sections/ContactForm'
import { personal } from '@/lib/data'
import { Mail, MapPin, ExternalLink } from 'lucide-react'

export const metadata = {
  title: 'Contact',
  description: 'Get in touch for freelance work, project collaboration, or just to say hello.',
}

export default function ContactPage() {
  return (
    <div className="section-padding" style={{ paddingTop: '6rem' }}>
      <div className="container-xl">
        <div className="mb-12">
          <span className="section-label">Get in touch</span>
          <h1
            className="font-serif"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 400, color: 'var(--text-primary)', marginBottom: '12px' }}
          >
            Contact
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '520px' }}>
            Open to freelance projects, consulting, and full-time opportunities. Let's build something great.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>
          {/* Contact info */}
          <div>
            <div
              className="card"
              style={{ padding: '28px', marginBottom: '20px' }}
            >
              <h2
                className="font-serif"
                style={{ fontSize: '1.25rem', fontWeight: 400, marginBottom: '20px', color: 'var(--text-primary)' }}
              >
                Reach out directly
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <a
                  href={`mailto:${personal.email}`}
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 150ms ease' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)' }}
                >
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--surface-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail size={16} />
                  </div>
                  <div>
                    <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '2px' }}>Email</p>
                    <p style={{ fontSize: '14px', fontWeight: 500 }}>{personal.email}</p>
                  </div>
                </a>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--surface-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '2px' }}>Location</p>
                    <p style={{ fontSize: '14px', fontWeight: 500 }}>{personal.location}</p>
                  </div>
                </div>

                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 150ms ease' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)' }}
                >
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--surface-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <ExternalLink size={16} />
                  </div>
                  <div>
                    <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '2px' }}>LinkedIn</p>
                    <p style={{ fontSize: '14px', fontWeight: 500 }}>View profile <ExternalLink size={11} style={{ display: 'inline' }} /></p>
                  </div>
                </a>
              </div>
            </div>

            {/* Status card */}
            <div className="card" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 8px var(--accent-glow)', flexShrink: 0 }} className="animate-float" />
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  Currently <strong style={{ color: 'var(--text-primary)' }}>open to new opportunities</strong> and freelance projects.
                </p>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
