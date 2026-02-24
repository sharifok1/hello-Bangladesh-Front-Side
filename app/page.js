'use client';

import Header from '@/components/Shared/Header/Header';
import Image from "next/image";
import { useState, useEffect} from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import Footer from '@/components/Shared/Footer/Footer';
import Voting from '@/components/OnlineVoting/OnlineVoting';
import formatTimeAgo, { FormatTimeAgo } from '@/components/FormateTimeAgo/FormateTimeAgo';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './page.css';
import { FaPlayCircle } from "react-icons/fa";
import BaPoCrime from '@/components/NeswSlider/BaPoCrime/BaPoCrime';
import SpoBusTecAllc from '@/components/NeswSlider/SpoBusTecAllc/SpoBusTecAllc';
import SciEngHelSuc from '@/components/NeswSlider/SciEngHelSuc/SciEngHelSuc';
import EduEnvIntCor from '@/components/NeswSlider/EduEnvIntCor/EduEnvIntCor';
import { getPostImage } from '@/lib/imageUtils';
import { getPostUrl } from '@/lib/urlUtils';
import SuspenseLoader from '@/components/Loading/SuspenseLoader';

export default function HomePage() {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [topPost, setTopPost] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);
  const [worldNews, setworldNews] = useState([]);
  const [mixnews, setMixnews] = useState([""]);
  const [sports, setSports] = useState([""]);
  const [entertainment, setEntertainment] = useState([""]);
  const [literature, setLiterature] = useState([""]);
  const [opinion, setOpinion] = useState([""]);
  const [photoFeature, setphotoFeature] = useState([""]);
  const [lifestyle, setLifestyle] = useState([""]);
  const [multimedia, setMultimedia] = useState([""]);
  // banner list states
  const [banner, setBanner] = useState([]);
  const [loading, setLoading] = useState(true);
  const [urlData, setUrlData] = useState(null);
  const [embedUrl, setEmbedUrl] = useState("");
  // mobile screen//
  const [isMobile, setIsMobile] = useState(false);

  //  const contentRef = useRef(null);

  // const fallback_imgage = "https://dev.hellobd.news/storage/media/hellobd-fallback-img_2026-01-29_03-25-04_3GUCqN4j.jpg";

  useEffect(() => {
    api.get('/home')
      .then(res => {
        const postsData = res.data;  // all news
        setFeaturedPosts(postsData?.featured); // features news
        setTopPost(postsData?.top_post_news); // features news
        setPopularPosts(postsData?.popular); // most popular news
        setworldNews(postsData?.world_popular_news);  //world news
        setMixnews(postsData?.mixed_popular_news); // passmisali
        setSports(postsData?.sports_popular_news); // sports
        setEntertainment(postsData?.entertainment_popular_news); // entertainment
        setLiterature(postsData?.literature_popular_news); //literature
        setOpinion(postsData?.opinion_popular_news); //opinion
        setphotoFeature(postsData?.photo_feature_popular_news); //photoFeature
        setLifestyle(postsData?.lifestyle_popular_news); //Life Style
        setMultimedia(postsData?.multimedia_popular_news); // Multimedia   
        
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        const samplePosts = generateRealisticPosts();
        // setPosts(samplePosts);
        setFeaturedPosts(samplePosts.slice(0, 2));
        setBreakingNews(samplePosts.slice(0, 3));
        setPopularPosts(samplePosts.slice(0, 10));
        // setCursor(20);
        // setHasMore(true);
      })
      .finally(() => setLoading(false));

  }, []);

   // mobile screen
      useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768); // md breakpoint
      };

      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }, []);


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

const heroBanner = getBanner('home', 'hero_section_click');
const fullWidthBanner1 = getBanner('home', 'full_width_inline_one');
const fullWidthBanner2 = getBanner('home', 'full_width_inline_two');
const fullWidthBanner3 = getBanner('home', 'full_width_inline_three');
const fullWidthBanner4 = getBanner('home', 'full_width_inline_four');
const fullWidthBanner5 = getBanner('home', 'full_width_inline_five');
const fullWidthBanner6 = getBanner('home', 'full_width_inline_six');
const fullWidthBanner7 = getBanner('home', 'full_width_inline_seven');
const fullWidthBanner8 = getBanner('home', 'full_width_inline_eight');
const homeSidebanner1 = getBanner('home', 'side_banner_one');
const homeSidebanner2 = getBanner('home', 'side_banner_two');


   //--------------------------close banner---------------------------------

  //call urls data api from /general-settings
  useEffect(() => {
    api.get('/general-settings')
      .then(res => {
        setUrlData(res.data);
      })
      .catch(err => {
        console.error('Error fetching URL data:', err);
      });
  }, []);

  useEffect(() => {
  const videoUrl = urlData?.settings?.other_one;
  if (!videoUrl) return;

  let finalUrl = videoUrl;

  // YouTube watch → embed
  if (videoUrl.includes("watch?v=")) {
    finalUrl = videoUrl.replace("watch?v=", "embed/");
  }

  // youtu.be short link → embed
  if (videoUrl.includes("youtu.be/")) {
    const id = videoUrl.split("youtu.be/")[1];
    finalUrl = `https://www.youtube.com/embed/${id}`;
  }

  setEmbedUrl(finalUrl);
}, [urlData]);

// word counter for excerpt//
const wordExcerpt = (text, wordLimit = 20) => {
  if (!text) return '';

  const words = text.trim().split(/\s+/);

  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(' ') + '...'
    : text;
};

  if (loading) {
    return (
      <div className="min-h-96 flex items-center justify-center" style={{backgroundColor: '#FFFFFF'}}>
        {/* <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{borderColor: '#3A2ABB'}}></div>
          <p className="font-roboto" style={{color: '#6B7280'}}>সংবাদ লোড হচ্ছে...</p>
          
        </div> */}
        <SuspenseLoader />
      </div>
    );
  }

  return (
    <div className="min-h-screen font-roboto" style={{backgroundColor: '#FFFFFF'}}>
      {/* ------------------------header//--------------------- */}
      <Header />
      {/* ------------------------header//--------------------- */}

      {/* SEO H1 - Hidden but present for search engines */}
      <h1 className="sr-only">HelloBD News - বাংলাদেশের সর্বশেষ সংবাদ ও আপডেট</h1>

      {/* -------------------------------------------hero section section 1--------------------------------------*/}
      <div className="container mx-auto px-4 pb-1 font-noto pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 border-b border-gray-300">
                <div className="lg:col-span-3">
                    <section className="mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   
                    {/* 1 Featured Post - 2 columns */}
                    <div className="md:col-span-2">
                        {featuredPosts.slice(0, 1).map((post) => (
                        <div key={post?.id} className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow relative" style={{backgroundColor: '#FFFFFF'}}>
                            <div className="flex items-center justify-center max-h-96">
                              {(() => {
                                  const imgsrc = getPostImage(post);
                                  return imgsrc ? (
                                    <Image
                                      className="news-image object-cover object-center rounded-lg w-full h-full"
                                      src={imgsrc}
                                      alt={post?.title || "featured image"}
                                      loading="eager"
                                      fetchPriority="high"
                                      width={400}
                                      height={400}
                                    />
                                  ) : null;
                                })()}
                            </div>
                            <div className="px-4 pt-4 bg-stone-950 bg-opacity-60 news-card-heading-transparent w-full">
                               
                                <div className="flex items-center mb-2">
                                    <span className="ml-2 text-sm" style={{color: '#ffffff'}}>{formatTimeAgo(post?.published_at)}</span>
                                </div>

                                <Link href={getPostUrl(post)} className="block hover:opacity-80">
                                    <h3 className="text-lg md:text-2xl font-semibold font-noto text-white">
                                    {post?.title}
                                    </h3>
                                </Link>

                                <div className="text-sm font-medium" style={{color: '#ffffff'}}>
                                   <p className="text-base mb-3 font-noto text-red">
                                      {wordExcerpt(post?.excerpt, 20)}
                                    </p>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>

                    {/* Latest News Column - 1 column */}
                    <div className="md:col-span-1">
                        <div className="space-y-2">
                            {featuredPosts?.slice(1,4).map((post) => (
                            <div key={post?.id} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                                <Link href={getPostUrl(post)} className="block group">
                                <div className="flex flex-row md:items-center gap-2">
                                    {/* Text Content */}
                                    <div className="flex-1">
                                   
                                     <h3 className="text-lg font-normal mb-3 group-hover:text-blue-600 transition-colors leading-snug font-noto">
                                        {/* {post?.title?.length > 50
                                          ? post?.title.slice(0, 50) + '...'
                                          : post?.title} */}
                                          {post?.title}
                                      </h3>
                                    <div className="text-sm text-gray-500 font-noto">
                                        {formatTimeAgo(post?.published_at)}
                                    </div>
                                    </div>
                                    
                                    {/* Image */}
                                  <div className="flex-shrink-0 w-32 h-24 bg-gray-200 rounded overflow-hidden">
                                      {(() => {
                                        const imgsrc = getPostImage(post);
                                         return imgsrc ? (
                                          <Image
                                            className="object-cover object-center rounded-lg w-full h-full"
                                            src={imgsrc}
                                            width={400}
                                            height={400}
                                            loading="lazy"
                                            alt={post?.title || "featured image"}
                                          />
                                        ) : null;
                                      })()}
                                    </div>
                                </div>
                                </Link>
                            </div>
                            ))}
                        </div>
                    </div>
                    </div>
                </section>
                </div>
                {/* top video sections  */}
                <div className="lg:col-span-1">
                     <div className="lg:col-span-1 space-y-3">
                      {/* ভিডিও সেকশন */}
                      
                      <div className="relative pb-[56.25%] h-0 rounded overflow-hidden">
                          {embedUrl ? (
                            <iframe
                              loading="lazy" 
                              className="absolute top-0 left-0 w-full h-full"
                              src={embedUrl}
                              title="YouTube video"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                            // <div></div>
                          ) : (
                            <div className="bg-gray-800 h-full py-12 flex items-center justify-center text-gray-400">
                              <h3 className=''>
                                ভিডিও লোড হচ্ছে...
                              </h3>
                            </div>
                          )}
                        </div>

                      {/* ব্যানার সেকশন */}

                    {heroBanner && (
                      <div className="space-y-2 overflow-hidden rounded-lg">
                        <Link
                          href={heroBanner.link_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <div className="rounded-lg overflow-hidden relative max-h-44">
                            <Image
                              className="w-full object-cover"
                              src={heroBanner.image}
                              alt={heroBanner.title}
                              width={400}
                              height={400}
                              priority
                            />
                            {(heroBanner.title || heroBanner.content) && (
                              <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white text-center p-4">
                                {heroBanner.title && (
                                  <h4 className="text-xl font-bold mb-2">
                                    {heroBanner.title}
                                  </h4>
                                )}
                                {heroBanner.content && (
                                  <p className="mb-3">{heroBanner.content}</p>
                                )}
                                <button className="bg-yellow-500 text-black font-semibold px-6 pt-2 pb-1 rounded-lg hover:bg-yellow-600 transition">
                                                Details
                                              </button>
                              </div>
                            )}
                          </div>
                        </Link>
                      </div>
                    )}

                    </div>
                </div>
            </div>
        </div> 

      {/* //-----------------------------------2nd section latest news grid section------------------------ */}

      <div className="container mx-auto px-4 pt-4 pb-2">
           <section className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                 {/* {worldNews?.slice(0, isMobile ? 3 : 9).map((world,index) => ( */}
                {topPost?.slice(0, isMobile ? 4 : 8).map((latest,index) => (
                  <div key={index} className="rounded overflow-hidden shadow-sm hover:shadow-md transition-shadow" >
                      <div className="flex-shrink-0 w-full bg-gray-200 overflow-hidden max-h-[220px] rounded">
                            {(() => {
                               const imgsrc = getPostImage(latest);
                                return imgsrc ? (
                                 <Image
                                   className="object-cover object-center rounded-lg w-full h-full"
                                   src={imgsrc}
                                   width={300}
                                   height={150}
                                  loading="lazy"
                                   alt={latest?.title || "featured image"}
                                 />
                               ) : null;
                            })()}
                       </div>
                    <div className="px-2 py-1">
                      <Link href={getPostUrl(latest)} className="block hover:opacity-80">
                        <h3 className="text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                          {latest?.title}
                        </h3>
                      </Link>
                      <div className="text-sm font-noto text-stone-500">
                        <span>{formatTimeAgo(latest?.published_at)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
      </div>

      {/* //-----------------------------------Banner-1 full width section ------------------------ */}
              {fullWidthBanner1 && (
                <div className="container mx-auto px-4 mb-8 w-full">
                  <a
                    href={fullWidthBanner1.link_url}
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
                  </a>
                </div>
              )}

      {/* setPopularPosts */}
       
        {/* ----------------------------------------section 3 বহুল আলোচিত------------------------------------------------- */}
        <div className='w-full news-slider-section'>
            <div className='container mx-auto px-4 py-4'>
             <div className='mx-auto  text-center'>
               <Image className='w-8 mx-auto'
                src="https://dev.hellobd.news/storage/media/alocito_2026-02-01_08-39-32_0KDrHd3z.svg"
                width={100}
                height={100}
                alt='banner photo'
                priority
                >
              </Image>
              <h2 className="text-xl font-bold mb-2 mx-auto pt-3 text-white font-normal font-noto">বহুল আলোচিত</h2>
             </div>
              
              {/* news slider// */}
                
                  <Swiper
                    autoplay={{
                      delay: 3000,           
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,    
                    }}

                    speed={2000}  
                    slidesPerView={4}
                    slidesPerGroup={2}
                    loop={true}
                    spaceBetween={12}
                    navigation
                    pagination={{
                          clickable: true,
                        }}
                    keyboard={{ enabled: true }}
                    modules={[Keyboard, Navigation, Pagination, Autoplay]}
                    breakpoints={{
                      0: {
                        slidesPerView: 1,
                        slidesPerGroup: 1,
                      },
                      640: {
                        slidesPerView: 2,
                        slidesPerGroup: 2,
                      },
                      1024: {
                        slidesPerView: 4,
                        slidesPerGroup: 4,
                      },
                    }}
                    className="newsSwiper"
                  >
                    {popularPosts?.slice(0,12).map((popular, index) => (
                      <SwiperSlide  key={index}
                      className='px-4 py-2 pb-12'
                      >
                        <div className="flex items-center news-card min-h-44 p-2">
                          {/* Image */}
                          <div className="news-image w-1/2">
                             {(() => {
                               const imgsrc = getPostImage(popular);
                                return imgsrc ? (
                                 <Image
                                    className='object-cover object-center rounded-lg w-full h-full'
                                    src={imgsrc}
                                    width={400}
                                    height={400}
                                    loading="lazy"
                                   alt={popular?.title || "featured image"}
                                 />
                               ) : null;
                            })()}
                            
                          </div>
                          {/* Content */}
                          <div className="news-content w-1/2">
                            <span className="news-category font-noto">
                              {popular?.categories?.[0]?.name_bn}
                            </span>

                           <Link href={getPostUrl(popular)} passHref>
                                <h3 className="news-title cursor-pointer font-noto">
                                  {popular?.title?.length > 80
                                    ? popular?.title.slice(0, 80) + '...'
                                    : popular?.title}
                                </h3>
                              </Link>
                            {/* <p className="news-date">
                              {GlobalNewsDate(popular?.created_at)}
                            </p> */}
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
              </div>
            </div>

     {/* ----------------------------------------section 4   বিশ্ব খবর------------------------------------------------- */}
     
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">            
         
        {/* -------------------------Left side ------------------------- */}
          <div className="lg:col-span-3">
           
            {/* বিশ্ব খবর Section - 3 columns */}
            <section className="mb-8">
              <div className="flex justify-between items-center border-b py-2 px-2 mb-4 bg-sky-400">
                  <h2 className="text-xl font-normal text-white border-l-2 pl-2 pt-1 font-noto ">বিশ্ব</h2>
                  <Link href="/category/international" className="text-xl font-normal font-noto text-white hover:text-red-600 transition-colors duration-200 flex items-center">
                    সব খবর
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
                {worldNews?.slice(0, isMobile ? 3 : 9).map((world,index) => (
                  <div key={index} className=" overflow-hidden border-b-2">
                    <div className="w-full h-48 md:h-[220px] relative">
                      {(() => {
                           const imgsrc = getPostImage(world);
                            return imgsrc ? (
                             <Image
                              className="object-cover object-center rounded-lg w-full h-full"
                              src={imgsrc}
                              alt={world?.title}
                              fill
                              loading="lazy"
                              sizes="(max-width: 768px) 100vw, 400px"
                             />
                           ) : null;
                        })()}
                    </div>
                    <div className="py-3">
                      <Link href={getPostUrl(world)} className="block hover:opacity-80">
                        <h3 className="text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                          {world?.title}
                        </h3>
                      </Link>
                        <p className="text-sm font-noto text-stone-500">
                              {formatTimeAgo(world?.created_at)}
                        </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

              {/* -----------------------বাংলাদেশ ----------রাজনীতি ----------- অপরাধ -----------------------*/}
             <BaPoCrime/>

          </div>
          
            {/* -------------------------Right side ------------------------- */}
          <div className="lg:col-span-1">
                
                {/* // banner//homeSidebanner1 */}
               
                <div className="bg-gray-50 rounded-lg mb-6">
                  { homeSidebanner1 && (
                  <Link href={homeSidebanner1?.link_url || '#'} target="_blank" rel="noopener noreferrer" className="block">
                  <Image
                     className='w-full'
                     src={homeSidebanner1?.image}
                     alt="thumbnail"
                     width={300}
                     height={300}
                   />
                   </Link>)}
                </div>

                <div className="bg-blue-50 rounded-lg p-6 mb-6 border border-blue-200">
                  {/* // অনলাইন জরিপ// */}
                    <Voting/>
                </div>
                {/* Advertisement Banner 2 */}
                <div className="bg-gray-50 rounded-lg mb-6">
                  { homeSidebanner2 && (
                  <Link href={homeSidebanner2?.link_url || '#'} target="_blank" rel="noopener noreferrer" className="block">
                  <Image
                     className='w-full'
                     src={homeSidebanner2?.image}
                     alt="thumbnail"
                     width={300}
                     height={300}
                   />
                   </Link>)}
                </div>
          </div>
        </div>

      </div>

       {/* ----------------------------------------section 5-------- পাচ মিশালী ------------------------------------------------- */}
        <div className='pt-6w-full' style={{ backgroundColor: '#924A4A' }}>
            <div className='container mx-auto px-4 py-6'>
             <div className='mx-auto  text-center'>
               <Image className='w-1/2 md:w-1/4 mx-auto'
                src="https://dev.hellobd.news/storage/media/mixcat_2026-02-01_08-41-09_yWeVJ5hd.svg"
                width={100}
                height={100}
                alt='news-features-image'
                >
              </Image>
             </div>
              
              {/* news slider// */}
                
                  <Swiper
                    autoplay={{
                      delay: 3000,           
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,    
                    }}

                    speed={2000}  
                    slidesPerView={4}
                    slidesPerGroup={2}
                    loop={true}
                    spaceBetween={12}
                    navigation
                    pagination={{
                          clickable: true,
                        }}
                    keyboard={{ enabled: true }}
                    modules={[Keyboard, Navigation, Pagination, Autoplay]}
                    breakpoints={{
                      0: {
                        slidesPerView: 1,
                        slidesPerGroup: 1,
                      },
                      640: {
                        slidesPerView: 2,
                        slidesPerGroup: 2,
                      },
                      1024: {
                        slidesPerView: 4,
                        slidesPerGroup: 4,
                      },
                    }}
                    className="newsSwiper"
                  >
                    {mixnews?.slice(0,12).map((mix, index) => (

                      <SwiperSlide key={index}
                      className='px-4 py-4 pb-12'
                       >
                        <div className="flex items-center news-card min-h-44">
                          {/* Image */}
                          <div className="news-image w-1/2">
                            {(() => {
                              const imgsrc = getPostImage(mix);
                                return imgsrc ? (
                                <Image
                                 className='object-cover object-center rounded-lg w-full h-full'
                                  src={imgsrc}
                                  alt="thumbnail"
                                  width={400}
                                  height={400}
                                />
                              ) : null;
                            })()}
                            
                          </div>
                          {/* Content */}
                          <div className="news-content w-1/2">
                            <span className="news-category">
                              {mix?.categories?.[0]?.name_bn}
                            </span>

                           <Link href={getPostUrl(mix)} passHref>
                                <h3 className="news-title cursor-pointer font-noto font-normal">
                                  {mix?.title?.length > 80
                                    ? mix?.title.slice(0, 80) + '...'
                                    : mix?.title}
                                </h3>
                              </Link>
                            {/* <p className="news-date">
                              {GlobalNewsDate(mix?.created_at)}
                            </p> */}
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
              </div>
        </div> 

      {/* //-----------------------------------Banner-2  full width ------------------------ */}
      {fullWidthBanner2 && (
                <div className="container mx-auto px-4 pt-8 w-full">
                  <a
                    href={fullWidthBanner2.link_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="w-full bg-yellow-50 rounded overflow-hidden border-2 border-yellow-200">
                      <Image
                        className="max-w-(80%) mx-auto"
                        src={fullWidthBanner2.image}
                        width={1200}
                        height={100}
                        alt={fullWidthBanner2.title || 'Advertisement'}
                        priority
                        
                      />
                    </div>
                  </a>
                </div>
              )}

       {/* ------section 6---------খেলা-----------বাণিজ্য-----------প্রযুক্তি --------সারাদেশ---------------*/}
      <section className="container mx-auto px-4 mb-8 mt-8"> 
         <SpoBusTecAllc/>
      </section> 

      {/* ----------------------------------------section 7------- বিনোদন ------------------------------------------------- */}

      <div className='w-full' style={{backgroundColor:'#EE00AB'}}>
        <Image src="https://dev.hellobd.news/storage/media/binodon_bg-line_2026-02-01_09-04-03_dF789rQD.svg" alt="wave-pattern" className='w-full py-4' width={150} height={150}/>
          <div className='container mx-auto px-4 '>
             <div className='mx-auto text-center pb-2'>
               <Image className='w-8 mx-auto'
                src="https://dev.hellobd.news/storage/media/binodon-icon_2026-02-01_08-43-17_KLVNyH9i.svg"
                width={100}
                height={100}
                alt='news-features-image'
                >
              </Image>
              <Link href={`/category/${entertainment?.[0]?.categories?.[0]?.slug}`} passHref>
              <h2 className="text-xl font-bold mb-2 mx-auto pt-3 text-white font-normal">বিনোদন</h2>
              </Link>
             </div>
                  <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
                    {entertainment?.slice(0,4).map((entertainmentNews, index) => (
                      <div
                       className='px-4'
                       key={index}
                      >
                        <div className="rounded relative">
                          {/* Image */}
                          <div className="news-image w-full">

                            {(() => {
                              const imgsrc = getPostImage(entertainmentNews);
                                return imgsrc ? (
                                <Image
                                 className='object-cover object-center rounded-lg w-full h-full'
                                  src={imgsrc}
                                  alt="thumbnail"
                                  width={400}
                                  height={400}
                                  loading="lazy"
                                />
                              ) : null;
                            })()}
                            
                          </div>
                          {/* Content */}
                          <div className="w-full py-2 px-2 bg-stone-950 bg-opacity-65 news-card-heading-transparent min-h-[80px]">
                           <Link href={getPostUrl(entertainmentNews)} passHref>
                                <h3 className="cursor-pointer text-white md:text-xl font-noto">
                                  {entertainmentNews?.title?.length > 80
                                    ? entertainmentNews?.title.slice(0, 80) + '...'
                                    : entertainmentNews?.title}
                                </h3>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* <div className='mx-auto text-center mt-8'>
                    <Link href={`/category/${entertainment?.[0]?.categories?.[0]?.slug}`} passHref>
                      <button 
                        className="text-xl font-bold mb-2 mx-auto pt-3 text-white font-normal bg-sky-950 text-center px-12 pb-2 border-r-4 border-l-4 border-red-500"
                      >
                        {entertainment?.[0]?.categories?.[0]?.name_bn || 'বিনোদন'} পাতা
                      </button>
                    </Link>
                  </div> */}
              </div>
              <Image src="https://dev.hellobd.news/storage/media/binodon_bg-line_2026-02-01_09-04-03_dF789rQD.svg" alt="wave-pattern" className='w-full pt-8 pb-4' width={150} height={150}/>
      </div> 
      
      {/* //-----------------------------------Banner-3  full width ------------------------ */}
      
      {fullWidthBanner3 && (
                <div className="container mx-auto px-4 pt-8 w-full">
                  <a
                    href={fullWidthBanner3.link_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="w-full bg-yellow-50 rounded overflow-hidden border-2 border-yellow-200">
                      <Image
                        className="max-w-(80%) mx-auto"
                        src={fullWidthBanner3.image}
                        width={1200}
                        height={100}
                        alt={fullWidthBanner3.title || 'Advertisement'}
                        priority
                        
                      />
                    </div>
                  </a>
                </div>
              )}
      
      {/* ------section 8-----------বিজ্ঞান------------স্থাপত্য ও প্রকৌশল----------স্বাস্থ্য---------সফল মুখ---------------*/}
       <SciEngHelSuc/>

      {/* ----------------------------------------section 7------- লাইফস্টাইল ------------------------------------------------- */}
      <section className='w-full' style={{backgroundColor:'#EC7100'}}>
        <Image src="https://dev.hellobd.news/storage/media/life-style_2026-02-01_09-23-11_SZBs1yDc.svg" alt="wave-pattern" className='w-full pb-2' width={150} height={150}/>
          <div className='container mx-auto px-4'>
             <div className='mx-auto text-center pb-6'>
               <Image className='w-8 mx-auto'
                src="https://dev.hellobd.news/storage/media/lifestyleicon_2026-02-01_08-44-24_mcLdftPu.svg"
                width={100}
                height={100}
                alt='news-features-image'
                >
              </Image>
              
               <Link href={`/category/${lifestyle?.[0]?.categories?.[1]?.slug}`} passHref>
                  <h2 className="text-xl font-bold mb-2 mx-auto pt-3 text-white font-normal">লাইফস্টাইল</h2>
              </Link>

             </div>
                  <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
                    {lifestyle?.slice(0,4).map((lifestyleNews, index) => (
                      <div key={index}
                      className='px-4' >
                        <div className=" rounded-lg relative">
                          {/* Image */}
                          <div className="news-image rounded-lg w-full  bg-gray-300">
                             {(() => {
                              const imgsrc = getPostImage(lifestyleNews);
                                return imgsrc ? (
                                <Image
                                 className='object-cover object-center rounded-lg w-full h-full'
                                 src={imgsrc}
                                 alt="thumbnail"
                                 width={400}
                                 height={400}
                                />
                              ) : null;
                            })()}
                            
                          </div>
                          {/* Content */}
                          <div className="w-full py-2 px-2 bg-stone-950 bg-opacity-65 news-card-heading-transparent min-h-[80px]">
                           <Link href={getPostUrl(lifestyleNews)} passHref>
                                <h3 className="cursor-pointer text-white md:text-xl ">
                                  {lifestyleNews?.title?.length > 80
                                    ? lifestyleNews?.title.slice(0, 80) + '...'
                                    : lifestyleNews?.title}
                                </h3>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* <div className='mx-auto text-center mt-8'>
                    <Link href={`/category/${lifestyle?.[0]?.categories?.[0]?.slug}`} passHref>
                      <button 
                        className="text-xl font-bold mb-2 mx-auto pt-3 text-white font-normal bg-sky-950 text-center px-12 pb-2 border-r-4 border-l-4 border-red-500"
                      >
                        {lifestyle?.[0]?.categories?.[0]?.name_bn || 'লাইফস্টাইল'} পাতা
                      </button>
                    </Link>
                  </div> */}
              </div>
              <Image src="https://dev.hellobd.news/storage/media/life-style_2026-02-01_09-23-11_SZBs1yDc.svg" alt="wave-pattern" className='w-full pt-8' width={150} height={150}/>
      </section>

     {/* //-----------------------------------Banner-4  full width ------------------------ */}
      {fullWidthBanner4 && (
            <div className="container mx-auto px-4 py-2 md:py-8 w-full">
                 <a
                    href={fullWidthBanner4.link_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="w-full bg-yellow-50 rounded overflow-hidden border-2 border-yellow-200">
                      <Image
                        className="max-w-(80%) mx-auto"
                        src={fullWidthBanner4.image}
                        width={1200}
                        height={100}
                        alt={fullWidthBanner4.title || 'Advertisement'}
                        priority
                        
                      />
                    </div>
                  </a>
                </div>
              )}
     {/*------------------------------------section 8--------- মাল্টিমিডিয়া------------------------------------------- */}

       <section className='w-full bg-blue-900 py-4'>
          <div className='container mx-auto px-4 '>
             <div className='mx-auto text-center pb-6'>
               <Image className='w-8 mx-auto'
                src="https://dev.hellobd.news/storage/media/multimedia-icon_2026-02-01_08-47-27_zThqH4oF.svg"
                width={100}
                height={100}
                alt='news-features-image'
                >
              </Image>
             
               <Link href={`/category/${multimedia?.[0]?.categories[0]?.slug}`} passHref>
                  <h4 className="text-xl font-bold mb-2 mx-auto pt-3 text-white font-normal">মাল্টিমিডিয়া</h4>
              </Link>
             </div>

              {/* ------------------------video 3 section----------------------- */}
              <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-2 hidden md:flex'>
                    {multimedia?.slice(0,3).map((multimediaNews, index) => (
                      <div key={index}
                      className='px-4 mx-auto w-full'
                       >
                        <div className="w-full rounded-lg relative">
                          {/* Image */}
                          <div className="news-image rounded-lg w-full h-full">
                            {(() => {
                              const imgsrc = getPostImage(multimediaNews);
                                return imgsrc ? (
                                <Image
                                className='object-cover object-center rounded-lg w-full h-full'
                                src={imgsrc}
                                alt="thumbnail"
                                width={400}
                                height={300}
                                />
                              ) : null;
                            })()}
                            
                          </div>
                          {/* Content */}
                          <div className="w-full py-2 px-2 bg-stone-950 bg-opacity-65 news-card-heading-transparent min-h-[80px]">
                             <Link
                                  href={getPostUrl(multimediaNews)}
                                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl z-10"
                                >
                                  <FaPlayCircle />
                                </Link>
                                {/* Title */}
                                <Link href={getPostUrl(multimediaNews)}>
                                  <h3 className="cursor-pointer text-white md:text-xl pr-12">
                                    {multimediaNews?.title?.length > 80
                                      ? multimediaNews?.title.slice(0, 80) + '...'
                                      : multimediaNews?.title}
                                  </h3>
                                </Link>
                              </div>
                        </div>
                      </div>
                    ))}
                </div>
                  {/* multimedia swiper slider// */}
                  <Swiper
                    slidesPerView={4}
                    spaceBetween={5}
                    navigation={true}
                    modules={[Navigation]}
                    breakpoints={{
                      0: {
                        slidesPerView: 1,
                        slidesPerGroup: 1,
                      },
                      640: {
                        slidesPerView: 2,
                        slidesPerGroup: 2,
                      },
                      1024: {
                        slidesPerView: 4,
                        slidesPerGroup: 4,
                      },
                    }}
                    className="multimedia_swiper_slide my-0 md:my-8"
                  >
                   {multimedia?.slice(0,12).map((multimediaNews,index) => (
                    <SwiperSlide key={index}>
                      <div
                      className='px-4'
                       >
                        <div className=" rounded relative">
                          {/* Image */}
                          <div className="news-image relative w-full h-64 overflow-hidden">
                              {(() => {
                              const imgsrc = getPostImage(multimediaNews);
                                return imgsrc ? (
                                <Image
                                   className="object-cover object-center rounded-lg w-full h-full"
                                    src={imgsrc}
                                    alt="thumbnail"
                                    fill
                                    loading="lazy"
                                    sizes="(max-width: 768px) 100vw, 400px"
                                />
                              ) : null;
                            })()}
                            </div>
                          {/* Content */}
                          <div className="w-full py-2 px-2 bg-stone-950 bg-opacity-65 news-card-heading-transparent min-h-[80px]">
                             <Link
                                  href={getPostUrl(multimediaNews)}
                                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl z-10"
                                >
                                  <FaPlayCircle />
                                </Link>
                                {/* Title */}
                                <Link href={getPostUrl(multimediaNews)}>
                                  <h3 className="cursor-pointer text-white md:text-xl pr-12">
                                    {multimediaNews?.title?.length > 80
                                      ? multimediaNews?.title.slice(0, 80) + '...'
                                      : multimediaNews?.title}
                                  </h3>
                                </Link>
                              </div>
                        </div>
                      </div>
                    </SwiperSlide>))}
                  </Swiper> 
                        
              </div>
      </section>

     {/* //-----------------------------------Banner-5  full width ------------------------ */}
      {fullWidthBanner5 && (
                <div className="container mx-auto px-4 pt-2 md:pt-8 w-full">
                  <a
                    href={fullWidthBanner5.link_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="w-full bg-yellow-50 rounded overflow-hidden border-2 border-yellow-200">
                      <Image
                        className="max-w-(80%) mx-auto"
                        src={fullWidthBanner5.image}
                        width={1200}
                        height={100}
                        alt={fullWidthBanner5.title || 'Advertisement'}
                        priority
                        
                      />
                    </div>
                  </a>
                </div>
              )}

     {/* ------section 9-----------শিক্ষা------------পরিবেশ---------মুখোমুখি---------করপোরেট সংবাদ--------------*/}
      <EduEnvIntCor/>

      {/* Section 04: শিল্প ও সাহিত্য */}

    {/* //-----------------------------------Banner-6  full width ------------------------ */}
      {fullWidthBanner6 && (
                <div className="container mx-auto px-4 pb-8 w-full">
                  <a
                    href={fullWidthBanner6.link_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="w-full bg-yellow-50 rounded overflow-hidden border-2 border-yellow-200">
                      <Image
                        className="max-w-(80%) mx-auto"
                        src={fullWidthBanner6.image}
                        width={1200}
                        height={100}
                        alt={fullWidthBanner6.title || 'Advertisement'}
                        priority
                        
                      />
                    </div>
                  </a>
                </div>
              )}

      {/* ----------------------------------------section 10 -------স্পোর্টস------------------------------------------------- */}

      <section className='w-full bg-lime-700' style={{backgroundColor:'#9ab858'}}>
        <Image src="https://dev.hellobd.news/storage/media/sports-bg_2026-02-01_09-32-45_AK2ZKnqW.svg" alt="wave-pattern" className='w-full pb-4' width={1024} height={100}/>
          <div className='container mx-auto px-4 '>
             <div className='mx-auto text-center pb-2'>
               <Image className='w-8 mx-auto'
                src="https://dev.hellobd.news/storage/media/sports-icon_2026-02-01_08-48-47_TJMq7xbI.svg"
                width={100}
                height={100}
                alt='news-features-image'
                >
              </Image>
               <Link href={`/category/${sports?.[0]?.categories?.[0]?.slug}`} passHref>
                    <h2 className="text-xl font-bold mb-2 mx-auto pt-3 text-white font-normal">স্পোর্টস</h2>
              </Link>

             </div>
                  <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
                    {sports?.slice(0,4).map((sportsNews, index) => (
                      <div key={index}
                      className='px-4'
                       >
                        <div className=" rounded relative">
                          {/* Image */}
                          <div className="news-image w-full">
                            {sportsNews?.media?.[0]?.original_url && (
                            <Image
                              className='object-cover object-center rounded-lg w-full h-full'
                              src={sportsNews?.media?.[0]?.original_url}
                              alt="thumbnail"
                              width={400}
                              height={400}
                            />)}
                            
                          </div>
                          {/* Content */}
                          <div className="w-full py-2 px-2 bg-stone-950 bg-opacity-65 news-card-heading-transparent min-h-[80px]">
                           <Link href={getPostUrl(sportsNews)} passHref>
                                <h3 className="cursor-pointer text-white md:text-xl ">
                                  {sportsNews?.title?.length > 80
                                    ? sportsNews?.title.slice(0, 80) + '...'
                                    : sportsNews?.title}
                                </h3>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* <div className='mx-auto text-center mt-8'>
                    <Link href={`/category/${sports?.[0]?.categories?.[0]?.slug}`} passHref>
                      <button 
                        className="text-xl font-bold mb-2 mx-auto pt-3 text-white font-normal bg-sky-950 text-center px-12 pb-2 border-r-4 border-l-4 border-red-500"
                      >
                        {sports?.[0]?.categories?.[0]?.name_bn || 'বিনোদন'} পাতা
                      </button>
                    </Link>
                  </div> */}
                   
              </div>
             <Image src="https://dev.hellobd.news/storage/media/sports-bg_2026-02-01_09-29-30_bzq2xSeE.svg" alt="wave-pattern" className='w-full' width={1024} height={100}/>
      </section> 

    {/* //-----------------------------------Banner-7  full width ------------------------ */}
      {fullWidthBanner7 && (
                <div className="container mx-auto px-4 py-8 w-full">
                  <a
                    href={fullWidthBanner7.link_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="w-full bg-yellow-50 rounded overflow-hidden border-2 border-yellow-200">
                      <Image
                        className="max-w-(80%) mx-auto"
                        src={fullWidthBanner7.image}
                        width={1200}
                        height={100}
                        alt={fullWidthBanner7.title || 'Advertisement'}
                        priority
                        
                      />
                    </div>
                  </a>
                </div>
              )}

      {/* ----------------------------------------section 11-------------------- ফটোফিচার -------------------------- */}
        <div className='w-full bg-emerald-900'>
            <div className='container mx-auto px-4 py-4 pb-8'>
             <div className='mx-auto text-center pb-6'>
               <Image className='w-8 mx-auto'
                src="https://dev.hellobd.news/storage/media/photo-features_2026-02-01_08-49-50_d6O8JzW2.svg"
                width={400}
                height={300}
                alt='news-features-image'
                >
              </Image>
              <Link href={`/category/${photoFeature?.[0]?.categories?.[0]?.slug}`} passHref>
                  <h2 className="text-xl font-bold mb-2 mx-auto pt-3 text-white font-normal">ফটোফিচার</h2>
              </Link>
             </div>
              
              {/* photo feature slider// */}
             <Swiper
                    autoplay={{
                      delay: 3000,           
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,    
                    }}

                    speed={2000}  
                    slidesPerView={4}
                    slidesPerGroup={1}
                    loop={true}
                    spaceBetween={12}
                    navigation
                   
                    keyboard={{ enabled: true }}
                    modules={[Keyboard, Navigation, Autoplay]}
                    breakpoints={{
                      0: {
                        slidesPerView: 1,
                        slidesPerGroup: 1,
                      },
                      640: {
                        slidesPerView: 2,
                        slidesPerGroup: 1,
                      },
                      1024: {
                        slidesPerView: 4,
                        slidesPerGroup: 1,
                      },
                    }}
                    className="newsSwiper"
                  >
                    {photoFeature?.slice(0,7).map((p_features, index) => (
                      <SwiperSlide key={index}
                      className='px-4'
                      >
                        <div className=" rounded relative">
                          <div className="news-image w-full">
                            {(() => {
                              const imgsrc = getPostImage(p_features);
                                return imgsrc ? (
                                <Image
                                   className='object-cover object-center rounded-lg w-full h-full'
                                    src={imgsrc}
                                    alt="thumbnail"
                                    width={400}
                                    height={400}
                                />
                              ) : null;
                            })()}
                            
                          </div>
                          {/* Content */}
                          <div className="w-full py-2 px-2 bg-stone-950 bg-opacity-65 news-card-heading-transparent min-h-[80px]">
                           <Link href={getPostUrl(p_features)} passHref>
                                <h3 className="cursor-pointer text-white md:text-xl ">
                                  {p_features?.title?.length > 80
                                    ? p_features?.title.slice(0, 80) + '...'
                                    : p_features?.title}
                                </h3>
                            </Link>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                         
              </div>
        </div> 

      {/* -------------------------------মতামত-------------Section-12----------- ------- */}
      <section>
       <div className="container mx-auto px-4 my-8">
        <div className="flex justify-between items-center border-b py-2 px-2 mb-4 bg-cyan-600">
            <h2 className="text-xl font-bold text-white border-l-2 pl-2 pt-1 ">মতামত</h2>
            <Link href="/category/international" className="font-semibold text-white hover:text-red-600 transition-colors duration-200 flex items-center">
              সব খবর
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 ">
          {opinion?.map((opinionNews, index) => (
            <div key={index} className=" overflow-hidden border-b-2">
              <div className="w-full relative">
                 {(() => {
                     const imgsrc = getPostImage(opinionNews);
                       return imgsrc ? (
                       <Image
                           className="w-full h-auto object-cover rounded-md"
                           src={imgsrc}
                           alt={opinionNews?.title}
                           width={400}
                           height={400}
                       />
                     ) : null;
                   })()}
              </div>
              <div className="py-3">
                <Link href={getPostUrl(opinionNews)} className="block hover:opacity-80">
                  <h3 className="text-lg mb-2 line-clamp-2 font-noto text-stone-800" >
                    {opinionNews?.title}
                  </h3>
                </Link>
                <div className="flex items-center justify-between text-xs" style={{color: '#6B7280'}}>
                  <p className="news-date">
                        {FormatTimeAgo(opinionNews?.created_at)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
       </div>
      </section>

        {/* //-----------------------------------Banner-8  full width ------------------------ */}
      {fullWidthBanner8 && (
                <div className="container mx-auto pb-4 px-4 md:pt-0 md:pb-4 w-full">
                  <a
                    href={fullWidthBanner8.link_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="w-full bg-yellow-50 rounded overflow-hidden border-2 border-yellow-200">
                      <Image
                        className="max-w-(80%) mx-auto"
                        src={fullWidthBanner8.image}
                        width={1200}
                        height={100}
                        alt={fullWidthBanner8.title || 'Advertisement'}
                        priority
                        
                      />
                    </div>
                  </a>
                </div>
              )}
      
      {/* ----------------------------------------section 13 -------শিল্প ও সাহিত্য ------------------------------------------------- */}

      <section className='w-full bg-green-100 py-4'>
          <div className='container mx-auto px-4 md:px-16 lg:px-36 '>
             <div className='mx-auto text-center shitto-section-header w-full'>
              
               <Image className='w-8 mx-auto'
                src="https://dev.hellobd.news/storage/media/sahitto-icon_2026-02-01_08-54-12_V74e8N25.svg"
                width={100}
                height={100}
                alt='news-features-image'
                >
              </Image>

              <h2 className="text-xl font-bold mb-2 mx-auto pt-3 text-black font-normal">শিল্প ও সাহিত্য</h2>
             </div>
                  <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 py-2'>
                    {literature?.slice(0,3).map((literatureNews, index) => (
                      <div key={index}
                      className='px-4'
                      >
                        <div className=" rounded relative">
                          {/* Image */}
                          <div className="h-64 news-image w-full">
                            {(() => {
                              const imgsrc = getPostImage(literatureNews);
                                return imgsrc ? (
                                <Image
                                    className='w-full h-full object-cover'
                                    src={imgsrc}
                                    alt={literatureNews?.title || "শিল্প ও সাহিত্য"}
                                    width={300}
                                    height={256}
                                />
                              ) : null;
                            })()}
                            
                          </div>
                          {/* Content */}
                          <div className="w-full py-6 px-2 bg-stone-950 bg-opacity-65 news-card-heading-transparent">
                           <Link href={getPostUrl(literatureNews)} passHref>
                                <h3 className="cursor-pointer text-white text-xl ">
                                  {literatureNews?.title?.length > 80
                                    ? literatureNews?.title.slice(0, 80) + '...'
                                    : literatureNews?.title}
                                </h3>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className='mx-auto text-center mt-8 shitto-section-footer'>
                    <Link href={`/category/${literature?.[0]?.categories?.[0]?.slug}`} passHref>
                      <button 
                        className="text-xl font-bold mx-auto pt-3 text-white font-normal bg-sky-950 text-center px-12 pb-2 border-r-4 border-l-4 border-red-500"
                      >
                        {literature?.[0]?.categories?.[0]?.name_bn || 'সাহিত্য '} পাতা
                      </button>
                    </Link>
                  </div>
              </div>
      </section> 

      {/* ----------------------Footer-------------------- */}
      
      <Footer/>
      {/* ----------------------Footer-------------------- */}
    </div>
  );
}