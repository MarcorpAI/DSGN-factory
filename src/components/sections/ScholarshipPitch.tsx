'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const outcomes = [
  'Scholarship access',
  'Practical training',
  'Portfolio proof',
  'Placement support',
];

export default function ScholarshipPitch() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.pitch-reveal', { y: 34, opacity: 0, filter: 'blur(8px)' }, {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.75,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 68%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="scholarship" className="section-shell pt-10 md:pt-16">
      <div className="container-wide">
        <div className="glass-panel relative overflow-hidden p-6 md:p-10 lg:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_10%,rgba(204,255,61,0.16),transparent_34%),radial-gradient(circle_at_86%_20%,rgba(53,166,255,0.22),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.06),transparent)]" />
          <div className="relative z-10 grid gap-10 lg:grid-cols-[0.98fr_1.02fr] lg:items-end">
            <div>
              <span className="pitch-reveal eyebrow">Scholarship opportunity</span>
              <h2 className="pitch-reveal mt-5 max-w-4xl font-grotesque text-[clamp(44px,7vw,108px)] font-black leading-[0.88] tracking-[-0.02em] text-milk">
                A scholarship route into skills that can pay you back.
              </h2>
            </div>

            <div className="pitch-reveal">
              <p className="max-w-2xl font-inter text-base leading-8 text-white/60 md:text-lg">
                Design Factory helps students access creative courses that may usually feel expensive or out of reach. Through scholarship support, selected students can start learning the skills behind real digital work: design, 3D, branding, animation, and creative media.
              </p>
              <p className="mt-5 max-w-2xl font-inter text-base leading-8 text-white/60 md:text-lg">
                The goal is not just to teach you software. You will build portfolio projects, get mentorship, and be prepared for placement with organizations that need creative talent. The open lesson is where scholarship eligibility begins.
              </p>
            </div>
          </div>

          <div className="relative z-10 mt-10 grid gap-3 md:grid-cols-4">
            {outcomes.map((outcome, index) => (
              <div key={outcome} className="pitch-reveal border border-white/10 bg-black/20 p-4">
                <span className="font-inter text-[10px] font-bold uppercase tracking-[0.16em] text-white/32">0{index + 1}</span>
                <p className="mt-5 font-grotesque text-2xl font-black leading-none text-milk">{outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
