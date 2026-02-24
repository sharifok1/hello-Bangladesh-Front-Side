'use client';

import { useEffect } from 'react';
import Head from 'next/head';

export default function SEOHead({ 
  title, 
  description, 
  image, 
  url, 
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  schema 
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hellobd.news';
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  const fullImage = image?.startsWith('http') ? image : `${baseUrl}${image || '/assets/hellobd_logo.png'}`;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Update document title
    if (title) {
      document.title = title.includes('HelloBD') ? title : `${title} | HelloBD News`;
    }

    // Update meta tags
    const setMeta = (name, value, prop = false) => {
      if (!value) return;
      const selector = prop ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        if (prop) el.setAttribute('property', name);
        else el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', value);
    };

    setMeta('description', description);
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:type', type, true);
    setMeta('og:url', fullUrl, true);
    setMeta('og:image', fullImage, true);
    setMeta('og:site_name', 'HelloBD News', true);
    setMeta('og:locale', 'bn_BD', true);
    
    if (publishedTime) setMeta('article:published_time', publishedTime, true);
    if (modifiedTime) setMeta('article:modified_time', modifiedTime, true);
    if (author) setMeta('article:author', author, true);

    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', fullImage);

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullUrl);
  }, [title, description, fullImage, fullUrl, type, publishedTime, modifiedTime, author]);

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
    </>
  );
}
