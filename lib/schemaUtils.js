// Schema markup utilities for SEO

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://hellobd.news';
const LOGO_URL = `${BASE_URL}/favicon.ico`;

/**
 * Generate Organization Schema for the website
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsMediaOrganization',
    name: 'HelloBD News',
    alternateName: 'হ্যালোবিডি নিউজ',
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      url: LOGO_URL,
      width: 256,
      height: 256
    },
    description: 'বাংলাদেশের প্রধান সংবাদ পোর্টাল',
    sameAs: [
      'https://www.facebook.com/hellobangladesh.portal',
      'https://www.youtube.com/@HelloBangladesh.portal',
      'https://www.instagram.com/hellobangladesh.portal'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['Bengali', 'English']
    }
  };
}

/**
 * Generate WebSite Schema with search functionality
 */
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'HelloBD News',
    alternateName: 'হ্যালোবিডি নিউজ',
    url: BASE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    },
    inLanguage: 'bn-BD'
  };
}

/**
 * Generate NewsArticle Schema for article pages
 */
export function generateArticleSchema(post) {
  if (!post) return null;

  const imageUrl = post?.media?.[0]?.original_url?.trim() || 
                   post?.feature_image_link?.trim() || 
                   LOGO_URL;

  const cleanImageUrl = imageUrl.startsWith('/storage') 
    ? `https://dev.hellobd.news${imageUrl}` 
    : imageUrl.replace(/([^:])(\/\/+)/g, '$1/');

  // Generate proper description (120-160 characters)
  let description = post.excerpt || '';
  if (!description && post.content) {
    description = String(post.content).replace(/<[^>]*>/g, '').slice(0, 160);
  }
  if (description.length < 120 && post.title) {
    description = `${post.title} - ${description}`;
  }
  if (description.length > 160) {
    description = description.slice(0, 157) + '...';
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    description: description,
    image: {
      '@type': 'ImageObject',
      url: cleanImageUrl,
      width: 1200,
      height: 630
    },
    datePublished: post.published_at || post.created_at,
    dateModified: post.updated_at || post.published_at || post.created_at,
    author: {
      '@type': 'Person',
      name: post?.reporter?.desk_name || 'HelloBD Desk',
      url: post?.reporter?.slug ? `${BASE_URL}/reporter/${post.reporter.slug}` : BASE_URL
    },
    publisher: {
      '@type': 'Organization',
      name: 'HelloBD News',
      logo: {
        '@type': 'ImageObject',
        url: LOGO_URL,
        width: 256,
        height: 256
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/${post?.categories?.[0]?.slug || 'news'}/${post.slug}`
    },
    articleSection: post?.categories?.[0]?.name_bn || post?.categories?.[0]?.name || 'সংবাদ',
    inLanguage: 'bn-BD',
    ...(post?.categories && {
      keywords: post.categories.map(cat => cat.name_bn || cat.name).join(', ')
    })
  };
}

/**
 * Generate BreadcrumbList Schema
 */
export function generateBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url ? `${BASE_URL}${item.url}` : undefined
    }))
  };
}

/**
 * Generate ItemList Schema for article listings
 */
export function generateItemListSchema(posts, listName = 'Latest News') {
  if (!posts || posts.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listName,
    itemListElement: posts.slice(0, 10).map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${BASE_URL}/${post?.categories?.[0]?.slug || 'news'}/${post.slug}`,
      name: post.title
    }))
  };
}


/**
 * Generate optimized meta title (50-60 characters)
 */
export function generateMetaTitle(title, siteName = 'HelloBD News') {
  if (!title) return siteName;
  
  const maxLength = 60;
  const separator = ' - ';
  const availableLength = maxLength - siteName.length - separator.length;
  
  if (title.length + separator.length + siteName.length <= maxLength) {
    return `${title}${separator}${siteName}`;
  }
  
  // Truncate title if too long
  const truncatedTitle = title.slice(0, availableLength - 3) + '...';
  return `${truncatedTitle}${separator}${siteName}`;
}

/**
 * Generate optimized meta description (120-160 characters)
 */
export function generateMetaDescription(excerpt, content, title) {
  const minLength = 120;
  const maxLength = 160;
  
  let description = excerpt || '';
  
  // If excerpt is too short, add content
  if (description.length < minLength && content) {
    const cleanContent = String(content).replace(/<[^>]*>/g, '').trim();
    description = description ? `${description} ${cleanContent}` : cleanContent;
  }
  
  // If still too short, add title
  if (description.length < minLength && title) {
    description = `${title} - ${description}`;
  }
  
  // Truncate if too long
  if (description.length > maxLength) {
    description = description.slice(0, maxLength - 3) + '...';
  }
  
  return description;
}


/**
 * Generate LocalBusiness schema for contact page
 */
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Akij Broadcast Media Ltd.',
    alternateName: 'আকিজ ব্রডকাস্ট মিডিয়া লি.',
    description: 'HelloBD News - বাংলাদেশের প্রধান সংবাদ পোর্টাল',
    url: BASE_URL,
    telephone: '+8801332500880',
    email: 'ad@hellobd.news',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Akij House, 198 Bir Uttam Mir Shawkat Sarak (Gulshan Link Road), Tejgaon',
      addressLocality: 'Dhaka',
      postalCode: '1208',
      addressCountry: 'BD'
    },
    sameAs: [
      'https://www.facebook.com/hellobangladesh.portal',
      'https://www.youtube.com/@HelloBangladesh.portal',
      'https://www.instagram.com/hellobangladesh.portal'
    ],
    logo: LOGO_URL,
    image: LOGO_URL
  };
}

/**
 * Generate Person schema for reporter/author pages
 */
export function generatePersonSchema(reporter) {
  if (!reporter) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: reporter.name || reporter.desk_name,
    ...(reporter.photo && { image: reporter.photo }),
    ...(reporter.bio && { description: reporter.bio }),
    ...(reporter.user_details?.email && { email: reporter.user_details.email }),
    jobTitle: reporter.designation || 'Reporter',
    worksFor: {
      '@type': 'Organization',
      name: 'HelloBD News'
    },
    ...(reporter.social_media && {
      sameAs: [
        reporter.social_media.facebook,
        reporter.social_media.twitter
      ].filter(Boolean)
    }),
    url: `${BASE_URL}/reporter/${reporter.slug || reporter.id}`
  };
}
