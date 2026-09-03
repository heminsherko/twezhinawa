"use client";

import Link from "next/link";
import { Mail, Phone, Globe, Share2, MessageCircle, Send, PhoneCall, X } from "lucide-react";
import Logo from "./Logo";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();
  const [showContactModal, setShowContactModal] = useState(false);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      <footer className="bg-white dark:bg-[#020617] border-t border-[#E2E8F0] dark:border-[#1E293B] pt-12 md:pt-16 pb-6 md:pb-8 transition-colors">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-10 md:mb-12">
            
            <div className="lg:col-span-2">
              <Link href="/" className="inline-block mb-6">
                <Logo />
              </Link>
              <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed md:leading-relaxed font-medium mb-6 max-w-md transition-colors">
                پلاتفۆرمی پێشەنگ لە کوردستان بۆ هاوکاریکردنی توێژەران و خوێندکارانی ماستەر و دکتۆرا لە هەموو قۆناغەکانی توێژینەوەدا، لە بیرۆکەوە تا بڵاوکردنەوە.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-[#F4F7F6] dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-[#00A8CC] hover:text-white dark:hover:bg-[#00A8CC] dark:hover:text-white dark:hover:border-[#00A8CC] transition-all">
                  <Globe className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-[#F4F7F6] dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-[#00A8CC] hover:text-white dark:hover:bg-[#00A8CC] dark:hover:text-white dark:hover:border-[#00A8CC] transition-all">
                  <Share2 className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-base md:text-lg font-bold text-[#0A2540] dark:text-white mb-4 md:mb-6 transition-colors">دەربارەی ئێمە</h4>
              <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed md:leading-relaxed text-sm">
                ئێمە تیمێکی شارەزای ڕێنمایی و نوسینەوەی توێژینەوەی زانستیین لە هەموو بوارەکاندا کارمەندی خاوەن بڕوانامەی بەرز و بە ئەزموونمان هەیە، تیمەکەمان زیاتر لە ١٠ ساڵ ئەزموونی هەیە لەکاری ڕێنمایی و نووسینەوەی توێژینەوەی زانستی دا، ئەگەر پێویستت بە یارمەتی ئێمە هەبوو، <button onClick={() => setShowContactModal(true)} className="text-[#00A8CC] hover:underline font-medium">پەیوەندیمان پێوە بکە</button>
              </p>
            </div>

            <div>
              <h4 className="text-base md:text-lg font-bold text-[#0A2540] dark:text-white mb-4 md:mb-6 transition-colors">پەیوەندی</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#00A8CC] shrink-0 mt-0.5" />
                  <a href="mailto:Hemin.sherko@gmail.com" className="text-slate-600 dark:text-slate-400 hover:text-[#00A8CC] dark:hover:text-[#00A8CC] transition-colors" dir="ltr">Hemin.sherko@gmail.com</a>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#00A8CC] shrink-0 mt-0.5" />
                  <a href="tel:+9647732640262" className="text-slate-600 dark:text-slate-400 hover:text-[#00A8CC] dark:hover:text-[#00A8CC] transition-colors" dir="ltr">07732640262</a>
                </li>
              </ul>
            </div>
            
          </div>
          
          <div className="pt-8 border-t border-[#E2E8F0] dark:border-[#334155] text-center transition-colors">
            <p className="text-slate-500 text-sm">
              مافی لەبەرگرتنەوەی پارێزراوە بۆ توێژینەوەی زانستی © {currentYear}. دروستکراوە بە خۆشەویستییەوە بۆ زانست.
            </p>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showContactModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-0">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowContactModal(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-sm bg-white dark:bg-[#0F172A] rounded-2xl shadow-2xl p-6 border border-slate-200 dark:border-slate-800"
            >
              <button 
                onClick={() => setShowContactModal(false)}
                className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-bold text-[#0A2540] dark:text-white mb-2">پەیوەندیمان پێوە بکە</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm">
                لە ڕێگەی یەکێک لەم ئاپانەی خوارەوە پەیوەندیمان پێوە بکە بۆ داواکردنی ڕاوێژکاری.
              </p>

              <div className="space-y-3">
                <a href="https://wa.me/9647732640262" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-green-500 dark:hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-500/10 transition-all group">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-slate-700 dark:text-slate-200">WhatsApp</span>
                </a>

                <a href="https://t.me/heminsherko" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-all group">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Send className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-slate-700 dark:text-slate-200">Telegram</span>
                </a>

                <a href="viber://chat?number=%2B9647732640262" className="flex items-center gap-4 w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-purple-500 dark:hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-500/10 transition-all group">
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-slate-700 dark:text-slate-200">Viber</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
