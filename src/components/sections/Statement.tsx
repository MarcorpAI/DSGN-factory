'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const works = [
  { name: 'Mobile app prototype', tag: 'UI/UX Design', span: 'md:col-span-5', color: 'rgba(53,166,255,0.34)' },
  { name: 'Brand campaign system', tag: 'Graphics + Branding', span: 'md:col-span-3', color: 'rgba(184,132,255,0.34)' },
  { name: 'Interior render set', tag: 'Architecture 3D', span: 'md:col-span-4', color: 'rgba(204,255,61,0.22)' },
  { name: 'Motion explainer frames', tag: 'Animation', span: 'md:col-span-4', color: 'rgba(255,255,255,0.16)' },
  { name: 'Social content campaign', tag: 'Creative Media', span: 'md:col-span-5', color: 'rgba(53,166,255,0.22)' },
  { name: 'Client-ready portfolio', tag: 'Career prep', span: 'md:col-span-3', color: 'rgba(184,132,255,0.24)' },
];

export default function Statement() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.showcase-card', { y: 50, opacity: 0, rotateX: 12 }, {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.07,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="showcase" className="section-shell overflow-hidden">
      <div className="container-wide">
        <div className="mb-12 grid gap-6 lg:grid-cols-[0.82fr_1fr] lg:items-end">
          <div>
            <span className="eyebrow">Design Factory experience</span>
            <h2 className="mt-5 font-grotesque text-[clamp(48px,7vw,112px)] font-black leading-[0.88] tracking-[-0.02em] text-milk">
              Learn by building real creative work.
            </h2>
          </div>
          <p className="max-w-xl font-inter text-lg leading-8 text-white/55 lg:justify-self-end">
            From apps and brand systems to 3D environments, motion stories, and digital campaigns, students create practical portfolio projects with mentorship, collaboration, and real-world exposure.
          </p>
        </div>

        <div className="grid auto-rows-[230px] grid-cols-1 gap-4 md:grid-cols-12 md:auto-rows-[260px]">
          {works.map((work, i) => (
            <article key={work.name} className={`showcase-card glass-panel group relative overflow-hidden p-5 ${work.span}`}>
              <div className="absolute inset-0 opacity-80 transition-transform duration-700 group-hover:scale-110" style={{
                background: `radial-gradient(circle at ${25 + i * 10}% ${20 + i * 7}%, ${work.color}, transparent 38%), linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.025))`,
              }} />
              <div className="absolute inset-x-5 top-5 flex items-center justify-between">
                <span className="font-inter text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">{work.tag}</span>
                <span className="text-white/30">0{i + 1}</span>
              </div>
              <div className="absolute bottom-5 left-5 right-5">
                <div className="mb-5 grid grid-cols-5 gap-2 opacity-70">
                  {Array.from({ length: 10 }).map((_, j) => <span key={j} className="h-1 bg-white/30" />)}
                </div>
                <h3 className="font-grotesque text-3xl font-black leading-none text-milk">{work.name}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
