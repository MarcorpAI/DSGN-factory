'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';

type Signup = {
  id: number;
  name: string;
  email: string;
  whatsapp: string;
  signupType: string;
  city: string;
  position: number;
  createdAt: string;
};

const typeLabels: Record<string, string> = {
  learner: 'Learner',
  instructor: 'Instructor / Tutor',
  organization: 'Organization / Partner',
};

export default function AdminWaitlistPage() {
  const [token, setToken] = useState('');
  const [signups, setSignups] = useState<Signup[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const savedToken = window.localStorage.getItem('df_admin_token');
    if (savedToken) setToken(savedToken);
  }, []);

  const csv = useMemo(() => {
    const header = ['position', 'name', 'email', 'whatsapp', 'signupType', 'city', 'createdAt'];
    const rows = signups.map((signup) => [
      signup.position.toString(),
      signup.name,
      signup.email,
      signup.whatsapp,
      typeLabels[signup.signupType] || signup.signupType,
      signup.city,
      new Date(signup.createdAt).toISOString(),
    ]);
    return [header, ...rows]
      .map((row) => row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(','))
      .join('\n');
  }, [signups]);

  const fetchSignups = async (event?: FormEvent) => {
    event?.preventDefault();
    if (!token.trim()) return;

    setLoading(true);
    setError('');
    try {
      window.localStorage.setItem('df_admin_token', token.trim());
      const response = await fetch('/api/waitlist', {
        headers: { Authorization: `Bearer ${token.trim()}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to load waitlist');
      setSignups(data.signups || []);
    } catch (err) {
      setSignups([]);
      setError(err instanceof Error ? err.message : 'Failed to load waitlist');
    } finally {
      setLoading(false);
    }
  };

  const downloadCsv = () => {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'design-factory-waitlist.csv';
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-void px-5 py-10 text-milk md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-6 border-b border-white/12 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow">Admin</span>
            <h1 className="mt-4 font-grotesque text-[clamp(44px,7vw,96px)] font-black leading-[0.9] tracking-[-0.02em]">
              Waitlist signups
            </h1>
            <p className="mt-4 max-w-2xl font-inter text-sm leading-6 text-white/50">
              Enter your Vercel ADMIN_TOKEN to view people who joined the Design Factory waitlist.
            </p>
          </div>
          <a href="/" className="font-inter text-xs font-bold uppercase tracking-[0.14em] text-white/42 transition-colors hover:text-white">
            Back to site
          </a>
        </div>

        <form onSubmit={fetchSignups} className="glass-panel mb-8 flex flex-col gap-3 p-3 md:flex-row">
          <input
            type="password"
            value={token}
            onChange={(event) => setToken(event.target.value)}
            placeholder="ADMIN_TOKEN"
            className="h-12 flex-1 border border-white/10 bg-black/30 px-4 font-inter text-sm text-milk outline-none placeholder:text-white/28 focus:border-electric"
          />
          <button
            type="submit"
            disabled={loading || !token.trim()}
            className="cinema-button h-12 px-6 font-inter text-xs font-bold uppercase tracking-[0.12em] disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Load signups'}
          </button>
          <button
            type="button"
            onClick={downloadCsv}
            disabled={!signups.length}
            className="h-12 border border-white/14 bg-white/[0.04] px-6 font-inter text-xs font-bold uppercase tracking-[0.12em] text-white/70 transition-colors hover:text-white disabled:opacity-40"
          >
            Export CSV
          </button>
        </form>

        {error && <p className="mb-6 font-inter text-sm text-acid">{error}</p>}

        <div className="mb-5 flex items-center justify-between">
          <p className="font-inter text-xs font-bold uppercase tracking-[0.14em] text-white/38">
            {signups.length} {signups.length === 1 ? 'signup' : 'signups'}
          </p>
        </div>

        <div className="overflow-hidden border border-white/12 bg-white/[0.03]">
          <div className="hidden grid-cols-[80px_1fr_1fr_150px_150px_130px] gap-4 border-b border-white/12 px-4 py-3 font-inter text-[10px] font-bold uppercase tracking-[0.14em] text-white/36 lg:grid">
            <span>Position</span>
            <span>Name</span>
            <span>Email</span>
            <span>WhatsApp</span>
            <span>Role</span>
            <span>City</span>
          </div>

          {signups.length ? (
            signups.map((signup) => (
              <div key={signup.id} className="grid gap-3 border-b border-white/8 px-4 py-4 last:border-b-0 lg:grid-cols-[80px_1fr_1fr_150px_150px_130px] lg:gap-4">
                <span className="font-grotesque text-2xl font-black text-milk">#{signup.position}</span>
                <span className="min-w-0 break-words font-inter text-sm font-semibold text-white/82">{signup.name || '—'}</span>
                <span className="min-w-0 break-words font-inter text-sm text-white/64">{signup.email}</span>
                <span className="min-w-0 break-words font-inter text-sm text-white/64">{signup.whatsapp || '—'}</span>
                <span className="font-inter text-sm text-white/64">{typeLabels[signup.signupType] || signup.signupType || '—'}</span>
                <span className="font-inter text-sm text-white/64">{signup.city || '—'}</span>
                <span className="font-inter text-xs text-white/34 lg:col-start-2 lg:col-span-5">
                  Joined {new Date(signup.createdAt).toLocaleString()}
                </span>
              </div>
            ))
          ) : (
            <div className="px-4 py-12 text-center font-inter text-sm text-white/42">
              No signups loaded yet.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
