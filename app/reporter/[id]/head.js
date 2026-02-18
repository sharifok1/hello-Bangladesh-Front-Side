import { headers } from 'next/headers';

function humanizeId(id) {
  if (!id) return '';
  return decodeURIComponent(String(id)).replace(/[-_]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

export default async function Head({ params }) {
  const { id } = params || {};
  const host = headers().get('x-forwarded-host') || headers().get('host');
  const proto = headers().get('x-forwarded-proto') || 'http';
  const origin = host ? `${proto}://${host}` : 'http://localhost:3000';

  try {
    // const res = await fetch(`${origin}/api/frontend/reporter/${id}`);
    if (!res.ok) throw new Error('fetch failed');
    const data = await res.json();
    const reporter = data?.reporter || {};
    const title = reporter.name || humanizeId(id) || 'প্রতিবেদক';
    const description = reporter.bio || `প্রতিবেদকের পোস্টসমূহ - ${title}`;
    const image = reporter.photo || '';

    return (
      <>
        <title>{title} - HelloBD</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {image && <meta property="og:image" content={image} />}
      </>
    );
  } catch (err) {
    const fallback = humanizeId(id) || 'প্রতিবেদক';
    return (
      <>
        <title>{fallback} - HelloBD</title>
        <meta name="description" content="প্রতিবেদক পেজ" />
      </>
    );
  }
}
