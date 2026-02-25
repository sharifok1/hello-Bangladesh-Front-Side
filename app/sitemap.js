import { NEXT_PUBLIC_API_URL } from '@/lib/urlUtils';

export default async function sitemap() {
  const baseUrl = 'https://hellobd.news';
  const API_URL = NEXT_PUBLIC_API_URL || 'https://dev.hellobd.news';

  try {
    // Fetch categories and posts from your API
    const [categoriesRes, postsRes] = await Promise.all([
      fetch(`${API_URL}/api/frontend/main-categories`, { 
        next: { revalidate: 3600 } // Cache for 1 hour
      }).catch(() => null),
      fetch(`${API_URL}/api/frontend/home`, { 
        next: { revalidate: 3600 } 
      }).catch(() => null),
    ]);

    const categories = categoriesRes ? await categoriesRes.json() : [];
    const postsData = postsRes ? await postsRes.json() : {};

    // Static pages
    const staticPages = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'hourly',
        priority: 1.0,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
      },
      {
        url: `${baseUrl}/privacy-policy`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.3,
      },
      {
        url: `${baseUrl}/terms-and-conditions`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.3,
      },
    ];

    // Category pages
    const categoryPages = Array.isArray(categories) 
      ? categories.map((category) => ({
          url: `${baseUrl}/category/${category.slug}`,
          lastModified: new Date(),
          changeFrequency: 'daily',
          priority: 0.8,
        }))
      : [];

    // Post pages - combine all post arrays
    const allPosts = [
      ...(postsData?.featured || []),
      ...(postsData?.top_post_news || []),
      ...(postsData?.popular || []),
      ...(postsData?.world_popular_news || []),
    ];

    // Remove duplicates by id
    const uniquePosts = Array.from(
      new Map(allPosts.map(post => [post?.id, post])).values()
    );

    const postPages = uniquePosts
      .filter(post => post?.slug && post?.categories?.[0]?.slug)
      .map((post) => ({
        url: `${baseUrl}/${post.categories[0].slug}/${post.slug}`,
        lastModified: post?.updated_at ? new Date(post.updated_at) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      }));

    return [...staticPages, ...categoryPages, ...postPages];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    // Return at least static pages if API fails
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'hourly',
        priority: 1.0,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
      },
      {
        url: `${baseUrl}/privacy-policy`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.3,
      },
      {
        url: `${baseUrl}/terms-and-conditions`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.3,
      },
    ];
  }
}
