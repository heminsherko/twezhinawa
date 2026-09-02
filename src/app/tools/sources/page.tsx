"use client";

import SourceFinder from "@/components/SourceFinder";
import { motion } from "framer-motion";

export default function SourceFinderToolPage() {
  return (
    <div className="flex-1 flex items-center justify-center py-20 relative overflow-hidden">
      {/* Ambient Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00A8CC]/5 dark:bg-[#00A8CC]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#00A8CC]/5 dark:bg-[#00A8CC]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-[#0A2540] dark:text-white transition-colors" style={{ WebkitTextStroke: "0.6px currentColor" }}>
            ئامرازی <span className="text-[#00A8CC]">دۆزینەوەی سەرچاوە</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mt-6 max-w-2xl mx-auto leading-relaxed font-medium">
            دۆزینەوەی باشترین پەرتووک و توێژینەوەی ئەکادیمی بە زمانەکانی کوردی، عەرەبی و ئینگلیزی بە سەدا سەد بێبەرامبەر.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <SourceFinder />
        </motion.div>
      </div>
    </div>
  );
}
