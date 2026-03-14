// src/pages/HomePage.jsx
import { useEffect, useRef, useState } from 'react';

/* ── Animated counter hook ─────────────────────────────────── */
function useCounter(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      observer.disconnect();
      let start = 0;
      const step = target / (duration / 16);
      const timer = setInterval(() => {
        start = Math.min(start + step, target);
        setCount(Math.floor(start));
        if (start >= target) clearInterval(timer);
      }, 16);
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);
  return [count, ref];
}

/* ── Stat card ─────────────────────────────────────────────── */
function StatCard({ value, suffix = '', label, delay }) {
  const [count, ref] = useCounter(parseInt(value));
  return (
    <div ref={ref} className={`text-center animate-fade-up opacity-0 stagger-${delay}`}
      style={{ animationFillMode: 'forwards' }}>
      <div className="font-display text-5xl sm:text-6xl gradient-text mb-2">
        {count}{suffix}
      </div>
      <p className="text-white/50 text-sm tracking-wide">{label}</p>
    </div>
  );
}

/* ── Service card ──────────────────────────────────────────── */
function ServiceCard({ icon, title, desc, features, href, delay }) {
  return (
    <a href={href}
      className={`glass glass-hover rounded-2xl p-7 flex flex-col gap-4 group cursor-pointer
        animate-fade-up opacity-0 stagger-${delay}`}
      style={{ animationFillMode: 'forwards' }}>
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/10
        flex items-center justify-center text-2xl border border-violet-500/20
        group-hover:border-violet-500/40 transition-colors">
        {icon}
      </div>
      <h3 className="font-display text-xl text-white group-hover:gradient-text transition-all">
        {title}
      </h3>
      <p className="text-white/50 text-sm leading-relaxed flex-1">{desc}</p>
      <ul className="space-y-1.5">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-2 text-xs text-white/40">
            <span className="w-1 h-1 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 flex-shrink-0" />
            {f}
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-1.5 text-xs font-semibold text-violet-400 mt-1 group-hover:gap-3 transition-all">
        Explore
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </a>
  );
}

/* ── Method step ───────────────────────────────────────────── */
function MethodStep({ num, title, desc, delay }) {
  return (
    <div className={`flex gap-6 animate-fade-up opacity-0 stagger-${delay}`}
      style={{ animationFillMode: 'forwards' }}>
      <div className="flex-shrink-0 w-12 h-12 rounded-2xl glass flex items-center justify-center">
        <span className="gradient-text font-display text-lg font-bold">{num}</span>
      </div>
      <div>
        <h3 className="text-white font-semibold text-base mb-1.5">{title}</h3>
        <p className="text-white/45 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

/* ── Main component ────────────────────────────────────────── */
export function HomePage() {
  return (
    <main id="main-content">

      {/* ═══════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">

        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1920&q=80"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#060614]/80 via-[#060614]/60 to-[#060614]" />
        </div>

        {/* Radial glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Grid texture */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(rgba(168,85,247,1) 1px,transparent 1px),linear-gradient(90deg,rgba(168,85,247,1) 1px,transparent 1px)', backgroundSize: '80px 80px' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pt-36 pb-24 w-full">
          <div className="max-w-4xl">

            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border border-violet-500/25 text-xs font-medium text-violet-300 mb-8 animate-fade-in"
              style={{ animationFillMode: 'forwards' }}>
              <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse-slow" />
              Workday Certified Enterprise Consulting
            </div>

            {/* Headline */}
            <h1
              className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white leading-[1.0] mb-8 animate-fade-up opacity-0"
              style={{ animationFillMode: 'forwards', animationDelay: '0.1s' }}
            >
              A smoother path to a
              <br />
              <span className="gradient-text-animated italic">better Workday.</span>
            </h1>

            {/* Sub */}
            <p
              className="text-white/55 text-xl sm:text-2xl max-w-2xl leading-relaxed mb-12 animate-fade-up opacity-0"
              style={{ animationFillMode: 'forwards', animationDelay: '0.25s' }}
            >
              The knowledge, experience, and precision needed to lead your organisation through every stage of the Workday lifecycle — from first deployment to continuous optimisation.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-wrap gap-4 animate-fade-up opacity-0"
              style={{ animationFillMode: 'forwards', animationDelay: '0.4s' }}
            >
              <a href="/contact" className="btn-gradient inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
                Book a Discovery Call
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a href="/services" className="gradient-border inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-semibold text-white/80 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500">
                Explore Services
              </a>
            </div>

            {/* Certification badges */}
            <div
              className="mt-16 flex flex-wrap items-center gap-6 animate-fade-up opacity-0"
              style={{ animationFillMode: 'forwards', animationDelay: '0.55s' }}
            >
              <p className="text-white/25 text-xs uppercase tracking-widest">Recognised by</p>
              {['Workday Partner', 'Global 500 Clients', 'HCM Certified', 'FINS Certified'].map(b => (
                <div key={b} className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass text-xs text-white/50 border border-white/5">
                  <svg className="w-3.5 h-3.5 text-violet-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  {b}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center pt-2">
            <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          STATS
      ═══════════════════════════════════════════════════════ */}
      <section className="py-24 relative">
        <div className="glow-divider absolute top-0 left-0 right-0" />
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
            <StatCard value="6"   suffix="+"  label="Years of Workday Experience" delay={1} />
            <StatCard value="500" suffix="+"  label="Enterprise Deployments"      delay={2} />
            <StatCard value="100" suffix="%"  label="Data Mapping Accuracy"       delay={3} />
            <StatCard value="2"   suffix="hr" label="L1 Critical Response Time"  delay={4} />
          </div>
        </div>
        <div className="glow-divider absolute bottom-0 left-0 right-0" />
      </section>

      {/* ═══════════════════════════════════════════════════════
          WHO WE ARE
      ═══════════════════════════════════════════════════════ */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Image side */}
            <div className="relative order-2 lg:order-1">
              <div className="relative rounded-3xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                  alt="VCS Pro Workday consultants collaborating"
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060614]/60 to-transparent" />
              </div>
              {/* Floating stat card */}
              <div className="absolute -bottom-6 -right-6 glass rounded-2xl p-5 border border-violet-500/20">
                <div className="gradient-text font-display text-3xl">20+</div>
                <div className="text-white/50 text-xs mt-0.5">Years Combined Experience</div>
              </div>
            </div>

            {/* Text side */}
            <div className="order-1 lg:order-2">
              <p className="text-violet-400 text-xs font-semibold uppercase tracking-widest mb-5">
                Who We Are
              </p>
              <h2 className="font-display text-4xl sm:text-5xl text-white leading-tight mb-7">
                We stand apart from every
                <span className="gradient-text italic"> other</span> consulting firm.
              </h2>
              <p className="text-white/55 text-lg leading-relaxed mb-6">
                Our team brings more than two decades of Workday consulting and customer-side experience to your project. We've been in the trenches of Global 500 organisations — not in a classroom.
              </p>
              <p className="text-white/45 leading-relaxed mb-10">
                Across every stage and function of the Workday lifecycle — from HCM to Finance, Studio integrations to Prism Analytics — we've deployed new modules, optimised existing systems, and provided ongoing support to clients across every industry.
              </p>
              <a href="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:gradient-text transition-all group focus-visible:outline-none focus-visible:underline">
                Learn how we work differently
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SERVICES
      ═══════════════════════════════════════════════════════ */}
      <section className="py-28 relative">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(124,58,237,0.06), transparent)' }} />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
          <div className="text-center mb-16">
            <p className="text-violet-400 text-xs font-semibold uppercase tracking-widest mb-4">
              Our Solutions
            </p>
            <h2 className="font-display text-4xl sm:text-5xl text-white mb-5">
              However you plan to use Workday,<br />
              <span className="gradient-text italic">we've been down that path before.</span>
            </h2>
            <p className="text-white/45 max-w-xl mx-auto">
              Four interconnected service pillars that cover the full Workday ecosystem — built on real-world experience, not certifications alone.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <ServiceCard
              delay={1} href="/services#hcm"
              icon="👥"
              title="People & HCM"
              desc="Beyond HR record-keeping — we design Workday HCM environments that actually empower your managers and engage your workforce."
              features={['Talent & Recruiting', 'Onboarding & Performance', 'Time, Absence & Payroll', 'Global Compliance']}
            />
            <ServiceCard
              delay={2} href="/services#finance"
              icon="💹"
              title="Financial Intelligence"
              desc="Transform your finance function from a back-office cost centre into a strategic engine that drives real decisions."
              features={['AP, AR & General Ledger', 'Procurement & Expenses', 'Continuous Accounting', 'Strategic Spend Visibility']}
            />
            <ServiceCard
              delay={3} href="/services#integrations"
              icon="🔗"
              title="Integration Cloud"
              desc="A Workday tenant shouldn't be an island. We build the Studio, EIB, and API bridges that connect your ERP to your entire digital world."
              features={['Workday Studio (Complex)', 'EIB & Core Connectors', 'REST / SOAP APIs', 'Security (ISU / ISSG)']}
            />
            <ServiceCard
              delay={4} href="/services#prism"
              icon="📊"
              title="Reporting & Prism"
              desc="Data is only valuable when it leads to a decision. We clear the noise to surface the metrics that actually matter."
              features={['Executive Dashboards', 'Prism Analytics', 'C-Suite Scorecards', 'External Data Merge']}
            />
          </div>

          <div className="text-center mt-10">
            <a href="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-white transition-colors group">
              Dive deeper into all services
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          METHODOLOGY  
      ═══════════════════════════════════════════════════════ */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

            {/* Steps */}
            <div>
              <p className="text-violet-400 text-xs font-semibold uppercase tracking-widest mb-5">
                Our Methodology
              </p>
              <h2 className="font-display text-4xl sm:text-5xl text-white leading-tight mb-12">
                A process built to<br/>
                <span className="gradient-text italic">eliminate surprises.</span>
              </h2>
              <div className="space-y-8">
                <MethodStep delay={1} num="01" title="Discovery & Alignment"
                  desc="We start by listening. We map your pain points against Workday best practices — ensuring we aren't just paving over existing problems." />
                <MethodStep delay={2} num="02" title="Precision Architecture"
                  desc="Our architects design a blueprint accounting for security, scalability, and the end-user experience. No cookie-cutter configurations." />
                <MethodStep delay={3} num="03" title="Iterative Build & Validate"
                  desc="We configure in sprints. Your team sees the system early and often. We break the black box of implementation." />
                <MethodStep delay={4} num="04" title="Stress-Tested Deployment"
                  desc="Through rigorous UAT and end-to-end integration checks against R1/R2 release cycles, Day One is a success — not a crisis." />
                <MethodStep delay={5} num="05" title="Hypercare & Handover"
                  desc="We stay. Your team is trained, confident, and ready to take the wheel before we step back." />
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
                  alt="Workday analytics dashboard"
                  className="w-full aspect-[3/4] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-violet-900/30 to-cyan-900/20" />
              </div>
              {/* Glow */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-violet-500/20 to-cyan-500/10 -z-10 blur-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          WHY VCS PRO
      ═══════════════════════════════════════════════════════ */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.07) 0%, rgba(6,182,212,0.05) 100%)' }} />
        <div className="glow-divider absolute top-0 left-0 right-0" />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
          <div className="text-center mb-16">
            <p className="text-violet-400 text-xs font-semibold uppercase tracking-widest mb-4">
              The VCS Pro Difference
            </p>
            <h2 className="font-display text-4xl sm:text-5xl text-white">
              Why Global 500 companies<br/>
              <span className="gradient-text italic">trust us.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '🎓',
                title: 'Real-World Depth',
                desc: 'We didn\'t learn Workday in a classroom. We learned it in the trenches of the world\'s largest organisations — carrying the scar tissue that only comes from production environments.',
              },
              {
                icon: '🎯',
                title: 'Boutique Focus, Enterprise Scale',
                desc: 'You get the deep technical expertise of a Big 4 firm with the agility and personal attention of a dedicated partner. Your project is never one of hundreds.',
              },
              {
                icon: '🛡️',
                title: 'Beyond the Go-Live',
                desc: 'We stay through Hypercare. Your internal team is trained, confident, and genuinely capable of operating what we built together — before we step back.',
              },
            ].map((c, i) => (
              <div key={i}
                className={`glass glass-hover rounded-2xl p-8 animate-fade-up opacity-0 stagger-${i + 1}`}
                style={{ animationFillMode: 'forwards' }}>
                <div className="text-3xl mb-5">{c.icon}</div>
                <h3 className="font-display text-xl text-white mb-3">{c.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="glow-divider absolute bottom-0 left-0 right-0" />
      </section>

      {/* ═══════════════════════════════════════════════════════
          LATEST INSIGHTS TEASER
      ═══════════════════════════════════════════════════════ */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-violet-400 text-xs font-semibold uppercase tracking-widest mb-3">VCS Pro Insights</p>
              <h2 className="font-display text-4xl text-white">
                From the <span className="gradient-text italic">field.</span>
              </h2>
            </div>
            <a href="/blog" className="hidden sm:flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors group">
              All articles
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                cat: 'Workday Strategy',
                title: 'The 2026 Roadmap: Moving Beyond EIBs to Studio & Prism',
                excerpt: 'Why Global 500 companies are shifting from EIBs toward high-governance integration patterns — and what your roadmap should look like.',
                date: 'Jan 15, 2026',
                slug: 'workday-integration-roadmap-2026',
                img: 'photo-1551288049-bebda4e38f71',
              },
              {
                cat: 'Release Management',
                title: 'Navigating Bi-Annual Workday Updates Without Breaking Production',
                excerpt: 'The VCS Pro pre-release protocol that keeps enterprise tenants stable through every R1 and R2 release cycle.',
                date: 'Feb 3, 2026',
                slug: 'navigating-workday-biannual-updates',
                img: 'photo-1460925895917-afdab827c52f',
              },
              {
                cat: 'Methodology',
                title: 'From Ideation to Go-Live: Inside Our 5-Phase Lifecycle',
                excerpt: 'The framework behind every VCS Pro engagement — from first discovery call to hypercare handover.',
                date: 'Jan 8, 2026',
                slug: 'ideation-to-go-live-project-lifecycle',
                img: 'photo-1517245386807-bb43f82c33c4',
              },
            ].map((post, i) => (
              <a key={i} href={`/blog/${post.slug}`}
                className="glass glass-hover rounded-2xl overflow-hidden flex flex-col group">
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={`https://images.unsplash.com/${post.img}?auto=format&fit=crop&w=640&q=75`}
                    alt={post.title}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                  />
                </div>
                <div className="p-6 flex flex-col gap-3 flex-1">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-violet-400">
                    {post.cat}
                  </span>
                  <h3 className="font-display text-lg text-white leading-snug group-hover:gradient-text transition-all">
                    {post.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed flex-1 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <p className="text-white/25 text-xs">{post.date}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}

export default HomePage;
