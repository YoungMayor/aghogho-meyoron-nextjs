import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import FloatingHeader from '@/components/layout/FloatingHeader';

export default function Home() {
  return (
    <div>
      <FloatingHeader />
      <Hero />
      <About />
    </div>
  );
}
