import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Timeline } from '@/components/sections/Timeline';
import { Projects } from '@/components/sections/Projects';
import { Stats } from '@/components/sections/Stats';
import { Newsletter } from '@/components/sections/Newsletter';
import { Contact } from '@/components/sections/Contact';
import { getProjects } from '@/lib/projects';

export default async function HomePage() {
  const projects = await getProjects();

  return (
    <>
      <Hero />
      <About />
      <Stats />
      <Timeline />
      <Projects projects={projects} />
      <Newsletter />
      <Contact />
    </>
  );
}
