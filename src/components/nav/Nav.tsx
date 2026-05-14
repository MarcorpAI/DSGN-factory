'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const links = [
  { label: 'Course paths', href: '#curriculum' },
  { label: 'FAQ', href: '#faq' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const mobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (open) {
      gsap.to(mobileRef.current, { x: 0, opacity: 1, duration: 0.45, ease: 'power3.out' });
      document.body.style.overflow = 'hidden';
    } else {
      gsap.to(mobileRef.current, { x: '100%', opacity: 0, duration: 0.32, ease: 'power3.in' });
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const scrollTo = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-50 px-4 pt-4 transition-all duration-300 ${
          scrolled ? 'translate-y-0' : ''
        }`}
      >
        <div className={`mx-auto flex h-[60px] max-w-[1180px] items-center justify-between border px-4 md:px-5 transition-all duration-300 ${
          scrolled
            ? 'border-white/12 bg-black/55 shadow-[0_20px_90px_rgba(0,0,0,0.45)] backdrop-blur-2xl'
            : 'border-white/8 bg-white/[0.035] backdrop-blur-xl'
        }`}>
          <a href="#hero" onClick={scrollTo('#hero')} className="group flex items-center gap-3">
            <span className="flex h-9 w-[170px] items-center bg-white px-3">
              <img src="/design-factory-logo.png" alt="Design Factory" className="h-auto w-full" />
            </span>
          </a>

          <div className="hidden items-center gap-7 md:flex">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={scrollTo(link.href)}
                className="font-inter text-[11px] font-semibold uppercase tracking-[0.14em] text-white/48 transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="#waitlist"
            onClick={scrollTo('#waitlist')}
            className="cinema-button hidden h-10 items-center px-5 font-inter text-xs font-bold uppercase tracking-[0.1em] md:inline-flex"
          >
            Open lesson
          </a>

          <button onClick={() => setOpen(!open)} className="grid h-10 w-10 place-items-center md:hidden" aria-label="Menu">
            <span className="relative block h-4 w-6">
              <span className={`absolute left-0 top-1 block h-px w-6 bg-milk transition-all ${open ? 'translate-y-[5px] rotate-45' : ''}`} />
              <span className={`absolute left-0 top-3 block h-px w-6 bg-milk transition-all ${open ? '-translate-y-[3px] -rotate-45' : ''}`} />
            </span>
          </button>
        </div>
      </nav>

      <div
        ref={mobileRef}
        className="fixed inset-0 z-40 flex translate-x-full flex-col justify-center gap-8 bg-[#050506]/95 px-8 opacity-0 backdrop-blur-2xl md:hidden"
      >
        {links.map((link) => (
          <a key={link.label} href={link.href} onClick={scrollTo(link.href)} className="font-grotesque text-5xl font-black text-milk">
            {link.label}
          </a>
        ))}
        <a href="#waitlist" onClick={scrollTo('#waitlist')} className="cinema-button inline-flex h-11 w-fit items-center px-5 font-inter text-[10px] font-bold uppercase tracking-[0.18em]">
          Open lesson
        </a>
      </div>
    </>
  );
}
