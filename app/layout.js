import './globals.css'
import { Noto_Sans_Bengali } from 'next/font/google';

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ['bengali'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});
import PushNotificationButton from '../components/PushNotification/PushNotificationButton'
import Script from 'next/script'



export const metadata = {
  title: 'HelloBD News',
  description: 'বাংলাদেশের প্রধান সংবাদ পোর্টাল',
}

export default function RootLayout({ children }) {
  return (
    <html lang="bn" className={notoSansBengali.className} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2E3195" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192.svg" />
      </head>
      <body suppressHydrationWarning>
        {/* Google Analytics */}
        <Script
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtag/js?id=G-Q69RR7NNXH"
        />
        <Script
          id="google-analytics"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-Q69RR7NNXH', {
                page_path: window.location.pathname,
                send_page_view: true
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



