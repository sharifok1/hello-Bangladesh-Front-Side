// Utility function to generate post URL with category



export const getPostUrl = (post) => {
  const categorySlug = post?.categories?.[0]?.slug ;
  return `/${categorySlug}/${post.slug}`;
};


export const NEXT_PUBLIC_API_URL = "https://dev.hellobd.news";
export const BACKEND_URL = "https://dev.hellobd.news";