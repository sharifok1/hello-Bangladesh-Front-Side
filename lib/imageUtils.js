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
  
  // Only proxy external images that might have CORS issues
  // Images from dev.hellobd.news don't need proxy
  if (imageUrl.includes('dev.hellobd.news')) {
    return imageUrl;
  }
  
  // Proxy only external non-webp images
  if (!imageUrl.endsWith('.webp') && !imageUrl.includes('dev.hellobd.news')) {
    return `/api/image-proxy?url=${encodeURIComponent(imageUrl)}`;
  }
  
  return imageUrl;
};

// Alias for backward compatibility - all contexts use the same function
export const getOptimizedImage = (post, context = 'default') => {
  return getPostImage(post);
};
