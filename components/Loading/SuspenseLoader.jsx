import React from 'react';

export default function SuspenseLoader() {
  return (
    <div className="container mx-auto py-6 px-4 min-h-96 bg-white">
        {/* Top hero + small right blocks (right blocks hidden on mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          <div className="lg:col-span-8">
            <div className="w-full h-44 lg:h-64 bg-gray-200 rounded-lg shadow animate-pulse"></div>
          </div>
          <div className="lg:col-span-4 space-y-4 hidden lg:block">
            <div className="w-full h-20 bg-gray-200 rounded-lg shadow animate-pulse"></div>
            <div className="w-full h-20 bg-gray-200 rounded-lg shadow animate-pulse"></div>
            <div className="w-full h-20 bg-gray-200 rounded-lg shadow animate-pulse"></div>
          </div>
        </div>

        {/* Grid of article cards (4 columns on lg) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* large card image for desktop */}
              <div className="hidden lg:block w-full h-40 bg-gray-200 animate-pulse" />

              {/* mobile list row: text left, thumbnail right */}
              <div className="block lg:hidden p-4">
                <div className="flex items-center">
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                  </div>
                  <div className="w-20 h-16 bg-gray-200 rounded ml-4 animate-pulse flex-shrink-0"></div>
                </div>
              </div>

              {/* desktop content below image */}
              <div className="hidden lg:block p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                <div className="flex items-center justify-between mt-2">
                  <div className="h-3 bg-gray-200 rounded w-24 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
     
    </div>
  );
}
