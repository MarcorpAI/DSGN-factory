'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const before = ['Theory-only learning', 'No portfolio proof', 'Limited mentorship', 'No opportunity pipeline'];
const after = ['Live project exposure', 'Client-ready portfolios', 'Creative team collaboration', 'Global career readiness'];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.transform-panel', { y: 45, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.75,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="process" className="section-shell overflow-hidden">
      <div className="container-wide">
        <div className="mx-auto mb-14 max-w-5xl text-center">
          <span className="eyebrow">Real world experience</span>
          <h2 className="mt-5 font-grotesque text-[clamp(48px,7vw,112px)] font-black leading-[0.86] tracking-[-0.02em] text-milk">
            Build the proof that opens doors.
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_120px_1fr] lg:items-center">
          <div className="transform-panel glass-panel p-6 md:p-8">
            <span className="font-inter text-[10px] font-bold uppercase tracking-[0.16em] text-white/35">Old learning model</span>
            <h3 className="mt-4 font-grotesque text-5xl font-black text-white/42">Watch. Repeat.</h3>
            <div className="mt-10 space-y-3">
              {before.map((item) => <p key={item} className="border-t border-white/10 pt-3 font-inter text-white/45">{item}</p>)}
            </div>
          </div>

          <div className="hidden h-px bg-gradient-to-r from-electric via-violet to-acid lg:block" />

          <div className="transform-panel glass-panel relative overflow-hidden p-6 md:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(204,255,61,0.18),transparent_36%),radial-gradient(circle_at_20%_80%,rgba(53,166,255,0.22),transparent_36%)]" />
            <div className="relative z-10">
              <span className="font-inter text-[10px] font-bold uppercase tracking-[0.16em] text-acid">Design Factory model</span>
              <h3 className="mt-4 font-grotesque text-5xl font-black text-milk">Create. Collaborate.</h3>
              <div className="mt-10 space-y-3">
                {after.map((item) => <p key={item} className="border-t border-white/12 pt-3 font-inter text-white/68">{item}</p>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
