"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

const fadeAnim = {
  initial: { opacity: 0, y: 15, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -15, scale: 0.98 },
  transition: { duration: 0.4, ease: "easeOut" as const }
};

interface LevelSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LevelSelectionModal({ isOpen, onClose }: LevelSelectionModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleSelect = (level: string) => {
    onClose();
    // Navigate to the create-research page and pass the selected level
    router.push(`/create-research?level=${encodeURIComponent(level)}`);
  };

  return (
    <div className="fixed inset-0 z-[200] bg-white/95 dark:bg-[#020617]/95 backdrop-blur-md overflow-y-auto flex items-center justify-center">
      <button 
        onClick={onClose}
        className="absolute top-6 left-6 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="w-full px-4">
        <div className="max-w-5xl w-full mx-auto">
          <AnimatePresence mode="wait">
            <motion.div key="step0" {...fadeAnim} className="space-y-12">
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl text-[#00A8CC] mb-6" style={{ WebkitTextStroke: '0.6px currentColor' }}>
                  خوێندکاری چی ئاستێکیت؟
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-xl">تکایە ئاستی خوێندنەکەت هەڵبژێرە بۆ بەردەوامبوون</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {["دیبلۆم", "بەکالۆریۆس", "ماستەر", "دکتۆرا"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSelect(opt)}
                    className="bg-white dark:bg-[#1E293B] border-2 border-slate-200 dark:border-slate-700 p-8 rounded-3xl hover:bg-slate-50 dark:hover:bg-[#1E293B] hover:border-[#00A8CC] dark:hover:border-[#00A8CC] hover:shadow-[0_10px_30px_-10px_rgba(0,168,204,0.3)] hover:-translate-y-2 transition-all flex flex-col items-center justify-center group"
                  >
                    <span className="text-2xl font-bold text-[#0A2540] dark:text-slate-100 group-hover:text-[#00A8CC] transition-colors">{opt}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

