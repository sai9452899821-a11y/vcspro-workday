// src/pages/MethodologyPage.jsx
import { useEffect } from 'react';

const PHASES = [
  {
    num: '01', label: 'Discovery & Alignment', icon: '🔍',
    title: 'We start by listening.',
    desc: 'Before writing a single line of configuration, we map your current state against Workday best practices. We identify the pain points, the political realities, and the technical constraints — so we aren\'t just paving over old problems with new software.',
    deliverables: ['Stakeholder Workshops', 'As-Is Process Mapping', 'FDD (Functional Design Document)', 'Risk Register', 'Timeline & Milestone Plan'],
  },
  {
    num: '02', label: 'Precision Architecture', icon: '🏗️',
    title: 'A blueprint built for scale.',
    desc: 'Our architects design a configuration blueprint that accounts for security, scalability, and the real experience of your end users. No cookie-cutter templates. Every decision is deliberate and documented in a TDD.',
    deliverables: ['TDD (Technical Design Document)', 'Security Model Design', 'Integration Architecture', 'Data Migration Strategy', 'Environment Plan'],
  },
  {
    num: '03', label: 'Iterative Build & Validate', icon: '⚙️',
    title: 'You see it early. You see it often.',
    desc: 'We configure in two-week sprints. Your team reviews working software — not slide decks — from the second week of every engagement. This breaks the black box of implementation and catches misalignments before they become expensive.',
    deliverables: ['Sprint Demos (bi-weekly)', 'Sandbox Configuration', 'Integration Testing', 'Stakeholder Sign-offs', 'UAT Preparation'],
  },
  {
    num: '04', label: 'Stress-Tested Deployment', icon: '🚀',
    title: 'Day One is a success, not a crisis.',
    desc: 'Go-live day is not a surprise. By the time we reach it, the production environment has been provisioned, a detailed cut-over plan rehearsed, and all integrations tested against production data volumes.',
    deliverables: ['End-to-End Integration Testing', 'UAT Sign-off', 'Cut-over Run Book', 'Rollback Triggers', 'Production Migration'],
  },
  {
    num: '05', label: 'Hypercare & Handover', icon: '🛡️',
    title: 'We stay until you\'re ready.',
    desc: 'The 30 days following go-live are the most critical. Our Hypercare protocol provides elevated SLA coverage (L1 < 2 hours, seven days a week) and daily stand-ups until your team is genuinely confident operating the system.',
    deliverables: ['Daily Stand-ups', 'Elevated SLA Coverage', 'Issue Resolution', 'Team Training', 'Full Technical Documentation'],
  },
];

export function MethodologyPage() {
  useEffect(() => { document.title = 'Our Methodology | VCS Pro'; }, []);

  return (
    <main id="main-content">
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(124,58,237,0.12), transparent)' }} />
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center relative z-10">
          <p className="text-violet-400 text-xs font-semibold uppercase tracking-widest mb-5">How We Work</p>
          <h1 className="font-display text-5xl sm:text-6xl text-white mb-6">
            A process built to<br/>
            <span className="gradient-text-animated italic">eliminate surprises.</span>
          </h1>
          <p className="text-white/50 text-xl leading-relaxed">
            Five phases. Zero black boxes. Every decision documented, every milestone visible, every risk mitigated before it reaches your users.
          </p>
        </div>
      </section>

      <div className="glow-divider" />

      <section className="py-24">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="space-y-6">
            {PHASES.map((phase, i) => (
              <div key={i} className="glass glass-hover gradient-border rounded-2xl p-8 lg:p-10">
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="flex-shrink-0">
                    <div className="inline-flex items-center gap-3 mb-4">
                      <span className="gradient-text font-display text-4xl font-bold">{phase.num}</span>
                      <span className="text-2xl">{phase.icon}</span>
                    </div>
                    <p className="text-violet-400 text-xs font-semibold uppercase tracking-widest">{phase.label}</p>
                  </div>
                  <div className="flex-1">
                    <h2 className="font-display text-2xl text-white mb-3">{phase.title}</h2>
                    <p className="text-white/50 leading-relaxed mb-6">{phase.desc}</p>
                    <div>
                      <p className="text-white/30 text-xs uppercase tracking-widest mb-3">Deliverables</p>
                      <div className="flex flex-wrap gap-2">
                        {phase.deliverables.map((d, j) => (
                          <span key={j} className="px-3 py-1.5 glass rounded-full text-xs text-white/60 border border-violet-500/10">
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <div className="max-w-xl mx-auto px-5 sm:px-8">
          <h2 className="font-display text-3xl text-white mb-4">Ready to begin?</h2>
          <p className="text-white/45 mb-8">The first step is a no-commitment discovery call.</p>
          <a href="/contact" className="btn-gradient inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
            Book a Discovery Call
          </a>
        </div>
      </section>
    </main>
  );
}

// ════════════════════════════════════════════════════════════
// ABOUT PAGE
// ════════════════════════════════════════════════════════════
export function AboutPage() {
  useEffect(() => { document.title = 'About VCS Pro | Workday Enterprise Consulting'; }, []);

  return (
    <main id="main-content">
      {/* Hero */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(124,58,237,0.12), transparent)' }} />
        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-violet-400 text-xs font-semibold uppercase tracking-widest mb-5">About VCS Pro</p>
              <h1 className="font-display text-5xl sm:text-6xl text-white leading-tight mb-7">
                Precision at Scale.<br/>
                <span className="gradient-text-animated italic">Performance at every level.</span>
              </h1>
              <p className="text-white/55 text-xl leading-relaxed mb-6">
                Founded on the principle that enterprise clients deserve better than cookie-cutter configurations and classroom-trained consultants.
              </p>
              <p className="text-white/40 leading-relaxed">
                We built VCS Pro around a single conviction: real transformation only comes from consultants who've lived inside the complexity of Global 500 organisations — not just read about it. Our team brings decades of Workday experience gained in the trenches of the world's most demanding enterprise environments.
              </p>
            </div>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                  alt="VCS Pro team at work"
                  className="w-full aspect-[4/3] object-cover opacity-80"
                />
              </div>
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-violet-500/20 to-cyan-500/10 -z-10 blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      <div className="glow-divider" />

      {/* Values */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-16">
            <p className="text-violet-400 text-xs font-semibold uppercase tracking-widest mb-4">Our Values</p>
            <h2 className="font-display text-4xl sm:text-5xl text-white">
              The VCS Pro <span className="gradient-text italic">Standard.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: '🎯', label: 'Human-Centric Tech',    desc: 'Technology should serve people, not the other way around. Every configuration is built for the end-user, not the administrator.' },
              { icon: '🔬', label: 'Technical Integrity',   desc: 'We don\'t take shortcuts. Our work is clean, documented, and built to last through every Workday release cycle.' },
              { icon: '🤝', label: 'Transparent Partnership', desc: 'You get full visibility into our process. We operate as an extension of your internal team — not a vendor behind a portal.' },
              { icon: '🌍', label: 'Global Perspective',    desc: 'Big 4 standards of security and compliance, applied to every engagement regardless of size.' },
            ].map((v, i) => (
              <div key={i} className="glass glass-hover rounded-2xl p-7 text-center flex flex-col items-center gap-4">
                <div className="text-3xl">{v.icon}</div>
                <h3 className="font-display text-lg text-white">{v.label}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team types */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="glass rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse 60% 80% at 80% 50%, rgba(124,58,237,0.08), transparent)' }} />
            <div className="relative z-10">
              <div className="text-center mb-12">
                <p className="text-violet-400 text-xs font-semibold uppercase tracking-widest mb-4">The Team</p>
                <h2 className="font-display text-4xl text-white">Specialists, not generalists.</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: '⚙️', role: 'Workday Architects',  desc: 'Deep understanding of global business processes, security models, and integration patterns.' },
                  { icon: '💻', role: 'Technical Consultants', desc: 'Specialists in Studio, EIB, REST/SOAP, and Prism data engineering.' },
                  { icon: '📊', role: 'Reporting Analysts',  desc: 'Builders of the dashboards and Prism models that drive real executive decisions.' },
                  { icon: '📋', role: 'Project Managers',    desc: 'Keeping every engagement on-time, on-budget, and fully visible to your stakeholders.' },
                ].map((t, i) => (
                  <div key={i} className="text-center p-6">
                    <div className="text-4xl mb-4">{t.icon}</div>
                    <h3 className="font-display text-lg text-white mb-2">{t.role}</h3>
                    <p className="text-white/40 text-sm leading-relaxed">{t.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <div className="max-w-xl mx-auto px-5 sm:px-8">
          <h2 className="font-display text-3xl text-white mb-4">Want to join the team?</h2>
          <p className="text-white/45 mb-8">We're always looking for Workday experts who think clients deserve better.</p>
          <a href="/contact" className="btn-gradient inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-semibold text-white">
            Get in Touch
          </a>
        </div>
      </section>
    </main>
  );
}

// ════════════════════════════════════════════════════════════
// CONTACT PAGE
// ════════════════════════════════════════════════════════════
export function ContactPage() {
  useEffect(() => { document.title = 'Contact VCS Pro | Book a Discovery Call'; }, []);

  return (
    <main id="main-content">
      <section className="relative pt-40 pb-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(124,58,237,0.12), transparent)' }} />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left */}
            <div>
              <p className="text-violet-400 text-xs font-semibold uppercase tracking-widest mb-5">
                Get in Touch
              </p>
              <h1 className="font-display text-5xl sm:text-6xl text-white leading-tight mb-7">
                Let's talk about<br/>
                <span className="gradient-text-animated italic">your Workday.</span>
              </h1>
              <p className="text-white/55 text-lg leading-relaxed mb-12">
                Every engagement starts with a no-commitment technical discovery call. You'll speak directly with a Workday Architect — not a salesperson.
              </p>

              {/* Commitments */}
              <div className="space-y-5">
                {[
                  { icon: '⏱️', label: '24-Hour Response', desc: 'Detailed, specific response within one business day — not an automated acknowledgement.' },
                  { icon: '🎯', label: 'Direct Expert Access', desc: 'You speak directly with a Workday Architect or Senior Technical Consultant from day one.' },
                  { icon: '🔒', label: 'Confidential & Secure', desc: 'NDA available on request. Your project details are protected from the first interaction.' },
                ].map((c, i) => (
                  <div key={i} className="flex items-start gap-4 glass rounded-2xl p-5 border border-violet-500/10">
                    <span className="text-2xl flex-shrink-0">{c.icon}</span>
                    <div>
                      <p className="font-semibold text-white text-sm mb-1">{c.label}</p>
                      <p className="text-white/45 text-sm">{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact details */}
              <div className="mt-10 pt-8 border-t border-white/5 flex flex-col gap-3">
                <a href="mailto:erp.support@vcspro.in"
                  className="inline-flex items-center gap-3 text-white/50 hover:text-white transition-colors text-sm">
                  <svg className="w-4 h-4 text-violet-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  erp.support@vcspro.in
                </a>
                <p className="text-white/30 text-xs flex items-center gap-2">
                  <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  North Texas, USA · Serving global enterprise clients
                </p>
              </div>
            </div>

            {/* Contact form card */}
            <div className="glass gradient-border rounded-3xl p-8 sm:p-10">
              <h2 className="font-display text-2xl text-white mb-7">Start the conversation</h2>
              <form
                onSubmit={e => { e.preventDefault(); window.location.href = 'mailto:erp.support@vcspro.in?subject=Workday Discovery Call Request'; }}
                className="flex flex-col gap-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { label: 'Full Name',     type: 'text', name: 'name',    placeholder: 'Jane Smith'           },
                    { label: 'Business Email', type: 'email', name: 'email', placeholder: 'jane@company.com'     },
                  ].map(f => (
                    <div key={f.name}>
                      <label htmlFor={f.name} className="block text-xs font-medium text-white/50 uppercase tracking-widest mb-2">
                        {f.label}
                      </label>
                      <input
                        id={f.name} type={f.type} name={f.name} placeholder={f.placeholder} required
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20
                          focus:outline-none focus:border-violet-500/60 focus:bg-white/8 transition-colors"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label htmlFor="company" className="block text-xs font-medium text-white/50 uppercase tracking-widest mb-2">
                    Company
                  </label>
                  <input id="company" type="text" name="company" placeholder="Your Organisation" required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-violet-500/60 transition-colors" />
                </div>

                <div>
                  <label htmlFor="workday_status" className="block text-xs font-medium text-white/50 uppercase tracking-widest mb-2">
                    Workday Status
                  </label>
                  <select id="workday_status" name="workday_status"
                    className="w-full bg-[#0a0a1f] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-violet-500/60 transition-colors appearance-none">
                    <option value="">Select current status…</option>
                    <option>Implementing (New deployment)</option>
                    <option>Post-Production (Optimising)</option>
                    <option>Planning to Buy</option>
                    <option>Release Management Support</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="area" className="block text-xs font-medium text-white/50 uppercase tracking-widest mb-2">
                    Primary Area of Interest
                  </label>
                  <select id="area" name="area"
                    className="w-full bg-[#0a0a1f] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-violet-500/60 transition-colors appearance-none">
                    <option value="">Select an area…</option>
                    <option>HCM & People Strategy</option>
                    <option>Financial Intelligence (FINS)</option>
                    <option>Integration Cloud (Studio / EIB)</option>
                    <option>Reporting & Prism Analytics</option>
                    <option>Release Management</option>
                    <option>General Optimisation</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-white/50 uppercase tracking-widest mb-2">
                    Your Challenge
                  </label>
                  <textarea id="message" name="message" rows={4}
                    placeholder="Tell us what you're working on…"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-violet-500/60 transition-colors resize-none" />
                </div>

                <button
                  type="submit"
                  className="btn-gradient w-full py-4 rounded-xl text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white transition-all"
                >
                  Send Message → erp.support@vcspro.in
                </button>
                <p className="text-white/25 text-xs text-center">
                  We respond within one business day. Your details are kept strictly confidential.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
