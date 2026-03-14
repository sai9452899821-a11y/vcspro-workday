// src/components/Header.jsx
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const NAV = [
  { label: 'Services',    href: '/services'  },
  { label: 'Methodology', href: '/methodology' },
  { label: 'About',       href: '/about'     },
  { label: 'Insights',    href: '/blog'      },
  { label: 'Contact',     href: '/contact'   },
];

export function Header() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500
          ${scrolled
            ? 'bg-[#060614]/90 backdrop-blur-xl border-b border-violet-500/10 shadow-lg shadow-black/30'
            : 'bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-18 py-4">

            {/* Logo */}
            <a href="/" aria-label="VCS Pro — Home" className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded-lg">
              <img
                src="/logo.webp"
                alt="VCS Pro logo"
                className="h-9 w-auto object-contain"
                onError={e => { e.target.style.display = 'none'; }}
              />
              <div className="flex flex-col leading-none">
                <span className="font-display text-white text-lg font-normal tracking-tight">VCS Pro</span>
                <span className="text-[10px] text-white/40 font-body tracking-widest uppercase">Workday Enterprise</span>
              </div>
            </a>

            {/* Desktop nav */}
            <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1">
              {NAV.map(item => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500
                    ${pathname === item.href
                      ? 'text-white'
                      : 'text-white/60 hover:text-white'
                    }`}
                >
                  {pathname === item.href && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full gradient-text bg-gradient-to-r from-violet-500 to-cyan-400" />
                  )}
                  {item.label}
                </a>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="/contact"
                className="btn-gradient px-5 py-2.5 rounded-xl text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Book a Call
              </a>
            </div>

            {/* Mobile trigger */}
            <button
              onClick={() => setMobileOpen(v => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              className="lg:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
        <nav
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className={`absolute top-0 right-0 h-full w-72 bg-[#0a0a1f] border-l border-violet-500/20 flex flex-col transition-transform duration-300 ease-out
            ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
            <span className="font-display text-white text-lg">VCS Pro</span>
            <button onClick={() => setMobileOpen(false)} className="p-2 text-white/50 hover:text-white rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Links */}
          <ul className="flex-1 px-4 py-6 space-y-1">
            {NAV.map((item, i) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                    ${pathname === item.href ? 'bg-violet-500/15 text-white' : 'text-white/60 hover:text-white hover:bg-white/5'}
                  `}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 flex-shrink-0" />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="px-6 pb-8">
            <a href="/contact" className="btn-gradient flex items-center justify-center w-full py-3 rounded-xl text-sm font-semibold text-white">
              Book a Discovery Call
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Header;
