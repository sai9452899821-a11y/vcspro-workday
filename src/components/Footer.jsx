// src/components/Footer.jsx
const COLS = [
  {
    heading: 'Services',
    links: [
      { label: 'Workday HCM',           href: '/services#hcm'          },
      { label: 'Financial Intelligence', href: '/services#finance'      },
      { label: 'Integration Cloud',      href: '/services#integrations' },
      { label: 'Reporting & Prism',      href: '/services#prism'        },
      { label: 'Release Management',     href: '/services#releases'     },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About VCS Pro', href: '/about'       },
      { label: 'Methodology',   href: '/methodology' },
      { label: 'Insights',      href: '/blog'        },
      { label: 'Contact',       href: '/contact'     },
    ],
  },
  {
    heading: 'Workday Areas',
    links: [
      { label: 'HCM & Talent',         href: '/services#hcm'          },
      { label: 'Payroll',               href: '/services#hcm'          },
      { label: 'AP, AR & General Ledger', href: '/services#finance'    },
      { label: 'Studio & EIB',          href: '/services#integrations' },
      { label: 'Prism Analytics',       href: '/services#prism'        },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-[#040410] border-t border-violet-500/10" aria-label="Site footer">

      {/* CTA band */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, #A855F7, transparent)' }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-20 text-center">
          <p className="text-sm font-medium text-violet-400 tracking-widest uppercase mb-4">
            Ready to transform your Workday investment?
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-white mb-3">
            Let's build something <span className="gradient-text-animated">exceptional.</span>
          </h2>
          <p className="text-white/50 mb-8 max-w-xl mx-auto">
            6+ years of Global 500 experience, ready to work for your organisation.
          </p>
          <a
            href="/contact"
            className="btn-gradient inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Book a Technical Discovery Call
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="glow-divider" />

      {/* Links grid */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <a href="/" className="flex items-center gap-3 mb-5 w-fit">
              <img src="/logo.webp" alt="VCS Pro" className="h-8 w-auto" onError={e => e.target.style.display='none'} />
              <span className="font-display text-white text-base">VCS Pro</span>
            </a>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              Workday Enterprise consulting built on real-time experience with the world's most influential organisations.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-3">
              {[
                { href: 'https://linkedin.com/company/vcspro', label: 'LinkedIn', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg> },
                { href: 'https://github.com/vcspro',           label: 'GitHub',   icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg> },
                { href: 'https://twitter.com/vcspro',          label: 'Twitter',  icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
              ].map(s => (
                <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="w-8 h-8 rounded-lg glass flex items-center justify-center text-white/40 hover:text-violet-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {COLS.map(col => (
            <div key={col.heading}>
              <h3 className="text-[10px] font-semibold uppercase tracking-widest text-violet-400 mb-5">
                {col.heading}
              </h3>
              <ul className="space-y-3">
                {col.links.map(link => (
                  <li key={link.href}>
                    <a href={link.href}
                      className="text-sm text-white/40 hover:text-white transition-colors focus-visible:outline-none focus-visible:underline">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} Virupaksha Consulting Services (VCS Pro). All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service'].map(l => (
              <a key={l} href="#" className="text-xs text-white/25 hover:text-white/50 transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
