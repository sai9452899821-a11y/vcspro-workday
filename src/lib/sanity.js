import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset:   import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

const builder = imageUrlBuilder(client);
export const urlForImage = source => builder.image(source);

export const BLOG_POST_QUERY = `*[_type == "blogPost" && slug.current == $slug][0]{
  _id, title, "slug": slug.current,
  category, excerpt, publishedAt, readTime, featured, tags,
  author{ name, role },
  seo{ metaTitle, metaDescription },
  body[]{ _type, _key, style, listItem, level,
    markDefs[]{ _key, _type, href, blank },
    children[]{ _key, _type, text, marks },
    type, text, language, code, filename,
    imageType, externalUrl, externalAlt, asset{ _ref, _type }
  }
}`;
