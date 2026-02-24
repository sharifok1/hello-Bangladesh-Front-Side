# Performance Optimization Guide - HelloBD News

## Current Issues (Score < 30)

### Critical Issues:
1. ❌ Client-side rendering on homepage ('use client')
2. ❌ Multiple blocking API calls on mount
3. ❌ Heavy Swiper library loaded immediately
4. ❌ No lazy loading for below-fold content
5. ❌ Image proxy adds latency
6. ❌ Multiple useEffect hooks running simultaneously

## Implemented Optimizations

### 1. Next.js Config ✅
- Increased image cache TTL to 3600s (1 hour)
- Enabled SWC minification
- Remove console logs in production
- Optimized compiler settings

### 2. Font Loading ✅
- Added font preload
- Added fallback fonts
- Optimized font display strategy

### 3. Image Optimization ✅
- Reduced proxy usage (only for external images)
- Direct loading for dev.hellobd.news images
- Proper image sizing and formats

## Recommended Next Steps

### High Priority (Will increase score by 20-30 points):

#### 1. Convert Homepage to Server Component
```javascript
// app/page.js - Remove 'use client' and fetch data server-side
export default async function HomePage() {
  const res = await fetch('https://dev.hellobd.news/api/frontend/home', {
    next: { revalidate: 60 } // Cache for 60 seconds
  });
  const data = await res.json();
  
  return <HomePageClient data={data} />;
}
```

#### 2. Lazy Load Heavy Components
```javascript
import dynamic from 'next/dynamic';

// Lazy load Swiper components
const BaPoCrime = dynamic(() => import('@/components/NeswSlider/BaPoCrime/BaPoCrime'), {
  loading: () => <div>Loading...</div>,
  ssr: false
});

const SpoBusTecAllc = dynamic(() => import('@/components/NeswSlider/SpoBusTecAllc/SpoBusTecAllc'), {
  loading: () => <div>Loading...</div>,
  ssr: false
});
```

#### 3. Optimize Swiper Import
```javascript
// Only import what you need
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import only required CSS
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
```

#### 4. Add Priority Loading for Above-Fold Images
```javascript
<Image
  src={imgsrc}
  alt={post?.title}
  width={400}
  height={400}
  priority // Add this for first 3-4 images
  loading="eager"
/>
```

#### 5. Reduce Initial API Calls
Combine multiple API calls into one:
```javascript
// Backend should provide single endpoint:
// GET /api/frontend/home-complete
// Returns: featured, popular, world, sports, entertainment, etc.
```

### Medium Priority (Will increase score by 10-15 points):

#### 6. Add Resource Hints
```javascript
// app/layout.js
<head>
  <link rel="preconnect" href="https://dev.hellobd.news" />
  <link rel="dns-prefetch" href="https://dev.hellobd.news" />
</head>
```

#### 7. Optimize Third-Party Scripts
```javascript
// Load Google Analytics with lower priority
<Script
  strategy="lazyOnload" // Changed from afterInteractive
  src="https://www.googletagmanager.com/gtag/js?id=G-XH6PWW5JT4"
/>
```

#### 8. Add Loading States
```javascript
// Show skeleton loaders instead of blank screen
{loading ? <SkeletonLoader /> : <Content />}
```

#### 9. Optimize CSS
- Remove unused Tailwind classes
- Minimize custom CSS
- Use CSS modules for component styles

#### 10. Code Splitting
```javascript
// Split large components
const Header = dynamic(() => import('@/components/Shared/Header/Header'));
const Footer = dynamic(() => import('@/components/Shared/Footer/Footer'));
```

### Low Priority (Will increase score by 5-10 points):

#### 11. Add Service Worker Caching
Already have PWA, but optimize workbox config:
```javascript
workboxOptions: {
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/dev\.hellobd\.news\/api\/.*/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 300, // 5 minutes
        },
      },
    },
  ],
}
```

#### 12. Optimize React Icons
```javascript
// Import specific icons instead of entire library
import { FaFacebookF } from 'react-icons/fa';
// Instead of: import * as Icons from 'react-icons/fa';
```

#### 13. Add Compression
```javascript
// next.config.js already has compress: true ✅
```

## Performance Checklist

### Before Deployment:
- [ ] Convert homepage to server component
- [ ] Lazy load below-fold components
- [ ] Add priority to hero images
- [ ] Optimize Swiper imports
- [ ] Combine API calls
- [ ] Add resource hints
- [ ] Test with Lighthouse
- [ ] Test on 3G network
- [ ] Check bundle size (should be < 200KB initial)

### After Deployment:
- [ ] Monitor Core Web Vitals
- [ ] Check LCP (should be < 2.5s)
- [ ] Check FID (should be < 100ms)
- [ ] Check CLS (should be < 0.1)
- [ ] Monitor API response times
- [ ] Check CDN caching

## Expected Results

### Current Score: ~30
### After High Priority Fixes: ~60-70
### After All Fixes: ~85-95

## Tools for Testing

1. **Lighthouse** (Chrome DevTools)
   - Run in incognito mode
   - Test on mobile and desktop
   - Focus on Performance, Accessibility, SEO

2. **WebPageTest** (webpagetest.org)
   - Test from multiple locations
   - Check waterfall chart
   - Identify blocking resources

3. **GTmetrix** (gtmetrix.com)
   - Detailed performance report
   - Historical tracking
   - Recommendations

4. **Chrome DevTools Performance Tab**
   - Record page load
   - Identify long tasks
   - Check JavaScript execution time

## Quick Wins (Implement Today)

1. ✅ Optimize image proxy (DONE)
2. ✅ Increase cache TTL (DONE)
3. ✅ Add font preload (DONE)
4. 🔄 Lazy load Swiper components (NEXT)
5. 🔄 Add priority to hero images (NEXT)
6. 🔄 Change GA strategy to lazyOnload (NEXT)

## Backend Recommendations

Ask your backend team to:
1. Combine `/home` and `/advertisements` into single endpoint
2. Reduce related posts in article API (max 10 instead of all)
3. Add CDN for images
4. Enable Brotli compression
5. Add proper cache headers
6. Optimize database queries
7. Consider GraphQL for flexible data fetching

---

**Last Updated:** $(date)
**Target Score:** 85+
**Current Score:** ~30
