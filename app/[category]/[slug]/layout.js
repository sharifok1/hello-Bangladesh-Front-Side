export async function generateMetadata({ params }) {
  const { slug } = (await params);
  
  try {
    const res = await fetch(`https://dev.hellobd.news/api/frontend/post/${slug}`, {
      cache: 'no-store', // Disable Next.js data cache (responses >2MB)
      headers: {
        'Cache-Control': 'public, max-age=300, stale-while-revalidate=600'
      }
    });
    
    if (!res.ok) throw new Error('Failed to fetch');
    
    const data = await res.json();
    const post = data?.post;
    
    if (!post) throw new Error('Post not found');
    
    let image = post?.media?.[0]?.original_url || post?.feature_image_link || '';
    if (image) {
      image = image.replace(/([^:])(\/\/+)/g, '$1/');
      if (image.startsWith('/storage')) {
        image = `https://dev.hellobd.news${image}`;
      }
    }
    
    const title = post.title || 'HelloBD সংবাদ';
    const description = post.excerpt || (post.content ? String(post.content).slice(0, 160) : '');
    
    return {
      title: `${title} - HelloBD`,
      description,
      openGraph: {
        title,
        description,
        type: 'article',
        images: image ? [{ url: image, width: 1200, height: 630 }] : [],
        siteName: 'HelloBD',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: image ? [image] : [],
      },
    };
  } catch (error) {
    return {
      title: 'HelloBD সংবাদ',
      description: 'বাংলাদেশের প্রধান সংবাদ পোর্টাল',
    };
  }
}

export default function PostLayout({ children }) {
  return children;
}
