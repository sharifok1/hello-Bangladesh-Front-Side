import Header from "@/components/Shared/Header/Header";
import Footer from "@/components/Shared/Footer/Footer";
import ErrorBoundary from '@/components/Shared/ErrorBoundary';
import api from '@/lib/api';
import { useEffect, useState } from "react";
import SideTrandingNews from "./SideTrandingNews/SideTrandingNews";
import Link from "next/link";
import Image from "next/image";

export default function Layout({ children, sidebar = true }) {
   const [urlData, setUrlData] = useState(null);
    const [embedUrl, setEmbedUrl] = useState("");
    const [banner, setBanner] = useState([]);


    useEffect(() => {
    api.get('/general-settings')
      .then(res => {
        setUrlData(res.data);
      })
      .catch(err => {
        console.error('Error fetching URL data:', err);
      });
  }, []);

   useEffect(() => {
    const videoUrl = urlData?.settings?.other_one;
    if (!videoUrl) return;
  
    let finalUrl = videoUrl;
  
    // YouTube watch → embed
    if (videoUrl.includes("watch?v=")) {
      finalUrl = videoUrl.replace("watch?v=", "embed/");
    }
  
    // youtu.be short link → embed
    if (videoUrl.includes("youtu.be/")) {
      const id = videoUrl.split("youtu.be/")[1];
      finalUrl = `https://www.youtube.com/embed/${id}`;
    }
  
    setEmbedUrl(finalUrl);
  }, [urlData]);

    // ---------------------------banner-----------------------------------
      useEffect(() => {
      api.get('/advertisements')
        .then(res => {
          const ads = res.data?.data || [];
          setBanner(ads);
        })
        .catch(err => {
          console.error('Error fetching data:', err);
        });
    }, []);
  
    const getBanner = (page, placement) => {
      return banner?.find(
        ad =>
          ad?.status === 'active' &&
          ad?.ad_type === page &&
          ad?.placement === placement
      );
    };

    const categoryBanner1 = getBanner('category', 'category_side_banner');

  // Globally ignore intermittent DOM NotFoundError from external scripts
  // (e.g. Google Translate) trying to remove nodes that were moved.
  useEffect(() => {
    const onError = (event) => {
      try {
        const err = event?.error;
        if (err && err.name === 'NotFoundError' && /removeChild/.test(err.message)) {
          // prevent the error from surfacing in console as an uncaught exception
          event.preventDefault();
          console.warn('Ignored external NotFoundError (removeChild):', err.message);
        }
      } catch (e) {
        // swallow any handler errors
      }
    };

    const onRejection = (ev) => {
      try {
        const reason = ev?.reason;
        if (reason && reason.name === 'NotFoundError' && /removeChild/.test(reason.message)) {
          ev.preventDefault();
          console.warn('Ignored external NotFoundError from promise rejection (removeChild):', reason.message);
        }
      } catch (e) {}
    };

    window.addEventListener('error', onError);
    window.addEventListener('unhandledrejection', onRejection);
    // monkey-patch removeChild and Element.remove to guard against external scripts
    const origRemoveChild = Node.prototype.removeChild;
    const origElementRemove = Element.prototype.remove;
    const safeRemoveChild = function (child) {
      try {
        return origRemoveChild.call(this, child);
      } catch (e) {
        if (e && e.name === 'NotFoundError') {
          console.warn('Ignored external NotFoundError in removeChild:', e.message);
          return null;
        }
        throw e;
      }
    };
    const safeElementRemove = function () {
      try {
        return origElementRemove.call(this);
      } catch (e) {
        if (e && e.name === 'NotFoundError') {
          console.warn('Ignored external NotFoundError in Element.remove():', e.message);
          return null;
        }
        throw e;
      }
    };
    try {
      Node.prototype.removeChild = safeRemoveChild;
      Element.prototype.remove = safeElementRemove;
    } catch (e) {
      // ignore if environment prevents prototype assignment
    }
    return () => {
      window.removeEventListener('error', onError);
      window.removeEventListener('unhandledrejection', onRejection);
      try {
        Node.prototype.removeChild = origRemoveChild;
        Element.prototype.remove = origElementRemove;
      } catch (e) {}
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* header for nav// */}
      <Header />

      <ErrorBoundary>
      {sidebar ? (
        <div className="container mx-auto py-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            <div className="lg:col-span-3">{children}</div>
            <div className="lg:col-span-1 sticky">
              <div className="relative pb-[56.25%] h-0 rounded overflow-hidden">
                  {embedUrl ? (
                    <iframe
                      className="absolute top-0 left-0 w-full h-full pb-3"
                      src={embedUrl}
                      title="YouTube video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ zIndex: 0, position: 'absolute', border: 0 }}
                    />
                  ) : (
                    <div className="bg-gray-200 py-12 h-full flex items-center justify-center text-gray-400">
                      ভিডিও লোড হচ্ছে...
                    </div>
                  )}
              </div>

              
              <SideTrandingNews/>
              
              <div className="bg-gray-50 rounded-lg mb-6">
                  { categoryBanner1 && (
                  <Link href={categoryBanner1?.link_url || '#'} target="_blank" rel="noopener noreferrer" className="block">
                  <Image
                     className='w-full'
                     src={categoryBanner1?.image}
                     alt="thumbnail"
                     width={1024}
                     height={1024}
                   />
                   </Link>)}
                </div>


            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">{children}</div> 
      )}
      </ErrorBoundary>


      {/* ------------------------------------footer// ----------------------*/}
      <Footer />
       {/* ------------------------------------footer// ----------------------*/}

    </div>
  
  );
}
