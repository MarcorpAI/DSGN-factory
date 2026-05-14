'use client';

import { useState, FormEvent } from 'react';

const signupTypes = [
  { value: 'learner', label: 'Learner' },
  { value: 'instructor', label: 'Instructor / Tutor' },
  { value: 'organization', label: 'Organization / Partner' },
];

export default function WaitlistForm({ compact = false }: { compact?: boolean }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [signupType, setSignupType] = useState('learner');
  const [city, setCity] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !whatsapp.trim() || !city.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          whatsapp: whatsapp.trim(),
          signupType,
          city: city.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
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
            Your spot is secured.
          </p>
          <p className="mt-4 max-w-md font-inter text-base leading-7 text-white/62">
            You&apos;ve joined the Design Factory waitlist. We&apos;ll reach out when the next update is ready.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`w-full ${compact ? '' : 'mx-auto max-w-2xl'}`}>
      <div className="glass-panel grid gap-3 p-3 sm:grid-cols-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name"
          required
          className="h-[54px] border border-white/10 bg-black/30 px-5 font-inter text-base text-milk outline-none transition-colors placeholder:text-white/30 focus:border-electric"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          required
          className="h-[54px] border border-white/10 bg-black/30 px-5 font-inter text-base text-milk outline-none transition-colors placeholder:text-white/30 focus:border-electric"
        />
        <input
          type="tel"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          placeholder="WhatsApp number"
          required
          className="h-[54px] border border-white/10 bg-black/30 px-5 font-inter text-base text-milk outline-none transition-colors placeholder:text-white/30 focus:border-electric"
        />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
          required
          className="h-[54px] border border-white/10 bg-black/30 px-5 font-inter text-base text-milk outline-none transition-colors placeholder:text-white/30 focus:border-electric"
        />
        <select
          value={signupType}
          onChange={(e) => setSignupType(e.target.value)}
          required
          className="h-[54px] border border-white/10 bg-black/30 px-5 font-inter text-base text-milk outline-none transition-colors focus:border-electric sm:col-span-2"
        >
          {signupTypes.map((type) => (
            <option key={type.value} value={type.value} className="bg-[#0b0c0f] text-milk">
              {type.label}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={loading}
          className="cinema-button h-[54px] px-7 font-inter text-xs font-bold uppercase tracking-[0.12em] disabled:opacity-60 sm:col-span-2"
        >
          {loading ? 'Submitting...' : 'Join the waitlist'}
        </button>
      </div>
      {error && <p className="mt-3 font-inter text-sm text-acid">{error}</p>}
    </form>
  );
}
