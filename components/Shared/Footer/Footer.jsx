
 'use client';

 import { useEffect, useState } from 'react';
 import React from 'react';
 import './Footer.css';
 import axios from 'axios';
 import api from '@/lib/api';
 import { FaFacebookF, FaXTwitter, FaYoutube , FaRegCopy, FaInstagram  } from "react-icons/fa6"; 
import Link from 'next/link';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import Image from 'next/image';

 
 function Footer() {
 const footerImge = "https://dev.hellobd.news/storage/media/footer_logohellobd_2026-02-01_06-44-33_EQb1py0X.svg";
 const [email, setEmail] = useState('');
 const [loading, setLoading] = useState(false);
 const [success, setSuccess] = useState(false);
 const [error, setError] = useState('');
 const [outerLinks, setouterLinks] = useState('');


  useEffect(() => {
  const fetchSocialLinks = async () => {
    try {
      const socialLinks = await api.get('/general-settings');
      setouterLinks(socialLinks?.data?.settings);
    } catch (error) {
      console.error('Failed to fetch social links', error);
    }
  };

  fetchSocialLinks();
}, []);


  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email) {
      setError('ইমেইল লিখুন');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    api.post('/subscribe', {
      email: email
    })
      .then(res => {
        setSuccess(true);
        setEmail('');
      })
      .catch(err => {
        setError('সাবস্ক্রাইব করা যায়নি, আবার চেষ্টা করুন');
      });
  };


  return (
   <footer className=" mt-12" style={{backgroundColor: '#2E3195'}}  suppressHydrationWarning>
        <div className="container mx-auto px-4">
            <div className='sm:block md:hidden w-full'>
              <Image className='block md:hidden w-1/2 mx-auto' src={footerImge} alt="Footer Logo" loading="lazy" width={150} height={150} />
            </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

            <div className="pt-12">
              <h4 className="font-semibold mb-3 text-white">গুরুত্বপূর্ণ লিংক</h4>
              <ul className="space-y-2" style={{color: '#d1d5db'}}>
                <li><Link href="/privacy-policy" className="hover:text-white">গোপনীয়তা নীতি</Link></li>
                <li><Link href="/terms-and-conditions" className="hover:text-white">শর্তাবলী</Link></li>
                <li><Link href="/contact" className="hover:text-white">যোগাযোগ</Link></li>
              </ul>
          
          <div className="flex items-center gap-2 pt-4">
            {/* Facebook */}
            <Link
              href={outerLinks?.facebook || "https://www.facebook.com/hellobangladesh.portal"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              <FaFacebookF size={14} />
            </Link>

            {/* YouTube */}
            <Link
              href={outerLinks?.youtube || "https://www.youtube.com/@HelloBangladesh.portal"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="p-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition"
            >
              <FaYoutube size={14} />
            </Link>

            {/* Twitter Field to instagram / X - Only show if API provides the link */}
            {outerLinks?.twitter && (
              <Link
                href={outerLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="p-2 rounded-full bg-rose-500 text-white hover:bg-rose-700 transition"
              >
                <FaInstagram size={14} />
              </Link>
            )}
          </div>



            </div>

            <div className="col-span-1 md:col-span-2 pt-12">
              <h4 className="font-semibold mb-3 text-white">যোগাযোগ</h4>
              <div style={{color: '#d1d5db'}}>
                <p>ইমেইল: info@hellobd.news</p>
                <p>ফোন: +৮৮০ ১৭১২ ৩৪৫৬৭৮</p>
              </div>
            </div>


            <div className="md:col-span-1">
              <div className='sm:hidden md:block'>
                <Image className='hidden md:block w-64' src={footerImge} alt="Footer Logo" loading="lazy" width={200} height={150} />
              </div>
             <div className='pt-12'>
               <p className="mb-4" style={{color: '#d1d5db'}}>
                বাংলাদেশের প্রধান সংবাদ পোর্টাল। সত্য ও নিরপেক্ষ সংবাদ পরিবেশনে আমরা প্রতিশ্রুতিবদ্ধ।
              </p>

               <div>
                    <h4 className="font-normal mb-3 text-white">সাবস্ক্রাইব করুন</h4>

                    <form onSubmit={handleSubscribe}>
                      <div className="footer_news_letter flex">
                        <input
                          type="email"
                          placeholder="আপনার ইমেইল লিখুন"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-2 text-black rounded-l-md outline-none"
                        />

                        <button
                          type="submit"
                          disabled={loading}
                          className="bg-red-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 disabled:opacity-60"
                        >
                          {loading ? 'প্রসেসিং...' : 'সাবস্ক্রাইব'}
                        </button>
                      </div>
                    </form>

                    {/* Success Message */}
                    {success && (
                      <p className="text-green-400 text-sm mt-2">
                        সাবস্ক্রাইব সফল হয়েছে
                      </p>
                    )}

                    {/* Error Message */}
                    {error && (
                      <p className="text-red-400 text-sm mt-2">
                        {error}
                      </p>
                    )}
                  </div>
              
            </div>
            
            
          </div>
        </div>
        </div>
        <div className="bg-blue-900 border-t mt-8 pt-6 text-center pb-2" style={{borderColor: '#374151', color: '#d1d5db'}}>
            <div className='container mx-auto  flex flex-col md:flex-row justify-between items-center  '>
               <p>&copy; 2026 HelloBD News. সকল অধিকার সংরক্ষিত।</p>
               <p className='text-sm'> Developed by <Link href="https://wp-turbo.com/" target="_blank" className="text-yellow-400 hover:text-yellow-300">WP-Turbo</Link> | Akij Resource</p>
            </div>
            
          </div>
          <ScrollToTop/>
      </footer>
  );
}
export default Footer;