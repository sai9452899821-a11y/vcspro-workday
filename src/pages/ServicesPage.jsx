// src/pages/ServicesPage.jsx
import { useEffect } from 'react';

function ServiceSection({ id, icon, eyebrow, headline, desc, features, image, reverse }) {
  return (
    <section id={id} className="py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${reverse ? 'lg:grid-flow-col-dense' : ''}`}>

          {/* Text */}
          <div className={reverse ? 'lg:col-start-2' : ''}>
            <p className="text-violet-400 text-xs font-semibold uppercase tracking-widest mb-3">
              {eyebrow}
            </p>
            <h2 className="font-display text-4xl sm:text-5xl text-white leading-tight mb-6">
              {headline}
            </h2>
            <p className="text-white/55 text-lg leading-relaxed mb-10">{desc}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((f, i) => (
                <div key={i} className="flex items-start gap-3 glass rounded-xl p-3.5 border border-violet-500/10">
                  <svg className="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white/70 text-sm">{f}</span>
                </div>
              ))}
            </div>
            <a href="/contact"
              className="btn-gradient inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white mt-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
              Discuss this service
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Image */}
          <div className={`relative ${reverse ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
            <div className="rounded-3xl overflow-hidden">
              <img src={image.src} alt={image.alt}
                className="w-full aspect-[4/3] object-cover opacity-85" />
              <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 to-transparent" />
            </div>
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/15 to-cyan-500/10 -z-10 blur-2xl scale-95" />
            <div className="absolute top-4 right-4 text-4xl bg-[#060614]/70 rounded-2xl p-3 backdrop-blur-sm border border-white/10">
              {icon}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServicesPage() {
  useEffect(() => { document.title = 'Workday Services | VCS Pro'; }, []);

  return (
    <main id="main-content">

      {/* Hero */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(124,58,237,0.15), transparent)' }} />
        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10 text-center">
          <p className="text-violet-400 text-xs font-semibold uppercase tracking-widest mb-5">
            Our Services
          </p>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-white leading-tight mb-6">
            The full Workday<br />
            <span className="gradient-text-animated italic">ecosystem, covered.</span>
          </h1>
          <p className="text-white/50 text-xl max-w-2xl mx-auto">
            From HCM and Finance to complex Studio integrations and Prism Analytics — we've navigated every corner of the Workday landscape.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            {[
              { label: 'HCM & People',          href: '#hcm'          },
              { label: 'Financial Intelligence', href: '#finance'      },
              { label: 'Integration Cloud',      href: '#integrations' },
              { label: 'Reporting & Prism',      href: '#prism'        },
              { label: 'Release Management',     href: '#releases'     },
            ].map(s => (
              <a key={s.href} href={s.href}
                className="px-4 py-2 rounded-full glass text-sm text-white/60 hover:text-white border border-violet-500/15 hover:border-violet-500/40 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="glow-divider" />

      <ServiceSection
        id="hcm" icon="👥" reverse={false}
        eyebrow="People & Strategy"
        headline="HCM that empowers people, not just tracks them."
        desc="We move beyond basic HR record-keeping to design Workday HCM environments that empower managers, engage employees, and automate the time-consuming processes that drain your HR team."
        features={[
          'Talent Lifecycle & Recruiting', 'Onboarding & Offboarding',
          'Performance & Development', 'Time & Absence Tracking',
          'Global Compliance & Localisations', 'Payroll Integration',
          'Benefits Administration', 'Succession Planning',
        ]}
        image={{ src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80', alt: 'HR team collaborating' }}
      />

      <div className="glow-divider" />

      <ServiceSection
        id="finance" icon="💹" reverse={true}
        eyebrow="Financial Intelligence"
        headline="Numbers tell a story. We make sure it's an accurate one."
        desc="We transform your finance function from a back-office cost centre into a strategic engine that provides real-time visibility, continuous accounting, and the spend intelligence your leadership team actually needs."
        features={[
          'Accounts Payable & Receivable', 'General Ledger Configuration',
          'Procurement & Expenses', 'Strategic Spend Visibility',
          'Continuous Accounting', 'Financial Reporting',
          'Multi-Entity Support', 'Budget Management',
        ]}
        image={{ src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', alt: 'Financial analytics dashboard' }}
      />

      <div className="glow-divider" />

      <ServiceSection
        id="integrations" icon="🔗" reverse={false}
        eyebrow="Integration Cloud"
        headline="A Workday tenant shouldn't be an island."
        desc="We build the bridges that connect your Workday ERP to the rest of your digital world — using the right tool for each integration type, from simple EIBs to complex multi-system Studio orchestrations."
        features={[
          'Workday Studio (Complex Flows)', 'EIB & Core Connectors',
          'REST & SOAP API Endpoints', 'ISU / ISSG Security',
          'Third-Party Payroll Providers', 'Benefits Carrier Feeds',
          'Custom Web App Feeds', 'Error Handling & Alerting',
        ]}
        image={{ src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80', alt: 'Server infrastructure and integration' }}
      />

      <div className="glow-divider" />

      <ServiceSection
        id="prism" icon="📊" reverse={true}
        eyebrow="Reporting & Prism Analytics"
        headline="Data is only valuable when it leads to a decision."
        desc="We clear the noise to surface the metrics that actually matter. From C-suite executive dashboards to Prism Analytics that merge your external market data with internal Workday data."
        features={[
          'Executive Dashboards', 'Prism Analytics Configuration',
          'External Data Integration', '360° Business View',
          'Custom Report Development', 'Composite Reports',
          'Regulatory Reporting', 'Self-Service Analytics',
        ]}
        image={{ src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80', alt: 'Business analytics dashboard' }}
      />

      <div className="glow-divider" />

      <ServiceSection
        id="releases" icon="🔄" reverse={false}
        eyebrow="Release Management"
        headline="R1 and R2 shouldn't keep you up at night."
        desc="Workday releases twice a year, every year, without exception. Our structured pre-release protocol ensures your integrations, business processes, and security configurations survive every update — intact."
        features={[
          'Pre-Release Impact Assessments', 'Preview Tenant Testing',
          'Regression Testing (Studio/EIB)', 'UAT Coordination',
          'API Change Log Review', 'Rollback Planning',
          'Post-Release Monitoring', 'Client-Specific SLA Coverage',
        ]}
        image={{ src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80', alt: 'Technical team reviewing system updates' }}
      />

      {/* Engagement models */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-14">
            <p className="text-violet-400 text-xs font-semibold uppercase tracking-widest mb-4">Engagement Models</p>
            <h2 className="font-display text-4xl text-white">Two models to fit your needs.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              {
                label: 'Consulting',
                sub: 'Client service engagements',
                desc: 'Project-based engagements with a defined scope, timeline, and deliverables. Full discovery through go-live and hypercare.',
                features: ['Fixed-scope projects', 'Discovery to go-live', 'Dedicated architect', 'SLA-governed delivery'],
              },
              {
                label: 'Staff Augmentation',
                sub: 'Ongoing placement support',
                desc: 'Embed a VCS Pro Workday specialist into your team on a sustained basis — filling skills gaps without permanent headcount.',
                features: ['Flexible duration', 'Embedded in your team', 'Certified specialists', 'Immediate availability'],
              },
            ].map((m, i) => (
              <div key={i} className="glass glass-hover gradient-border rounded-2xl p-8 flex flex-col gap-4">
                <h3 className="font-display text-2xl text-white">{m.label}</h3>
                <p className="text-violet-400 text-sm">{m.sub}</p>
                <p className="text-white/45 text-sm leading-relaxed">{m.desc}</p>
                <ul className="space-y-2 mt-2">
                  {m.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2.5 text-sm text-white/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="/contact"
                  className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-violet-400 hover:text-white transition-colors group">
                  Enquire
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default ServicesPage;
