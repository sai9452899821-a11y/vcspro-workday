// src/pages/BlogPostPage.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PortableText } from '@portabletext/react';
import { client } from '../lib/sanity';

const POST_QUERY = `*[_type == "blogPost" && slug.current == $slug][0]{
  _id, title, "slug": slug.current,
  category, excerpt, publishedAt, readTime, featured, tags,
  author{ name, role },
  seo{ metaTitle, metaDescription },
  body[]{
    _type, _key, style, listItem, level,
    markDefs[]{ _key, _type, href, blank },
    children[]{ _key, _type, text, marks },
    "type": type, "text": text,
    language, code, filename,
    imageType, externalUrl, externalAlt,
    asset{ _ref, _type }
  }
}`;

const CAT_LABELS = {
  workday:     '🏢 Workday Strategy',
  engineering: '💻 Engineering & AI',
  industry:    '📊 Industry Trends',
  casestudy:   '🚀 Case Studies',
};

function formatDate(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

// ── Callout box styles ────────────────────────────────────────
const CALLOUT_STYLES = {
  info:    { wrap: 'bg-blue-50 border-l-4 border-blue-400 rounded-r-xl',  icon: 'ℹ️', text: 'text-blue-900'  },
  tip:     { wrap: 'bg-teal-50 border-l-4 border-teal-400 rounded-r-xl',  icon: '💡', text: 'text-teal-900'  },
  warning: { wrap: 'bg-amber-50 border-l-4 border-amber-400 rounded-r-xl', icon: '⚠️', text: 'text-amber-900' },
  success: { wrap: 'bg-green-50 border-l-4 border-green-400 rounded-r-xl', icon: '✅', text: 'text-green-900' },
};

// ── Portable Text component map ───────────────────────────────
// This tells @portabletext/react how to render each block type,
// style, list type, and inline mark.
const portableTextComponents = {

  // ── Block styles (h1–h4, normal, blockquote) ───────────────
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-black text-[#003366] mt-12 mb-5 leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-black text-[#003366] mt-10 mb-4 leading-tight border-l-4 border-[#00CED1] pl-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-bold text-[#003366] mt-8 mb-3 leading-snug">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-bold text-[#003366] mt-6 mb-2">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-gray-700 leading-relaxed my-4 text-lg">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#00CED1] bg-[#003366]/5 px-6 py-4 my-6 rounded-r-xl">
        <p className="text-[#003366] font-medium italic text-lg leading-relaxed">
          {children}
        </p>
      </blockquote>
    ),
  },

  // ── List types ─────────────────────────────────────────────
  list: {
    bullet: ({ children }) => (
      <ul className="my-5 space-y-2 pl-2">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="my-5 space-y-2 pl-2 list-decimal list-inside">
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-3 text-gray-700 text-base leading-relaxed">
        <span className="mt-2 w-2 h-2 rounded-full bg-[#00CED1] flex-shrink-0" />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => (
      <li className="text-gray-700 text-base leading-relaxed pl-1">
        {children}
      </li>
    ),
  },

  // ── Inline marks (bold, italic, code, underline, links) ────
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-[#003366]">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-gray-600">{children}</em>
    ),
    underline: ({ children }) => (
      <span className="underline decoration-[#00CED1] decoration-2 underline-offset-2">
        {children}
      </span>
    ),
    code: ({ children }) => (
      <code className="bg-gray-100 text-[#003366] font-mono text-sm px-2 py-0.5 rounded-md border border-gray-200">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const href = value?.href || '#';
      const isExternal = href.startsWith('http');
      return (
        <a
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="text-[#00CED1] font-semibold underline decoration-[#00CED1]/40 hover:decoration-[#00CED1] underline-offset-2 transition-all"
        >
          {children}
        </a>
      );
    },
  },

  // ── Custom block types (callout, codeBlock, customImage) ───
  types: {
    // Callout box
    callout: ({ value }) => {
      const style = CALLOUT_STYLES[value.type] || CALLOUT_STYLES.info;
      return (
        <div className={`${style.wrap} p-5 my-6`}>
          <p className={`font-bold text-sm uppercase tracking-wide mb-2 ${style.text}`}>
            {style.icon} {value.type}
          </p>
          <p className={`text-base leading-relaxed ${style.text}`}>
            {value.text}
          </p>
        </div>
      );
    },

    // Code block with syntax highlighting colours
    codeBlock: ({ value }) => (
      <div className="my-8 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
        {/* Header bar */}
        <div className="bg-[#001a33] px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Traffic light dots */}
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex items-center gap-3">
            {value.filename && (
              <span className="text-gray-400 text-xs font-mono">{value.filename}</span>
            )}
            {value.language && (
              <span className="text-[#00CED1] text-xs font-mono uppercase tracking-wider">
                {value.language}
              </span>
            )}
          </div>
        </div>
        {/* Code content */}
        <pre className="bg-gray-950 text-gray-100 p-6 overflow-x-auto text-sm leading-relaxed font-mono">
          <code>{value.code}</code>
        </pre>
      </div>
    ),

    // Inline image inside body
    customImage: ({ value }) => {
      const src = value?.externalUrl || null;
      if (!src) return null;
      return (
        <figure className="my-8">
          <img
            src={src}
            alt={value.externalAlt || ''}
            className="w-full rounded-2xl shadow-lg"
            loading="lazy"
          />
        </figure>
      );
    },
  },
};

// ── Blog Post Page component ──────────────────────────────────
export function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost]           = useState(null);
  const [loading, setLoading]     = useState(true);
  const [notFound, setNotFound]   = useState(false);

  useEffect(() => {
    setLoading(true);
    client.fetch(POST_QUERY, { slug })
      .then(data => {
        if (!data) setNotFound(true);
        else setPost(data);
        setLoading(false);
      })
      .catch(() => { setNotFound(true); setLoading(false); });
  }, [slug]);

  useEffect(() => {
    if (post) {
      document.title = `${post.seo?.metaTitle || post.title} | VCS Pro`;
    }
  }, [post]);

  // ── Loading state ─────────────────────────────────────────
  if (loading) {
    return (
      <main id="main-content" className="min-h-[60vh] bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#00CED1]/20 border-t-[#00CED1] rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-400 text-sm">Loading article…</p>
        </div>
      </main>
    );
  }

  // ── 404 state ─────────────────────────────────────────────
  if (notFound) {
    return (
      <main id="main-content" className="min-h-[60vh] bg-white flex items-center justify-center text-center px-4">
        <div>
          <p className="text-5xl mb-4">📭</p>
          <h1 className="text-2xl font-black text-[#003366] mb-2">Post not found</h1>
          <a href="/blog" className="text-[#00CED1] font-bold hover:underline">← Back to Blog</a>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className="bg-white">

      {/* ── Article Header ─────────────────────────────────── */}
      <div className="bg-[#001a33] pt-16 pb-28 relative overflow-hidden">
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,206,209,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(0,206,209,.5) 1px,transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <a
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-[#00CED1] text-sm font-semibold mb-8 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </a>

          {/* Category tag */}
          {post.category && (
            <p className="text-xs font-black uppercase tracking-widest text-[#00CED1] mb-4">
              {CAT_LABELS[post.category] || post.category}
            </p>
          )}

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-6">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-gray-400 text-lg leading-relaxed mb-8">{post.excerpt}</p>
          )}

          {/* Author + meta */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="w-10 h-10 rounded-full bg-[#003366] border-2 border-[#00CED1]/30 flex items-center justify-center text-white font-black text-sm flex-shrink-0">
              {post.author?.name?.charAt(0) || 'V'}
            </div>
            <div>
              <p className="text-sm font-bold text-white">{post.author?.name || 'VCS Pro Team'}</p>
              {post.author?.role && (
                <p className="text-xs text-gray-400">{post.author.role}</p>
              )}
            </div>
            {post.publishedAt && (
              <>
                <div className="h-4 w-px bg-white/20" />
                <p className="text-xs text-gray-400">{formatDate(post.publishedAt)}</p>
              </>
            )}
            {post.readTime && (
              <>
                <div className="h-4 w-px bg-white/20" />
                <p className="text-xs text-gray-400">{post.readTime} min read</p>
              </>
            )}
          </div>

          {/* Tags */}
          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white/5 border border-white/10 text-gray-400 text-xs rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Article Body ────────────────────────────────────── */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        {/* White card that overlaps the dark header */}
        <div className="bg-white rounded-2xl shadow-xl shadow-black/10 p-8 sm:p-12 mb-16">
          {post.body?.length > 0 ? (
            <PortableText
              value={post.body}
              components={portableTextComponents}
            />
          ) : (
            <p className="text-gray-400 text-center py-12">No content yet.</p>
          )}
        </div>
      </article>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="bg-[#003366] rounded-3xl p-10 text-center">
          <h2 className="text-2xl font-black text-white mb-3">
            Put this into practice.
          </h2>
          <p className="text-gray-400 mb-7">
            Talk to a VCS Pro architect or engineer about your specific challenge.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#00CED1] text-[#003366] font-black rounded-xl hover:bg-[#00b8b8] transition-all shadow-xl shadow-[#00CED1]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Book a Discovery Call
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>

    </main>
  );
}

export default BlogPostPage;
