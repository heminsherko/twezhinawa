import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

const rudaw = localFont({
  src: '../../public/fonts/Rudaw.ttf',
  display: 'swap',
  variable: '--font-rudaw',
});

export const metadata: Metadata = {
  title: 'توێژینەوەی زانستی | سەرچاوەی باوەڕپێکراوی توێژەران و خوێندکاران',
  description: 'پلاتفۆرمی پێشەنگی توێژینەوەی زانستی لە کوردستان؛ ڕێبەری نووسینی ماستەرنامە، دکتۆرا، دۆزینەوەی سەرچاوەی باوەڕپێکراو و گۆڤارە نێودەوڵەتییەکان.',
  keywords: 'توێژینەوەی زانستی, ماستەرنامە, دکتۆرا, سەرچاوەی زانستی, Scopus, Clarivate, Kurdish Research, twezhinawa',
  authors: [{ name: 'Twezhinawa Platform', url: 'https://twezhinawa.com' }],
  publisher: 'Twezhinawa',
  metadataBase: new URL('https://twezhinawa.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'توێژینەوەی زانستی | سەرچاوەی باوەڕپێکراوی توێژەران و خوێندکاران',
    description: 'پلاتفۆرمی پێشەنگی توێژینەوەی زانستی لە کوردستان؛ ڕێبەری نووسینی ماستەرنامە، دکتۆرا، دۆزینەوەی سەرچاوەی باوەڕپێکراو و گۆڤارە نێودەوڵەتییەکان.',
    url: 'https://twezhinawa.com',
    siteName: 'Twezhinawa',
    locale: 'ku_IQ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'توێژینەوەی زانستی | سەرچاوەی باوەڕپێکراوی توێژەران و خوێندکاران',
    description: 'پلاتفۆرمی پێشەنگی توێژینەوەی زانستی لە کوردستان؛ ڕێبەری نووسینی ماستەرنامە، دکتۆرا، دۆزینەوەی سەرچاوەی باوەڕپێکراو و گۆڤارە نێودەوڵەتییەکان.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ckb" dir="rtl" className={rudaw.variable} suppressHydrationWarning>
      <body className="font-sans antialiased bg-[#F4F7F6] dark:bg-[#020617] text-[#0A2540] dark:text-slate-100 transition-colors duration-300 flex flex-col min-h-screen relative">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
