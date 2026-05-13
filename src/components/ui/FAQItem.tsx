'use client';

import { useState } from 'react';

export default function FAQItem({ question, answer, isOpen = false }: { question: string; answer: string; isOpen?: boolean }) {
  const [open, setOpen] = useState(isOpen);

  return (
    <div className="border-t border-white/12">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between py-6 text-left">
        <span className="pr-4 font-grotesque text-xl font-bold text-milk md:text-2xl">{question}</span>
        <span className="flex-shrink-0 text-3xl font-light leading-none text-acid transition-transform duration-300" style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
      </button>
      <div className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <p className="max-w-2xl pb-6 pt-1 font-inter text-base leading-7 text-white/52">{answer}</p>
        </div>
      </div>
    </div>
  );
}
