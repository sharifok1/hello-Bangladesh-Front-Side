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
import { generateOrganizationSchema, generateWebsiteSchema, generateNavigationSchema } from '@/lib/schemaUtils'



export const metadata = {
  title: 'HelloBD News - বাংলাদেশের সর্বশেষ সংবাদ, খবর ও আপডেট',
  description: 'HelloBD News বাংলাদেশের প্রধান অনলাইন সংবাদ পোর্টাল। সর্বশেষ জাতীয়, আন্তর্জাতিক, রাজনীতি, খেলাধুলা, বিনোদন এবং আরও অনেক বিষয়ের খবর পড়ুন।',
  alternates: {
    canonical: 'https://hellobd.news',
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
        {/* Performance: Preconnect to API domain */}
        <link rel="preconnect" href="https://dev.hellobd.news" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://dev.hellobd.news" />
        {/* Block search engines for testing */}
        <meta name="robots" content="noindex, nofollow" />
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
        {/* Suppress preload warnings in development */}
        <Script
          id="suppress-preload-warnings"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                const originalWarn = console.warn;
                console.warn = function(...args) {
                  if (args[0]?.includes?.('preloaded using link preload but not used')) {
                    return;
                  }
                  originalWarn.apply(console, args);
                };
              }
            `,
          }}
        />
        <PushNotificationButton />
        {children}
      </body>
    </html>
  )
}



