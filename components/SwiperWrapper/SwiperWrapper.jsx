'use client';

import dynamic from 'next/dynamic';
import { Keyboard, Pagination, Navigation, Autoplay } from 'swiper/modules';

// Import CSS statically (needed for styling)
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Dynamically import Swiper components
const Swiper = dynamic(() => import('swiper/react').then(mod => mod.Swiper), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded"></div>
});

const SwiperSlide = dynamic(() => import('swiper/react').then(mod => mod.SwiperSlide), {
  ssr: false
});

export { Swiper, SwiperSlide, Keyboard, Pagination, Navigation, Autoplay };
