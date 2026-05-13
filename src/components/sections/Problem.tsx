'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const reasons = [
  ['Practical learning experience', 'Every course is project-driven. Students learn by building real concepts, solving design problems, and working on industry-style assignments.'],
  ['Portfolio development', 'Students build professional portfolio projects that can support jobs, freelance work, internships, and global remote opportunities.'],
  ['Internship and project matching', 'Outstanding students can be connected to architecture firms, creative agencies, startups, product teams, international studios, and remote freelance work.'],
  ['Modern industry tools', 'Students gain hands-on experience with the creative software, workflows, and collaboration habits used by teams around the world.'],
  ['Community and collaboration', 'Designers, developers, animators, architects, and creators learn inside a community built for feedback, teamwork, and shared growth.'],
];

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.why-card', { opacity: 0, y: 34 }, {
        opacity: 1,
        y: 0,
        duration: 0.72,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-shell bg-[#07080b]/70">
      <div className="container-wide">
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-end">
          <div>
            <span className="eyebrow">Why Design Factory?</span>
            <h2 className="mt-5 font-grotesque text-[clamp(54px,8vw,124px)] font-black leading-[0.84] tracking-[-0.025em] text-milk">
              Learning should go beyond theory.
            </h2>
          </div>
          <p className="max-w-2xl font-inter text-lg leading-8 text-white/56 lg:justify-self-end">
            Students do not just take classes. They work on practical projects, build portfolios, collaborate with teams, and get exposed to real career opportunities locally and globally.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-12">
          {reasons.map(([title, body], i) => (
            <article
              key={title}
              className={`why-card glass-panel relative overflow-hidden p-6 md:p-8 ${
                i < 2 ? 'lg:col-span-6 min-h-[330px]' : 'lg:col-span-4 min-h-[300px]'
              }`}
            >
              <div className="absolute inset-0 opacity-70" style={{
                background: i === 0
                  ? 'radial-gradient(circle at 80% 16%, rgba(53,166,255,0.22), transparent 36%)'
                  : i === 1
                    ? 'radial-gradient(circle at 80% 16%, rgba(204,255,61,0.14), transparent 36%)'
                    : 'radial-gradient(circle at 80% 16%, rgba(184,132,255,0.18), transparent 36%)',
              }} />
              <div className="relative z-10 flex h-full flex-col justify-between gap-14">
                <div className="flex items-center justify-between">
                  <span className="font-inter text-[10px] font-bold uppercase tracking-[0.16em] text-white/36">Reason 0{i + 1}</span>
                  <span className="h-2 w-2 bg-acid" />
                </div>
                <div>
                  <h3 className="font-grotesque text-[clamp(34px,3.8vw,56px)] font-black leading-[0.92] tracking-[-0.01em] text-milk">
                    {title}
                  </h3>
                  <p className="mt-5 max-w-xl font-inter text-base leading-7 text-white/55">{body}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
