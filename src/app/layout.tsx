import localFont from 'next/font/local';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AIAssistant from '@/components/AIAssistant';
import './globals.css';

const rudaw = localFont({
  src: '../../public/fonts/Rudaw.ttf',
  display: 'swap',
  variable: '--font-rudaw',
});

export const metadata = {
  title: 'توێژینەوەی زانستی | سەرچاوەی باوەڕپێکراوی توێژەران',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ckb" dir="rtl" className={rudaw.variable} suppressHydrationWarning>
      <body className="font-sans antialiased bg-[#F4F7F6] dark:bg-[#020617] text-[#0A2540] dark:text-slate-100 transition-colors duration-300 flex flex-col min-h-screen relative">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <AIAssistant />
      </body>
    </html>
  );
}
