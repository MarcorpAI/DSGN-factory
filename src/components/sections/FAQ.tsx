'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FAQItem from '../ui/FAQItem';

const faqs = [
  { question: 'What is the open lesson?', answer: 'It is an introductory session where students learn about Design Factory, the available course paths, the type of projects they will build, and how scholarship eligibility will be reviewed.' },
  { question: 'Is there a scholarship?', answer: 'Yes. Design Factory is opening scholarship opportunities for selected students who want access to practical creative training. We are not announcing percentages or prices yet; the open lesson is the first step.' },
  { question: 'Who should sign up?', answer: 'Students, beginners, undergraduates, career switchers, creative enthusiasts, architects, designers, and freelancers who want practical creative skills can sign up.' },
  { question: 'What can I learn?', answer: 'Current paths include UI/UX design, architecture 3D, graphics and branding, animation and motion design, and digital content creation.' },
  { question: 'Will Design Factory help with placement?', answer: 'Yes. The goal is to help students build portfolio proof and prepare them for placement with organizations, studios, startups, and creative teams that need talent.' },
  { question: 'Do I need experience?', answer: 'No. Some paths are beginner-friendly. The open lesson helps you understand where to start and what support may be available.' },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current, { y: 20, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.5, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="faq" className="section-shell">
      <div className="mx-auto max-w-[900px]">
        <div ref={headerRef}>
          <span className="eyebrow block mb-4">FAQ</span>
          <h2 className="mb-12 font-grotesque font-black leading-[0.9] tracking-[-0.02em] text-milk" style={{ fontSize: 'clamp(48px, 7vw, 96px)' }}>Questions?</h2>
        </div>
        <div>
          {faqs.map((f, i) => <FAQItem key={i} question={f.question} answer={f.answer} isOpen={i === 0} />)}
        </div>
      </div>
    </section>
  );
}
