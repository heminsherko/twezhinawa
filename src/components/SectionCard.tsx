"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Library, Globe, BarChart3, FileText, UserPlus } from "lucide-react";
import AssistanceModal from "./AssistanceModal";
import ResearchGuideModal from "./ResearchGuideModal";

const cards = [
  {
    title: "چۆن توێژینەوەکەم دروست بکەم؟",
    description: "فێرکاری قۆناغ بە قۆناغی نووسینی پێشەکی، کورتە، دیاریکردنی کێشەی توێژینەوە و هەڵبژاردنی میتۆدی گونجاو.",
    icon: BookOpen,
    guideId: "create-research"
  },
  {
    title: "دۆزینەوەی سەرچاوەی زانستی",
    description: "دۆزینەوەی باشترین پەرتووک و توێژینەوەی ئەکادیمی بە زمانەکانی کوردی، عەرەبی و ئینگلیزی بە سەدا سەد بێبەرامبەر.",
    icon: Library,
    guideId: "find-sources"
  },
  {
    title: "بڵاوکردنەوە لە گۆڤارەکان",
    description: "ناساندنی گۆڤارەکانی Scopus و Clarivate و ڕێنمایی بۆ خۆدوورگرتن لە گۆڤارە ساختەکان.",
    icon: Globe,
    guideId: "international-journals"
  },
  {
    title: "ڕاوێژکاری تایبەتی",
    description: "دابینکردنی ڕاوێژی یەک-بۆ-یەک بۆ پێداچوونەوە و ڕاستکردنەوەی توێژینەوەکانت.",
    icon: UserPlus,
    action: "consultation"
  }
];

export default function SectionCard() {
  const [showAssistanceModal, setShowAssistanceModal] = useState(false);
  const [activeGuide, setActiveGuide] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } }
  };

  return (
    <section id="features" className="py-12 md:py-28 relative">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-[#0A2540] dark:text-white inline-block">
            خزمەتگوزارییە ئەکادیمییەکان
          </h2>
          <div className="w-24 md:w-32 h-1.5 bg-[#00A8CC] mx-auto rounded-full mt-4 shadow-[0_0_10px_rgba(0,168,204,0.5)]"></div>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 md:gap-10 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {cards.map((card, index) => {
            const Icon = card.icon;
            
            const cardContent = (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="group p-5 md:p-10 rounded-2xl md:rounded-3xl bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 hover:border-[#00A8CC]/50 hover:-translate-y-1 md:hover:-translate-y-3 hover:shadow-xl md:hover:shadow-2xl active:scale-[0.98] transition-all duration-300 ease-out flex flex-col items-start relative overflow-hidden h-full cursor-pointer text-right"
              >
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-[#00A8CC]/5 dark:bg-[#00A8CC]/10 rounded-bl-full pointer-events-none transition-transform duration-500 group-hover:scale-110" />
                
                {/* Header (Icon + Title) */}
                <div className="flex items-center gap-3 text-right w-full relative z-10">
                  <div className="w-12 h-12 md:w-16 md:h-16 shrink-0 rounded-xl md:rounded-2xl bg-[#F4F7F6] dark:bg-slate-900/50 flex items-center justify-center border border-slate-200 dark:border-slate-700 group-hover:border-[#00A8CC]/40 group-hover:bg-[#00A8CC]/10 transition-colors">
                    <Icon className="w-6 h-6 md:w-8 md:h-8 text-[#00A8CC]" />
                  </div>
                  <h3 className="text-lg md:text-2xl font-bold text-[#0A2540] dark:text-white group-hover:text-[#00A8CC] dark:group-hover:text-[#00A8CC] transition-colors leading-tight">
                    {card.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="w-full mt-3 md:mt-5 text-sm md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed md:leading-relaxed text-right relative z-10 font-medium">
                  {card.description}
                </p>
              </motion.div>
            );

            if (card.guideId) {
              return (
                <button key={index} className="block h-full w-full text-right" onClick={() => setActiveGuide(card.guideId)}>
                  {cardContent}
                </button>
              );
            }

            if (card.action === "consultation") {
              return (
                <button key={index} className="block h-full w-full text-right" onClick={() => setShowAssistanceModal(true)}>
                  {cardContent}
                </button>
              );
            }

            return cardContent;
          })}
        </motion.div>
      </div>
      
      <AssistanceModal 
        isOpen={showAssistanceModal} 
        onClose={() => setShowAssistanceModal(false)} 
      />
      <ResearchGuideModal 
        isOpen={!!activeGuide} 
        onClose={() => setActiveGuide(null)} 
        activeGuideId={activeGuide || ""}
      />
    </section>
  );
}
