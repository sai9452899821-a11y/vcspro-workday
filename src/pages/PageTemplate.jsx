// src/pages/PageTemplate.jsx
// Dynamic page renderer — fetches any page by URL slug from Sanity

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { client, PAGE_QUERY } from '../lib/sanity';
import { PageBuilder } from '../components/PageBuilder';

export function PageTemplate() {
  const { slug } = useParams();
  const [page, setPage]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    client.fetch(PAGE_QUERY, { slug })
      .then(data => {
        if (!data) { setNotFound(true); } else { setPage(data); }
        setLoading(false);
      })
      .catch(() => { setNotFound(true); setLoading(false); });
  }, [slug]);

  // Update document <title>
  useEffect(() => {
    if (page?.seo?.metaTitle) {
      document.title = `${page.seo.metaTitle} | VCS Pro`;
    } else if (page?.title) {
      document.title = `${page.title} | VCS Pro`;
    }
  }, [page]);

  if (loading) {
    return (
      <main id="main-content" className="min-h-[60vh] flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#00CED1]/20 border-t-[#00CED1] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400 text-sm">Loading page…</p>
        </div>
      </main>
    );
  }

  if (notFound) return <NotFoundPage />;

  return (
    <>
      {/* Inject SEO meta tags */}
      {page?.seo?.metaDescription && (
        <meta name="description" content={page.seo.metaDescription} />
      )}
      <PageBuilder blocks={page?.pageBuilder} pillarTheme={page?.pillarTheme} />
    </>
  );
}

// ── 404 Page ───────────────────────────────────────────────────
export function NotFoundPage() {
  useEffect(() => { document.title = '404 — Page Not Found | VCS Pro'; }, []);

  return (
    <main id="main-content" className="min-h-[80vh] bg-[#001a33] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Decorative number */}
        <div className="relative inline-block mb-8">
          <span
            className="text-[10rem] font-black leading-none select-none"
            style={{
              background: 'linear-gradient(135deg, #00CED1 0%, #003366 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            404
          </span>
          <div className="absolute inset-0 blur-3xl opacity-20 bg-[#00CED1] rounded-full" />
        </div>

        <h1 className="text-3xl font-black text-white mb-4">Page Not Found</h1>
        <p className="text-gray-400 leading-relaxed mb-10">
          The page you're looking for doesn't exist or may have moved. Let's get you back on track.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <a href="/"
            className="px-8 py-4 rounded-xl bg-[#00CED1] text-[#003366] font-black hover:bg-[#00b8b8] transition-all shadow-xl shadow-[#00CED1]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
            Back to Home
          </a>
          <a href="/contact"
            className="px-8 py-4 rounded-xl border-2 border-white/20 text-white font-bold hover:border-[#00CED1]/50 hover:text-[#00CED1] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00CED1]">
            Contact Support
          </a>
        </div>
      </div>
    </main>
  );
}

export default PageTemplate;
