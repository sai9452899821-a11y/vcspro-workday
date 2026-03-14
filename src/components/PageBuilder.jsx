// src/components/PageBuilder.jsx
import { Suspense } from 'react';
import {
  HeroBlock,
  ServiceGridBlock,
  AIAutomationBlock,
  TechMatrixBlock,
  ImageGalleryBlock,
} from './blocks/Blocks';

// ── Block Registry ─────────────────────────────────────────────
// To add a new block: import the component and add one line here.
const BLOCK_REGISTRY = {
  heroBlock:          HeroBlock,
  serviceGridBlock:   ServiceGridBlock,
  aiAutomationBlock:  AIAutomationBlock,
  techMatrixBlock:    TechMatrixBlock,
  imageGalleryBlock:  ImageGalleryBlock,
};

// ── Skeleton loader ────────────────────────────────────────────
function BlockSkeleton() {
  return (
    <div className="py-24 animate-pulse" aria-busy="true">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-8 bg-gray-200 rounded-lg w-1/3 mx-auto mb-6" />
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map(i => <div key={i} className="h-40 bg-gray-100 rounded-2xl" />)}
        </div>
      </div>
    </div>
  );
}

// ── Dev warning for unregistered block types ───────────────────
function UnknownBlock({ type }) {
  if (import.meta.env.PROD) return null;
  return (
    <section className="py-8 px-4 my-4 max-w-7xl mx-auto rounded-xl border-2 border-dashed border-amber-400 bg-amber-50">
      <p className="text-amber-700 font-mono text-sm">
        <strong>⚠️ Dev Warning:</strong> No renderer for block type{' '}
        <code className="bg-amber-100 px-2 py-0.5 rounded">"{type}"</code>.
        Add it to <code className="bg-amber-100 px-2 py-0.5 rounded">BLOCK_REGISTRY</code> in PageBuilder.jsx
      </p>
    </section>
  );
}

// ── Single block dispatcher ────────────────────────────────────
function Block({ block }) {
  const Component = BLOCK_REGISTRY[block._type];
  if (!Component) return <UnknownBlock type={block._type} />;
  return (
    <Suspense fallback={<BlockSkeleton />}>
      <Component block={block} />
    </Suspense>
  );
}

// ── Main export ────────────────────────────────────────────────
export function PageBuilder({ blocks, pillarTheme = 'global' }) {
  if (!blocks?.length) {
    if (import.meta.env.DEV) {
      return (
        <div className="py-24 text-center text-gray-400">
          <p className="text-sm">No blocks yet — add sections in Sanity Studio.</p>
        </div>
      );
    }
    return null;
  }

  return (
    <main id="main-content" aria-label="Page content" data-pillar={pillarTheme}>
      {blocks.map((block, i) => (
        <Block key={block._key || i} block={block} />
      ))}
    </main>
  );
}

export default PageBuilder;
