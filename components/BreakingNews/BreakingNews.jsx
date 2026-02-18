import { useState } from 'react';
import React, { useEffect } from 'react';
import api from '@/lib/api';

const BreakingNews = () => {
const [breaking, setBreaking] = useState([]);
    
     useEffect(() => {
        api.get('/home')
        .then(res => {
            const postsData = res.data;  // all news
            setBreaking(postsData?.breaking); //latest news
            
            })
        .catch(err => {
            console.error('Error fetching data:', err);
      })
      }, []);


    return (
        <>
             {/* Breaking News Ticker */}
      <div className="hello_news_ticker text-white pt-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center">
            <h3 className="px-3 font-semibold mr-4 rounded animate-pulse text-sm flex-shrink-0">
              আলোচিত খবর
            </h3>
              <div className="overflow-hidden flex-1 pt-1 relative">
                <div className="breaking-scroll whitespace-nowrap animate-marquee text-sm">
                  
                    {breaking?.slice(0,5).map((item, index) => (
                    <a
                        key={index}
                        href={`/breaking/${item.slug}`}
                        className="inline-block mr-8 hover:underline text-white transition-colors duration-200"
                    >
                     • {item.title}
                    </a>
                    ))}
                </div>

                <style jsx>{`
                    @keyframes marquee {
                    0% { transform: translateX(50%); }   /* start from center */
                    100% { transform: translateX(-100%); }
                    }
                    .animate-marquee {
                    display: inline-block;
                    animation: marquee 50s linear infinite;  /* slow scroll */
                    }
                `}</style>
                </div>
            </div>
            </div>
        </div>
        </>
    );
};

export default BreakingNews;