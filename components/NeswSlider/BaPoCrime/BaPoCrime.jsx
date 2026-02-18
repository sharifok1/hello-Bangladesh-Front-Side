import React, { useEffect, useState } from 'react';
import formatTimeAgo, { FormatTimeAgo } from '@/components/FormateTimeAgo/FormateTimeAgo';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import Link from 'next/link';
import api from '@/lib/api';
import Image from 'next/image';
import { getPostImage } from '@/lib/imageUtils';
import { getPostUrl } from '@/lib/urlUtils';

const BaPoCrime = () => {
    const [bangladeshNews, setBangladeshNews] = useState([]);
      const [politics, setPolitics] = useState([]);
      const [crime, setCrime] = useState([]);

     useEffect(() => {
        api.get('/home')
          .then(res => {
            const postsData = res.data;
                    setBangladeshNews(postsData?.bangladeshi_popular_news);
                    setPolitics(postsData?.politics_popular_news);
                    setCrime(postsData?.crime_popular_news);
          })
          .catch(err => {
            console.error('Error fetching data:', err);
          })
      }, []);
    return (
     <>

      {/* //for deskto version */}
      {/* -----------------------বাংলাদেশ ----------রাজনীতি ----------- অপরাধ -----------------------*/}
            <section className="mb-8  hidden md:block">
               
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">  
                 {/* --------বাংলাদেশ ---bangladeshNews-----*/}    
                <div className="lg:col-span-1">
                  <div className="flex justify-between items-center border-b py-2 px-2 mb-4 bg-green-500">
                    <h3 className="text-lg font-semi-bold text-white border-l-2 pl-2 pt-1 ">বাংলাদেশ</h3>
                    <Link href="/category/bangladesh" className="font-semibold text-white hover:text-red-600 transition-colors duration-200 flex items-center">
                      সব খবর
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </Link>
                  </div>
                    {bangladeshNews?.slice(0,1).map((bd_news, index) => (
                        <div key={index} className=" overflow-hidden border-b-2">
                          <div className="w-full h-48 relative">
                            {(() => {
                                const imgsrc = getPostImage(bd_news);
                                  return imgsrc ? (
                                   
                                  <Image
                                     className="object-cover object-center rounded-lg w-full h-full"
                                     src={imgsrc}
                                      alt={bd_news?.title}
                                      fill
                                      sizes="(max-width: 768px) 100vw, 400px"
                                  />
                                ) : null;
                              })()}
                          </div>                        
                          <div className="py-1 min-h-24">
                            <Link href={getPostUrl(bd_news)} className="block hover:opacity-80">
                              <h3 className="text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                                {bd_news?.title}
                              </h3>
                            </Link>
                              <p className="text-sm font-noto text-stone-500">
                                    {FormatTimeAgo(bd_news?.created_at)}
                              </p>
                          </div>
                        </div>
                      ))}

                      {bangladeshNews?.slice(1,3).map((bd_news, index) => (
                      <div key={index}
                      className='mt-4'
                      >
                        <div className="news-card">
                          <div className="w-1/2 min-h-28 aspect-[3/2] relative">
                              {(() => {
                                const imgsrc = getPostImage(bd_news);
                                return imgsrc ? (
                                  <Image
                                    className="object-cover object-center rounded-lg"
                                    src={imgsrc}
                                    alt="thumbnail"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 200px"
                                  />
                                ) : null;
                              })()}
                             
                          </div>
                          <div className="news-content w-1/2">
                           <Link href={getPostUrl(bd_news)} passHref>
                                <h3 className="text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                                  {bd_news?.title?.length > 80
                                    ? bd_news?.title.slice(0, 80) + '...'
                                    : bd_news?.title}
                                </h3>
                              </Link>
                            <p className="text-sm font-noto text-stone-500">
                              {FormatTimeAgo(bd_news?.created_at)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                {/* --------রাজনীতি  --------*/}
                <div className="lg:col-span-1">
                    <div className="flex justify-between items-center border-b py-2 px-2 mb-4 bg-sky-400">
                    <h3 className="text-lg font-semi-bold text-white border-l-2 pl-2 pt-1 ">রাজনীতি</h3>
                    <Link href="/category/politics" className="font-semibold text-white hover:text-red-600 transition-colors duration-200 flex items-center">
                      সব খবর
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </Link>
                  </div>

                 {politics?.slice(0,1).map((politics_news, index) => (
                        <div key={index} className=" overflow-hidden border-b-2">
                          <div className="w-full h-48 relative">
                               {(() => {
                                const imgsrc = getPostImage(politics_news);
                                  return imgsrc ? (
                                  <Image
                                     src={imgsrc}
                                    alt={politics_news?.title}
                                    fill
                                    className="object-cover rounded-md"
                                    sizes="(max-width: 768px) 100vw, 400px"
                                  />
                                ) : null;
                              })()}
                          </div>
                            
                          <div className="py-1 min-h-24">
                            <Link href={getPostUrl(politics_news)} className="block hover:opacity-80">
                              <h3 className=" text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                                {politics_news?.title}
                              </h3>
                            </Link>
                              <p className=" text-sm font-noto text-stone-500">
                                    {FormatTimeAgo(politics_news?.created_at)}
                              </p>
                          </div>
                        </div>
                      ))}

                      {politics?.slice(1,3).map((politics_news, index) => (
                      <div key={index}
                      className='mt-4'
                       >
                        <div className="news-card ">
                          <div className="news-image w-1/2 min-h-28">
                          {(() => {
                                const imgsrc = getPostImage(politics_news);
                                  return imgsrc ? (
                                  <Image
                                    className='w-full h-28'
                                    src={imgsrc}
                                    alt="thumbnail"
                                    width={300}
                                    height={300}
                                  />
                                ) : null;
                              })()}
                            
                          </div>
                          
                          <div className="news-content w-1/2">
                           <Link href={getPostUrl(politics_news)} passHref>
                                <h3 className=" text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                                  {politics_news?.title?.length > 80
                                    ? politics_news?.title.slice(0, 80) + '...'
                                    : politics_news?.title}
                                </h3>
                              </Link>
                            <p className=" text-sm font-noto text-stone-500">
                              {FormatTimeAgo(politics_news?.created_at)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}


                </div>

                {/* --------অপরাধ  --------*/}
                <div className="lg:col-span-1">
                    <div className="flex justify-between items-center border-b py-2 px-2 mb-4 bg-neutral-800">
                    <h3 className="text-lg font-semi-bold text-white border-l-2 pl-2 pt-1">অপরাধ</h3>
                    <Link href="/category/crime" className="font-semibold text-white hover:text-red-600 transition-colors duration-200 flex items-center">
                      সব খবর
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </Link>
                  </div>

                  {crime?.slice(0,1).map((crime_news, index) => (
                        <div key={index} className=" overflow-hidden border-b-2">
                          <div className="w-full h-48 relative">
                            {(() => {
                                const imgsrc = getPostImage(crime_news);
                                  return imgsrc ? (
                                  <Image
                                    src={imgsrc}
                                    alt={crime_news?.title}
                                    fill
                                    className="object-cover rounded-md"
                                    sizes="(max-width: 768px) 100vw, 400px"
                                  />
                                ) : null;
                              })()}
                          </div>
                           
                          <div className="py-1 min-h-24">
                            <Link href={getPostUrl(crime_news)} className="block hover:opacity-80">
                              <h3 className=" text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                                {crime_news?.title}
                              </h3>
                            </Link>
                              <p className="text-sm font-noto text-stone-500">
                                    {FormatTimeAgo(crime_news?.created_at)}
                              </p>         
                          </div>
                        </div>
                      ))}

                      {crime?.slice(1,3).map((crime_news, index) => (
                      <div key={index}
                      className='mt-4'
                       >
                        <div className="news-card">
                          <div className="news-image w-1/2 min-h-28 ">
                          {(() => {
                                const imgsrc = getPostImage(crime_news);
                                  return imgsrc ? (
                                  <Image
                                    className='w-full'
                                    src={imgsrc}
                                    alt="thumbnail"
                                    width={300}
                                    height={300}
                                  />
                                ) : null;
                              })()}
                           
                          </div>
                          <div className="news-content w-1/2 ">
                           <Link href={getPostUrl(crime_news)} passHref>
                                <h3 className="text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                                  {crime_news?.title?.length > 80
                                    ? crime_news?.title.slice(0, 80) + '...'
                                    : crime_news?.title}
                                </h3>
                              </Link>
                            <p className="text-sm font-noto text-stone-500">
                              {FormatTimeAgo(crime_news?.created_at)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}

                </div>
              </div>  
            </section>

        {/* For mobile version */}
        <div className='block md:hidden mobile-swiper'>
            <Swiper
            pagination={{
            type: 'progressbar',
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
        >
            <SwiperSlide>
                  <div className="flex justify-between items-center border-b py-2 px-2 mb-4 bg-green-500">
                    <h3 className="text-lg font-semi-bold text-white border-l-2 pl-2 pt-1 ">বাংলাদেশ</h3>
                    <Link href="/category/bangladesh" className="font-semibold text-white hover:text-red-600 transition-colors duration-200 flex items-center">
                      সব খবর
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </Link>
                  </div>
                    {bangladeshNews?.slice(0,1).map((bd_news, index) => (
                        <div key={index} className=" overflow-hidden border-b-2">
                          <div className="w-full h-48 relative">

                            {(() => {
                                const imgsrc = getPostImage(bd_news);
                                  return imgsrc ? (
                                  <Image
                                   src={imgsrc}
                                   alt={bd_news?.title}
                                   fill
                                   className="object-cover rounded-md"
                                   sizes="(max-width: 768px) 100vw, 400px"
                                  />
                                ) : null;
                              })()}
                          </div>                        
                          <div className="py-1 min-h-24">
                            <Link href={getPostUrl(bd_news)} className="block hover:opacity-80">
                              <h3 className="text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                                {bd_news?.title}
                              </h3>
                            </Link>
                              <p className="text-sm font-noto text-stone-500">
                                    {FormatTimeAgo(bd_news?.created_at)}
                              </p>
                          </div>
                        </div>
                      ))}

                      {bangladeshNews?.slice(1,3).map((bd_news, index) => (
                      <div key={index}
                      className='mt-4'
                      >
                        <div className="news-card">
                          <div className="news-image w-1/2 h-32">
                             {(() => {
                                const imgsrc = getPostImage(bd_news);
                                  return imgsrc ? (
                                  <Image
                                    className='object-cover object-center rounded-lg'
                                    src={imgsrc}
                                    alt="thumbnail"
                                    width={300}
                                    height={300}
                                  />
                                ) : null;
                              })()}
                            
                          </div>
                          <div className="news-content w-1/2">
                           <Link href={getPostUrl(bd_news)} passHref>
                                <h3 className="text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                                  {bd_news?.title?.length > 80
                                    ? bd_news?.title.slice(0, 80) + '...'
                                    : bd_news?.title}
                                </h3>
                              </Link>
                            <p className="text-sm font-noto text-stone-500">
                              {FormatTimeAgo(bd_news?.created_at)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
            </SwiperSlide>
            <SwiperSlide>
                <div className="flex justify-between items-center border-b py-2 px-2 mb-4 bg-sky-400">
                    <h3 className="text-lg font-semi-bold text-white border-l-2 pl-2 pt-1 ">রাজনীতি</h3>
                    <Link href="/category/politics" className="font-semibold text-white hover:text-red-600 transition-colors duration-200 flex items-center">
                      সব খবর
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </Link>
                  </div>

                 {politics?.slice(0,1).map((politics_news, index) => (
                        <div key={index} className=" overflow-hidden border-b-2">
                          <div className="w-full h-48 relative">
                           {(() => {
                                const imgsrc = getPostImage(politics_news);
                                  return imgsrc ? (
                                  <Image
                                    src={imgsrc}
                                    alt={politics_news?.title}
                                    fill
                                    className="object-cover rounded-md"
                                    sizes="(max-width: 768px) 100vw, 400px"
                                  />
                                ) : null;
                              })()}
                          </div>
                            
                          <div className="py-1 min-h-24">
                            <Link href={getPostUrl(politics_news)} className="block hover:opacity-80">
                              <h3 className=" text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                                {politics_news?.title}
                              </h3>
                            </Link>
                              <p className=" text-sm font-noto text-stone-500">
                                    {FormatTimeAgo(politics_news?.created_at)}
                              </p>
                          </div>
                        </div>
                      ))}

                      {politics?.slice(1,3).map((politics_news, index) => (
                      <div key={index}
                      className='mt-4'
                       >
                        <div className="news-card">
                          <div className="news-image w-1/2 h-32">
                             {(() => {
                                const imgsrc = getPostImage(politics_news);
                                  return imgsrc ? (
                                  <Image
                                    className='object-cover object-center rounded-lg'
                                    src={imgsrc}
                                    alt="thumbnail"
                                    width={300}
                                    height={300}
                                  />
                                ) : null;
                              })()}
                            
                          </div>
                          
                          <div className="news-content w-1/2">
                           <Link href={getPostUrl(politics_news)} passHref>
                                <h3 className=" text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                                  {politics_news?.title?.length > 80
                                    ? politics_news?.title.slice(0, 80) + '...'
                                    : politics_news?.title}
                                </h3>
                              </Link>
                            <p className=" text-sm font-noto text-stone-500">
                              {FormatTimeAgo(politics_news?.created_at)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}

            </SwiperSlide>
            <SwiperSlide>
                <div className="flex justify-between items-center border-b py-2 px-2 mb-4 bg-neutral-800">
                    <h3 className="text-lg font-semi-bold text-white border-l-2 pl-2 pt-1">অপরাধ</h3>
                    <Link href="/category/crime" className="font-semibold text-white hover:text-red-600 transition-colors duration-200 flex items-center">
                      সব খবর
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </Link>
                  </div>

                  {crime?.slice(0,1).map((crime_news, index) => (
                        <div key={index} className=" overflow-hidden border-b-2">
                          <div className="w-full h-48 relative">
                            {(() => {
                                const imgsrc = getPostImage(crime_news);
                                  return imgsrc ? (
                                  <Image
                                   src={imgsrc}
                                    alt={crime_news?.title}
                                    fill
                                    className="object-cover rounded-md"
                                    sizes="(max-width: 768px) 100vw, 400px"
                                  />
                                ) : null;
                              })()}
                          </div>
                           
                          <div className="py-1 min-h-24">
                            <Link href={getPostUrl(crime_news)} className="block hover:opacity-80">
                              <h3 className=" text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                                {crime_news?.title}
                              </h3>
                            </Link>
                              <p className="text-sm font-noto text-stone-500">
                                    {FormatTimeAgo(crime_news?.created_at)}
                              </p>         
                          </div>
                        </div>
                      ))}

                      {crime?.slice(1,3).map((crime_news, index) => (
                      <div key={index}
                      className='mt-4'
                       >
                        <div className="news-card">
                          <div className="news-image w-1/2 h-32">
                          {(() => {
                                const imgsrc = getPostImage(crime_news);
                                  return imgsrc ? (
                                  <Image
                                    className='object-cover object-center rounded-lg'
                                    src={imgsrc}
                                    alt="thumbnail"
                                    width={300}
                                    height={300}
                                  />
                                ) : null;
                              })()}
                           
                          </div>
                          <div className="news-content w-1/2">
                           <Link href={getPostUrl(crime_news)} passHref>
                                <h3 className="text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                                  {crime_news?.title?.length > 80
                                    ? crime_news?.title.slice(0, 80) + '...'
                                    : crime_news?.title}
                                </h3>
                              </Link>
                            <p className="text-sm font-noto text-stone-500">
                              {FormatTimeAgo(crime_news?.created_at)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
            </SwiperSlide>
        </Swiper>
        </div>
    </>
    );
};

export default BaPoCrime;
