import React, { useEffect, useState } from 'react';
import { FormatTimeAgo } from '@/components/FormateTimeAgo/FormateTimeAgo';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import Link from 'next/link';
import api from '@/lib/api';
import Image from 'next/image';
import GlobalNewsDate from '@/components/GlobalNewsDate/GlobalNewsDate';
import { getPostImage } from '@/lib/imageUtils';
import { getPostUrl } from '@/lib/urlUtils';

const EduEnvIntCor = ({ education, environment, interview, corporateNews }) => {
    return (
     <>
      {/* ----শিক্ষা------------পরিবেশ---------মুখোমুখি---------করপোরেট সংবাদ---------*/}
      {/* //for deskto version */}
  
        <section className="container mx-auto px-4 mb-8 mt-8 hidden md:block"> 
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 container mx-auto"> 
              {/* --------শিক্ষা --------*/}     
              <div className="lg:col-span-1">
                <div className="flex justify-between items-center border-b py-2 px-2 mb-4 bg-cyan-500">
                  <h3 className="text-lg font-semi-bold text-white border-l-2 pl-2 pt-1 ">শিক্ষা</h3>
                  <Link href="/category/education" className="font-semibold text-white hover:text-red-600 transition-colors duration-200 flex items-center">
                     সব খবর
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
                {education?.slice(0,1).map((educationNews, index) => (
                      <div key={index} className=" overflow-hidden border-b-2">
                        <div className="w-full h-48 relative overflow-hidden rounded-lg">
                           {(() => {
                               const imgsrc = getPostImage(educationNews);
                                 return imgsrc ? (
                                 <Image
                                   src={imgsrc}
                                  alt={educationNews?.title}
                                  fill
                                  className="object-cover object-center w-full h-full rounded-md"
                                 />
                               ) : null;
                             })()}
                        </div>
                        <div className="py-1 min-h-24">
                          <Link href={getPostUrl(educationNews)} className="block hover:opacity-80">
                            <h3 className="text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                              {educationNews?.title}
                            </h3>
                          </Link>
                            <p className="text-sm font-noto text-stone-500">
                                  {FormatTimeAgo(educationNews?.created_at)}
                            </p>
                        </div>
                      </div>
                    ))}

                
                    {education?.slice(1,3).map((educationNews, index) => (
                    <div 
                    className='mt-4'
                    key={index} >
                      <div className="news-card">
                        {/* Image */}
                        <div className="news-image w-1/2 min-h-28">
                        {educationNews?.media?.[0]?.original_url && (
                          <Image
                            className='object-cover object-center w-full h-full rounded-lg'
                            src={educationNews?.media?.[0]?.original_url}
                            alt="thumbnail"
                            width={300}
                            height={300}
                          />)}
                          
                        </div>
                        {/* Content */}
                        <div className="news-content w-1/2">
                         <Link href={getPostUrl(educationNews)} passHref>
                              <h3 className="text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                                {educationNews?.title?.length > 60
                                  ? educationNews?.title.slice(0, 60) + '...'
                                  : educationNews?.title}
                              </h3>
                            </Link>
                          <p className=" text-sm font-noto text-stone-500">
                            {GlobalNewsDate(educationNews?.created_at)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* --------পরিবেশ --------*/}
              <div className="lg:col-span-1">
                  <div className="flex justify-between items-center border-b py-2 px-2 mb-4 bg-fuchsia-700">
                  <h3 className="text-lg font-semi-bold text-white border-l-2 pl-2 pt-1">পরিবেশ</h3>
                  <Link href="/category/environment" className="font-semibold text-white hover:text-red-600 transition-colors duration-200 flex items-center">
                    সব খবর
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
                {environment?.slice(0,1).map((environment_news, index) => (
                      <div key={index} className=" overflow-hidden border-b-2">
                        <div className="w-full h-48 relative overflow-hidden rounded-lg">
                           {(() => {
                               const imgsrc = getPostImage(environment_news);
                                 return imgsrc ? (
                                 <Image
                                   src={imgsrc}
                                    alt={environment_news?.title}
                                    fill
                                    className="object-cover object-center w-full h-full rounded-md"
                                 />
                               ) : null;
                             })()}

                        </div>
                        <div className="py-1 min-h-24">
                          <Link href={getPostUrl(environment_news)} className="block hover:opacity-80">
                            <h3 className="text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                              {environment_news?.title}
                            </h3>
                          </Link>
                            <p className="text-sm font-noto text-stone-500">
                                  {FormatTimeAgo(environment_news?.created_at)}
                            </p>
                        </div>
                      </div>
                    ))}

                    {environment?.slice(1,3).map((environment_news, index) => (
                    <div key={index} 
                    className='mt-4'>
                      <div className="news-card">
                        {/* Image */}
                        <div className="news-image w-1/2 min-h-28">
                        {environment_news?.media?.[0]?.original_url && (
                          <Image
                            className='object-cover object-center w-full h-full rounded-lg'
                            src={environment_news?.media?.[0]?.original_url}
                            alt="thumbnail"
                            width={300}
                            height={300}
                          />)}
                           
                        </div>
                        {/* Content */}
                        <div className="news-content w-1/2">
                         <Link href={getPostUrl(environment_news)} passHref>
                              <h3 className=" text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                                {environment_news?.title?.length > 60
                                  ? environment_news?.title.slice(0, 60) + '...'
                                  : environment_news?.title}
                              </h3>
                            </Link>
                          <p className="text-sm font-noto text-stone-500">
                            {FormatTimeAgo(environment_news?.created_at)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

              </div>

              {/* --------মুখোমুখি  --------*/}
              <div className="lg:col-span-1">
                  <div className="flex justify-between items-center border-b py-2 px-2 mb-4 bg-lime-400">
                  <h3 className="text-lg font-semi-bold text-white border-l-2 pl-2 pt-1 ">মুখোমুখি</h3>
                  <Link href="/category/interview" className="font-semibold text-white hover:text-red-600 transition-colors duration-200 flex items-center">
                    সব খবর
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
               {interview?.slice(0,1).map((interview_news, index) => (
                      <div key={index} className=" overflow-hidden border-b-2">
                        <div className="w-full h-48 relative overflow-hidden rounded-lg">
                           {(() => {
                               const imgsrc = getPostImage(interview_news);
                                 return imgsrc ? (
                                 <Image
                                  src={imgsrc}
                                  alt={interview_news?.title}
                                  fill
                                  className="object-cover object-center w-full h-full rounded-md"
                                 />
                               ) : null;
                             })()}
                        </div>
                        <div className="py-1 min-h-24">
                          <Link href={getPostUrl(interview_news)} className="block hover:opacity-80">
                            <h3 className="text-lg mb-2 line-clamp-2 font-noto text-stone-800" >
                              {interview_news?.title}
                            </h3>
                          </Link>
                            <p className="text-sm font-noto text-stone-500">
                                  {FormatTimeAgo(interview_news?.created_at)}
                            </p>
                        </div>
                      </div>
                    ))}

                    {interview?.slice(1,3).map((interview_news, index) => (
                    <div key={index}
                    className='mt-4'
                    >
                      <div className="news-card">
                        {/* Image */}
                        <div className="news-image w-1/2 min-h-28">
                        {interview_news?.media?.[0]?.original_url && (
                          <Image
                            className='object-cover object-center w-full h-full rounded-lg'
                            src={interview_news?.media?.[0]?.original_url}
                            alt="thumbnail"
                            width={300}
                            height={300}
                          />)}
                          
                        </div>
                        {/* Content */}
                        <div className="news-content w-1/2">
                         <Link href={getPostUrl(interview_news)} passHref>
                              <h3 className="text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                                {interview_news?.title?.length > 60
                                  ? interview_news?.title?.slice(0, 60) + '...'
                                  : interview_news?.title}
                              </h3>
                            </Link>
                          <p className="text-sm font-noto text-stone-500">
                            {FormatTimeAgo(interview_news?.created_at)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

              </div>

              {/* -------- করপোরেট সংবাদ  --------*/}
              <div className="lg:col-span-1">
                  <div className="flex justify-between items-center border-b py-2 px-2 mb-4 bg-violet-600">
                  <h3 className="text-lg font-semi-bold text-white border-l-2 pl-2 pt-1">করপোরেট সংবাদ</h3>
                  <Link href="/category/corporate-news" className="font-semibold text-white hover:text-red-600 transition-colors duration-200 flex items-center">
                    সব খবর
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>

                {corporateNews?.slice(0,1).map((corporate, index) => (
                      <div key={index} className=" overflow-hidden border-b-2">
                        <div className="w-full h-48 relative overflow-hidden rounded-lg">
                          {(() => {
                               const imgsrc = getPostImage(corporate);
                                 return imgsrc ? (
                                 <Image
                                 src={imgsrc}
                                  alt={corporate?.title}
                                  fill
                                  className="object-cover object-center w-full h-full rounded-md"
                                 />
                               ) : null;
                             })()}
                             
                        </div>
                        <div className="py-1 min-h-24">
                          <Link href={getPostUrl(corporate)} className="block hover:opacity-80">
                            <h3 className="text-lg mb-2 line-clamp-2 font-noto text-stone-800" >
                              {corporate?.title}
                            </h3>
                          </Link>
                            <p className="text-sm font-noto text-stone-500">
                                  {FormatTimeAgo(corporate?.created_at)}
                            </p>
                        </div>
                      </div>
                    ))}

                    {corporateNews?.slice(1,3).map((corporate, index) => (
                    <div key={index}
                    className='mt-4'
                     >
                      <div className="news-card">
                        {/* Image */}
                        <div className="news-image w-1/2 min-h-28">
                        {corporate?.media?.[0]?.original_url && (
                          <Image
                            className='object-cover object-center w-full h-full rounded-lg'
                            src={corporate?.media?.[0]?.original_url}
                            alt="thumbnail"
                            width={300}
                            height={300}
                          />)}
                            
                        </div>
                        {/* Content */}
                        <div className="news-content w-1/2">
                         <Link href={getPostUrl(corporate)} passHref>
                              <h3 className="text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                                {corporate?.title?.length > 80
                                  ? corporate?.title.slice(0, 80) + '...'
                                  : corporate?.title}
                              </h3>
                            </Link>
                          <p className="text-sm font-noto text-stone-500">
                            {FormatTimeAgo(corporate?.created_at)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

              </div>
            </div>  
      </section> 

        {/* For mobile version */}
        <div className='block md:hidden p-2 rounded mobile-swiper'>
            <Swiper
            pagination={{
            type: 'progressbar',
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
        >
            {/* --------শিক্ষা --------*/} 
            <SwiperSlide>
                <div className="flex justify-between items-center border-b py-2 px-2 mb-4 bg-cyan-500">
                  <h3 className="text-lg font-semi-bold text-white border-l-2 pl-2 pt-1 ">শিক্ষা</h3>
                  <Link href="/category/education" className="font-semibold text-white hover:text-red-600 transition-colors duration-200 flex items-center">
                     সব খবর
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
                {education?.slice(0,1).map((educationNews, index) => (
                      <div key={index} className=" overflow-hidden border-b-2">
                        <div className="w-full h-48 relative">
                          {(() => {
                               const imgsrc = getPostImage(educationNews);
                                 return imgsrc ? (
                                 <Image
                                  src={imgsrc}
                                  alt={educationNews?.title}
                                   width={400}
                                   height={192}
                                  // fill
                                  className="object-cover object-center w-full h-full rounded-md"
                                 />
                               ) : null;
                             })()}
                        </div>
                        <div className="py-1 min-h-24">
                          <Link href={getPostUrl(educationNews)} className="block hover:opacity-80">
                            <h3 className="text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                              {educationNews?.title}
                            </h3>
                          </Link>
                            <p className="text-sm font-noto text-stone-500">
                                  {FormatTimeAgo(educationNews?.created_at)}
                            </p>
                        </div>
                      </div>
                    ))}

                
                    {education?.slice(1,3).map((educationNews, index) => (
                    <div 
                    className='mt-4'
                    key={index} >
                      <div className="news-card">
                        {/* Image */}
                        <div className="news-image w-1/2 h-32">
                          {(() => {
                               const imgsrc = getPostImage(educationNews);
                                 return imgsrc ? (
                                 <Image
                                  className='object-cover object-center w-full h-full rounded-md'
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
                         <Link href={getPostUrl(educationNews)} passHref>
                              <h3 className="text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                                {educationNews?.title?.length > 60
                                  ? educationNews?.title.slice(0, 60) + '...'
                                  : educationNews?.title}
                              </h3>
                            </Link>
                          <p className=" text-sm font-noto text-stone-500">
                            {GlobalNewsDate(educationNews?.created_at)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
            </SwiperSlide>

            {/* --------পরিবেশ --------*/}
            <SwiperSlide>
                  <div className="flex justify-between items-center border-b py-2 px-2 mb-4 bg-fuchsia-700">
                  <h3 className="text-lg font-semi-bold text-white border-l-2 pl-2 pt-1">পরিবেশ</h3>
                  <Link href="/category/environment" className="font-semibold text-white hover:text-red-600 transition-colors duration-200 flex items-center">
                    সব খবর
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
                {environment?.slice(0,1).map((environment_news, index) => (
                      <div key={index} className=" overflow-hidden border-b-2">
                        <div className="w-full h-48 relative">
                           {(() => {
                               const imgsrc = getPostImage(environment_news);
                                 return imgsrc ? (
                                 <Image
                                  src={imgsrc}
                                  alt={environment_news?.title}
                                  width={400}
                                  height={192}
                                  className="object-cover object-center w-full h-full rounded-md"
                                 />
                               ) : null;
                             })()}
                        </div>
                        <div className="py-1 min-h-24">
                          <Link href={getPostUrl(environment_news)} className="block hover:opacity-80">
                            <h3 className="text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                              {environment_news?.title}
                            </h3>
                          </Link>
                            <p className="text-sm font-noto text-stone-500">
                                  {FormatTimeAgo(environment_news?.created_at)}
                            </p>
                        </div>
                      </div>
                    ))}

                    {environment?.slice(1,3).map((environment_news, index) => (
                    <div key={index} 
                    className='mt-4'>
                      <div className="news-card">
                        {/* Image */}
                        <div className="news-image w-1/2 h-32">

                          {(() => {
                               const imgsrc = getPostImage(environment_news);
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
                         <Link href={getPostUrl(environment_news)} passHref>
                              <h3 className=" text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                                {environment_news?.title?.length > 60
                                  ? environment_news?.title.slice(0, 60) + '...'
                                  : environment_news?.title}
                              </h3>
                            </Link>
                          <p className="text-sm font-noto text-stone-500">
                            {FormatTimeAgo(environment_news?.created_at)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
            </SwiperSlide>

            {/* --------মুখোমুখি  --------*/}
            <SwiperSlide>
                  <div className="flex justify-between items-center border-b py-2 px-2 mb-4 bg-lime-400">
                  <h3 className="text-lg font-semi-bold text-white border-l-2 pl-2 pt-1 ">মুখোমুখি</h3>
                  <Link href="/category/interview" className="font-semibold text-white hover:text-red-600 transition-colors duration-200 flex items-center">
                    সব খবর
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
               {interview?.slice(0,1).map((interview_news, index) => (
                      <div key={index} className=" overflow-hidden border-b-2">
                        <div className="w-full h-48 relative">
                           {(() => {
                               const imgsrc = getPostImage(interview_news);
                                 return imgsrc ? (
                                 <Image
                                  src={imgsrc}
                                  alt={interview_news?.title}
                                  width={400}
                                  height={192}
                                  className="object-cover object-center w-full h-full rounded-md"
                                 />
                               ) : null;
                             })()}

                        </div>
                        <div className="py-1 min-h-24">
                          <Link href={getPostUrl(interview_news)} className="block hover:opacity-80">
                            <h3 className="text-lg mb-2 line-clamp-2 font-noto text-stone-800" >
                              {interview_news?.title}
                            </h3>
                          </Link>
                            <p className="text-sm font-noto text-stone-500">
                                  {FormatTimeAgo(interview_news?.created_at)}
                            </p>
                        </div>
                      </div>
                    ))}

                    {interview?.slice(1,3).map((interview_news, index) => (
                    <div key={index}
                    className='mt-4'
                    >
                      <div className="news-card">
                        {/* Image */}
                        <div className="news-image w-1/2 h-32">
                           {(() => {
                               const imgsrc = getPostImage(interview_news);
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
                         <Link href={getPostUrl(interview_news)} passHref>
                              <h3 className="text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                                {interview_news?.title?.length > 60
                                  ? interview_news?.title?.slice(0, 60) + '...'
                                  : interview_news?.title}
                              </h3>
                            </Link>
                          <p className="text-sm font-noto text-stone-500">
                            {FormatTimeAgo(interview_news?.created_at)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
            </SwiperSlide>

            {/* -------- করপোরেট সংবাদ  --------*/}
            <SwiperSlide>
                  <div className="flex justify-between items-center border-b py-2 px-2 mb-4 bg-violet-600">
                  <h3 className="text-lg font-semi-bold text-white border-l-2 pl-2 pt-1">করপোরেট সংবাদ</h3>
                  <Link href="/category/corporate-news" className="font-semibold text-white hover:text-red-600 transition-colors duration-200 flex items-center">
                    সব খবর
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>

                {corporateNews?.slice(0,1).map((corporate, index) => (
                      <div key={index} className=" overflow-hidden border-b-2">
                        <div className="w-full h-48 relative">

                           {(() => {
                               const imgsrc = getPostImage(corporate);
                                 return imgsrc ? (
                                 <Image
                                  src={imgsrc}
                                  alt={corporate?.title}
                                  width={400}
                                  height={192}
                                  className="object-cover object-center w-full h-full rounded-md"
                                 />
                               ) : null;
                             })()}
                        </div>
                        <div className="py-1 min-h-24">
                          <Link href={getPostUrl(corporate)} className="block hover:opacity-80">
                            <h3 className="text-lg mb-2 line-clamp-2 font-noto text-stone-800" >
                              {corporate?.title}
                            </h3>
                          </Link>
                            <p className="text-sm font-noto text-stone-500">
                                  {FormatTimeAgo(corporate?.created_at)}
                            </p>
                        </div>
                      </div>
                    ))}

                    {corporateNews?.slice(1,3).map((corporate, index) => (
                    <div key={index}
                    className='mt-4'
                     >
                      <div className="news-card">
                        {/* Image */}
                        <div className="news-image w-1/2 h-32">
                         {(() => {
                               const imgsrc = getPostImage(corporate);
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
                         <Link href={getPostUrl(corporate)} passHref>
                              <h3 className="text-lg mb-2 line-clamp-2 font-noto text-stone-800">
                                {corporate?.title?.length > 80
                                  ? corporate?.title.slice(0, 80) + '...'
                                  : corporate?.title}
                              </h3>
                            </Link>
                          <p className="text-sm font-noto text-stone-500">
                            {FormatTimeAgo(corporate?.created_at)}
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

export default EduEnvIntCor;
