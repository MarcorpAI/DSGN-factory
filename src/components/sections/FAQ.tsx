'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FAQItem from '../ui/FAQItem';

const faqs = [
  { question: 'Is Design Factory one course?', answer: 'No. Design Factory is a creative learning and talent development hub. Different teachers can host practical courses across UI/UX, graphics, branding, 3D design, animation, architecture visualization, and digital content.' },
  { question: 'Who can join?', answer: 'Students, undergraduates, beginners, creative enthusiasts, designers, architects, freelancers, career switchers, and startup creatives can join. The goal is to help people move from learning to earning through practical work.' },
  { question: 'Are the courses practical?', answer: 'Yes. Courses are project-driven. Students build real concepts, solve design problems, collaborate, and create portfolio pieces instead of only watching theory lessons.' },
  { question: 'Can teachers publish courses?', answer: 'Yes. The platform is designed for instructors and creative professionals who want to teach structured, practical courses and mentor the next generation of digital creators.' },
  { question: 'Does Design Factory help with opportunities?', answer: 'The goal is to connect strong students to internships, project work, freelance opportunities, creative agencies, architecture firms, startups, product teams, and international studios where possible.' },
  { question: 'Do I need experience before joining?', answer: 'No. Some programmes can be beginner-friendly while others can be more advanced. Students should choose a path that matches their current level and career goal.' },
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
