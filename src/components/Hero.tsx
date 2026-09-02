"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import LevelSelectionModal from "./LevelSelectionModal";

export default function Hero() {
  const [showLevelModal, setShowLevelModal] = useState(false);

  return (
    <>
      <section className="relative py-20 md:py-32 overflow-hidden flex flex-col items-center justify-center text-center px-4">
        
        {/* ڕووناکی شاراوەی پاشبنەما بە ڕەنگی فەرمیی براندەکەت (#00A8CC) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#00A8CC]/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          
          {/* تایتڵی سەرەکی بە ڕەنگی سروشتی (بێ زەردی) */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-7xl mb-8 text-[#0A2540] dark:text-white"
            style={{ WebkitTextStroke: '0.6px currentColor' }}
          >
            توێژینەوەی زانستی
          </motion.h1>

          {/* دەقە تایبەتەکەی خۆت */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-2xl text-slate-700 dark:text-slate-300 leading-relaxed mb-10 max-w-3xl mx-auto"
          >
            ڕێنمایی و ڕاوێژکاری دروست بۆ توێژینەوەی زانستی کوالێتی بەرز، یارمەتیدان لە دۆزینەوەی سەرچاوەی زانستی، بڵاوکردنەوە لە گۆڤارە جیهانییەکان، و ڕاوێژ و ڕێنمایی ڕاستەوخۆ.
            <br className="hidden md:block mt-3" />
            بە کام ڕێگا دەتەوێت دەست پێ بکەیت؟
          </motion.p>

          {/* دوگمەکان (دەستپێک و ڕاوێژکاری) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => setShowLevelModal(true)}
              className="w-full sm:w-auto px-8 py-4 bg-[#00A8CC] hover:bg-[#008BA8] text-white rounded-xl text-lg transition-all shadow-[0_0_15px_rgba(0,168,204,0.4)] hover:shadow-[0_0_25px_rgba(0,168,204,0.6)] hover:-translate-y-1 flex items-center justify-center"
            >
              خۆم بە تەنیا دەست پێ دەکەم
            </button>
            
            <Link
              href="/consultation"
              className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-[#1E293B] text-[#0A2540] dark:text-white border border-[#E2E8F0] dark:border-slate-700 hover:border-[#00A8CC] dark:hover:border-[#00A8CC] rounded-xl text-lg transition-all hover:-translate-y-1 flex items-center justify-center"
            >
              دەمەوێت ئێوە هاوکاریم بکەن
            </Link>
          </motion.div>
        </div>
      </section>

      <LevelSelectionModal 
        isOpen={showLevelModal} 
        onClose={() => setShowLevelModal(false)} 
      />
    </>
  );
}