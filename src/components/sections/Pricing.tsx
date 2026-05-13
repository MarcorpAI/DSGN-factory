'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const audiences = [
  ['Students', 'Learn practical skills, build portfolio projects, and prepare for internships, jobs, freelance gigs, and remote opportunities.'],
  ['Teachers', 'Host structured creative courses, mentor students, and bring industry workflows into a focused learning environment.'],
  ['Partners', 'Find emerging creative talent for projects, internships, design challenges, studio work, and product teams.'],
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cohort-card', { y: 36, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.75,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 68%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="pricing" className="section-shell">
      <div className="container-wide">
        <div className="mb-12 max-w-5xl">
          <span className="eyebrow">Built for the creative pipeline</span>
          <h2 className="mt-5 font-grotesque text-[clamp(48px,7vw,110px)] font-black leading-[0.88] tracking-[-0.02em] text-milk">
            From learning to opportunity.
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {audiences.map(([title, body], i) => (
            <article key={title} className="cohort-card glass-panel relative min-h-[330px] overflow-hidden p-6 md:p-8">
              <div className="absolute inset-0 opacity-70" style={{
                background: i === 0
                  ? 'radial-gradient(circle at 80% 20%, rgba(53,166,255,0.24), transparent 36%)'
                  : i === 1
                    ? 'radial-gradient(circle at 80% 20%, rgba(184,132,255,0.24), transparent 36%)'
                    : 'radial-gradient(circle at 80% 20%, rgba(204,255,61,0.16), transparent 36%)',
              }} />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <span className="font-inter text-[10px] font-bold uppercase tracking-[0.16em] text-white/36">0{i + 1}</span>
                <div>
                  <h3 className="font-grotesque text-5xl font-black text-milk">{title}</h3>
                  <p className="mt-5 font-inter text-base leading-7 text-white/55">{body}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
