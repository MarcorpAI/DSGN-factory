'use client';

import { useState, FormEvent } from 'react';

export default function WaitlistForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [position, setPosition] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      setPosition(data.position);
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Failed to join waitlist');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className={`glass-panel relative overflow-hidden p-6 md:p-8 ${compact ? 'text-left' : 'mx-auto max-w-xl text-center'}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(204,255,61,0.24),transparent_34%),radial-gradient(circle_at_85%_20%,rgba(53,166,255,0.2),transparent_32%)]" />
        <div className="relative z-10">
          <p className="font-inter text-[11px] font-bold uppercase tracking-[0.16em] text-acid">
            You&apos;re in
          </p>
          <p className="mt-3 font-grotesque text-[clamp(42px,7vw,78px)] font-black leading-[0.9] text-milk">
            Spot #{position || '—'} secured.
          </p>
          <p className="mt-4 max-w-md font-inter text-base leading-7 text-white/62">
            You&apos;ve joined the Design Factory waitlist. We&apos;ll reach out when the next update is ready.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`w-full ${compact ? '' : 'mx-auto max-w-xl'}`}>
      <div className="glass-panel flex flex-col gap-3 p-2 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="h-[54px] flex-1 border border-white/10 bg-black/30 px-5 font-inter text-base text-milk outline-none transition-colors placeholder:text-white/30 focus:border-electric"
        />
        <button
          type="submit"
          disabled={loading}
          className="cinema-button h-[54px] min-w-[180px] px-7 font-inter text-xs font-bold uppercase tracking-[0.12em] disabled:opacity-60"
        >
          {loading ? 'Submitting...' : 'Reserve my spot'}
        </button>
      </div>
      {error && <p className="mt-3 font-inter text-sm text-acid">{error}</p>}
    </form>
  );
}
