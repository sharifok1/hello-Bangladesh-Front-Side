import { headers } from 'next/headers';

function humanizeSlug(slug) {
  if (!slug) return '';
  return decodeURIComponent(slug).replace(/[-_]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

export default async function Head({ params }) {
  const { slug } = params || {};
  const host = headers().get('x-forwarded-host') || headers().get('host');
  const proto = headers().get('x-forwarded-proto') || 'http';
  const origin = host ? `${proto}://${host}` : 'http://localhost:3000';

  try {
    const res = await fetch(`${origin}/api/frontend/category/${slug}`);
    if (!res.ok) throw new Error('fetch failed');
    const data = await res.json();
    const category = data?.category || {};
    const title = category.name_bn || category.name || humanizeSlug(slug);
    const description = category.description || `সর্বশেষ ${title} সংবাদ সমূহ`;

    return (
      <>
        <title>{title} - HelloBD</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </>
    );
  } catch (err) {
    const fallback = humanizeSlug(slug) || 'ক্যাটাগরি';
    return (
      <>
        <title>{fallback} - HelloBD</title>
        <meta name="description" content="ক্যাটাগরি পেজ" />
      </>
    );
  }
}
