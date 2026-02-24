import React, { useEffect, useState } from 'react';
import { FormatTimeAgo } from '@/components/FormateTimeAgo/FormateTimeAgo';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import Link from 'next/link';
import api from '@/lib/api';
import Image from 'next/image';
import { getPostImage } from '@/lib/imageUtils';
import { getPostUrl } from '@/lib/urlUtils';

const SpoBusTecAllc = () => {
    // const [bangladeshNews, setBangladeshNews] = useState([]);
    // const [politics, setPolitics] = useState([]);
    // const [crime, setCrime] = useState([]);
    const [economy, setEconomy] = useState([]);
    const [sports, setSports] = useState([]);
    const [technews, setTechnews] = useState([]);
    const [countrynews, setCountrynews] = useState([]);

     useEffect(() => {
        api.get('/home')
          .then(res => {
            const postsData = res.data;  // all news
            setEconomy(postsData?.economy_popular_news); // economic - business
            setSports(postsData?.sports_popular_news); // sports
            setTechnews(postsData?.technology_popular_news); // Technology
            setCountrynews(postsData?.country_popular_news); // All bangladesh news
          })
          .catch(err => {
            console.error('Error fetching data:', err);
          })
      }, []);
    return (
     <>

     {/* //for deskto version */}
       {/* ------section 6---------খেলা-----------বাণিজ্য-----------প্রযুক্তি --------সারাদেশ---------------*/}
            <section className="mb-8  hidden md:block">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">      
                {/* --------খেলা --------*/}     
              <div className="lg:col-span-1">
               <div className="flex justify-between items-center border-b py-2 px-2 mb-4 bg-lime-800">
                  <h3 className="text-lg font-semi-bold text-white border-l-2 pl-2 pt-1 ">খেলা</h3>
                  <Link href="/category/sports" className="font-semibold text-white hover:text-red-600 transition-colors duration-200 flex items-center">
                    সব খবর
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
                {sports?.slice(0,1).map((sports_news, index) => (
                      <div key={index} className=" overflow-hidden border-b-2">
                        <div className="w-full h-48 relative overflow-hidden rounded-lg">
                          {(() => {
                              const imgsrc = getPostImage(sports_news);
                                return imgsrc ? (
                                <Image
                                  className="object-cover w-full h-full"
                                  src={imgsrc}
                                  alt={sports_news?.title}
                                  fill
                                  sizes="(max-width: 768px) 100vw, 400px"
                                  quality={80}
                                />
                              ) : null;
                          })()}
                        </div>
                       
                        <div className="py-1 min-h-24">
                          <Link href={getPostUrl(sports_news)} className="block hover:opacity-80">
                            <h3 className="text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                              {sports_news?.title}
                            </h3>
                          </Link>
                            <p className="text-sm font-noto text-stone-500">
                                  {FormatTimeAgo(sports_news?.created_at)}
                            </p>
                        </div>
                      </div>
                    ))}

                    {sports?.slice(1,3).map((sports_news, index) => (
                    <div 
                    className='mt-4'
                    key={index} >
                      <div className="news-card">
                        {/* Image */}
                        <div className="news-image w-1/2 min-h-28">
                          {(() => {
                            const imgsrc = getPostImage(sports_news);
                              return imgsrc ? (
                              <Image
                              className='object-cover object-center w-full h-full rounded-lg'
                              src={imgsrc}
                              alt="thumbnail"
                              width={300}
                              height={300}
                              />
                            ) : null;
                          })()}
                        </div>
                        {/* Content */}
                         
                        <div className="news-content w-1/2">
                         <Link href={getPostUrl(sports_news)} passHref>
                              <h3 className="text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                                {sports_news?.title?.length > 80
                                  ? sports_news?.title?.slice(0, 80) + '...'
                                  : sports_news?.title}
                              </h3>
                            </Link>
                          <p className="text-sm font-noto text-stone-500">
                            {FormatTimeAgo(sports_news?.created_at)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              {/* --------বাণিজ্য  --------*/}
            <div className="lg:col-span-1">
                <div className="flex justify-between items-center border-b py-2 px-2 mb-4 bg-yellow-500">
                  <h3 className="text-lg font-semi-bold text-white border-l-2 pl-2 pt-1">বাণিজ্য</h3>
                  <Link href="/category/economy" className="font-semibold text-white hover:text-red-600 transition-colors duration-200 flex items-center">
                    সব খবর
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>

                {economy?.slice(0,1).map((economy_news, index) => (
                      <div key={index} className=" overflow-hidden border-b-2">
                        <div className="w-full h-48 relative overflow-hidden rounded-lg">
                          {(() => {
                              const imgsrc = getPostImage(economy_news);
                                return imgsrc ? (
                                <Image
                                  className="object-cover w-full h-full"
                                  src={imgsrc}
                                  alt={economy_news?.title}
                                  fill
                                  sizes="(max-width: 768px) 100vw, 400px"
                                  quality={80}
                                />
                              ) : null;
                          })()}
                        </div>
                        <div className="py-1 min-h-24">
                          <Link href={getPostUrl(economy_news)} className="block hover:opacity-80">
                            <h3 className="text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                              {economy_news?.title}
                            </h3>
                          </Link>
                            <p className="text-sm font-noto text-stone-500">
                                  {FormatTimeAgo(economy_news?.created_at)}
                            </p>
                        </div>
                      </div>
                    ))}

                    {economy?.slice(1,3).map((economy_news, index) => (
                    <div key={index}
                    className='mt-4'
                     >
                     
                      <div className="news-card">
                        {/* Image */}
                        <div className="news-image w-1/2 min-h-28">
                          {(() => {
                              const imgsrc = getPostImage(economy_news);
                                return imgsrc ? (
                                <Image
                                  className='object-cover object-center rounded-lg h-full w-full'
                                  src={imgsrc}
                                  alt="thumbnail"
                                  width={300}
                                  height={300}
                                />
                              ) : null;
                          })()}
                          
                        </div>
                        {/* Content */}
                        <div className="news-content w-1/2">
                         <Link href={getPostUrl(economy_news)} passHref>
                              <h3 className="text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                                {economy_news?.title?.length > 80
                                  ? economy_news?.title.slice(0, 80) + '...'
                                  : economy_news?.title}
                              </h3>
                            </Link>
                          <p className="text-sm font-noto text-stone-500">
                            {FormatTimeAgo(economy_news?.created_at)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          {/* --------প্রযুক্তি  --------*/}
              <div className="lg:col-span-1">
                  <div className="flex justify-between items-center border-b py-2 px-2 mb-4 bg-sky-500">
                  <h3 className="text-lg font-semi-bold text-white border-l-2 pl-2 pt-1">প্রযুক্তি</h3>
                  <Link href="/category/technology" className="font-semibold text-white hover:text-red-600 transition-colors duration-200 flex items-center">
                    সব খবর
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
 
                {technews?.slice(0,1).map((tech_news, index) => (
                      <div key={index} className=" overflow-hidden border-b-2">
                        <div className="w-full h-48 relative overflow-hidden rounded-lg">
                          {(() => {
                              const imgsrc = getPostImage(tech_news);
                                return imgsrc ? (
                                <Image
                                  className="object-cover w-full h-full"
                                  src={imgsrc}
                                  alt={tech_news?.title}
                                  fill
                                  sizes="(max-width: 768px) 100vw, 400px"
                                  quality={80}
                                />
                              ) : null;
                          })()}
                        </div>
                        <div className="py-1 min-h-24">
                          <Link href={getPostUrl(tech_news)} className="block hover:opacity-80">
                            <h3 className="text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                              {tech_news?.title}
                            </h3>
                          </Link>
                            <p className="text-sm font-noto text-stone-500">
                                  {FormatTimeAgo(tech_news?.created_at)}
                            </p>
                        </div>
                      </div>
                    ))}

                    {technews?.slice(1,3).map((tech_news, index) => (
                    <div key={index}
                    className='mt-4'>
                      <div className="news-card">
                        {/* Image */}
                        <div className="news-image w-1/2 min-h-28">
                          {(() => {
                              const imgsrc = getPostImage(tech_news);
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
                        {/* Content */}
                        <div className="news-content w-1/2">
                         <Link href={getPostUrl(tech_news)} passHref>
                              <h3 className="text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                                {tech_news?.title?.length > 80
                                  ? tech_news?.title.slice(0, 80) + '...'
                                  : tech_news?.title}
                              </h3>
                            </Link>
                          <p className="text-sm font-noto text-stone-500">
                            {FormatTimeAgo(tech_news?.created_at)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* --------সারাদেশ  --------*/}
              <div className="lg:col-span-1">
                  <div className="flex justify-between items-center border-b py-2 px-2 mb-4 bg-red-600">
                  <h3 className="text-lg font-semi-bold text-white border-l-2 pl-2 pt-1">সারাদেশ</h3>
                  <Link href="/category/country" className="font-semibold text-white hover:text-red-600 transition-colors duration-200 flex items-center">
                    সব খবর
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>

                {countrynews?.slice(0,1).map((country, index) => (
                      <div key={index} className=" overflow-hidden border-b-2">
                        <div className="w-full h-48 relative overflow-hidden rounded-lg">
                          {(() => {
                              const imgsrc = getPostImage(country);
                                return imgsrc ? (
                                <Image
                                  className="object-cover w-full h-full"
                                  src={imgsrc}
                                  alt={country?.title}
                                  fill
                                  sizes="(max-width: 768px) 100vw, 400px"
                                  quality={80}
                                />
                              ) : null;
                          })()}
                        </div>
                        
                        <div className="py-1 min-h-24">
                          <Link href={getPostUrl(country)} className="block hover:opacity-80">
                            <h3 className="text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                              {country?.title}
                            </h3>
                          </Link>
                            <p className="text-sm font-noto text-stone-500">
                                  {FormatTimeAgo(country?.created_at)}
                            </p>
                        </div>
                      </div>
                    ))}
 
                    {countrynews?.slice(1,3).map((country, index) => (
                    <div key={index} className='mt-4' >
                      <div className="news-card">
                        {/* Image */}
                        <div className="news-image w-1/2 min-h-28">
                          {(() => {
                              const imgsrc = getPostImage(country);
                                return imgsrc ? (
                                <Image
                                className='object-cover object-center w-full h-full rounded-lg'
                                src={imgsrc}
                                alt="thumbnail"
                                width={300}
                                height={300}
                                />
                              ) : null;
                          })()}
                        </div>
                        {/* Content */}
                        <div className="news-content w-1/2">
                         <Link href={getPostUrl(country)} passHref>
                              <h3 className="text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                                {country?.title?.length > 80
                                  ? country?.title.slice(0, 80) + '...'
                                  : country?.title}
                              </h3>
                            </Link>
                          <p className="text-sm font-noto text-stone-500">
                            {FormatTimeAgo(country?.created_at)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              </div>  
            </section>


        {/* For mobile version */}

{/* ------section 6---------খেলা-----------বাণিজ্য-----------প্রযুক্তি --------সারাদেশ---------------*/}
        <div className='mobile-swiper block md:hidden'>
            <Swiper
            pagination={{
            type: 'progressbar',
            }}
            navigation={true}
            autoPlay = {true}
            modules={[Pagination, Navigation, Autoplay]}
            className="mySwiper"
        >
            {/* খেলা- */}
            <SwiperSlide>
               <div className="flex justify-between items-center border-b py-2 px-2 mb-4 bg-lime-800">
                  <h3 className="text-lg font-semi-bold text-white border-l-2 pl-2 pt-1 ">খেলা</h3>
                  <Link href="/category/sports" className="font-semibold text-white hover:text-red-600 transition-colors duration-200 flex items-center">
                    সব খবর
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
                {sports?.slice(0,1).map((sports_news, index) => (
                      <div key={index} className=" overflow-hidden border-b-2">
                        <div className="w-full h-48 relative">
                          {(() => {
                            const imgsrc = getPostImage(sports_news);
                              return imgsrc ? (
                              <Image
                                src={imgsrc}
                                alt={sports_news?.title}
                                fill
                                className="object-cover rounded-md"
                              />
                            ) : null;
                          })()}
                        </div>
                       
                        <div className="py-1 min-h-24">
                          <Link href={getPostUrl(sports_news)} className="block hover:opacity-80">
                            <h3 className="text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                              {sports_news?.title}
                            </h3>
                          </Link>
                            <p className="text-sm font-noto text-stone-500">
                                  {FormatTimeAgo(sports_news?.created_at)}
                            </p>
                        </div>
                      </div>
                    ))}

                    {sports?.slice(1,3).map((sports_news, index) => (
                    <div 
                    className='mt-4'
                    key={index} >
                     <div className="news-card">
                        <div className="news-image w-1/2 h-32">
                         {(() => {
                                const imgsrc = getPostImage(sports_news);
                                  return imgsrc ? (
                                  <Image
                                    className='object-cover object-center w-full h-full rounded-lg'
                                    src={imgsrc}
                                    alt="thumbnail"
                                    width={300}
                                    height={300}
                                  />
                                ) : null;
                              })()}
                          </div>
                        {/* Content */}
                         
                        <div className="news-content w-1/2">
                         <Link href={getPostUrl(sports_news)} passHref>
                              <h3 className="text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                                {sports_news?.title?.length > 80
                                  ? sports_news?.title?.slice(0, 80) + '...'
                                  : sports_news?.title}
                              </h3>
                            </Link>
                          <p className="text-sm font-noto text-stone-500">
                            {FormatTimeAgo(sports_news?.created_at)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
            </SwiperSlide>
            {/* -বাণিজ্য- */}
            <SwiperSlide>
                <div className="flex justify-between items-center border-b py-2 px-2 mb-4 bg-yellow-500">
                  <h3 className="text-lg font-semi-bold text-white border-l-2 pl-2 pt-1">বাণিজ্য</h3>
                  <Link href="/category/economy" className="font-semibold text-white hover:text-red-600 transition-colors duration-200 flex items-center">
                    সব খবর
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>

                {economy?.slice(0,1).map((economy_news, index) => (
                      <div key={index} className=" overflow-hidden border-b-2">
                        <div className="w-full h-48 relative">
                          {(() => {
                              const imgsrc = getPostImage(economy_news);
                                return imgsrc ? (
                                <Image
                                src={imgsrc}
                                alt={economy_news?.title}
                                fill
                                className="object-cover rounded-md"
                                />
                              ) : null;
                          })()}
                        </div>
                        <div className="py-1 min-h-24">
                          <Link href={getPostUrl(economy_news)} className="block hover:opacity-80">
                            <h3 className="text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                              {economy_news?.title}
                            </h3>
                          </Link>
                            <p className="text-sm font-noto text-stone-500">
                                  {FormatTimeAgo(economy_news?.created_at)}
                            </p>
                        </div>
                      </div>
                    ))}

                    {economy?.slice(1,3).map((economy_news, index) => (
                    <div key={index}
                    className='mt-4'
                     >
                     
                     <div className="news-card">
                         <div className="news-image w-1/2 h-32">
                          {(() => {
                              const imgsrc = getPostImage(economy_news);
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
                        {/* Content */}
                        <div className="news-content w-1/2">
                         <Link href={getPostUrl(economy_news)} passHref>
                              <h3 className="text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                                {economy_news?.title?.length > 80
                                  ? economy_news?.title.slice(0, 80) + '...'
                                  : economy_news?.title}
                              </h3>
                            </Link>
                          <p className="text-sm font-noto text-stone-500">
                            {FormatTimeAgo(economy_news?.created_at)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              

            </SwiperSlide>

            {/* প্রযুক্তি  */}
            <SwiperSlide>
                  <div className="flex justify-between items-center border-b py-2 px-2 mb-4 bg-sky-500">
                  <h3 className="text-lg font-semi-bold text-white border-l-2 pl-2 pt-1">প্রযুক্তি</h3>
                  <Link href="/category/technology" className="font-semibold text-white hover:text-red-600 transition-colors duration-200 flex items-center">
                    সব খবর
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
 
                {technews?.slice(0,1).map((tech_news, index) => (
                      <div key={index} className=" overflow-hidden border-b-2">
                        <div className="w-full h-48 relative">
                          {(() => {
                              const imgsrc = getPostImage(tech_news);
                                return imgsrc ? (
                                <Image
                                src={imgsrc}
                                alt={tech_news?.title}
                                fill
                                className="object-cover rounded-md"
                                />
                              ) : null;
                          })()}
                        </div>
                        <div className="py-1 min-h-24">
                          <Link href={getPostUrl(tech_news)} className="block hover:opacity-80">
                            <h3 className="text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                              {tech_news?.title}
                            </h3>
                          </Link>
                            <p className="text-sm font-noto text-stone-500">
                                  {FormatTimeAgo(tech_news?.created_at)}
                            </p>
                        </div>
                      </div>
                    ))}

                    {technews?.slice(1,3).map((tech_news, index) => (
                    <div key={index}
                    className='mt-4'>
                      <div className="news-card">
                        <div className="news-image w-1/2 h-32">
                          {(() => {
                              const imgsrc = getPostImage(tech_news);
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
                        {/* Content */}
                        <div className="news-content w-1/2">
                         <Link href={getPostUrl(tech_news)} passHref>
                              <h3 className="text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                                {tech_news?.title?.length > 80
                                  ? tech_news?.title.slice(0, 80) + '...'
                                  : tech_news?.title}
                              </h3>
                            </Link>
                          <p className="text-sm font-noto text-stone-500">
                            {FormatTimeAgo(tech_news?.created_at)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
            </SwiperSlide>

            {/* সারাদেশ */}
            <SwiperSlide>
                  <div className="flex justify-between items-center border-b py-2 px-2 mb-4 bg-red-600">
                  <h3 className="text-lg font-semi-bold text-white border-l-2 pl-2 pt-1">সারাদেশ</h3>
                  <Link href="/category/country" className="font-semibold text-white hover:text-red-600 transition-colors duration-200 flex items-center">
                    সব খবর
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>

                {countrynews?.slice(0,1).map((country, index) => (
                      <div key={index} className=" overflow-hidden border-b-2">
                        <div className="w-full h-48 relative">
                          {(() => {
                              const imgsrc = getPostImage(country);
                                return imgsrc ? (
                                <Image
                                src={imgsrc}
                                alt={country?.title}
                                fill
                                className="object-cover rounded-md"
                                />
                              ) : null;
                          })()}
                        </div>
                        
                        <div className="py-1 min-h-24">
                          <Link href={getPostUrl(country)} className="block hover:opacity-80">
                            <h3 className="text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                              {country?.title}
                            </h3>
                          </Link>
                            <p className="text-sm font-noto text-stone-500">
                                  {FormatTimeAgo(country?.created_at)}
                            </p>
                        </div>
                      </div>
                    ))}

                    {countrynews?.slice(1,3).map((country, index) => (
                    <div key={index} className='mt-4' >
                      <div className="news-card">
                        <div className="news-image w-1/2 h-32">
                          {(() => {
                              const imgsrc = getPostImage(country);
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
                        {/* Content */}
                        <div className="news-content w-1/2">
                         <Link href={getPostUrl(country)} passHref>
                              <h3 className="text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                                {country?.title?.length > 80
                                  ? country?.title.slice(0, 80) + '...'
                                  : country?.title}
                              </h3>
                            </Link>
                          <p className="text-sm font-noto text-stone-500">
                            {FormatTimeAgo(country?.created_at)}
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

export default SpoBusTecAllc;
