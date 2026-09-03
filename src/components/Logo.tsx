"use client";
import { motion } from "framer-motion";

export default function Logo() {
  return (
    <motion.div
      className="flex items-center gap-3 cursor-pointer"
      initial="initial"
      whileHover="hover"
    >
      {/* لۆگۆکە بچووک کراوەتەوە بۆ قەبارەی ئاسایی (w-14 h-14 بۆ مۆبایل و w-16 h-16 بۆ کۆمپیوتەر) */}
      <div className="relative w-9 h-9 md:w-12 md:h-12 flex-shrink-0">
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 150 150"
          className="w-full h-full drop-shadow-md"
        >
          {/* بنکەی کتێبەکە (وەستاو) */}
          <g className="fill-[#0A2540] dark:fill-white transition-colors duration-300">
            <path d="M 15 50 Q 40 40 72 60 L 72 125 Q 40 105 15 115 Z" />
            <path d="M 22 38 Q 45 28 72 48 L 72 60 Q 45 40 22 50 Z" opacity="0.5"/>
            <path d="M 135 50 Q 110 40 78 60 L 78 125 Q 110 105 135 115 Z" />
            <path d="M 128 38 Q 105 28 78 48 L 78 60 Q 105 40 128 50 Z" opacity="0.5"/>
          </g>

          {/* ئەنیمەیشنی هەڵدانەوەی لاپەڕە شینەکە (بە مەرجی هۆڤەر) */}
          <motion.path
            d="M 135 50 Q 110 40 75 60 L 75 125 Q 110 105 135 115 Z"
            fill="#00A8CC"
            opacity="0"
            style={{ transformOrigin: "75px 125px" }}
            variants={{
              initial: { rotateY: 0, opacity: 0, skewY: 0 },
              hover: { 
                rotateY: -160, 
                opacity: [0, 0.8, 0], 
                skewY: -10,
                transition: { duration: 0.8, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 } 
              }
            }}
          />

          {/* ئەنیمەیشنی فڕینی زەڕەبینەکە (بە مەرجی هۆڤەر) */}
          <motion.g
            variants={{
              initial: { x: 0, y: 0, rotate: 0 },
              hover: { 
                x: -30, 
                y: -10, 
                rotate: -15, 
                transition: { duration: 0.5, type: "spring", stiffness: 100 } 
              }
            }}
          >
            <circle cx="100" cy="75" r="24" fill="#F4F7F6" className="dark:fill-[#020617] transition-colors duration-300 opacity-95" />
            <circle cx="100" cy="75" r="24" className="stroke-[#00A8CC]" strokeWidth="10" fill="none" />
            <line x1="117" y1="92" x2="140" y2="115" className="stroke-[#00A8CC]" strokeWidth="14" strokeLinecap="round" />
          </motion.g>
        </motion.svg>
      </div>

      {/* نووسینی براندەکە (بچووک کراوەتەوە بۆ قەبارەی ئاسایی) */}
      <div className="flex flex-col justify-center">
        <span 
          className="text-base md:text-xl font-bold leading-tight text-[#0A2540] dark:text-white transition-colors"
          style={{ WebkitTextStroke: '0.6px currentColor' }}
        >
          توێژینەوەی زانستی
        </span>
        <span className="text-[10px] md:text-xs font-semibold text-[#00A8CC] mt-0.5">
          سەرچاوەی باوەڕپێکراوی توێژەران
        </span>
      </div>
    </motion.div>
  );
}