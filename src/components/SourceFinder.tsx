"use client";

import { motion } from "framer-motion";
import { Search, BookOpen, ExternalLink, Globe, Library } from "lucide-react";

export default function SourceFinder() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div id="source-finder" className="w-full scroll-mt-32">
      <div className="bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-slate-700 shadow-xl rounded-2xl md:rounded-3xl p-5 md:p-10 w-full transition-colors duration-300">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-8 md:mb-10">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-[#00A8CC]/10 flex items-center justify-center mb-4">
            <Search className="w-7 h-7 md:w-8 md:h-8 text-[#00A8CC]" />
          </div>
          <h2 
            className="text-2xl md:text-3xl font-black text-[#0A2540] dark:text-white mb-3"
            style={{ WebkitTextStroke: "0.6px currentColor" }}
          >
            دۆزینەوەی سەرچاوەی زانستی
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed md:leading-relaxed max-w-2xl">
            باشترین داتابەیسە بێبەرامبەرەکان بۆ دۆزینەوەی پەرتووک و توێژینەوە بە سێ زمان.
          </p>
        </div>

        {/* Resources Grid */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Card 1: Kurdish */}
          <motion.a 
            href="https://www.hewalname.com/ku/" 
            target="_blank" 
            rel="noreferrer"
            variants={itemVariants}
            className="group relative flex flex-col p-5 md:p-6 bg-[#F4F7F6] dark:bg-[#020617] border border-[#E2E8F0] dark:border-slate-700 rounded-2xl hover:-translate-y-2 hover:border-[#00A8CC] hover:shadow-lg transition-all duration-300"
          >
            <div className="absolute top-5 right-5 md:top-6 md:right-6">
              <ExternalLink className="w-4 h-4 md:w-5 md:h-5 text-slate-400 group-hover:text-[#00A8CC] transition-colors duration-300" />
            </div>
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-green-500/10 flex items-center justify-center mb-4 md:mb-6">
              <BookOpen className="w-6 h-6 md:w-7 md:h-7 text-green-500" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-[#0A2540] dark:text-white mb-2 md:mb-3">
              سەرچاوەی کوردی
            </h3>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed flex-1">
              وێبسایتی (هەواڵنامە)؛ باشترین سەکۆ بۆ دۆزینەوەی پەرتووک و توێژینەوەی ئەکادیمی بە زمانی کوردی.
            </p>
          </motion.a>

          {/* Card 2: Arabic */}
          <motion.a 
            href="https://www.iasj.net/" 
            target="_blank" 
            rel="noreferrer"
            variants={itemVariants}
            className="group relative flex flex-col p-5 md:p-6 bg-[#F4F7F6] dark:bg-[#020617] border border-[#E2E8F0] dark:border-slate-700 rounded-2xl hover:-translate-y-2 hover:border-[#00A8CC] hover:shadow-lg transition-all duration-300"
          >
            <div className="absolute top-5 right-5 md:top-6 md:right-6">
              <ExternalLink className="w-4 h-4 md:w-5 md:h-5 text-slate-400 group-hover:text-[#00A8CC] transition-colors duration-300" />
            </div>
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-blue-500/10 flex items-center justify-center mb-4 md:mb-6">
              <Library className="w-6 h-6 md:w-7 md:h-7 text-blue-500" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-[#0A2540] dark:text-white mb-2 md:mb-3">
              المصادر العربية
            </h3>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed flex-1">
              داتابەیسی (IASJ)؛ گەورەترین مەرجەعی توێژینەوە عەرەبییەکان سەدا سەد بە بێبەرامبەر (Open Access).
            </p>
          </motion.a>

          {/* Card 3: English */}
          <motion.a 
            href="https://core.ac.uk/" 
            target="_blank" 
            rel="noreferrer"
            variants={itemVariants}
            className="group relative flex flex-col p-5 md:p-6 bg-[#F4F7F6] dark:bg-[#020617] border border-[#E2E8F0] dark:border-slate-700 rounded-2xl hover:-translate-y-2 hover:border-[#00A8CC] hover:shadow-lg transition-all duration-300"
          >
            <div className="absolute top-5 right-5 md:top-6 md:right-6">
              <ExternalLink className="w-4 h-4 md:w-5 md:h-5 text-slate-400 group-hover:text-[#00A8CC] transition-colors duration-300" />
            </div>
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-purple-500/10 flex items-center justify-center mb-4 md:mb-6">
              <Globe className="w-6 h-6 md:w-7 md:h-7 text-purple-500" />
            </div>
            <h3 dir="ltr" className="text-lg md:text-xl font-bold text-[#0A2540] dark:text-white mb-2 md:mb-3 text-right">
              English Sources
            </h3>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed flex-1">
              داتابەیسی (CORE)؛ گەورەترین پێگەی جیهانی بە زیاتر لە ٢٠٠ ملیۆن توێژینەوە و پەرتووکی ئینگلیزی بێبەرامبەر.
            </p>
          </motion.a>
          
        </motion.div>
      </div>
    </div>
  );
}