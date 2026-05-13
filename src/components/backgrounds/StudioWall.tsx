'use client';

import { useRef, useEffect } from 'react';

export default function StudioWall() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let frame = 0;
    let time = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawGrid = () => {
      const gap = width < 700 ? 34 : 48;
      ctx.strokeStyle = 'rgba(255,255,255,0.045)';
      ctx.lineWidth = 1;
      for (let x = (time * 7) % gap; x < width; x += gap) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = (time * 4) % gap; y < height; y += gap) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    };

    const drawOrb = (x: number, y: number, radius: number, color: string) => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, color);
      gradient.addColorStop(0.48, color.replace('0.42', '0.12'));
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const render = () => {
      time += 0.006;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#050506';
      ctx.fillRect(0, 0, width, height);

      drawOrb(width * 0.16 + Math.sin(time * 1.4) * 34, height * 0.2, width * 0.45, 'rgba(53,166,255,0.42)');
      drawOrb(width * 0.82 + Math.cos(time) * 28, height * 0.18, width * 0.36, 'rgba(184,132,255,0.42)');
      drawOrb(width * 0.66, height * 0.76 + Math.sin(time * 0.8) * 34, width * 0.28, 'rgba(204,255,61,0.18)');
      drawGrid();

      ctx.save();
      ctx.translate(width * 0.68, height * 0.42);
      ctx.rotate(-0.25 + Math.sin(time) * 0.03);
      ctx.strokeStyle = 'rgba(255,255,255,0.09)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 8; i++) {
        const w = 150 + i * 28;
        const h = 64 + i * 18;
        ctx.strokeRect(-w / 2, -h / 2, w, h);
      }
      ctx.restore();

      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      for (let i = 0; i < 42; i++) {
        const x = (Math.sin(i * 91.7) * 0.5 + 0.5) * width;
        const y = (((i * 137) % 1000) / 1000) * height;
        const flicker = Math.sin(time * 4 + i) * 0.5 + 0.5;
        ctx.globalAlpha = 0.08 + flicker * 0.1;
        ctx.fillRect(x, y, 1.5, 1.5);
      }
      ctx.globalAlpha = 1;

      frame = requestAnimationFrame(render);
    };

    resize();
    render();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />;
}
