import './globals.css'
import { Noto_Sans_Bengali } from 'next/font/google';

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ['bengali'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});
import PushNotificationButton from '../components/PushNotification/PushNotificationButton'
import Script from 'next/script'
import { generateOrganizationSchema, generateWebsiteSchema } from '@/lib/schemaUtils'



export const metadata = {
  title: 'HelloBD News - বাংলাদেশের সর্বশেষ সংবাদ ও আপডেট',
  description: 'HelloBD News বাংলাদেশের প্রধান অনলাইন সংবাদ পোর্টাল। সর্বশেষ জাতীয়, আন্তর্জাতিক, রাজনীতি, খেলাধুলা, বিনোদন এবং আরও অনেক বিষয়ের খবর পড়ুন।',
  alternates: {
    canonical: 'https://hellobd.news',
  },
}

export default function RootLayout({ children }) {
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebsiteSchema();

  return (
    <html lang="bn" className={notoSansBengali.className} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2E3195" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192.svg" />
        
        {/* Performance: Preconnect to API domain */}
        <link rel="preconnect" href="https://dev.hellobd.news" />
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
      </head>
      <body suppressHydrationWarning>
        {/* Google Analytics - Load with lower priority */}
        <Script
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtag/js?id=G-XH6PWW5JT4"
        />
        <Script
          id="google-analytics"
          strategy="lazyOnload"
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



