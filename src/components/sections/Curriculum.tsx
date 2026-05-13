'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const tracks = [
  { id: '01', name: 'UI/UX Design', items: ['Figma', 'Prototyping', 'Design systems', 'Product thinking'], size: 'lg:col-span-5 lg:row-span-2', featured: true },
  { id: '02', name: 'Graphics + Branding', items: ['Identity', 'Typography', 'Campaigns', 'Marketing design'], size: 'lg:col-span-3' },
  { id: '03', name: 'Architecture 3D', items: ['3Ds Max', 'Rendering', 'Lighting', 'Walkthroughs'], size: 'lg:col-span-4' },
  { id: '04', name: 'Animation + Motion', items: ['Storytelling', 'Video editing', 'Motion graphics'], size: 'lg:col-span-4' },
  { id: '05', name: 'Digital Content', items: ['Creative direction', 'Social content', 'Production'], size: 'lg:col-span-3' },
];

export default function Curriculum() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.curr-card', { y: 40, opacity: 0, scale: 0.98 }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.75,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="curriculum" className="section-shell bg-[#090a0e]/80">
      <div className="container-wide">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="eyebrow">Training programmes</span>
            <h2 className="mt-5 font-grotesque text-[clamp(48px,7vw,104px)] font-black leading-[0.9] tracking-[-0.02em] text-milk">
              Multiple paths. One creative factory.
            </h2>
          </div>
          <p className="max-w-lg font-inter text-base leading-7 text-white/54">
            Like a modern course marketplace, each path can be led by different teachers while staying grounded in practical assignments, portfolio outcomes, and real-world exposure.
          </p>
        </div>

        <div className="grid auto-rows-auto grid-cols-1 gap-4 lg:grid-cols-12 lg:auto-rows-[320px]">
          {tracks.map((track, i) => (
            <article key={track.id} className={`curr-card glass-panel group relative min-h-[330px] overflow-hidden p-7 md:p-8 ${track.size}`}>
              <div className="absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100" style={{
                background: i === 0
                  ? 'radial-gradient(circle at 75% 20%, rgba(53,166,255,0.34), transparent 36%)'
                  : i === 2
                    ? 'radial-gradient(circle at 30% 80%, rgba(184,132,255,0.32), transparent 38%)'
                    : 'radial-gradient(circle at 70% 70%, rgba(255,255,255,0.13), transparent 36%)',
              }} />
              <div className="relative z-10 flex h-full min-h-[276px] flex-col justify-between gap-12">
                <div className="flex items-center justify-between">
                  <span className="font-inter text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">Track {track.id}</span>
                  <span className="h-2 w-2 bg-acid" />
                </div>
                <div>
                  <h3 className={`max-w-sm font-grotesque font-black leading-[0.92] tracking-[-0.01em] text-milk ${
                    track.featured ? 'text-[clamp(42px,5vw,72px)]' : 'text-[clamp(32px,2.8vw,46px)]'
                  }`}>{track.name}</h3>
                  <div className="mt-7 flex flex-wrap gap-2.5">
                    {track.items.map((item) => (
                      <span key={item} className="border border-white/12 bg-white/[0.045] px-3.5 py-2.5 font-inter text-[11px] font-semibold leading-none text-white/60">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
