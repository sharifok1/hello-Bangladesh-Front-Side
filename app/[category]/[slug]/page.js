'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import api from '@/lib/api';
import Layout from '@/components/Layout';
import { FaFacebookF, FaXTwitter, FaRegCopy  } from "react-icons/fa6";
import { IoBookOutline, IoEyeOutline } from "react-icons/io5";
import FormatTimeAgo from '@/components/FormateTimeAgo/FormateTimeAgo';
import TrnBanNum from '@/components/TrnBanNum/TrnBanNum';
import Image from 'next/image';
import Link from 'next/link';
import GlobalNewsDate from '@/components/GlobalNewsDate/GlobalNewsDate';
import ContentRenderer from '@/components/ContentRenderer/ContentRenderer';
import SideTrandingNews from '@/components/SideTrandingNews/SideTrandingNews';
import OnlineVoting from '@/components/OnlineVoting/OnlineVoting';
import { getPostImage } from '@/lib/imageUtils';
import SuspenseLoader from '@/components/Loading/SuspenseLoader';
import { generateArticleSchema, generateBreadcrumbSchema, generateMetaTitle, generateMetaDescription } from '@/lib/schemaUtils';

export default function NewsPage() {
  const params = useParams();
  const [post, setPost] = useState([]);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);
  const [breakingNews, setBreakingNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedPosts, setFeedPosts] = useState([]);
  const [feedPage, setFeedPage] = useState(1);
  const [loadingFeed, setLoadingFeed] = useState(false);
  const [hasMoreFeed, setHasMoreFeed] = useState(true);
  const [outerLinks, setouterLinks] = useState([]);
  const [banner, setBanner] = useState([]);
  const user = post?.reporter;
  const fullName = user?.desk_name || 'Unknown';
  const initial = fullName.charAt(0).toUpperCase();
  const repoterImg = user?.photo_url || null;
  const [imgError, setImgError] = useState(false);
  const [textSize, setTextSize] = useState(18);
  const [contentUnavailable, setContentUnavailable] = useState(false);

  const contentRef = useRef(null);
   useEffect(() => {
    if (contentRef.current) {
      const allElements = contentRef.current.querySelectorAll('*');
      allElements.forEach(element => {
        element.style.fontSize = `${textSize}px`;
        element.style.lineHeight = '1.6';
      });
    }
  }, [textSize]);


  useEffect(() => {
    if (params.slug) {
      fetchPost();
      fetchSidebarData();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.slug]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (loading) return;
    if (!post) return;

    // Generate optimized title (50-60 characters)
    const optimizedTitle = generateMetaTitle(post.title);
    document.title = optimizedTitle;

    const setMeta = (name, value, prop = false) => {
      if (!value) return;
      const selector = prop ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        if (prop) el.setAttribute('property', name); else el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', value);
    };

    let imageUrl = post?.media?.[0]?.original_url?.trim() || post?.feature_image_link?.trim();
    if (imageUrl) {
      imageUrl = imageUrl.replace(/([^:])(\/\/+)/g, '$1/');
      if (imageUrl.startsWith('/storage')) {
        imageUrl = `https://dev.hellobd.news${imageUrl}`;
      }
    }

    // Generate optimized description (120-160 characters)
    const optimizedDescription = generateMetaDescription(post.excerpt, post.content, post.title);

    setMeta('description', optimizedDescription);
    setMeta('og:title', optimizedTitle, true);
    setMeta('og:description', optimizedDescription, true);
    setMeta('og:type', 'article', true);
    setMeta('og:url', window.location.href, true);
    if (imageUrl) setMeta('og:image', imageUrl, true);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', optimizedTitle);
    setMeta('twitter:description', optimizedDescription);
    if (imageUrl) setMeta('twitter:image', imageUrl);

    // Add canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.href.split('?')[0].split('#')[0]);
  }, [loading, post]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 500 && !loadingFeed && hasMoreFeed) {
        loadMoreFeed();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingFeed, hasMoreFeed]);

  const fetchPost = async () => {
    // Use promise style to handle 404 gracefully and avoid uncaught Axios errors
    setContentUnavailable(false);
    // Validate/normalize slug first — malformed percent-encoding (e.g. trailing '%')
    // will cause decodeURIComponent to throw; treat that as content unavailable.
    let slugToUse = params.slug;
    try {
      // try decode to catch malformed encoding
      slugToUse = decodeURIComponent(String(params.slug || ''));
    } catch (e) {
      setPost(null);
      setRelatedPosts([]);
      setContentUnavailable(true);
      setLoading(false);
      return;
    }

    await api.get(`/post/${slugToUse}`)
      .then(async (res) => {
        setPost(res.data.post);
        setRelatedPosts(res.data.related || []);
        const socialLinks = await api.get(`/general-settings`);
        setouterLinks(socialLinks?.data?.settings);
      })
      .catch((err) => {
        // If post not found, show friendly message instead of throwing
        const status = err?.response?.status;
        // treat common client errors as content unavailable
        if (status === 404 || status === 400 || status === 422) {
          setPost(null);
          setRelatedPosts([]);
          setContentUnavailable(true);
        } else {
          console.error('Error fetching post:', err);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchSidebarData = async () => {
    try {
      const res = await api.get('/home');
      setPopularPosts(res.data.popular || []);
      setBreakingNews(res.data.breaking || []);
    } catch (err) {
      console.error('Error:', err);
    }
  };

    const zoomText = (sizeChange) => {
    setTextSize(prevSize => {
    
      const newSize = prevSize + sizeChange;
      if (newSize < 10) return 10;
      if (newSize > 34) return 34;

      return newSize;
    });
  };

    useEffect(() => {
    api.get('/advertisements')
      .then(res => {
        const ads = res.data?.data || [];
        setBanner(ads);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });
  }, []);

  const getBanner = (page, placement) => {
      return banner?.find(
        ad =>
          ad?.status === 'active' &&
          ad?.ad_type === page &&
          ad?.placement === placement
      );
    };

    const fullWidthBanner1 = getBanner('single_post', 'single_page_inline_banner');

  const loadMoreFeed = () => {
      if (loadingFeed || !hasMoreFeed) return;

      setLoadingFeed(true);

      setTimeout(() => {
        const nextPosts = relatedPosts.slice(
          feedPage * POSTS_PER_BATCH,
          (feedPage + 1) * POSTS_PER_BATCH
        );

        setFeedPosts(prev => [...prev, ...nextPosts]);
        setFeedPage(prev => prev + 1);

        if (nextPosts.length < POSTS_PER_BATCH) setHasMoreFeed(false);

        setLoadingFeed(false);
      }, 500);
    };

const POSTS_PER_BATCH = 5;

useEffect(() => {
  setFeedPosts(relatedPosts.slice(0, POSTS_PER_BATCH));
  setFeedPage(1);
  setHasMoreFeed(relatedPosts.length > POSTS_PER_BATCH);
}, [relatedPosts]);


  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank');
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${window.location.href}&text=${post?.title}`, '_blank');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('লিংক কপি হয়েছে!');
  };

  const getPostUrl = (post) => {
    const categorySlug = post?.categories?.[0]?.slug || 'news';
    return `/${categorySlug}/${post.slug}`;
  };

  if (loading) {
    return (
      <Layout sidebar={false}>
        <SuspenseLoader />
        {/* <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{borderColor: '#3A2ABB'}}></div>
        </div> */}
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout sidebar={false}>
        <div className="min-h-96 flex items-center justify-center">
          <div className="text-center">
            {contentUnavailable ? (
              <>
                <h1 className="text-2xl font-bold mb-4">এই কনটেন্টটি আর পাওয়া যাচ্ছে না</h1>
                <p className="mb-4">এই আর্টিকেলটি সম্ভবত মুছে ফেলা হয়েছে অথবা লিঙ্কটি সঠিক নয়।</p>
              </>
            ) : (
              <h1 className="text-2xl font-bold mb-4">সংবাদ পাওয়া যায়নি</h1>
            )}
            <Link href="/" className="text-blue-600">হোমপেজে ফিরে যান</Link>
          </div>
        </div>
      </Layout>
    );
  }

  // Generate schemas for SEO
  const articleSchema = generateArticleSchema(post);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'হোম', url: '/' },
    { name: post?.categories?.[0]?.name_bn || post?.categories?.[0]?.name || 'সংবাদ', url: `/category/${post?.categories?.[0]?.slug}` },
    { name: post.title, url: `/${post?.categories?.[0]?.slug || 'news'}/${post.slug}` }
  ]);

  return (
    <Layout sidebar={false}>
    {/* Article Schema */}
    {articleSchema && (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    )}
    
    {/* Breadcrumb Schema */}
    {breadcrumbSchema && (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    )}
    
    <section className='container mx-auto'>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">

          <article className="bg-white rounded-lg md:p-1 mb-8">
            <div className="md:block hidden">
              {post.categories && post.categories.map((cat) => (
                <span key={cat.id} className="px-3 py-1 rounded text-white text-sm mr-2" style={{backgroundColor: cat.color || '#3A2ABB'}}>
                  {cat.name_bn || cat.name}
                </span>
              ))}
            </div>

            <h1 className="text-2xl md:text-3xl font-bold py-2 pt-0 md:py-4">{post.title}</h1>
          
            <hr/>

            <section className='py-2'>
                <div className='flex items-center gap-3'>
                  {post?.reporter?.photo_url? (
                    <Image
                      src={repoterImg}
                      alt={fullName}
                      className="w-12 h-12 rounded-full object-cover border hidden md:block"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      width={100}
                      height={100}
                      loading="lazy"
                      sizes="(max-width: 100px) 100vw, 100px"
                    />
                    
                  ) : (
                    <div className="hidden w-12 h-12 rounded-full bg-blue-500 md:flex items-center justify-center text-white text-4xl font-bold">
                      {initial}
                    </div>
                  )}
                  <div>
                    <Link href={`/reporter/${post?.reporter?.slug}`}>
                    <h3 className='text-base font-semibold text-blue-800'>{fullName || 'হ্যালোবিডি ডেস্ক'}</h3>
                  </Link>
                     <p className='text-gray-600'>প্রকাশঃ {GlobalNewsDate(post?.published_at)} </p>
                  </div>
              </div>
              <div> </div>
            </section>

            <div className="flex items-start md:items-center justify-start md:justify-between mb-6 pb-4 border-b flex-col md:flex-row gap-4">
              <div className="flex items-center justify-start md:justify-center gap-2 text-sm text-gray-600">
                <span className='hidden'> {FormatTimeAgo(post.published_at)}</span>
                <span className='flex items-center gap-1'><IoBookOutline/> পড়ুন: {TrnBanNum(post?.reading_time? post?.reading_time : "২")} মিনিটে</span>
                <div className="flex items-center gap-1"><span className="text-gray-600 text-lg"><IoEyeOutline/></span> {TrnBanNum(post?.views)} বার পড়া</div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-gray-600 text-lg">শেয়ার করুন:</span>
                <button onClick={shareOnFacebook} className="text-blue-600 hover:opacity-80"><FaFacebookF/></button>
                <button onClick={shareOnTwitter} className="text-dark-500 hover:opacity-80"><FaXTwitter/></button>
                <button onClick={copyLink} className="text-gray-600 hover:opacity-80"><FaRegCopy/></button>
                <button onClick={() => zoomText(1)} className="text-dark-600 hover:opacity-80 bg-blue-100 px-2 py-1 text-xs w-8 h-8 rounded-full text-center font-semibold">Aa+</button>
                <button onClick={() => zoomText(-1)} className="text-dark-600 hover:opacity-80 bg-blue-100 px-2 py-1 text-xs w-8 h-8 rounded-full text-center font-semibold">Aa-</button>
              </div>
            </div>

            <div className="h-auto rounded-lg flex items-center justify-center w-full md:w-3/4  mx-auto">
                 {(() => {
                   const imgsrc = getPostImage(post);
                     return imgsrc ? (
                     <Image
                       className="object-cover w-full"
                        src={imgsrc} 
                        width={1024}
                        height={1024}
                        priority
                        alt="thumbnail"
                     />
                    ) : null;
                 })()}
                    
               </div>
               <p className='w-full text-center pt-1 pb-3 text-sm text-stone-500 italic mx-auto'>{ post?.feature_image_link?.trim()? "ছবিঃ সংগ্রহকৃত" : post?.post_type_meta?.featured_image_caption}</p>
             
            {post?.content && (
                 <div 
                  ref={contentRef}
                  className="mb-6 p-0 rounded-lg text-lg md:w-3/4 mx-auto" 
                  id='singlePostContent'
                  style={{ fontSize: `${textSize}px` }}
                >
                  <ContentRenderer content={post.content} />
                </div>
              )}
          </article>

           {fullWidthBanner1 && (
             <div className="container mx-auto px-4 mb-8 w-full md:w-3/4 mx-auto">
               <Link
                 href={fullWidthBanner1.link_url?fullWidthBanner1.link_url:"#"}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="block"
               >
                 <div className="w-full bg-yellow-50 rounded overflow-hidden border-2 border-yellow-200">
                   <Image
                     className="max-w-(80%) mx-auto"
                     src={fullWidthBanner1.image}
                     width={1200}
                     height={100}
                     alt={fullWidthBanner1.title || 'Advertisement'}
                     priority
                   />
                 </div>
               </Link>
             </div>
           )}

         <section className="mt-8 w-full md:w-3/4 mx-auto border-t pt-4 border-red-500">
          <h2 className="text-2xl font-bold" style={{color: '#3A2ABB'}}>আরও পড়ুন</h2>
          {feedPosts.map((feedPost, index) => (
            <article key={`${feedPost.id}-${index}`} className="bg-white rounded-lg shadow-sm p-2 mb-8">
              <div className="mb-4">
                {feedPost.categories && feedPost.categories.map((cat) => (
                  <span key={cat.id} className="px-3 py-1 rounded text-white text-sm mr-2" style={{backgroundColor: cat.color || '#3A2ABB'}}>
                    {cat.name_bn || cat.name}
                  </span>
                ))}
              </div>

              <h2 className="text-2xl font-bold mb-4">
                <Link href={getPostUrl(feedPost)} className="hover:text-blue-600">{feedPost.title}</Link>
              </h2>

              <div className="flex items-center justify-between mb-6 pb-4">
                <div className="flex flex-col md:flex-row items-start gap-2 text-sm text-gray-600">
                  <div className='flex gap-4'>
                     <span> {FormatTimeAgo(feedPost.published_at || feedPost.created_at)}</span>
                      <span className='flex items-center gap-1'><IoBookOutline/> পড়ুন: {TrnBanNum(feedPost?.reading_time? feedPost?.reading_time : "2")} মিনিটে</span>
                  </div>
                  <div className="flex items-center gap-1"><span className="text-gray-600 text-lg"><IoEyeOutline/></span> {TrnBanNum(feedPost?.views)} বার পড়া</div>
                
                </div>
              </div>

              <div className="h-auto rounded-lg flex items-center justify-center">
                   {(() => {
                   const imgsrc = getPostImage(feedPost);
                     return imgsrc ? (
                     <Image
                       className="w-full h-96 object-center object-cover rounded"
                        src={imgsrc} 
                        width={1024}
                        height={1024}
                        loading="lazy"
                        alt="thumbnail"
                     />
                    ) : null;
                 })()}
               </div>

               {feedPost?.content && (
              <div className="mb-6 p-2 rounded-lg ">
                <ContentRenderer content={feedPost.content} />
              </div>
              )}
            </article>
          ))}
          
          {loadingFeed && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 mx-auto" style={{borderColor: '#3A2ABB'}}></div>
              <p className="text-sm text-gray-500 mt-2">আরও সংবাদ লোড হচ্ছে...</p>
            </div>
          )}
        </section>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg mb-6">
            <div className="space-y-4">
              <SideTrandingNews/>
               <div className="bg-blue-50 rounded-lg p-6 mb-6 border border-blue-200">
                 <OnlineVoting/>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>
    </Layout>
  );
}
