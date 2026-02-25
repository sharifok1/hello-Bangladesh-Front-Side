import './globals.css'
import { Noto_Sans_Bengali } from 'next/font/google';

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ['bengali'],
  weight: ['400', '700'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
});
import PushNotificationButton from '../components/PushNotification/PushNotificationButton'
import Script from 'next/script'
import { generateOrganizationSchema, generateWebsiteSchema, generateNavigationSchema } from '@/lib/schemaUtils'



export const metadata = {
  metadataBase: new URL('https://hellobd.news'),
  title: 'HelloBD News - বাংলাদেশের সর্বশেষ সংবাদ, খবর ও আপডেট',
  description: 'HelloBD News বাংলাদেশের প্রধান অনলাইন সংবাদ পোর্টাল। সর্বশেষ জাতীয়, আন্তর্জাতিক, রাজনীতি, খেলাধুলা, বিনোদন এবং আরও অনেক বিষয়ের খবর পড়ুন।',
  keywords: ['বাংলাদেশ সংবাদ', 'খবর', 'HelloBD', 'জাতীয় খবর', 'আন্তর্জাতিক খবর', 'রাজনীতি', 'খেলাধুলা', 'বিনোদন'],
  authors: [{ name: 'HelloBD News' }],
  creator: 'HelloBD News',
  publisher: 'HelloBD News',
  alternates: {
    canonical: 'https://hellobd.news',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/icons/icon-192.svg',
  },
  openGraph: {
    title: 'HelloBD News - বাংলাদেশের সর্বশেষ সংবাদ',
    description: 'বাংলাদেশের প্রধান অনলাইন সংবাদ পোর্টাল',
    url: 'https://hellobd.news',
    siteName: 'HelloBD News',
    locale: 'bn_BD',
    type: 'website',
    images: [
      {
        url: '/hellobd_logo.png',
        width: 1200,
        height: 630,
        alt: 'HelloBD News Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HelloBD News - বাংলাদেশের সর্বশেষ সংবাদ',
    description: 'বাংলাদেশের প্রধান অনলাইন সংবাদ পোর্টাল',
    images: ['/hellobd_logo.png'],
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification code
  },
}

export default function RootLayout({ children }) {
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebsiteSchema();
  const navigationSchema = generateNavigationSchema();

  return (
    <html lang="bn" className={notoSansBengali.className} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2E3195" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192.svg" />
        
        {/* Performance: Preconnect to API domain only */}
        <link rel="preconnect" href="https://dev.hellobd.news" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://dev.hellobd.news" />
        
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        
        {/* Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        
        {/* Navigation Schema for Sitelinks */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(navigationSchema) }}
        />
      </head>
      <body suppressHydrationWarning>
        {/* Google Analytics - Load after page interactive */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-XH6PWW5JT4"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XH6PWW5JT4', {
                page_path: window.location.pathname,
                send_page_view: true,
                cookie_flags: 'SameSite=None;Secure',
                allow_google_signals: true,
                allow_ad_personalization_signals: true
              });
            `,
          }}
        />
        
        <PushNotificationButton />
        {children}
      </body>
    </html>
  )
}



