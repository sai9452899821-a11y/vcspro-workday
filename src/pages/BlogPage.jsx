// src/pages/BlogPage.jsx
import { useEffect, useState } from 'react';
import { client } from '../lib/sanity';

const QUERY = `*[_type == "blogPost"] | order(featured desc, publishedAt desc){
  _id, title, "slug": slug.current,
  category, excerpt, publishedAt, readTime, featured, tags,
  author{ name, role }
}`;

const CATS = [
  { value: 'all',         label: 'All'               },
  { value: 'workday',     label: 'Workday Strategy'  },
  { value: 'engineering', label: 'Technical'         },
  { value: 'industry',    label: 'Industry Trends'   },
  { value: 'casestudy',   label: 'Case Studies'      },
];

const CAT_COLORS = {
  workday:     'text-violet-400 bg-violet-500/10 border-violet-500/20',
  engineering: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  industry:    'text-amber-400 bg-amber-500/10 border-amber-500/20',
  casestudy:   'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
};

const UNSPLASH = {
  workday:     'photo-1551288049-bebda4e38f71',
  engineering: 'photo-1460925895917-afdab827c52f',
  industry:    'photo-1504384308090-c894fdcc538d',
  casestudy:   'photo-1517245386807-bb43f82c33c4',
};

function fmt(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function BlogPage() {
  const [posts,    setPosts]    = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [activecat, setActive]  = useState('all');

  useEffect(() => {
    document.title = 'VCS Pro Insights | Workday Blog';
    client.fetch(QUERY).then(d => { setPosts(d || []); setLoading(false); });
  }, []);

  const filtered = activecat === 'all' ? posts : posts.filter(p => p.category === activecat);

  return (
    <main id="main-content">
      {/* Hero */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(124,58,237,0.12), transparent)' }} />
        <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center relative z-10">
          <p className="text-violet-400 text-xs font-semibold uppercase tracking-widest mb-5">VCS Pro Insights</p>
          <h1 className="font-display text-5xl sm:text-6xl text-white mb-5">
            From the <span className="gradient-text-animated italic">field.</span>
          </h1>
          <p className="text-white/50 text-xl max-w-2xl mx-auto">
            Expert perspectives on Workday strategy, integration architecture, and enterprise operations — written by the architects who build it every day.
          </p>
        </div>
      </section>

      {/* Filter */}
      <div className="sticky top-[72px] z-20 bg-[#060614]/95 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-4">
            {CATS.map(c => (
              <button key={c.value} onClick={() => setActive(c.value)}
                className={`flex-none px-4 py-2 rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500
                  ${activecat === c.value
                    ? 'bg-violet-500/20 text-white border border-violet-500/40'
                    : 'text-white/40 hover:text-white/70 border border-transparent'
                  }`}>
                {c.label}
                {c.value !== 'all' && (
                  <span className="ml-1.5 text-[10px] opacity-50">({posts.filter(p => p.category === c.value).length})</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Posts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="glass rounded-2xl overflow-hidden animate-pulse">
                  <div className="h-44 bg-white/5" />
                  <div className="p-6 space-y-3">
                    <div className="h-3 bg-white/5 rounded w-1/3" />
                    <div className="h-5 bg-white/5 rounded w-4/5" />
                    <div className="h-3 bg-white/5 rounded" />
                    <div className="h-3 bg-white/5 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">📭</p>
              <p className="text-white/40">No articles in this category yet.</p>
              <button onClick={() => setActive('all')} className="mt-4 text-violet-400 font-semibold hover:underline text-sm">
                View all
              </button>
            </div>
          ) : (
            <>
              {/* Featured post */}
              {filtered[0]?.featured && (
                <a href={`/blog/${filtered[0].slug}`}
                  className="glass glass-hover rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 mb-8 group">
                  <div className="overflow-hidden">
                    <img
                      src={`https://images.unsplash.com/${UNSPLASH[filtered[0].category] || 'photo-1551288049-bebda4e38f71'}?auto=format&fit=crop&w=800&q=80`}
                      alt={filtered[0].title}
                      className="w-full h-64 lg:h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
                    />
                  </div>
                  <div className="p-8 lg:p-10 flex flex-col gap-4 justify-center">
                    <div className="flex items-center gap-3">
                      <span className="gradient-text text-xs font-bold uppercase tracking-widest">Featured</span>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${CAT_COLORS[filtered[0].category] || ''}`}>
                        {filtered[0].category}
                      </span>
                    </div>
                    <h2 className="font-display text-3xl text-white group-hover:gradient-text transition-all leading-tight">
                      {filtered[0].title}
                    </h2>
                    <p className="text-white/45 leading-relaxed line-clamp-3">{filtered[0].excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-white/30">
                      <span>{filtered[0].author?.name}</span>
                      <span>·</span>
                      <span>{fmt(filtered[0].publishedAt)}</span>
                      {filtered[0].readTime && <><span>·</span><span>{filtered[0].readTime} min</span></>}
                    </div>
                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-violet-400 group-hover:gap-4 transition-all">
                      Read article
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </a>
              )}

              {/* Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {(filtered[0]?.featured ? filtered.slice(1) : filtered).map((post, i) => (
                  <a key={post._id} href={`/blog/${post.slug}`}
                    className="glass glass-hover rounded-2xl overflow-hidden flex flex-col group">
                    <div className="overflow-hidden">
                      <img
                        src={`https://images.unsplash.com/${UNSPLASH[post.category] || 'photo-1551288049-bebda4e38f71'}?auto=format&fit=crop&w=640&q=75`}
                        alt={post.title}
                        className="w-full h-44 object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
                      />
                    </div>
                    <div className="p-6 flex flex-col gap-3 flex-1">
                      <span className={`self-start px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${CAT_COLORS[post.category] || 'text-white/40 bg-white/5 border-white/10'}`}>
                        {post.category}
                      </span>
                      <h3 className="font-display text-lg text-white leading-snug group-hover:gradient-text transition-all">
                        {post.title}
                      </h3>
                      <p className="text-white/35 text-sm leading-relaxed flex-1 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center gap-3 text-xs text-white/25 pt-2 border-t border-white/5">
                        <span>{fmt(post.publishedAt)}</span>
                        {post.readTime && <><span>·</span><span>{post.readTime} min read</span></>}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}

export default BlogPage;
