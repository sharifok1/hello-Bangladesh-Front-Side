import React from 'react';
import { FormatTimeAgo } from '@/components/FormateTimeAgo/FormateTimeAgo';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import Link from 'next/link';
import api from '@/lib/api';
import Image from 'next/image';
import { getPostImage } from '@/lib/imageUtils';
import { getPostUrl } from '@/lib/urlUtils';

const SciEngHelSuc = ({ sciencenews, engineering, health, successStory }) => {
    return (
     <>
        {/* ------section 8-----------বিজ্ঞান------------স্থাপত্য ও প্রকৌশল----------স্বাস্থ্য---------সফল মুখ---------------*/}
         {/* //for deskto version */}
         <section className="container mx-auto px-4 mb-8 mt-8 hidden md:block"> 
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 container mx-auto"> 
              {/* --------বিজ্ঞান --------*/}     
              <div className="lg:col-span-1">
                <div className="flex justify-between items-center border-b py-2 px-2 mb-4 bg-cyan-500">
                  <h3 className="text-lg font-semi-bold text-white border-l-2 pl-2 pt-1 ">বিজ্ঞান</h3>
                  <Link href="/category/science" className="font-semibold text-white hover:text-red-600 transition-colors duration-200 flex items-center">
                    সব খবর
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
                {sciencenews?.slice(0,1).map((science, index) => (
                      <div key={index} className=" overflow-hidden border-b-2 h-auto">
                        <div className="w-full h-48 relative overflow-hidden rounded-lg">
                          {(() => {
                              const imgsrc = getPostImage(science);
                                return imgsrc ? (
                                <Image
                                src={imgsrc}
                                alt={science?.title}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                fill
                                className="object-cover object-center w-full h-full rounded-md"
                                />
                              ) : null;
                          })()}
                        </div>
                        <div className="py-1 min-h-24">
                          <Link href={getPostUrl(science)} className="block hover:opacity-80">
                            <h3 className="text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                              {science?.title}
                            </h3>
                          </Link>
                            <p className="text-sm font-noto text-stone-500">
                                  {FormatTimeAgo(science?.created_at)}
                            </p>
                        </div>
                      </div>
                    ))}

                    {sciencenews?.slice(1,3).map((science, index) => (
                    <div key={index}
                    className='mt-4'
                     >
                      <div className="news-card">
                        {/* Image */}
                        <div className="news-image w-1/2 min-h-28">
                          {(() => {
                              const imgsrc = getPostImage(science);
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
                         <Link href={getPostUrl(science)} passHref>
                              <h3 className=" text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                                {science?.title?.length > 60
                                  ? science?.title.slice(0, 60) + '...'
                                  : science?.title}
                              </h3>
                            </Link>
                          <p className="text-sm font-noto text-stone-500">
                            {FormatTimeAgo(science?.created_at)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* --------স্থাপত্য ও প্রকৌশল --------*/}
              <div className="lg:col-span-1">
                  <div className="flex justify-between items-center border-b py-2 px-2 mb-4 bg-fuchsia-700">
                  <h3 className="text-lg font-semi-bold text-white border-l-2 pl-2 pt-1">স্থাপত্য ও প্রকৌশল</h3>
                  <Link href="/category/engineering" className="font-semibold text-white hover:text-red-600 transition-colors duration-200 flex items-center">
                    সব খবর
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>

                {engineering?.slice(0,1).map((engineering_news, index) => (
                      <div key={index} className=" overflow-hidden border-b-2">
                       <div className="w-full h-48 relative overflow-hidden rounded-lg">
                          {(() => {
                              const imgsrc = getPostImage(engineering_news);
                                return imgsrc ? (
                                <Image
                                src={imgsrc}
                                alt={engineering_news?.title}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                fill
                                className="object-cover object-center w-full h-full rounded-md"
                                />
                              ) : null;
                          })()}
                        </div>
                        <div className="py-1 min-h-24">
                          <Link href={getPostUrl(engineering_news)} className="block hover:opacity-80">
                            <h3 className="text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                              {engineering_news?.title}
                            </h3>
                          </Link>
                            <p className="text-sm font-noto text-stone-500">
                                  {FormatTimeAgo(engineering_news?.created_at)}
                            </p>
                        </div>
                      </div>
                    ))}

                    {engineering?.slice(1,3).map((engineering_news, index) => (
                    <div 
                    className='mt-4'
                    key={index} >
                      <div className="news-card">
                        {/* Image */}
                        <div className="news-image w-1/2 min-h-28">
                          {(() => {
                              const imgsrc = getPostImage(engineering_news);
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
                        {/* Content */}
                        
                        <div className="news-content w-1/2">
                         <Link href={getPostUrl(engineering_news)} passHref>
                              <h3 className="text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                                {engineering_news?.title?.length > 60
                                  ? engineering_news?.title.slice(0, 60) + '...'
                                  : engineering_news?.title}
                              </h3>
                            </Link>
                          <p className="text-sm font-noto text-stone-500">
                            {FormatTimeAgo(engineering_news?.created_at)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

              </div>

              {/* --------স্বাস্থ্য  --------*/}
              <div className="lg:col-span-1">
                  <div className="flex justify-between items-center border-b py-2 px-2 mb-4 bg-lime-400">
                  <h3 className="text-lg font-semi-bold text-white border-l-2 pl-2 pt-1 ">স্বাস্থ্য</h3>
                  <Link href="/category/health" className="font-semibold text-white hover:text-red-600 transition-colors duration-200 flex items-center">
                    সব খবর
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>

               {health?.slice(0,1).map((health_news, index) => (
                      <div key={index} className=" overflow-hidden border-b-2">
                       <div className="w-full h-48 relative overflow-hidden rounded-lg">
                          {(() => {
                              const imgsrc = getPostImage(health_news);
                                return imgsrc ? (
                                <Image
                                src={imgsrc}
                                alt={health_news?.title}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                fill
                                className="object-cover object-center w-full h-full rounded-md"
                                />
                              ) : null;
                          })()}
                        </div>
                        
                        <div className="py-1 min-h-24">
                          <Link href={getPostUrl(health_news)} className="block hover:opacity-80">
                            <h3 className="text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                              {health_news?.title}
                            </h3>
                          </Link>
                            <p className="text-sm font-noto text-stone-500">
                                  {FormatTimeAgo(health_news?.created_at)}
                            </p>
                        </div>
                      </div>
                    ))}

                    {health?.slice(1,3).map((health_news, index) => (
                    <div 
                    className='mt-4'
                    key={index} >
                      <div className="news-card">
                        {/* Image */}
                        <div className="news-image w-1/2 min-h-28">
                          {(() => {
                              const imgsrc = getPostImage(health_news);
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
                        {/* Content */}
                        <div className="news-content w-1/2">
                         <Link href={getPostUrl(health_news)} passHref>
                              <h3 className="text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                                {health_news?.title?.length > 60
                                  ? health_news?.title.slice(0, 60) + '...'
                                  : health_news?.title}
                              </h3>
                            </Link>
                          <p className="text-sm font-noto text-stone-500">
                            {FormatTimeAgo(health_news?.created_at)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}


              </div>

              {/* --------সফল মুখ  --------*/}
              <div className="lg:col-span-1">
                  <div className="flex justify-between items-center border-b py-2 px-2 mb-4 bg-violet-600">
                  <h3 className="text-lg font-semi-bold text-white border-l-2 pl-2 pt-1">সফল মুখ</h3>
                  <Link href="/category/success-story" className="font-semibold text-white hover:text-red-600 transition-colors duration-200 flex items-center">
                    সব খবর
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
                {successStory?.slice(0,1).map((successStory_news, index) => (
                      <div key={index} className=" overflow-hidden border-b-2">
                       <div className="w-full h-48 relative overflow-hidden rounded-lg">
                          {(() => {
                              const imgsrc = getPostImage(successStory_news);
                                return imgsrc ? (
                                <Image
                                src={imgsrc}
                                alt={successStory_news?.title}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                fill
                                className="object-cover object-center w-full h-full rounded-md"
                                />
                              ) : null;
                          })()}
                        </div>
                        <div className="py-1 min-h-24">
                          <Link href={getPostUrl(successStory_news)} className="block hover:opacity-80">
                            <h3 className="text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                              {successStory_news?.title}
                            </h3>
                          </Link>
                            <p className="news-date">
                                  {FormatTimeAgo(successStory_news?.created_at)}
                            </p>
                        </div>
                      </div>
                    ))}

                    {successStory?.slice(1,3).map((successStory_news, index) => (
                    <div 
                    className='mt-4'
                    key={index} >
                      <div className="news-card">
                        {/* Image */}
                        <div className="news-image w-1/2 min-h-28">
                          {(() => {
                              const imgsrc = getPostImage(successStory_news);
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
                        {/* Content */}
                        <div className="news-content w-1/2">
                         <Link href={getPostUrl(successStory_news)} passHref>
                              <h3 className="text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                                {successStory_news?.title?.length > 80
                                  ? successStory_news?.title.slice(0, 80) + '...'
                                  : successStory_news?.title}
                              </h3>
                            </Link>
                          <p className=" text-sm font-noto text-stone-500">
                            {FormatTimeAgo(successStory_news?.created_at)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

              </div>
            </div>  
      </section> 
 


        {/* -------------For mobile version------------ */}
        <div className='block md:hidden p-2 mobile-swiper'>
            <Swiper
            pagination={{
            type: 'progressbar',
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
        >
            {/* -------------বিজ্ঞান --------------------*/}
            <SwiperSlide>
               
                <div className="flex justify-between items-center border-b py-2 px-2 mb-4 bg-cyan-500">
                  <h3 className="text-lg font-semi-bold text-white border-l-2 pl-2 pt-1 ">বিজ্ঞান</h3>
                  <Link href="/category/science" className="font-semibold text-white hover:text-red-600 transition-colors duration-200 flex items-center">
                    সব খবর
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
                {sciencenews?.slice(0,1).map((science, index) => (
                      <div key={index} className=" overflow-hidden border-b-2 h-auto">
                        <div className="w-full h-48 relative">
                          {(() => {
                              const imgsrc = getPostImage(science);
                                return imgsrc ? (
                                <Image
                                src={imgsrc}
                                alt={science?.title}
                                width={400}
                                height={192}
                                className="object-cover object-center w-full h-full rounded-md"
                                />
                              ) : null;
                          })()}
                        </div>
                        <div className="py-1 min-h-24">
                          <Link href={getPostUrl(science)} className="block hover:opacity-80">
                            <h3 className="text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                              {science?.title}
                            </h3>
                          </Link>
                            <p className="text-sm font-noto text-stone-500">
                                  {FormatTimeAgo(science?.created_at)}
                            </p>
                        </div>
                      </div>
                    ))}

                    {sciencenews?.slice(1,3).map((science, index) => (
                     <div key={index} className='mt-4' >
                      <div className="news-card">
                        <div className="news-image w-1/2 h-32">
                           {(() => {
                                  const imgsrc = getPostImage(science);
                                    return imgsrc ? (
                                    <Image
                                      className='object-cover object-center w-full h-full rounded-lg'
                                      src={imgsrc}
                                      alt="thumbnail"
                                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                      width={200}
                                      height={128}
                                    />
                                  ) : null;
                                })()}
                            </div>
                       
                        {/* Content */}
                        <div className="news-content w-1/2">
                         <Link href={getPostUrl(science)} passHref>
                              <h3 className=" text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                                {science?.title?.length > 60
                                  ? science?.title.slice(0, 60) + '...'
                                  : science?.title}
                              </h3>
                            </Link>
                          <p className="text-sm font-noto text-stone-500">
                            {FormatTimeAgo(science?.created_at)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              
            </SwiperSlide>

            {/* ------------স্থাপত্য ও প্রকৌশল ------------*/}
            <SwiperSlide>
                  <div className="flex justify-between items-center border-b py-2 px-2 mb-4 bg-fuchsia-700">
                  <h3 className="text-lg font-semi-bold text-white border-l-2 pl-2 pt-1">স্থাপত্য ও প্রকৌশল</h3>
                  <Link href="/category/engineering" className="font-semibold text-white hover:text-red-600 transition-colors duration-200 flex items-center">
                    সব খবর
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>

                {engineering?.slice(0,1).map((engineering_news, index) => (
                      <div key={index} className=" overflow-hidden border-b-2">
                        <div className="w-full h-48 relative">
                          {(() => {
                              const imgsrc = getPostImage(engineering_news);
                                return imgsrc ? (
                                <Image
                                src={imgsrc}
                                alt={engineering_news?.title}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                width={400}
                                height={192}
                                className="object-cover object-center rounded-md"
                                />
                              ) : null;
                          })()}
                        </div>
                        <div className="py-1 min-h-24">
                          <Link href={getPostUrl(engineering_news)} className="block hover:opacity-80">
                            <h3 className="text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                              {engineering_news?.title}
                            </h3>
                          </Link>
                            <p className="text-sm font-noto text-stone-500">
                                  {FormatTimeAgo(engineering_news?.created_at)}
                            </p>
                        </div>
                      </div>
                    ))}

                    {engineering?.slice(1,3).map((engineering_news, index) => (
                    <div 
                    className='mt-4'
                    key={index} >
                      <div className="news-card">
                        {/* Image */}
                        <div className="news-image w-1/2 h-32">
                          {(() => {
                              const imgsrc = getPostImage(engineering_news);
                                return imgsrc ? (
                                <Image
                               className='object-cover object-center w-full h-full rounded-lg'
                                src={imgsrc}
                                alt="thumbnail"
                                width={200}
                                height={128}
                                />
                              ) : null;
                          })()}
                            
                        </div>
                        {/* Content */}
                        
                        <div className="news-content w-1/2">
                         <Link href={getPostUrl(engineering_news)} passHref>
                              <h3 className="text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                                {engineering_news?.title?.length > 60
                                  ? engineering_news?.title.slice(0, 60) + '...'
                                  : engineering_news?.title}
                              </h3>
                            </Link>
                          <p className="text-sm font-noto text-stone-500">
                            {FormatTimeAgo(engineering_news?.created_at)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
               
            </SwiperSlide>

            {/* -------------স্বাস্থ্য----------------------- */}
            <SwiperSlide>
                  <div className="flex justify-between items-center border-b py-2 px-2 mb-4 bg-lime-400">
                  <h3 className="text-lg font-semi-bold text-white border-l-2 pl-2 pt-1 ">স্বাস্থ্য</h3>
                  <Link href="/category/health" className="font-semibold text-white hover:text-red-600 transition-colors duration-200 flex items-center">
                    সব খবর
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>

               {health?.slice(0,1).map((health_news, index) => (
                      <div key={index} className=" overflow-hidden border-b-2">
                        <div className="w-full h-48 relative">
                          {(() => {
                              const imgsrc = getPostImage(health_news);
                                return imgsrc ? (
                                <Image
                                src={imgsrc}
                                alt={health_news?.title}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                width={400}
                                height={192}
                                className="object-cover object-center h-full w-full rounded-md"
                                />
                              ) : null;
                          })()}
                        </div>
                        
                        <div className="py-1 min-h-24">
                          <Link href={getPostUrl(health_news)} className="block hover:opacity-80">
                            <h3 className="text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                              {health_news?.title}
                            </h3>
                          </Link>
                            <p className="text-sm font-noto text-stone-500">
                                  {FormatTimeAgo(health_news?.created_at)}
                            </p>
                        </div>
                      </div>
                    ))}

                    {health?.slice(1,3).map((health_news, index) => (
                    <div 
                    className='mt-4'
                    key={index} >
                      <div className="news-card">
                        {/* Image */}
                        <div className="news-image w-1/2 h-32">
                          {(() => {
                              const imgsrc = getPostImage(health_news);
                                return imgsrc ? (
                                <Image
                                className='object-cover object-center w-full h-full rounded-lg'
                                src={imgsrc}
                                alt="thumbnail"
                                width={200}
                                height={128}
                                />
                              ) : null;
                          })()}
                          
                        </div>
                        {/* Content */}
                        <div className="news-content w-1/2">
                         <Link href={getPostUrl(health_news)} passHref>
                              <h3 className="text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                                {health_news?.title?.length > 60
                                  ? health_news?.title.slice(0, 60) + '...'
                                  : health_news?.title}
                              </h3>
                            </Link>
                          <p className="text-sm font-noto text-stone-500">
                            {FormatTimeAgo(health_news?.created_at)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
            </SwiperSlide>

            {/* -------------সফল মুখ------------------- */}
            <SwiperSlide>
                  <div className="flex justify-between items-center border-b py-2 px-2 mb-4 bg-violet-600">
                  <h3 className="text-lg font-semi-bold text-white border-l-2 pl-2 pt-1">সফল মুখ</h3>
                  <Link href="/category/success-story" className="font-semibold text-white hover:text-red-600 transition-colors duration-200 flex items-center">
                    সব খবর
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
                {successStory?.slice(0,1).map((successStory_news, index) => (
                      <div key={index} className=" overflow-hidden border-b-2">
                        <div className="w-full h-48 relative">
                          {(() => {
                              const imgsrc = getPostImage(successStory_news);
                                return imgsrc ? (
                                <Image
                                src={imgsrc}
                                alt={successStory_news?.title}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                width={400}
                                height={192}
                                className="object-cover object-center w-full h-full rounded-md"
                                />
                              ) : null;
                          })()}
                        </div>
                        <div className="py-1 min-h-24">
                          <Link href={getPostUrl(successStory_news)} className="block hover:opacity-80">
                            <h3 className="text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                              {successStory_news?.title}
                            </h3>
                          </Link>
                            <p className="news-date">
                                  {FormatTimeAgo(successStory_news?.created_at)}
                            </p>
                        </div>
                      </div>
                    ))}

                    {successStory?.slice(1,3).map((successStory_news, index) => (
                    <div 
                    className='mt-4'
                    key={index} >
                      <div className="news-card">
                        {/* Image */}
                        <div className="news-image w-1/2 h-32">
                          {(() => {
                              const imgsrc = getPostImage(successStory_news);
                                return imgsrc ? (
                                <Image
                                className='object-cover object-center w-full h-full rounded-lg'
                                src={imgsrc}
                                alt="thumbnail"
                                 width={200}
                                height={128}
                                />
                              ) : null;
                          })()}
                            
                        </div>
                        {/* Content */}
                        <div className="news-content w-1/2">
                         <Link href={getPostUrl(successStory_news)} passHref>
                              <h3 className="text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                                {successStory_news?.title?.length > 80
                                  ? successStory_news?.title.slice(0, 80) + '...'
                                  : successStory_news?.title}
                              </h3>
                            </Link>
                          <p className=" text-sm font-noto text-stone-500">
                            {FormatTimeAgo(successStory_news?.created_at)}
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

export default SciEngHelSuc;
