// Utility function to generate post URL with category
export const getPostUrl = (post) => {
  const categorySlug = post?.categories?.[0]?.slug || 'news';
  return `/${categorySlug}/${post.slug}`;
};
