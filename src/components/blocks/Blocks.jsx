// src/components/blocks/Blocks.jsx
// All Page Builder block renderers for VCS Pro

import { useState } from 'react';
import { UniversalImage } from '../UniversalImage';

// ═══════════════════════════════════════════════════════════════
// HERO BLOCK
// ═══════════════════════════════════════════════════════════════
export function HeroBlock({ block }) {
  const { eyebrow, headline, subheadline, variant = 'centered',
    backgroundImage, primaryCta, secondaryCta, stats } = block;

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-[#001a33]" aria-label="Hero">
      {/* Background image */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <UniversalImage image={backgroundImage} className="w-full h-full" width={1920} height={1080} priority />
          <div className="absolute inset-0 bg-[#001a33]/70" />
        </div>
      )}

      {/* Grid overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.07] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(0,206,209,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(0,206,209,.5) 1px,transparent 1px)', backgroundSize: '80px 80px' }} />

      {/* Radial accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #00CED1 0%, transparent 65%)' }} />

      <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24 lg:py-32
        ${variant === 'split' ? 'grid grid-cols-1 lg:grid-cols-2 gap-16 items-center' : 'text-center max-w-4xl'}`}>
        <div>
          {eyebrow && (
            <p className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-[#00CED1]/40 bg-[#00CED1]/10 text-[#00CED1] text-xs font-bold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 bg-[#00CED1] rounded-full animate-pulse" />
              {eyebrow}
            </p>
          )}

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.05] mb-6 text-balance">
            {headline}
          </h1>

          {subheadline && (
            <p className={`text-lg sm:text-xl text-gray-300 mb-10 leading-relaxed ${variant !== 'split' ? 'max-w-2xl mx-auto' : ''}`}>
              {subheadline}
            </p>
          )}

          <div className={`flex gap-4 flex-wrap ${variant !== 'split' ? 'justify-center' : ''}`}>
            {primaryCta?.label && (
              <a href={primaryCta.href}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#00CED1] text-[#003366] font-black text-base hover:bg-[#00b8b8] transition-all duration-200 shadow-xl shadow-[#00CED1]/25 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
                {primaryCta.label}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </a>
            )}
            {secondaryCta?.label && (
              <a href={secondaryCta.href}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-white/20 text-white font-bold text-base hover:border-[#00CED1]/60 hover:text-[#00CED1] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00CED1]">
                {secondaryCta.label}
              </a>
            )}
          </div>

          {stats?.length > 0 && (
            <div className={`mt-16 flex gap-8 flex-wrap ${variant !== 'split' ? 'justify-center' : ''}`}>
              {stats.map((s, i) => (
                <div key={i}>
                  <div className="text-3xl sm:text-4xl font-black text-[#00CED1]">{s.value}</div>
                  <div className="text-sm text-gray-400 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// SERVICE GRID BLOCK
// ═══════════════════════════════════════════════════════════════
export function ServiceGridBlock({ block }) {
  const { sectionLabel, headline, services = [], layout = 'grid-3' } = block;

  const colClass = {
    'grid-3': 'sm:grid-cols-2 lg:grid-cols-3',
    'grid-4': 'sm:grid-cols-2 lg:grid-cols-4',
    'masonry': 'sm:grid-cols-2 lg:grid-cols-3',
  }[layout] || 'sm:grid-cols-2 lg:grid-cols-3';

  return (
    <section className="py-24 bg-white" aria-label="Services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(sectionLabel || headline) && (
          <div className="text-center mb-16">
            {sectionLabel && <p className="text-xs font-black uppercase tracking-widest text-[#00CED1] mb-3">{sectionLabel}</p>}
            {headline && <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#003366]">{headline}</h2>}
            <div className="mt-5 w-16 h-1 bg-[#00CED1] mx-auto rounded-full" />
          </div>
        )}

        <ul className={`grid grid-cols-1 gap-6 ${colClass}`}>
          {services.map((svc, i) => (
            <li key={i}
              className="group relative bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-[#00CED1]/20 hover:bg-[#003366] hover:shadow-2xl hover:shadow-[#003366]/10 transition-all duration-300 hover:-translate-y-1">
              {svc.badge && (
                <span className="absolute top-6 right-6 px-2.5 py-1 bg-[#00CED1] text-[#003366] text-xs font-black rounded-full">{svc.badge}</span>
              )}
              {svc.icon && <div className="text-3xl mb-5">{svc.icon}</div>}
              <h3 className="text-xl font-black text-[#003366] group-hover:text-white mb-3 transition-colors">{svc.title}</h3>
              <p className="text-gray-600 group-hover:text-gray-300 text-sm leading-relaxed mb-5 transition-colors">{svc.description}</p>
              {svc.features?.length > 0 && (
                <ul className="space-y-2 mb-6">
                  {svc.features.map((feat, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-500 group-hover:text-gray-300 transition-colors">
                      <svg className="w-4 h-4 text-[#00CED1] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                      {feat}
                    </li>
                  ))}
                </ul>
              )}
              {svc.ctaLabel && svc.ctaHref && (
                <a href={svc.ctaHref}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#00CED1] hover:gap-3 transition-all duration-200 focus-visible:outline-none focus-visible:underline">
                  {svc.ctaLabel}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// AI AUTOMATION BLOCK
// ═══════════════════════════════════════════════════════════════
const AI_ICONS = {
  'whatsapp-bot': '💬', nlp: '🧠', 'vector-db': '🗄️',
  automation: '⚡', prediction: '📈', 'document-ai': '📄',
};

export function AIAutomationBlock({ block }) {
  const { eyebrow, headline, description, capabilities = [], ctaLabel, ctaHref } = block;

  return (
    <section className="py-24 bg-[#001a33] relative overflow-hidden" aria-label="AI Automation">
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.12] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #00CED1 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-16">
          {eyebrow && <p className="text-xs font-black uppercase tracking-widest text-[#00CED1] mb-4">{eyebrow}</p>}
          {headline && <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6">{headline}</h2>}
          {description && <p className="text-gray-400 text-lg leading-relaxed">{description}</p>}
        </div>

        {capabilities.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {capabilities.map((cap, i) => (
              <div key={i}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#00CED1]/40 hover:bg-[#00CED1]/5 transition-all duration-300 group">
                <div className="text-2xl mb-4">{AI_ICONS[cap.icon] || '🤖'}</div>
                <h3 className="font-black text-white mb-2 group-hover:text-[#00CED1] transition-colors">{cap.title}</h3>
                <p className="text-sm text-gray-400 mb-3 leading-relaxed">{cap.description}</p>
                {cap.techStack && (
                  <p className="text-xs font-mono text-[#00CED1]/70 bg-[#00CED1]/5 px-3 py-1.5 rounded-lg">{cap.techStack}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {ctaLabel && ctaHref && (
          <div className="text-center">
            <a href={ctaHref}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#00CED1] text-[#003366] font-black text-base hover:bg-[#00b8b8] transition-all duration-200 shadow-xl shadow-[#00CED1]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
              {ctaLabel}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// TECH MATRIX BLOCK
// ═══════════════════════════════════════════════════════════════
const CAT_COLORS = {
  Mobile:     'bg-violet-500/10 text-violet-400 border-violet-500/20',
  Enterprise: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  CMS:        'bg-orange-500/10 text-orange-400 border-orange-500/20',
  Marketing:  'bg-pink-500/10 text-pink-400 border-pink-500/20',
  AI:         'bg-[#00CED1]/10 text-[#00CED1] border-[#00CED1]/20',
  ERP:        'bg-blue-900/40 text-blue-300 border-blue-500/20',
};

const DEFAULT_LIFECYCLE = [
  { step: 1, label: 'Ideation',  icon: '💡', description: 'Define success metrics & choose the right tech stack.' },
  { step: 2, label: 'Build',     icon: '🔨', description: 'Agile sprints with regular demos to evolve the product.' },
  { step: 3, label: 'Validation',icon: '✅', description: 'Rigorous cross-browser & security testing.' },
  { step: 4, label: 'Go-Live',   icon: '🚀', description: 'Server config, CI/CD pipeline, zero-hiccup launch.' },
  { step: 5, label: 'Hypercare', icon: '🛡️', description: 'Training, documentation, and long-term support.' },
];

export function TechMatrixBlock({ block }) {
  const { eyebrow, headline, rows = [], displayStyle = 'icon-grid', showLifecycle, lifecycle } = block;
  const steps = lifecycle?.length ? lifecycle : DEFAULT_LIFECYCLE;

  return (
    <section className="py-24 bg-gray-50" aria-label="Technology Matrix">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {eyebrow && <p className="text-xs font-black uppercase tracking-widest text-[#00CED1] mb-3">{eyebrow}</p>}
          {headline && <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#003366]">{headline}</h2>}
          <div className="mt-5 w-16 h-1 bg-[#00CED1] mx-auto rounded-full" />
        </div>

        {/* Icon Grid */}
        {displayStyle !== 'table' && rows.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
            {rows.map((row, i) => (
              <div key={i}
                className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-gray-100 hover:border-[#00CED1]/30 hover:shadow-lg transition-all duration-200 group">
                <div className="w-12 h-12 rounded-xl bg-[#003366]/5 flex items-center justify-center flex-shrink-0 group-hover:bg-[#003366] transition-colors">
                  {row.logo
                    ? <UniversalImage image={row.logo} className="w-7 h-7 object-contain" width={28} height={28} />
                    : <span className="text-xl">💻</span>}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-black text-[#003366] text-sm">{row.solution}</h3>
                    {row.category && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${CAT_COLORS[row.category] || ''}`}>{row.category}</span>
                    )}
                  </div>
                  <p className="text-xs font-mono text-gray-400 mb-1 truncate">{row.techStack}</p>
                  <p className="text-xs text-gray-500">{row.benefit}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Table */}
        {displayStyle === 'table' && rows.length > 0 && (
          <div className="overflow-x-auto rounded-2xl border border-gray-200 mb-16 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#003366] text-white">
                  {['Solution', 'Primary Tech Stack', 'Core Benefit', 'Category'].map(h => (
                    <th key={h} scope="col" className="text-left px-6 py-4 font-black">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className={`border-t border-gray-100 ${i % 2 ? 'bg-gray-50' : 'bg-white'}`}>
                    <td className="px-6 py-4 font-bold text-[#003366]">{row.solution}</td>
                    <td className="px-6 py-4 font-mono text-gray-600 text-xs">{row.techStack}</td>
                    <td className="px-6 py-4 text-gray-600">{row.benefit}</td>
                    <td className="px-6 py-4">
                      {row.category && <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${CAT_COLORS[row.category] || ''}`}>{row.category}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 5-Step Lifecycle */}
        {showLifecycle && (
          <div className="mt-8 pt-16 border-t border-gray-200">
            <h3 className="text-center text-2xl font-black text-[#003366] mb-12">The VCS Pro 5-Step Lifecycle</h3>
            <div className="relative">
              <div className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00CED1] via-[#006699] to-[#003366] hidden sm:block" aria-hidden="true" />
              <ol className="relative grid grid-cols-1 sm:grid-cols-5 gap-6">
                {steps.map((step, i) => (
                  <li key={i} className="flex flex-col items-center text-center">
                    <div className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-4 shadow-lg border-4 border-white"
                      style={{ background: `linear-gradient(135deg, #00CED1 0%, #003366 100%)` }}
                      aria-label={`Step ${step.step}: ${step.label}`}>
                      {step.icon || step.step}
                    </div>
                    <h4 className="font-black text-[#003366] text-sm mb-2">{step.label}</h4>
                    {step.description && <p className="text-xs text-gray-500 leading-relaxed">{step.description}</p>}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// IMAGE GALLERY BLOCK
// ═══════════════════════════════════════════════════════════════
export function ImageGalleryBlock({ block }) {
  const { headline, galleryStyle = 'masonry', images = [], columns = 3 } = block;
  const [lightboxIdx, setLightboxIdx] = useState(null);

  return (
    <section className="py-24 bg-white" aria-label="Image Gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {headline && (
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-[#003366]">{headline}</h2>
            <div className="mt-5 w-16 h-1 bg-[#00CED1] mx-auto rounded-full" />
          </div>
        )}

        {/* Masonry / Lightbox Grid */}
        {(galleryStyle === 'masonry' || galleryStyle === 'lightbox') && (
          <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
            {images.map((img, i) => (
              <div key={i}
                onClick={() => galleryStyle === 'lightbox' ? setLightboxIdx(i) : null}
                className={`relative overflow-hidden rounded-2xl ${galleryStyle === 'lightbox' ? 'cursor-zoom-in group' : ''}`}
                style={{ aspectRatio: i % 3 === 0 ? '4/5' : '4/3' }}>
                <UniversalImage image={img} className="w-full h-full transition-transform duration-500 group-hover:scale-105" width={600} height={400} />
                {galleryStyle === 'lightbox' && (
                  <div className="absolute inset-0 bg-[#003366]/0 group-hover:bg-[#003366]/30 transition-colors flex items-center justify-center">
                    <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/></svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Horizontal Scroll */}
        {galleryStyle === 'scroll' && (
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4" style={{ scrollbarWidth: 'thin', scrollbarColor: '#00CED1 transparent' }}>
            {images.map((img, i) => (
              <div key={i} className="flex-none w-72 h-52 rounded-2xl overflow-hidden snap-start">
                <UniversalImage image={img} className="w-full h-full" width={288} height={208} />
              </div>
            ))}
          </div>
        )}

        {/* Lightbox Modal */}
        {lightboxIdx !== null && (
          <div role="dialog" aria-modal="true" aria-label="Image lightbox"
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightboxIdx(null)}>
            <button onClick={() => setLightboxIdx(null)} aria-label="Close lightbox"
              className="absolute top-4 right-4 text-white hover:text-[#00CED1] p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00CED1] rounded">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
            <div className="max-w-4xl max-h-[80vh] w-full" onClick={e => e.stopPropagation()}>
              <UniversalImage image={images[lightboxIdx]} className="w-full max-h-[80vh] rounded-xl object-contain" width={1200} height={800} />
            </div>
            <button onClick={e => { e.stopPropagation(); setLightboxIdx(i => Math.max(0, i - 1)); }}
              disabled={lightboxIdx === 0} aria-label="Previous image"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-[#00CED1] disabled:opacity-20 p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00CED1] rounded">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button onClick={e => { e.stopPropagation(); setLightboxIdx(i => Math.min(images.length - 1, i + 1)); }}
              disabled={lightboxIdx === images.length - 1} aria-label="Next image"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-[#00CED1] disabled:opacity-20 p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00CED1] rounded">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
