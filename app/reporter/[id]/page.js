'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import api from '@/lib/api';
import Layout from '@/components/Layout';
import Image from 'next/image';
import SideTrandingNews from '@/components/SideTrandingNews/SideTrandingNews';
import { FaFacebookF, FaXTwitter } from "react-icons/fa6";
import { LuNewspaper } from "react-icons/lu";
import { CiMail } from "react-icons/ci";
import Link from 'next/link';
import formatTimeAgo from '@/components/FormateTimeAgo/FormateTimeAgo';
import { getPostImage } from '@/lib/imageUtils';
import Header from '@/components/Shared/Header/Header';
import Footer from '@/components/Shared/Footer/Footer';
import SuspenseLoader from '@/components/Loading/SuspenseLoader';

export default function ReporterPage() {
  const params = useParams();
  const [reporter, setReporter] = useState("");
  const [reporterpostNum, setReporterpostNum] = useState("");
  const [posts, setPosts] = useState([]);
  const [banner, setBanner] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contentUnavailable, setContentUnavailable] = useState(false);


  const fallbackImage = '/avatar-placeholder.png';

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);


  const [imgSrc, setImgSrc] = useState(
    reporter?.user_details?.avatar || fallbackImage
  );

  useEffect(() => {
    if (params.id) {
        setContentUnavailable(false);
        fetchReporter();
    }
  }, [params.id]);

  // Update document title and description on client navigation for reporter
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (loading) return;
    if (!reporter) return;
    const title = reporter.name || params.id || 'Reporter';
    document.title = `${title} - HelloBD`;
    const desc = reporter.bio || `প্রতিবেদকের পোস্টসমূহ - ${title}`;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', desc);
    // og image
    if (reporter.photo) {
      let og = document.querySelector('meta[property="og:image"]');
      if (!og) {
        og = document.createElement('meta');
        og.setAttribute('property', 'og:image');
        document.head.appendChild(og);
      }
      og.setAttribute('content', reporter.photo);
    }
  }, [loading, reporter, params.id]);
    

  const fetchReporter = async () => {
    // validate/normalize id
    let idToUse = params.id;
    try {
      idToUse = decodeURIComponent(String(params.id || ''));
    } catch (e) {
      setReporter(null);
      setPosts([]);
      setReporterpostNum(null);
      setContentUnavailable(true);
      setLoading(false);
      return;
    }

    try {
      const res = await api.get(`/reporter/${idToUse}`);
      setReporter(res.data?.reporter);
      setReporterpostNum(res.data);
      const postsData = res.data?.posts?.data || [];
      setPosts(postsData);
      // pagination meta
      setPage(res.data?.posts?.meta?.current_page || 1);

      if (res.data?.posts?.meta) {
        setHasMore(
          res.data.posts.meta.current_page < res.data.posts.meta.last_page
        );
      } else {
        setHasMore(postsData.length >= 15);
      }
      
    } catch (err) {
      const status = err?.response?.status;
      if (status === 404 || status === 400 || status === 422) {
        setReporter(null);
        setPosts([]);
        setReporterpostNum(null);
        setContentUnavailable(true);
      } else {
        console.error('Error fetching reporter:', err);
      }
    } finally {
      setLoading(false);
    }
  };
  
  // banner//
  // ---------------------------banner-----------------------------------
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

    const reporterBanner1 = getBanner('reporter_post', 'reporter_page_side_banner');

  if (loading) {
    return (
      <>
        <Header />
          <SuspenseLoader />
        <Footer />
      </>
    );
  }


  if (!reporter) {
    return (
      <>
      <Header/>
      <div className="min-h-96 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">প্রতিবেদক পাওয়া যায়নি</h1>
          <Link href="/" className="text-blue-600">হোমপেজে ফিরে যান</Link>
        </div>
      </div>
      <Footer/>
      </>
    );
  }

  return (
    <Layout sidebar={false}>
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className=" items-start gap-6">
            
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
  
              {/* Text Section */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold mb-2" style={{ color: '#3A2ABB' }}>
                 
                  {reporter.name}
                </h1>
                {/* <p className="text-lg text-gray-600">{reporter.designation}</p> */}
                <p className="text-lg text-gray-600">{reporter.location || "Dhaka, Bangladesh"}</p>
              </div>

              {/* Avatar */}
             <div className="w-32 h-32 flex items-center justify-center shrink-0">
             
                {reporter?.photo? (
                  <Image
                    src={reporter?.photo}
                    alt={reporter.name}
                    className="w-32 h-32 rounded-full object-cover border"
                    width={200}
                    height={200}
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-blue-500 flex items-center justify-center text-white text-4xl font-bold">
                    U
                  </div>
                )}
              </div>

            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-700 mb-4">

              {/* Published Posts */}
              <div className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                <LuNewspaper className="text-base" />
                <span className='pt-1'>{reporterpostNum?.stats?.total_posts} টি সংবাদ প্রকাশিত</span>
              </div>

              {/* Experience */}
              <div className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full">
                <span className='pt-1'>অভিজ্ঞতা {reporter.experience? reporter.experience:"৭"} বছর</span>
              </div>

            </div>

            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">

                {/* Facebook */}
                <Link
                  href={reporter?.social_media?.facebook || '#'}
                  className="w-10 h-10 flex items-center justify-center rounded-full 
                            bg-[#1877F2] text-white 
                            hover:scale-105 hover:shadow-md transition"
                >
                  <FaFacebookF className="text-lg" />
                </Link>

                {/* X (Twitter) */}
                <Link
                  href={reporter?.social_media?.twitter || '#'}
                  className="w-10 h-10 flex items-center justify-center rounded-full 
                            bg-black text-white 
                            hover:scale-105 hover:shadow-md transition"
                >
                  <FaXTwitter className="text-lg" />
                </Link>

                {/* Email */}
                <Link
                  href={`mailto:${reporter?.user_details?.email}`}
                  className=" w-10 h-10 flex items-center gap-2 
                            px-3 py-2 rounded-full 
                            bg-[#EA4335] text-white 
                            hover:shadow-md hover:scale-105 transition"
                >
                  <CiMail className="text-lg" />
                </Link>
            </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold mb-2">সম্পর্কে</h3>
                <p className="text-gray-700 leading-relaxed">
                  {reporter?.bio || "এই প্রতিবেদকের সম্পর্কে কোন তথ্য পাওয়া যায়নি।"}
                </p>
              </div>
            </div>
          </div>
      </div>

     {/*-------------------------------------- reporter news--------------------------// */}

      <div>
        <h2 className="text-2xl font-bold mb-6" style={{color: '#3A2ABB'}}>সাম্প্রতিক সংবাদ</h2>
       
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">  
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 ">
            {posts.map((post, index) => ( 
                      <div
                      
                        key={`post-${index}`} // incremented index ব্যবহার
                        className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white"
                      >
                       <div className="flex-shrink-0 w-full bg-gray-200 rounded overflow-hidden max-h-[200px]">
                          {(() => {
                              const imgsrc = getPostImage(post);
                                    return imgsrc ? (
                                    <Image
                                       className="object-cover object-center w-full h-full" 
                                        src={imgsrc} 
                                        width={400}
                                        height={400}
                                        alt="thumbnail"

                                    />
                                   ) : null;
                                })()}
                       </div>
                        <div className="p-4">
                          <Link href={`/${post?.categories[0]?.name? post?.categories[0]?.name: "news"}/${post.slug}`}>
                            <h3 className="text-lg mb-2 line-clamp-2 font-noto text-stone-800 hover:text-red-500">
                              
                                {post?.title?.length > 80
                                  ? post?.title.slice(0, 80) + '...'
                                  : post?.title}
                              </h3>
                          </Link>
                          <div className="flex items-center justify-between text-xs text-gray-500 pt-2">
                            {/* <span>{post.user?.name}</span> */}
                            <span>{formatTimeAgo(post.published_at)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
             </div>
             <div className="lg:col-span-1">
                <SideTrandingNews/>
                 <div className="bg-gray-50 rounded-lg mb-6">
                  { reporterBanner1 && (
                  <Link href={reporterBanner1?.link_url || '#'} target="_blank" rel="noopener noreferrer" className="block">
                  <Image
                     className='w-full'
                     src={reporterBanner1?.image}
                     alt="thumbnail"
                     width={1024}
                     height={1024}
                   />
                   </Link>)}
                </div>
             </div>
        </div>
      </div>
    </Layout>
  );
}
