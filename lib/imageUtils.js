// Utility function to get post image URL
export const getPostImage = (post) => {
  let imageUrl = post?.media?.[0]?.original_url?.trim() || post?.feature_image_link?.trim();
  
  if (!imageUrl) return null;
  
  // Fix double slashes in path (but preserve protocol://)
  imageUrl = imageUrl.replace(/([^:])(\/\/+)/g, '$1/');
  
  // If it's a relative URL starting with /storage, make it absolute
  if (imageUrl.startsWith('/storage')) {
    imageUrl = `https://dev.hellobd.news${imageUrl}`;
  }
  
  // Debug log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[imageUtils] Processing image:', imageUrl);
  }
  
  // Only proxy external images that might have CORS issues
  // Images from dev.hellobd.news and cdn.hellobd.news don't need proxy
  if (imageUrl.includes('dev.hellobd.news') || imageUrl.includes('cdn.hellobd.news')) {
    return imageUrl;
  }
  
  // Proxy only external non-webp images (excluding our trusted domains)
  if (!imageUrl.endsWith('.webp') && !imageUrl.includes('dev.hellobd.news') && !imageUrl.includes('cdn.hellobd.news')) {
    return `/api/image-proxy?url=${encodeURIComponent(imageUrl)}`;
  }
  
  return imageUrl;
};

// Helper to check if image should be unoptimized (for troubleshooting)
export const shouldUnoptimizeImage = (imageUrl) => {
  // In production, if CDN images fail, you can enable this
  // return imageUrl?.includes('cdn.hellobd.news');
  return false;
};

// Alias for backward compatibility - all contexts use the same function
export const getOptimizedImage = (post, context = 'default') => {
  return getPostImage(post);
};
