"use client";
import Link from "next/link";
import { useState, useEffect} from 'react';
import Image from "next/image";
import logo from "../../../assets/hellobd_logo.svg";
import { FaYoutube, FaFacebookF, FaEnvelope, FaBars , FaTimes, FaSearch } from "react-icons/fa";        
import "./header.css";
import BreakingNews from "@/components/BreakingNews/BreakingNews";
import MenuItemsdesktop from "@/components/MenuItemsdesktop/MenuItemsdesktop";
import api from "@/lib/api";


export default function Header() {
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOtherDropdownOpen, setIsOtherDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  // const [searchLoading, setSearchLoading] = useState(false);

  const [scrollY, setScrollY] = useState(0);


  // const pathname = usePathname();
  const searchUrl = "https://dev.hellobd.news/api/frontend/search";
  // menu api url here
   const [mainMenuItems, setMainMenuItems] = useState([]);
   const [subMenuItems, setSubMenuItems] = useState([]);
  const [mounted, setMounted] = useState(false);


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

  // mark when client has mounted so we avoid SSR/CSR mismatches
  useEffect(() => {
    setMounted(true);
  }, []);

          // Scroll listener
        useEffect(() => {
          const handleScroll = () => {
            setScrollY(window.scrollY);
          };
          window.addEventListener("scroll", handleScroll);
          return () => window.removeEventListener("scroll", handleScroll);
        }, []);

        const isTopBarHidden = scrollY > 50; // Hide after 50px scroll


  // deterministic Bengali date formatter to avoid SSR/CSR locale mismatches
  const bengaliWeekdays = ['রবিবার','সোমবার','মঙ্গলবার','বুধবার','বৃহস্পতিবার','শুক্রবার','শনিবার'];
  const bengaliMonths = ['জানুয়ারি','ফেব্রুয়ারি','মার্চ','এপ্রিল','মে','জুন','জুলাই','আগস্ট','সেপ্টেম্বর','অক্টোবর','নভেম্বর','ডিসেম্বর'];
  const toBengaliDigits = (num) => String(num).split('').map(d => '০১২৩৪৫৬৭৮৯'[d] ?? d).join('');
  const formatDateBn = (date) => {
    try {
      const wd = bengaliWeekdays[date.getDay()];
      const day = toBengaliDigits(date.getDate());
      const month = bengaliMonths[date.getMonth()];
      const year = toBengaliDigits(date.getFullYear());
      return `${wd}, ${day} ${month}, ${year}`;
    } catch (e) {
      return date.toDateString();
    }
  };
      //  const [categories, setCategories] = useState([]);
      useEffect(() => {
      if (isSidebarOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
      
      // Cleanup function
      return () => {
        document.body.style.overflow = 'unset';
      };
    }, [isSidebarOpen]);


useEffect(() => {
  const handleClickOutside = (event) => {
    const target = event.target;
    
    if (isOtherDropdownOpen && !target.closest('.dropdown-container')) {
      setIsOtherDropdownOpen(false);
    }
  };

  if (isOtherDropdownOpen) {
    document.addEventListener('click', handleClickOutside);
  }

  return () => {
    document.removeEventListener('click', handleClickOutside);
  };
}, [isOtherDropdownOpen]);


// Debounced search
useEffect(() => {
  if (!searchQuery || !searchQuery.trim()) {
    setSearchResults([]);
    // setSearchLoading(false);
    return;
  }

  const controller = new AbortController();
  // setSearchLoading(true);
  const id = setTimeout(() => {
    fetch(`${searchUrl}?q=${encodeURIComponent(searchQuery)}`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        // API may return items in `data` key
        setSearchResults(data?.data ?? data ?? []);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        console.error('Search error:', err);
      })
      // .finally(() => setSearchLoading(false));
  }, 300);

  return () => {
    clearTimeout(id);
    controller.abort();
  };
}, [searchQuery]);
  



  return (
    <header className="bg-white" suppressHydrationWarning>
    {/* //top bar// */}
    <div className={`${isTopBarHidden ? "top-bar-hidden" : "top-bar-visible" }`}  style={{ backgroundColor: '#2A2A86' }}
        >
        <div className="container mx-auto px-4 md:px-2">
          <div className="most-top-bar flex items-center justify-between text-sm">
            <div className="text-white text-sm">{formatDateBn(new Date())}</div>
            <div className="most-top-bar-nav flex justify-center">
              {/* <ul className="flex justify-center">
                <li><Link href="https://bandhanmagazine.com/" target="_blank">বন্ধন</Link></li>
                <li><Link href="/category/health">স্বাস্থ্য</Link></li>
                <li><Link href="/category/education">শিক্ষা</Link></li>
                <li><Link href="/category/environment">পরিবেশ</Link></li>
                <li><Link href="/category/literature">শিল্প ও সাহিত্য </Link></li>
                <li><Link href="/category/opinion">মতামত </Link></li>
             </ul> */}
            </div>
            <div className="social_icons_top_bar flex justify-end space-x-3 items-center">
              <Link href="https://www.youtube.com/@HelloBangladesh.portal" target="_blank" rel="noopener noreferrer" className="hidden md:block">
                <FaYoutube />
              </Link>

              <Link href="https://www.facebook.com/hellobangladesh.portal" target="_blank" rel="noopener noreferrer" className="hidden md:block">
                <FaFacebookF />
              </Link>

              {/* <a href="#" target="_blank" rel="noopener noreferrer" className="hidden md:block">
                <FaLinkedinIn />
              </a> */}

              <Link href="mailto:info@hellobd.com" className="hidden md:block">
                <FaEnvelope />
              </Link>
              <span style={{color:'#ef4444',fontSize:'1.125rem',fontWeight:700,animation:'p 1.5s ease-in-out infinite'}}>
                পরীক্ষামূলক প্রচার
              </span>
              <style>{`@keyframes p{0%{transform:scale(1);opacity:1}50%{transform:scale(1.02);opacity:.6}100%{transform:scale(1);opacity:1}}`}</style>

            </div>

          </div>
        </div>
      </div>

      {/* //navigation part// */}
      {/* <div className="hellobd_main_header mx-auto px-4 py-4"> */}
      <div className={`hellobd_main_header mx-auto px-4 py-2 ${isTopBarHidden ? 'fixed' : ''}`}
          style={{ backgroundColor: '#FFFFFF' }}
        >

        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <Image 
              src={logo} 
              alt="HelloBD News Logo"
              width={240}
              height={70}
              priority
              className="w-28 md:w-32 lg:w-48 h-full object-contain"
              />
          </Link>
          {/* Navigation */}
          <MenuItemsdesktop/>
          
           <div className="flex gap-4">
             <button className="right-3 top-2.5" onClick={() => setIsSearchOpen(true)}><FaSearch/></button>
             <button className="right-3 top-2.5 z-50 p-2"
               onClick={() => setIsSidebarOpen(!isSidebarOpen)}> {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
           </div>
        </div>
       </div>

      {/* Breaking News Ticker */}
        <BreakingNews/>


      {/* Search Modal */}
      {isSearchOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-0"
            onClick={() => { setIsSearchOpen(false); setSearchQuery(''); setSearchResults([]); }}
            aria-hidden="true"
            style={{ zIndex: 9998 }}
          />

          <div className="fixed inset-0 flex items-start justify-center pt-20 pointer-events-none" style={{ zIndex: 9999 }}>
            <div className="w-full max-w-4xl bg-white rounded-md shadow-lg p-4 pointer-events-auto">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="খবর অনুসন্ধান..."
                  className="md:w-full sm:w-50 p-2 border  rounded  outline-none"
                  autoFocus
                />
                <button
                  onClick={() => { setIsSearchOpen(false); setSearchQuery(''); setSearchResults([]); }}
                  className="ml-2 p-2 w-24 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                 বন্ধ করুন
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4 z-60 overflow-y-auto max-h-[60vh]">
                  { 
                    
                  searchResults?.slice(0,20).map((SearchItem, index) => {
                    const title = SearchItem?.title || 'No Title';
                    const truncatedTitle = title.length > 80 ? title.slice(0, 80) + '...' : title;
                    const imageUrl = SearchItem?.media?.[0]?.original_url || '/favicon.ico';
                    const slug = SearchItem?.slug || '#';
                    const isLocalPath = (u) => typeof u === 'string' && u.startsWith('/');

                    return (
                      <Link
                        key={index}
                        href={`/search-result/${slug}`}
                        className="flex gap-2 bg-white rounded shadow hover:shadow-lg transition-shadow"
                      >
                        <div className="relative result_card_section">
                          { imageUrl && (
                            isLocalPath(imageUrl) ? (
                              <img src={imageUrl} alt={title} className="object-cover w-16 h-16" />
                            ) : (
                              <Image
                                src={imageUrl}
                                alt={title}
                                // fill
                                className="object-cover"
                                width={200}
                                height={200}
                              />
                            )
                          )}
                        </div>
                        <div className="p-2 text-sm font-medium text-gray-800 search-result-title-section">
                          {truncatedTitle}
                        </div>
                      </Link>
                    );
                  })}
                </div>
            </div>
          </div>
        </>
      )}


      {/* sidebar header // */}
      {/* Mobile Sidebar Overlay and Menu */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
      {/* Sidebar */}
      <div className={` fixed z-50 inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}>
            {/* Sidebar Header with Logo */}
            <div className="p-4 border-b">
              <Link href="/" onClick={() => setIsSidebarOpen(false)}>
                <Image 
                  src={logo} 
                  alt="HelloBD News Logo"
                  width={180}
                  height={48}
                />
              </Link>
          </div>
                
                {/* Sidebar Navigation */}
                <nav className="p-4 overflow-y-auto h-[calc(100vh-80px)]">
                  <ul className="space-y-3 pb-4">
                   
                   
                  { mounted && mainMenuItems && mainMenuItems?.length > 0 ? (
                    mainMenuItems?.map((item, index) => (
                      <li key={index+3}>
                        <Link 
                          href={`/category/${item.slug}`} 
                          className="block"
                          onClick={() => setIsSidebarOpen(false)}
                        >
                          {item.name_bn}
                        </Link>
                      </li>
                    ))
                  ) : (
                    <>
                    <li>
                      <Link 
                        href="/" 
                        className="block font-medium" 
                        style={{ color: "#2A2A86" }}
                        onClick={() => setIsSidebarOpen(false)}
                      >
                        সর্বশেষ
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/category/bangladesh" 
                        className="block"
                        onClick={() => setIsSidebarOpen(false)}
                      >
                        বাংলাদেশ
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/category/international" 
                        className="block"
                        onClick={() => setIsSidebarOpen(false)}
                      >
                        বিশ্ব
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/category/economy" 
                        className="block"
                        onClick={() => setIsSidebarOpen(false)}
                      >
                        অর্থ-বাণিজ্য
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/category/politics" 
                        className="block "
                        onClick={() => setIsSidebarOpen(false)}
                      >
                        রাজনীতি
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/category/entertainment" 
                        className="block"
                        onClick={() => setIsSidebarOpen(false)}
                      >
                        বিনোদন
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/category/science" 
                        className="block"
                        onClick={() => setIsSidebarOpen(false)}
                      >
                        বিজ্ঞান
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/category/technology" 
                        className="block "
                        onClick={() => setIsSidebarOpen(false)}
                      >
                        প্রযুক্তি
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/category/sports" 
                        className="block"
                        onClick={() => setIsSidebarOpen(false)}
                      >
                        খেলা
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/category/lifestyle" 
                        className="block "
                        onClick={() => setIsSidebarOpen(false)}
                      >
                        লাইফস্টাইল
                      </Link>
                    </li>
                    </>
                  )}
 
                    {/* Dropdown section for other categories */}
                    {/* Dropdown for other categories */}
                     
                     
                      <li className="pt-4 border-t">
                        <button
                          onClick={() => setIsOtherDropdownOpen(!isOtherDropdownOpen)}
                          className="flex items-center py-2 font-semibold text-gray-600 hover:text-[#2A2A86] transition-colors"
                        >
                          <span>অন্যান্য</span>
                          <svg
                            className={`h-4 transform transition-transform duration-200 ${
                              isOtherDropdownOpen ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        
                        {/* Dropdown Content */}
                        <div
                          className={`sticky overflow-hidden transition-all duration-300 ease-in-out ${
                            isOtherDropdownOpen ? 'max-h-full' : 'max-h-0'
                          }`}
                        >
                          <ul className="pl-4 space-y-2 mt-2">

                            { mounted && subMenuItems && subMenuItems?.length > 0 ? (
                                subMenuItems?.map((item, index) => (
                                  <li key={index+3}>
                                    <Link 
                                      href={`/category/${item.slug}`} 
                                      className="block text-gray-700 hover:text-[#2A2A86] hover:pl-2 transition-all"
                                      onClick={() => {
                                        setIsSidebarOpen(false);
                                        setIsOtherDropdownOpen(false);
                                      }}
                                    >
                                      {item.name_bn}
                                    </Link>
                                  </li>
                                ))
                              ) : (
                                <>  
                                <li>
                              <Link 
                                href="/category/country" 
                                className="block text-gray-700 hover:text-[#2A2A86] hover:pl-2 transition-all"
                                onClick={() => {
                                  setIsSidebarOpen(false);
                                  setIsOtherDropdownOpen(false);
                                }}
                              >
                                সারাদেশ
                              </Link>
                            </li>

                            <li>
                              <Link 
                                href="/category/health" 
                                className="block text-gray-700 hover:text-[#2A2A86] hover:pl-2 transition-all"
                                onClick={() => {
                                  setIsSidebarOpen(false);
                                  setIsOtherDropdownOpen(false);
                                }}
                              >
                                স্বাস্থ্য
                              </Link>
                            </li>
                            <li>
                              <Link 
                                href="/category/education" 
                                className="block text-gray-700 hover:text-[#2A2A86] hover:pl-2 transition-all"
                                onClick={() => {
                                  setIsSidebarOpen(false);
                                  setIsOtherDropdownOpen(false);
                                }}
                              >
                                শিক্ষা
                              </Link>
                            </li>
                            <li>
                              <Link 
                                href="/category/environment" 
                                className="block text-gray-700 hover:text-[#2A2A86] hover:pl-2 transition-all"
                                onClick={() => {
                                  setIsSidebarOpen(false);
                                  setIsOtherDropdownOpen(false);
                                }}
                              >
                                পরিবেশ
                              </Link>
                            </li>
                            <li>
                              <Link 
                                href="/category/art-culture" 
                                className="block text-gray-700 hover:text-[#2A2A86] hover:pl-2 transition-all"
                                onClick={() => {
                                  setIsSidebarOpen(false);
                                  setIsOtherDropdownOpen(false);
                                }}
                              >
                                শিল্প ও সংস্কৃতি
                              </Link>
                            </li>
                            <li>
                              <Link 
                                href="/category/opinion" 
                                className="block text-gray-700 hover:text-[#2A2A86] hover:pl-2 transition-all"
                                onClick={() => {
                                  setIsSidebarOpen(false);
                                  setIsOtherDropdownOpen(false);
                                }}
                              >
                                মতামত
                              </Link>
                            </li>
                            <li>
                              <Link 
                                href="/category/jobs" 
                                className="block text-gray-700 hover:text-[#2A2A86] hover:pl-2 transition-all"
                                onClick={() => {
                                  setIsSidebarOpen(false);
                                  setIsOtherDropdownOpen(false);
                                }}
                              >
                                চাকরি
                              </Link>
                            </li>
                            <li>
                              <Link 
                                href="/category/trending" 
                                className="block text-gray-700 hover:text-[#2A2A86] hover:pl-2 transition-all"
                                onClick={() => {
                                  setIsSidebarOpen(false);
                                  setIsOtherDropdownOpen(false);
                                }}
                              >
                                আলোচিত
                              </Link>
                            </li>
                    
                            </>)}
                          </ul>
                        </div>
                      </li>
                  </ul>
                </nav>
            </div>
    </header>
  );
}
