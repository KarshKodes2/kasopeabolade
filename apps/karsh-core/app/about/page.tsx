import type { Metadata } from 'next';
import { KCAbout } from '@/components/sections/KCAbout';

export const metadata: Metadata = {
  title: 'About',
  description: 'Karsh Core Solutions — built by Kasope Abolade. Engineering excellence for the digital age.',
};

export default function AboutPage() {
  return <KCAbout />;
}
