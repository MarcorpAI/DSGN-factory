'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll('.hero-reveal') ?? [];
      gsap.fromTo(items, { y: 28, opacity: 0, filter: 'blur(10px)' }, {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.85,
        stagger: 0.08,
        ease: 'power3.out',
      });

      const words = sectionRef.current?.querySelectorAll('.hero-word') ?? [];
      gsap.fromTo(words, { yPercent: 105, opacity: 0, filter: 'blur(12px)' }, {
        yPercent: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.9,
        stagger: 0.16,
        delay: 0.1,
        ease: 'power4.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="hero" className="relative min-h-screen overflow-hidden px-5 pb-16 pt-28 md:px-8 lg:pt-32">
      <div className="container-wide relative z-10 flex min-h-[calc(100vh-9rem)] flex-col justify-center">
        <div className="hero-reveal mb-8">
          <span className="eyebrow">Design Factory</span>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.38fr)] lg:items-end">
          <div>
            <h1 className="max-w-6xl font-grotesque text-[clamp(58px,10vw,156px)] font-black leading-[0.84] tracking-[-0.025em] text-milk">
              <span className="inline-block overflow-hidden align-bottom">
                <span className="hero-word inline-block">Get trained.</span>
              </span>{' '}
              <span className="inline-block overflow-hidden align-bottom">
                <span className="hero-word inline-block">Get funded.</span>
              </span>{' '}
              <span className="inline-block overflow-hidden align-bottom">
                <span className="hero-word inline-block font-serif font-normal italic text-white/62">Get placed.</span>
              </span>
            </h1>
          </div>

          <div className="hero-reveal lg:pb-3">
            <p className="max-w-xl font-inter text-base leading-7 text-white/60 md:text-lg">
              Design Factory gives students scholarship access to practical creative training, then helps them build the work and connections needed to earn from it.
            </p>
          </div>
        </div>

        <div className="hero-reveal mt-10 flex flex-wrap gap-3">
          <a href="#waitlist" className="cinema-button inline-flex h-11 items-center px-5 font-inter text-[10px] font-bold uppercase tracking-[0.18em]">
            Sign up for open lesson
          </a>
          <a href="#scholarship" className="inline-flex h-11 items-center border border-white/14 bg-white/[0.04] px-5 font-inter text-[10px] font-bold uppercase tracking-[0.18em] text-white/70 transition-colors hover:border-white/24 hover:text-white">
            Scholarship details
          </a>
          <a href="#curriculum" className="inline-flex h-11 items-center border border-white/14 bg-white/[0.04] px-5 font-inter text-[10px] font-bold uppercase tracking-[0.18em] text-white/70 transition-colors hover:border-white/24 hover:text-white">
            View course paths
          </a>
        </div>
      </div>
    </section>
  );
}
