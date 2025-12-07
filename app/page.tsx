import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Career from '@/components/sections/Career';
import Articles from '@/components/sections/Articles';
import Testimonials from '@/components/sections/Testimonials';
import FloatingHeader from '@/components/layout/FloatingHeader';

export default function Home() {
  return (
    <div>
      <FloatingHeader />
      <Hero />
      <About />
      <Projects />
      <Career />
      <Articles />
      <Testimonials />
    </div>
  );
}
