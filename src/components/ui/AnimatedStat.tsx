'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function AnimatedStat({ value, suffix = '', label, className = '', duration = 1.5 }: {
  value: number;
  suffix?: string;
  label: string;
  className?: string;
  duration?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const num = numRef.current;
    if (!container || !num) return;

    const ctx = gsap.context(() => {
      gsap.set(num, { opacity: 0.15 });

      ScrollTrigger.create({
        trigger: container,
        start: 'top 85%',
        onEnter: () => {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: value,
            duration,
            ease: 'power2.out',
            onUpdate: () => {
              const display = value < 10 ? obj.val.toFixed(1) : Math.round(obj.val).toString();
              num.textContent = display + suffix;
            },
            onStart: () => gsap.to(num, { opacity: 1, duration: 0.4 }),
          });
        },
        once: true,
      });
    }, container);

    return () => ctx.revert();
  }, [value, suffix, duration]);

  return (
    <div ref={containerRef} className={className}>
      <span ref={numRef} className="font-grotesque font-bold text-warm-black leading-none" style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}>
        {value}{suffix}
      </span>
      <div className="font-inter text-warm-muted text-xs mt-1">{label}</div>
    </div>
  );
}
