import type { Metadata } from 'next';
import { KCServicesDetail } from '@/components/sections/KCServicesDetail';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Full-stack SaaS, fintech, mobile, AI, DevOps, and consulting services from Karsh Core Solutions.',
};

export default function ServicesPage() {
  return <KCServicesDetail />;
}
