'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const pathways = ['UI/UX Design', 'Branding', '3D Design', 'Animation', 'Creative Media'];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll('.hero-reveal') ?? [];
      gsap.fromTo(items, { y: 26, opacity: 0, filter: 'blur(8px)' }, {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
      });

      const words = sectionRef.current?.querySelectorAll('.hero-word') ?? [];
      gsap.fromTo(words, { yPercent: 105, opacity: 0, filter: 'blur(12px)' }, {
        yPercent: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.9,
        stagger: 0.18,
        delay: 0.15,
        ease: 'power4.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="hero" className="relative min-h-screen overflow-hidden px-5 pb-14 pt-28 md:px-8 lg:pt-32">
      <div className="container-wide relative z-10 flex min-h-[calc(100vh-8.5rem)] flex-col justify-center">
        <div className="hero-reveal mb-8">
          <span className="eyebrow">Design Factory</span>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.42fr)] lg:items-end">
          <div>
            <h1 className="max-w-6xl font-grotesque text-[clamp(68px,12vw,176px)] font-black leading-[0.82] tracking-[-0.035em] text-milk">
              <span className="inline-block overflow-hidden align-bottom">
                <span className="hero-word inline-block">Learn.</span>
              </span>{' '}
              <span className="inline-block overflow-hidden align-bottom">
                <span className="hero-word inline-block">Create.</span>
              </span>{' '}
              <span className="inline-block overflow-hidden align-bottom">
                <span className="hero-word inline-block font-serif font-normal italic text-white/62">Get hired.</span>
              </span>
            </h1>
          </div>

          <p className="hero-reveal max-w-xl font-inter text-base leading-7 text-white/58 md:text-lg lg:pb-3">
            A modern creative learning and talent development hub helping digital creators, designers, architects, animators, and visual storytellers gain practical skills that lead to real opportunities.
          </p>
        </div>

        <div className="hero-reveal mt-9 flex flex-wrap gap-3">
          <a href="#curriculum" className="cinema-button inline-flex h-12 items-center px-6 font-inter text-xs font-bold uppercase tracking-[0.12em]">
            Explore programmes
          </a>
          <a href="#waitlist" className="inline-flex h-12 items-center border border-white/14 bg-white/[0.04] px-6 font-inter text-xs font-bold uppercase tracking-[0.12em] text-white/70 transition-colors hover:border-white/24 hover:text-white">
            Join Design Factory
          </a>
        </div>

        <div className="hero-reveal mt-10 flex max-w-5xl flex-wrap gap-x-5 gap-y-3">
          {pathways.map((pathway) => (
            <span key={pathway} className="font-inter text-[11px] font-bold uppercase tracking-[0.15em] text-white/42 transition-colors hover:text-white/72">
              {pathway}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
