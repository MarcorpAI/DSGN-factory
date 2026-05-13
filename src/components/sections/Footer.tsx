const links = [
  { label: 'Program', href: '#program' },
  { label: 'Curriculum', href: '#curriculum' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Waitlist', href: '#waitlist' },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/12 px-6 py-12 md:px-10 md:py-16 lg:px-16">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 lg:gap-24">
          <div className="flex-1">
            <p className="font-grotesque font-black text-sm text-milk mb-3">Design Factory</p>
            <p className="font-inter text-xs text-white/42 max-w-xs leading-relaxed">Creating the next generation of global creatives through practical learning, portfolios, mentorship, and real opportunity.</p>
          </div>
          <div>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {links.map((l) => <a key={l.label} href={l.href} className="font-inter text-xs text-white/42 hover:text-milk transition-colors duration-200">{l.label}</a>)}
            </div>
          </div>
          <div className="md:text-right">
            <p className="font-inter text-xs text-white/42">Abuja, Nigeria</p>
            <p className="font-inter text-xs text-white/42 mt-1">&copy; 2026 Design Factory</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
