'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const signals = ['Teacher-led courses', 'Practical projects', 'Portfolio building', 'Opportunity matching'];

export default function Program() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.program-reveal', { y: 42, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.75,
        stagger: 0.09,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="program" className="section-shell overflow-hidden">
      <div className="container-wide">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <span className="program-reveal eyebrow">How Design Factory works</span>
            <h2 className="program-reveal mt-5 max-w-5xl font-grotesque text-[clamp(48px,7.5vw,118px)] font-black leading-[0.86] tracking-[-0.02em] text-milk">
              A platform for learning, making, and getting seen.
            </h2>
            <p className="program-reveal mt-8 max-w-2xl font-inter text-lg leading-8 text-white/55">
              Teachers bring focused creative courses. Students learn through projects, build portfolios, collaborate with teams, and grow toward internships, freelance work, and studio opportunities.
            </p>
          </div>

          <div className="program-reveal glass-panel relative min-h-[480px] overflow-hidden p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_18%,rgba(53,166,255,0.28),transparent_34%),radial-gradient(circle_at_15%_75%,rgba(204,255,61,0.12),transparent_32%)]" />
            <div className="relative z-10">
              <div className="mb-8 flex items-center justify-between">
                <span className="font-inter text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">Factory ecosystem</span>
                <span className="text-acid">LIVE</span>
              </div>
              <div className="space-y-4">
                {signals.map((signal, i) => (
                  <div key={signal} className="border border-white/10 bg-black/24 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="font-grotesque text-2xl font-black text-milk">{signal}</span>
                      <span className="font-inter text-[10px] text-white/34">0{i + 1}</span>
                    </div>
                    <div className="h-2 overflow-hidden bg-white/8">
                      <div className="h-full bg-gradient-to-r from-electric via-violet to-acid" style={{ width: `${62 + i * 9}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
