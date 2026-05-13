'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import WaitlistForm from '../ui/WaitlistForm';

export default function WaitlistSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.final-reveal', { y: 40, opacity: 0, filter: 'blur(10px)' }, {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="waitlist" className="relative min-h-screen overflow-hidden px-5 py-28 md:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(53,166,255,0.28),transparent_34%),radial-gradient(circle_at_68%_66%,rgba(184,132,255,0.18),transparent_30%)]" />
      <div className="container-wide relative z-10 flex min-h-[72vh] flex-col items-center justify-center text-center">
        <span className="final-reveal eyebrow">Join the factory</span>
        <h2 className="final-reveal mt-6 max-w-6xl font-grotesque text-[clamp(64px,12vw,178px)] font-black leading-[0.8] tracking-[-0.03em] text-milk">
          Learn what you can turn into real work.
        </h2>
        <p className="final-reveal mt-8 max-w-2xl font-inter text-lg leading-8 text-white/58">
          Join as a student, teacher, or creative partner. Design Factory is being built for practical learning, portfolio growth, collaboration, and opportunity matching.
        </p>
        <div className="final-reveal mt-10 w-full max-w-2xl">
          <WaitlistForm />
          <p className="mt-5 font-inter text-xs uppercase tracking-[0.12em] text-white/34">No spam. No filler. Just your spot.</p>
        </div>
      </div>
    </section>
  );
}
