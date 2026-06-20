import { KCHero } from '@/components/sections/KCHero';
import { KCServices } from '@/components/sections/KCServices';
import { KCStats } from '@/components/sections/KCStats';
import { KCCTA } from '@/components/sections/KCCTA';

export default function Home() {
  return (
    <>
      <KCHero />
      <KCServices />
      <KCStats />
      <KCCTA />
    </>
  );
}
