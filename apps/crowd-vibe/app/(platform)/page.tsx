import type { Metadata } from 'next';
import { PlatformNav } from '@/shared/components/layout/PlatformNav';
import { PlatformHero } from './sections/PlatformHero';
import { HowItWorks } from './sections/HowItWorks';
import { FeatureShowcase } from './sections/FeatureShowcase';
import { SocialProof } from './sections/SocialProof';
import { PricingSection } from './sections/PricingSection';
import { PlatformCTA } from './sections/PlatformCTA';

export const metadata: Metadata = {
  title: 'CrowdVibe — Your digital presence, all in one place.',
  description: 'Build your personal brand, portfolio, or company site. CrowdVibe gives every creator and business a powerful, fully-branded web presence with bookings, payments, and custom domains.',
};

export default function PlatformLanding() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--cv-bg)' }}>
      <PlatformNav />
      <PlatformHero />
      <HowItWorks />
      <FeatureShowcase />
      <SocialProof />
      <PricingSection />
      <PlatformCTA />
      <footer className="border-t px-6 py-8 text-center" style={{ borderColor: 'var(--cv-border)' }}>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.2)' }}>
          © {new Date().getFullYear()} CrowdVibe by Karsh Core Solutions. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
