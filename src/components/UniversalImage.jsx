// src/components/UniversalImage.jsx
// Universal image renderer — handles Sanity assets, external URLs, and galleries

import { urlForImage } from '../lib/sanity';

/**
 * UniversalImage
 * @param {object} props.image     - Sanity customImage object
 * @param {string} props.className - Additional Tailwind classes
 * @param {number} props.width     - Target width for Sanity CDN transform
 * @param {number} props.height    - Target height
 * @param {boolean} props.priority - Eager-load (above-the-fold images)
 */
export function UniversalImage({
  image,
  className = '',
  width = 800,
  height = 600,
  priority = false,
}) {
  if (!image) return null;

  const fit    = image.objectFit || 'cover';
  const loading = priority ? 'eager' : 'lazy';

  // ── Sanity Asset ────────────────────────────────────────────────────────
  if (image.imageType === 'asset' || (!image.imageType && image.asset)) {
    if (!image.asset) return null;

    const src = urlForImage(image.asset)
      .width(width)
      .height(height)
      .fit('crop')
      .auto('format')
      .url();

    return (
      <figure className="contents">
        <img
          src={src}
          alt={image.alt || ''}
          width={width}
          height={height}
          loading={loading}
          decoding="async"
          className={`${className}`}
          style={{ objectFit: fit, width: '100%', height: '100%' }}
        />
        {image.caption && (
          <figcaption className="mt-2 text-sm text-center text-gray-500 italic">
            {image.caption}
          </figcaption>
        )}
      </figure>
    );
  }

  // ── External URL ────────────────────────────────────────────────────────
  if (image.imageType === 'url' && image.externalUrl) {
    return (
      <figure className="contents">
        <img
          src={image.externalUrl}
          alt={image.externalAlt || ''}
          width={width}
          height={height}
          loading={loading}
          decoding="async"
          referrerPolicy="no-referrer"
          className={`${className}`}
          style={{ objectFit: fit, width: '100%', height: '100%' }}
        />
      </figure>
    );
  }

  // ── Gallery ─────────────────────────────────────────────────────────────
  if (image.imageType === 'gallery' && image.gallery?.length) {
    return (
      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: `repeat(${Math.min(image.gallery.length, 3)}, 1fr)`,
        }}
      >
        {image.gallery.map((img, i) => {
          if (!img?.asset) return null;
          const src = urlForImage(img.asset).width(400).height(300).auto('format').url();
          return (
            <figure key={i} className="overflow-hidden rounded-lg">
              <img
                src={src}
                alt={img.alt || ''}
                loading="lazy"
                decoding="async"
                className={`w-full h-48 ${className}`}
                style={{ objectFit: fit }}
              />
              {img.caption && (
                <figcaption className="mt-1 text-xs text-center text-gray-400">
                  {img.caption}
                </figcaption>
              )}
            </figure>
          );
        })}
      </div>
    );
  }

  return null;
}

export default UniversalImage;
