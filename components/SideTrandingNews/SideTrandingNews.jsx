'use client';

import api from "@/lib/api";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import TrnBanNum from "../TrnBanNum/TrnBanNum";

const SideTrandingNews = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api
      .get("/category/trending")
      .then((res) => {
        setPosts(res?.data?.posts?.data || []);
      })
      .catch((err) => {
        console.error("Trending API error:", err.response || err.message);
      });
  }, []);

  const getPostImage = (post) => {
        return (
          post?.media?.[0]?.original_url?.trim() ||
          post?.feature_image_link?.trim() ||
          null
        );
      };

  return (
    <div className="bg-white rounded-lg p-4">
        {/* Section Title */}
        <h2 className="text-[22px] font-bold text-[#2A2A86] mb-4">
            বহুল আলোচিত
        </h2>

        {posts.length === 0 && (
            <div className="space-y-4" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-[64px] h-[64px] bg-gray-200 rounded-md overflow-hidden flex-shrink-0 animate-pulse" />
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-4/5 mb-2 animate-pulse" />
                    <div className="h-3 bg-gray-200 rounded w-1/3 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
        )}

                <div className="space-y-4">
                    {posts.slice(0, 5).map((post, index) => (
                    <div
                        key={index}
                        className="flex items-start gap-4"
                    >
                        {/* Image */}
                        <div className="w-[64px] h-[64px] bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                        <Link href={`/news/${post.slug}`}>
                         {(() => {
                                  const imgsrc = getPostImage(post);
                                    return imgsrc ? (
                                    <Image
                                         src={post?.media?.[0]?.original_url}
                                         alt={post?.title}
                                         width={300}
                                         height={300}
                                         className="w-full h-full object-cover"
                                    />
                                   ) : null;
                                })()}
                        
                        </Link>
                        </div>

                        {/* Content */}
                        <div>
                         <Link href={`/trending/${post.slug}`}> 
                        <h3 className="text-[15px] font-semibold text-gray-900 leading-snug hover:text-[#2A2A86] cursor-pointer">
                           {post?.title?.length > 80
                            ? post?.title.slice(0, 60) + '...'
                            : post?.title}
                        </h3></Link> 
                        <span className="text-sm text-gray-500 mt-1 block">
                           {TrnBanNum(post.views)} বার পড়া
                        </span>
                        </div>
                    </div>
                    ))}
                </div>
        </div>
  );
};

export default SideTrandingNews;
