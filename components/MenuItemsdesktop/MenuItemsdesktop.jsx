"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import api from '@/lib/api';

const MenuItemsdesktop = () => {
      const [mainMenuItems, setMainMenuItems] = useState([]);
      const [subMenuItems, setSubMenuItems] = useState([]);
      const [mounted, setMounted] = useState(false);
       const pathname = usePathname();
    
      // const MainMenuItemsurl = `${api}/main-categories`;
      // const SubMenuItemsurl = `${api}/other-categories`;

      const isActive = (href) => {
            if (!pathname) return false;
            if (href === '/') return pathname === '/';
            return pathname.startsWith(href);
        };

      useEffect(() => {
          api.get('/main-categories')
            .then(res => {
              setMainMenuItems(res.data);
            })
            .catch(err => {
              console.error('Error fetching URL data:', err);
            });
        }, []);

      useEffect(() => {
          api.get('/other-categories')
            .then(res => {
              setSubMenuItems(res.data?.categories)
            })
            .catch(err => {
              console.error('Error fetching URL data:', err);
            });
        }, []);

      useEffect(() => {
        setMounted(true);
      }, []);

    return (
        <>
          <nav className="hello-nav flex-1 mx-8">
            <ul className="flex justify-center space-x-6 md:space-x-3">
              {mounted && mainMenuItems.categories && mainMenuItems.categories.length > 0 ? (
                mainMenuItems.categories.map((category, index) => (
                  <li key={index}>
                    <Link
                      href={`/category/${category.slug}`}
                      className={`${
                        isActive(`/category/${category.slug}`)
                          ? 'text-[#2A2A86] '
                          : 'text-gray-700'
                      } `}
                    >
                      {category?.name_bn}
                    </Link>
                  </li>
                ))
              ) : (
                <>
                  <li>
                  <Link href="/category/latest" className={`font-medium ${isActive('/category/latest') ? 'text-[#2A2A86] ' : 'text-gray-700'}`}>
                    সর্বশেষ
                  </Link>
                </li>
                  <li>
                    <Link
                      href="/category/bangladesh"
                      className={`${
                        isActive('/category/bangladesh')
                          ? 'text-[#2A2A86] '
                          : 'text-gray-700'
                      }`}
                    >
                      বাংলাদেশ
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/category/international"
                      className={`${
                        isActive('/category/international')
                          ? 'text-[#2A2A86] '
                          : 'text-gray-700'
                      }`}
                    >
                      বিশ্ব
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/category/business"
                      className={`${
                        isActive('/category/business')
                          ? 'text-[#2A2A86] '
                          : 'text-gray-700'
                      }`}
                    >
                      ব্যবসা
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/category/politics"
                      className={`${
                        isActive('/category/politics')
                          ? 'text-[#2A2A86] '
                          : 'text-gray-700'
                      }`}
                    >
                      রাজনীতি
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/category/entertainment"
                      className={`${
                        isActive('/category/entertainment')
                          ? 'text-[#2A2A86] '
                          : 'text-gray-700'
                      }`}
                    >
                      বিনোদন
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/category/science"
                      className={`${
                        isActive('/category/science')
                          ? 'text-[#2A2A86] '
                          : 'text-gray-700'
                      }`}
                    >
                      বিজ্ঞান
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/category/technology"
                      className={`${
                        isActive('/category/technology')
                          ? 'text-[#2A2A86] '
                          : 'text-gray-700'
                      }`}
                    >
                      প্রযুক্তি
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/category/sports"
                      className={`${
                        isActive('/category/sports')
                          ? 'text-[#2A2A86] '
                          : 'text-gray-700'
                      }`}
                    >
                      খেলা
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/category/lifestyle"
                      className={`${
                        isActive('/category/lifestyle')
                          ? 'text-[#2A2A86] '
                          : 'text-gray-700'
                      }`}
                    >
                      লাইফস্টাইল
                    </Link>
                  </li>
                </>
              )}

              {/* Others dropdown */}
               <li className="relative group">
                <div className="nav-dropdown appearance-none bg-transparent border-none pr-6 pl-3 cursor-pointer text-gray-700 flex items-center">
                  অন্যান্য
                  <svg 
                    className="w-4 h-4 ml-1" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                
                {/* Dropdown menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {mounted && subMenuItems && subMenuItems.length > 0 ? (
                    subMenuItems.map((subcategory, index) => (
                      <Link
                        key={index}
                        href={`/category/${subcategory.slug}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#2A2A86]"
                      >
                        {subcategory?.name_bn}
                      </Link>
                    ))
                  ) : (
                    <>
                      <Link href="/category/engineering" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#2A2A86]">
                        স্থাপত্য ও প্রকৌশল
                      </Link>
                      <Link href="/category/country" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#2A2A86]">
                        সারাদেশ
                      </Link>
                      <Link href="/category/health" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#2A2A86]">
                        স্বাস্থ্য
                      </Link>
                      <Link href="/category/education" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#2A2A86]">
                        শিক্ষা
                      </Link>
                      <Link href="/category/environment" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#2A2A86]">
                        পরিবেশ
                      </Link>
                      <Link href="/category/literature" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#2A2A86]">
                        শিল্প ও সাহিত্য
                      </Link>
                      <Link href="/category/opinion" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#2A2A86]">
                        মতামত
                      </Link>
                      <Link href="/category/success-story" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#2A2A86]">
                        সফল মুখ
                      </Link>
                      <Link href="/category/jobs" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#2A2A86]">
                        চাকরি
                      </Link>
                      <Link href="/category/trending" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#2A2A86]">
                        আলোচিত
                      </Link>
                    </>
                  )}
                </div>
              </li>
            </ul>
          </nav>
        </>
    );
};

export default MenuItemsdesktop;