'use client';

import dynamic from 'next/dynamic';
import Nav from '@/components/nav/Nav';
import Hero from '@/components/sections/Hero';
import Statement from '@/components/sections/Statement';
import Problem from '@/components/sections/Problem';
import Program from '@/components/sections/Program';
import Curriculum from '@/components/sections/Curriculum';
import Process from '@/components/sections/Process';
import Pricing from '@/components/sections/Pricing';
import FAQ from '@/components/sections/FAQ';
import WaitlistSection from '@/components/sections/Waitlist';
import Footer from '@/components/sections/Footer';

const StudioWall = dynamic(() => import('@/components/backgrounds/StudioWall'), { ssr: false });

export default function Home() {
  return (
    <>
      <StudioWall />
      <div className="relative z-10">
        <Nav />
        <main>
          <Hero />
          <Statement />
          <Problem />
          <Program />
          <Curriculum />
          <Process />
          <Pricing />
          <FAQ />
          <WaitlistSection />
          <Footer />
        </main>
      </div>
    </>
  );
}
