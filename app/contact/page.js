"use client";

import Layout from "@/components/Layout";
import Link from "next/link";


export default function ContactPage() {
  return (
    <>
    <Layout sidebar={false}>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Hello Bangladesh News
          </h1>
          <p className="text-gray-600 text-lg">Akij Broadcast Media Ltd.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* English Version */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 ">
            <div className="flex items-center mb-6">
              <div className="bg-blue-600 text-white p-3 rounded-lg mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Akij Broadcast Media Ltd.</h2>
            </div>

            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="text-gray-700 font-medium mb-1">Address</p>
                  <p className="text-gray-600">Akij House, ১৯৮ Bir Uttam Mir Shawkat Sarak (Gulshan Link Road), Tejgaon, Dhaka-১২০৮</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p className="text-gray-700 font-medium">Phone</p>
                  <Link href="tel:+8801332500880" className="text-blue-600 hover:text-blue-800 hover:underline">
                    +৮৮০১৩৩২৫০০৮৮০
                  </Link>
                </div>
              </div>

              {/* Advertisement */}
              <div className="flex items-center">
                <svg className="w-5 h-5 text-purple-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
                <div>
                  <p className="text-gray-700 font-medium">Advertisement</p>
                  <Link href="tel:+8801329662039" className="text-blue-600 hover:text-blue-800 hover:underline">
                    +৮৮০১৩২৯৬৬২০৩৯
                  </Link>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="text-gray-700 font-medium">Email</p>
                  <Link href="mailto:ad@hellobd.news" className="text-blue-600 hover:text-blue-800 hover:underline">
                    ad@hellobd.news
                  </Link>
                </div>
              </div>

              {/* Social Media */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-gray-700 font-medium mb-4">Connect with us</p>
                <div className="flex flex-wrap gap-4">
                  <Link href="https://facebook.com/hellobangladesh.portal" target="_blank" rel="noopener noreferrer" 
                     className="bg-blue-100 text-blue-600 hover:bg-blue-200 p-3 rounded-lg flex items-center transition-colors">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span>Facebook</span>
                  </Link>
                  
                  <Link href="https://instagram.com/hellobangladesh.portal" target="_blank" rel="noopener noreferrer"
                     className="bg-pink-100 text-pink-600 hover:bg-pink-200 p-3 rounded-lg flex items-center transition-colors">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span>Instagram</span>
                  </Link>
                  
                  <Link href="https://www.youtube.com/@HelloBangladesh.portal" target="_blank" rel="noopener noreferrer"
                     className="bg-red-100 text-red-600 hover:bg-red-200 p-3 rounded-lg flex items-center transition-colors">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                    </svg>
                    <span>YouTube</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Bengali Version */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-6 md:p-8 ">
            <div className="flex items-center mb-6">
              <div className="bg-green-600 text-white p-3 rounded-lg mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 text-left">আকিজ ব্রডকাস্ট মিডিয়া লি.</h2>
            </div>

            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="text-gray-700 font-medium mb-1">ঠিকানা</p>
                  <p className="text-gray-600">আকিজ হাউস, ১৯৮ বীর উত্তম মীর শওকত সড়ক (গুলশান লিংক রোড), তেজগাঁও, ঢাকা-১২০৮</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p className="text-gray-700 font-medium">ফোন</p>
                  <Link href="tel:+8801332500880" className="text-blue-600 hover:text-blue-800 hover:underline">
                    +৮৮০১৩৩২৫০০৮৮০
                  </Link>
                </div>
              </div>

              {/* Advertisement */}
              <div className="flex items-center">
                <svg className="w-5 h-5 text-purple-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
                <div>
                  <p className="text-gray-700 font-medium">বিজ্ঞাপন</p>
                  <Link href="tel:+8801329662039" className="text-blue-600 hover:text-blue-800 hover:underline">
                    +৮৮০১৩২৯৬৬২০৩৯
                  </Link>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="text-gray-700 font-medium">ইমেইল</p>
                  <Link href="mailto:ad@hellobd.news" className="text-blue-600 hover:text-blue-800 hover:underline">
                    ad@hellobd.news
                  </Link>
                </div>
              </div>

              {/* Social Media */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-gray-700 font-medium mb-4">আমাদের সাথে যুক্ত থাকুন</p>
                <div className="flex flex-wrap gap-4">
                  <Link href="https://facebook.com/hellobangladesh.portal" target="_blank" rel="noopener noreferrer" 
                     className="bg-blue-100 text-blue-600 hover:bg-blue-200 p-3 rounded-lg flex items-center transition-colors">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span>ফেসবুক</span>
                  </Link>
                  
                  <Link href="https://instagram.com/hellobangladesh.portal" target="_blank" rel="noopener noreferrer"
                     className="bg-pink-100 text-pink-600 hover:bg-pink-200 p-3 rounded-lg flex items-center transition-colors">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span>ইনস্টাগ্রাম</span>
                  </Link>
                  
                  <Link href="https://www.youtube.com/@HelloBangladesh.portal" target="_blank" rel="noopener noreferrer"
                     className="bg-red-100 text-red-600 hover:bg-red-200 p-3 rounded-lg flex items-center transition-colors">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                    </svg>
                    <span>ইউটিউব</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map/Footer */}
        {/* <div className="mt-10 bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Our Location</h3>
            <div className="bg-gray-100 rounded-lg p-4 mb-6">
              <div className="h-48 md:h-64 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-12 h-12 text-blue-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-gray-700 font-medium">Akij House, Tejgaon, Dhaka</p>
                  <p className="text-gray-600 text-sm mt-2">Interactive Map Coming Soon</p>
                </div>
              </div>
            </div>
            <p className="text-gray-600">
              For business inquiries, advertising, or general information, please feel free to contact us.
            </p>
          </div>
        </div> */}
      </div>
    </div>
    </Layout>
    </>
  );
}
