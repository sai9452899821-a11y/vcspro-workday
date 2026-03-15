// src/pages/BlogPostPage.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PortableText } from '@portabletext/react';
import { client, BLOG_POST_QUERY, imageUrl } from '../lib/sanity';

const CAT_LABELS = {
  workday:     '🏢 Workday Strategy',
  engineering: '💻 Engineering & AI',
  industry:    '📊 Industry Trends',
  casestudy:   '🚀 Case Studies',
};

function formatDate(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

const CALLOUT_STYLES = {
  info:    'border-blue-400 bg-blue-500/10 text-blue-300',
  tip:     'border-cyan-400 bg-cyan-500/10 text-cyan-300',
  warning: 'border-amber-400 bg-amber-500/10 text-amber-300',
  success: 'border-green-400 bg-green-500/10 text-green-300',
};
const CALLOUT_ICONS = { info: 'ℹ️', tip: '💡', warning: '⚠️', success: '✅' };

// ── Inline image renderer (handles both asset and externalUrl) ──
function BlockImage({ value }) {
  let src = null;

  // Uploaded asset
  if (value?.asset) {
    src = value.asset.url || imageUrl(value.asset, { width: 900, height: 500 });
  }
  // External URL
  if (!src && value?.externalUrl) {
    src = value.externalUrl;
  }

  if (!src) return null;

  return (
    <figure className="my-8">
      <img
        src={src}
        alt={value?.alt || value?.externalAlt || ''}
        className="w-full rounded-2xl shadow-lg object-cover"
        loading="lazy"
      />
      {value?.caption && (
        <figcaption className="mt-2 text-sm text-center" style={{ color: 'var(--text-muted)' }}>
          {value.caption}
        </figcaption>
      )}
    </figure>
  );
}

// ── Portable Text components ───────────────────────────────────
const ptComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="font-display text-4xl mt-12 mb-5 leading-tight" style={{ color: 'var(--text-primary)' }}>{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-display text-3xl mt-10 mb-4 leading-tight pl-4 border-l-4 border-violet-500" style={{ color: 'var(--text-primary)' }}>{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display text-2xl font-bold mt-8 mb-3" style={{ color: 'var(--text-primary)' }}>{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-display text-xl font-bold mt-6 mb-2" style={{ color: 'var(--text-primary)' }}>{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="text-lg leading-relaxed my-4" style={{ color: 'var(--text-secondary)' }}>{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-violet-500 px-6 py-4 my-6 rounded-r-xl"
        style={{ background: 'var(--bg-surface2)' }}>
        <p className="text-lg font-medium italic leading-relaxed gradient-text">{children}</p>
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => <ul className="my-5 space-y-2 pl-2">{children}</ul>,
    number: ({ children }) => <ol className="my-5 space-y-2 pl-6 list-decimal">{children}</ol>,
  },

  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-3 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        <span className="mt-2 w-2 h-2 rounded-full flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))' }} />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => (
      <li className="text-base leading-relaxed pl-1" style={{ color: 'var(--text-secondary)' }}>{children}</li>
    ),
  },

  marks: {
    strong: ({ children }) => (
      <strong className="font-bold" style={{ color: 'var(--text-primary)' }}>{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic" style={{ color: 'var(--text-muted)' }}>{children}</em>
    ),
    underline: ({ children }) => (
      <span className="underline decoration-violet-500 decoration-2 underline-offset-2">{children}</span>
    ),
    code: ({ children }) => (
      <code className="font-mono text-sm px-2 py-0.5 rounded-md"
        style={{ background: 'var(--bg-surface2)', color: 'var(--gradient-start)' }}>
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const href = value?.href || '#';
      const ext  = href.startsWith('http');
      return (
        <a href={href}
          target={ext ? '_blank' : undefined}
          rel={ext ? 'noopener noreferrer' : undefined}
          className="font-semibold underline underline-offset-2 gradient-text hover:opacity-80 transition-opacity">
          {children}
        </a>
      );
    },
  },

  types: {
    // Callout box
    callout: ({ value }) => {
      const s = CALLOUT_STYLES[value.type] || CALLOUT_STYLES.info;
      return (
        <div className={`border-l-4 p-5 my-6 rounded-r-xl ${s}`}>
          <p className="font-bold text-sm uppercase tracking-wide mb-2">
            {CALLOUT_ICONS[value.type]} {value.type}
          </p>
          <p className="text-base leading-relaxed">{value.text}</p>
        </div>
      );
    },

    // Code block
    codeBlock: ({ value }) => (
      <div className="my-8 rounded-2xl overflow-hidden border"
        style={{ borderColor: 'var(--border)' }}>
        <div className="px-4 py-2.5 flex items-center justify-between"
          style={{ background: '#0d1117' }}>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex items-center gap-3">
            {value.filename && (
              <span className="text-gray-400 text-xs font-mono">{value.filename}</span>
            )}
            {value.language && (
              <span className="gradient-text text-xs font-mono uppercase tracking-wider">
                {value.language}
              </span>
            )}
          </div>
        </div>
        <pre className="p-6 overflow-x-auto text-sm leading-relaxed font-mono"
          style={{ background: '#0d1117', color: '#e6edf3' }}>
          <code>{value.code}</code>
        </pre>
      </div>
    ),

    // Inline image — uses asset URL or external URL
    customImage: ({ value }) => <BlockImage value={value} />,

    // Standard image block
    image: ({ value }) => <BlockImage value={value} />,
  },
};

// ── Page component ─────────────────────────────────────────────
export function BlogPostPage() {
  const { slug }                = useParams();
  const [post, setPost]         = useState(null);
  const [loading, setLoading]   = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    client.fetch(BLOG_POST_QUERY, { slug })
      .then(data => {
        if (!data) setNotFound(true);
        else setPost(data);
        setLoading(false);
      })
      .catch(() => { setNotFound(true); setLoading(false); });
  }, [slug]);

  useEffect(() => {
    if (post) document.title = `${post.seo?.metaTitle || post.title} | VCS Pro`;
  }, [post]);

  if (loading) {
    return (
      <main id="main-content" className="min-h-[60vh] flex items-center justify-center"
        style={{ background: 'var(--bg-page)' }}>
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-t-violet-500 rounded-full animate-spin mx-auto mb-3"
            style={{ borderColor: 'var(--border)' }} />
          <p style={{ color: 'var(--text-muted)' }} className="text-sm">Loading…</p>
        </div>
      </main>
    );
  }

  if (notFound) {
    return (
      <main id="main-content" className="min-h-[60vh] flex items-center justify-center text-center px-4"
        style={{ background: 'var(--bg-page)' }}>
        <div>
          <p className="text-5xl mb-4">📭</p>
          <h1 className="font-display text-2xl mb-2" style={{ color: 'var(--text-primary)' }}>Post not found</h1>
          <a href="/blog" className="gradient-text font-bold hover:opacity-80">← Back to Blog</a>
        </div>
      </main>
    );
  }

  // Get cover image src
  let coverSrc = null;
  if (post.coverImage?.asset) {
    coverSrc = post.coverImage.asset.url || imageUrl(post.coverImage.asset, { width: 1200, height: 600 });
  } else if (post.coverImage?.externalUrl) {
    coverSrc = post.coverImage.externalUrl;
  }

  return (
    <main id="main-content" style={{ background: 'var(--bg-page)' }}>

      {/* Header */}
      <div className="pt-16 pb-28 relative overflow-hidden"
        style={{ background: 'var(--bg-surface)' }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{ backgroundImage: 'linear-gradient(rgba(168,85,247,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(168,85,247,.5) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <a href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold mb-8 transition-colors hover:opacity-80"
            style={{ color: 'var(--text-muted)' }}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </a>

          {post.category && (
            <p className="text-xs font-black uppercase tracking-widest gradient-text mb-4">
              {CAT_LABELS[post.category] || post.category}
            </p>
          )}

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6"
            style={{ color: 'var(--text-primary)' }}>
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-lg leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
              {post.excerpt}
            </p>
          )}

          <div className="flex items-center gap-4 flex-wrap">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm text-white"
              style={{ background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))' }}>
              {post.author?.name?.charAt(0) || 'V'}
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                {post.author?.name || 'VCS Pro Team'}
              </p>
              {post.author?.role && (
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{post.author.role}</p>
              )}
            </div>
            {post.publishedAt && (
              <>
                <div className="h-4 w-px" style={{ background: 'var(--border)' }} />
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{formatDate(post.publishedAt)}</p>
              </>
            )}
            {post.readTime && (
              <>
                <div className="h-4 w-px" style={{ background: 'var(--border)' }} />
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{post.readTime} min read</p>
              </>
            )}
          </div>

          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full text-xs"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Article body */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 pb-24">
        <div className="rounded-2xl shadow-xl p-8 sm:p-12 mb-12"
          style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>

          {/* Cover image if present */}
          {coverSrc && (
            <figure className="mb-10 -mx-8 sm:-mx-12 -mt-8 sm:-mt-12">
              <img src={coverSrc} alt={post.title}
                className="w-full rounded-t-2xl object-cover"
                style={{ maxHeight: '400px' }}
                loading="eager" />
            </figure>
          )}

          {post.body?.length > 0 ? (
            <PortableText value={post.body} components={ptComponents} />
          ) : (
            <p className="text-center py-12" style={{ color: 'var(--text-muted)' }}>
              No content yet.
            </p>
          )}
        </div>

        {/* CTA */}
        <div className="rounded-3xl p-10 text-center"
          style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(8,145,178,0.10))', border: '1px solid var(--border)' }}>
          <h2 className="font-display text-2xl mb-3" style={{ color: 'var(--text-primary)' }}>
            Put this into practice.
          </h2>
          <p className="mb-7" style={{ color: 'var(--text-muted)' }}>
            Talk to a VCS Pro Workday architect about your specific challenge.
          </p>
          <a href="/contact"
            className="btn-gradient inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold text-white">
            Book a Discovery Call
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </article>
    </main>
  );
}

export default BlogPostPage;
