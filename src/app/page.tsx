'use client';

import dynamic from 'next/dynamic';
import Nav from '@/components/nav/Nav';
import Hero from '@/components/sections/Hero';
import ScholarshipPitch from '@/components/sections/ScholarshipPitch';
import Curriculum from '@/components/sections/Curriculum';
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
          <ScholarshipPitch />
          <Curriculum />
          <FAQ />
          <WaitlistSection />
          <Footer />
        </main>
      </div>
    </>
  );
}
