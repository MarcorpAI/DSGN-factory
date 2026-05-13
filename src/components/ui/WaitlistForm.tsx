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
      <div className={compact ? 'text-left' : 'text-center'}>
        <p className="font-grotesque font-black text-4xl text-acid md:text-5xl">
          You&apos;re #{position || '—'} in line.
        </p>
        <p className="mt-2 font-inter text-base text-white/55">
          We&apos;ll reach out when your cohort opens.
        </p>
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
