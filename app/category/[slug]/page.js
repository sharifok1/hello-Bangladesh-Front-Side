'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import api from '@/lib/api';
import Layout from '@/components/Layout';
import SuspenseLoader from '@/components/Loading/SuspenseLoader';
import { FaFacebookF, FaXTwitter, FaRegClock, FaRegCopy  } from "react-icons/fa6";
import Link from 'next/link';
import Image from "next/image";
import formatTimeAgo from '@/components/FormateTimeAgo/FormateTimeAgo';
import { getPostImage } from '@/lib/imageUtils';
import { getPostUrl } from '@/lib/urlUtils';
import { generateMetaTitle, generateMetaDescription } from '@/lib/schemaUtils';

export default function CategoryPage() {
  const params = useParams();
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState(null);
  const [outerLinks, setouterLinks] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  // ------------------------banner state----------------------------//
  const [banner, setBanner] = useState([]);
  const [contentUnavailable, setContentUnavailable] = useState(false);

  useEffect(() => {
    if (params.slug) {
      fetchCategory();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.slug]);

  // Update document title and description on client navigation
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (loading) return;
    
    const categoryName = category?.name_bn || category?.name || (params.slug || 'Category');
    const optimizedTitle = generateMetaTitle(`${categoryName} - সর্বশেষ সংবাদ`);
    document.title = optimizedTitle;
    
    const desc = category?.description || `সর্বশেষ ${categoryName} সংবাদ সমূহ`;
    const optimizedDescription = generateMetaDescription(desc, `${categoryName} বিভাগের সকল খবর এবং আপডেট পড়ুন HelloBD News এ`, categoryName);
    
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', optimizedDescription);

    // Add canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.href.split('?')[0].split('#')[0]);
  }, [loading, category, params.slug]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 500 && !loadingMore && hasMore) {
        loadMore();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMore, loadingMore]);

  const fetchCategory = async () => {
    setContentUnavailable(false);
    // validate/normalize slug to avoid malformed percent-encoding errors
    let slugToUse = params.slug;
    try {
      slugToUse = decodeURIComponent(String(params.slug || ''));
    } catch (e) {
      setCategory(null);
      setPosts([]);
      setContentUnavailable(true);
      setLoading(false);
      return;
    }

    try {
      const res = await api.get(`/category/${slugToUse}`);
      setCategory(res.data.category);
      const postsData = res.data.posts?.data || [];
      const perPage = res.data.posts?.per_page || 18;
      setPosts(postsData);

      // ------------------------social links----------------------------//
      const socialLinks = await api.get(`/general-settings`);
      setouterLinks(socialLinks?.data?.settings);
     
      // set current page if provided by API meta, otherwise default to 1
      setPage(res.data.posts?.meta?.current_page || 1);
      if (res.data.posts?.meta) {
        setHasMore(res.data.posts.meta.current_page < res.data.posts.meta.last_page);
      } else {
        setHasMore(postsData.length >= perPage);
      }
    } catch (err) {
      const status = err?.response?.status;
      if (status === 404 || status === 400 || status === 422) {
        setCategory(null);
        setPosts([]);
        setContentUnavailable(true);
      } else {
        console.error('Error:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (loadingMore) return;
    if (!params.slug) return;
    setLoadingMore(true);

    // normalize/validate slug to avoid malformed percent-encoding errors
    let slugToUse = params.slug;
    try {
      slugToUse = decodeURIComponent(String(params.slug || ''));
    } catch (e) {
      // malformed slug: stop attempting to load more
      setHasMore(false);
      setLoadingMore(false);
      return;
    }

    try {
      const nextPage = page + 1;
      const res = await api.get(`/category/${slugToUse}?page=${nextPage}`);
      const newPosts = res.data.posts?.data || [];
      if (newPosts.length === 0) {
        setHasMore(false);
        return;
      }
      setPosts(prev => {
        const existing = new Set(prev.map(p => p.slug));
        const filtered = newPosts.filter(p => !existing.has(p.slug));
        return [...prev, ...filtered];
      });
      // update page from API meta if available, otherwise increment
      setPage(res.data.posts?.meta?.current_page || nextPage);
      if (res.data.posts?.meta) {
        setHasMore(res.data.posts.meta.current_page < res.data.posts.meta.last_page);
      } else {
        const perPage = res.data.posts?.per_page || newPosts.length || 8;
        if (newPosts.length < perPage) setHasMore(false);
      }
    } catch (err) {
      const status = err?.response?.status;
      if (status === 404 || status === 400 || status === 422) {
        // treat missing page as end of list
        setHasMore(false);
      } else {
        console.error('Error loading more posts:', err);
      }
    } finally {
      setLoadingMore(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <SuspenseLoader />
      </Layout>
    );
  }

  if (!category && contentUnavailable) {
    return (
      <Layout>
        <div className="min-h-96 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">এই কনটেন্টটি আর পাওয়া যাচ্ছে না</h1>
            <p className="mb-4">এই পাতা সম্ভবত মুছে ফেলা হয়েছে অথবা লিঙ্কটি সঠিক নয়।</p>
            <Link href="/" className="text-blue-600">হোমপেজে ফিরে যান</Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      
      {/* ---------------------------------section header//------------------------ */}
      <div className="mb-8 px-4">
        <h1 className="text-3xl font-bold mb-4" style={{color: category?.color || '#3A2ABB'}}>
          {category?.name_bn || category?.name }
        </h1>
        
        {/* Reporter Info & Social Share */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          {/* Left: Time */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FaRegClock className="text-gray-500" size={14} />
            <span className='text-lg'>{new Date().toLocaleTimeString("bn-BD")}</span>
          </div>
        </div>
      </div>

      {/* -------------------------------------news grid---------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
        {posts.map((post, index) => ( 
          
          <div
            key={`post-${index}`} 
            className="rounded overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white"
          >
           <div className="flex-shrink-0 w-full bg-gray-200 overflow-hidden max-h-[200px] rounded">
                 {(() => {
                      const imgsrc = getPostImage(post);
                        return imgsrc ? (
                        <Image
                          className="object-cover w-full"
                          src={imgsrc} 
                          width={400}
                          height={400}
                          alt="thumbnail"
                        />
                      ) : null;
                    })()}
           </div>
            <div className="px-2 py-1 pb-2">
              <Link href={getPostUrl(post)}>
                <h3 className="text-lg mb-2 line-clamp-2 font-noto text-stone-800 hover:text-red-500">
                    {post?.title?.length > 80
                      ? post?.title.slice(0, 80) + '...'
                      : post?.title}
                  </h3>
              </Link>
              <div className="flex items-center justify-between text-xs text-gray-500">
                {/* <span>{post.user?.name}</span> */}
                <span>{formatTimeAgo(post.published_at)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {loadingMore && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 mx-auto" style={{borderColor: '#3A2ABB'}}></div>
          <p className="text-sm text-gray-500 mt-2">আরও সংবাদ লোড হচ্ছে...</p>
        </div>
      )}

      {!hasMore && posts.length > 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>সব সংবাদ দেখানো হয়েছে</p>
        </div>
      )}
    </Layout>
  );
}


