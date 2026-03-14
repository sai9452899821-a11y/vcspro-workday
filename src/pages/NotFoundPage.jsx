// src/pages/NotFoundPage.jsx
import { useEffect } from 'react';

export function NotFoundPage() {
  useEffect(() => { document.title = '404 — Not Found | VCS Pro'; }, []);
  return (
    <main id="main-content" className="min-h-screen flex items-center justify-center px-4 text-center">
      <div>
        <div
          className="font-display text-[12rem] leading-none gradient-text select-none mb-4"
          style={{ opacity: 0.15 }}
        >404</div>
        <h1 className="font-display text-3xl text-white mb-3 -mt-8 relative z-10">Page not found</h1>
        <p className="text-white/40 mb-8">The page you're looking for doesn't exist.</p>
        <a href="/" className="btn-gradient inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
          Back to Home
        </a>
      </div>
    </main>
  );
}
export default NotFoundPage;
