"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, PhoneCall, MessageCircle, Send } from "lucide-react";

interface AssistanceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Editable constants
const PHONE_NUMBER = "+9647732640262";
const VIBER_NUMBER = "%2B9647732640262";
const TELEGRAM_HANDLE = "heminsherko";

const WHATSAPP_URL = `https://wa.me/9647732640262?text=${encodeURIComponent("سڵاو، پێویستم بە یارمەتییە لە توێژینەوەی زانستی")}`;
const TELEGRAM_URL = `https://t.me/${TELEGRAM_HANDLE}`;
const VIBER_URL = `viber://chat?number=${VIBER_NUMBER}`;

export default function AssistanceModal({ isOpen, onClose }: AssistanceModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" dir="rtl">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white dark:bg-[#0f172a] w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 relative"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
              <h2 className="text-xl font-bold text-[#0A2540] dark:text-white">پەیوەندیمان پێوە بکە</h2>
              <button onClick={onClose} className="p-2 text-slate-400 hover:text-red-500 bg-white dark:bg-slate-800 rounded-full shadow-sm transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                بۆ هەر پرسیار، ڕاوێژ و هاوکارییەکی زانستی، ڕاستەوخۆ لە ڕێگەی ئەم تۆڕانەوە پەیوەندیمان پێوە بکە:
              </p>
              
              <div className="space-y-4">
                {/* WhatsApp */}
                <motion.a 
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-4 w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-[#25D366] hover:shadow-lg hover:shadow-[#25D366]/20 transition-all group cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center group-hover:bg-[#25D366] group-hover:text-white transition-colors shrink-0">
                    <MessageCircle className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0A2540] dark:text-white mb-1 group-hover:text-[#25D366] transition-colors">واتسئەپ (WhatsApp)</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">نامە بنێرە بۆ وەڵامدانەوەی خێرا</p>
                  </div>
                </motion.a>

                {/* Telegram */}
                <motion.a 
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-4 w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-[#229ED9] hover:shadow-lg hover:shadow-[#229ED9]/20 transition-all group cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-full bg-[#229ED9]/10 text-[#229ED9] flex items-center justify-center group-hover:bg-[#229ED9] group-hover:text-white transition-colors shrink-0">
                    <Send className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0A2540] dark:text-white mb-1 group-hover:text-[#229ED9] transition-colors">تێلیگرام (Telegram)</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">پەیوەندی لە تێلیگرامەوە</p>
                  </div>
                </motion.a>

                {/* Viber */}
                <motion.a 
                  href={VIBER_URL}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-4 w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-[#7360F2] hover:shadow-lg hover:shadow-[#7360F2]/20 transition-all group cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-full bg-[#7360F2]/10 text-[#7360F2] flex items-center justify-center group-hover:bg-[#7360F2] group-hover:text-white transition-colors shrink-0">
                    <PhoneCall className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0A2540] dark:text-white mb-1 group-hover:text-[#7360F2] transition-colors">ڤایبەر (Viber)</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">پەیوەندی لە ڕێگەی ڤایبەرەوە</p>
                  </div>
                </motion.a>

                {/* Direct Phone Call */}
                <div className="pt-4 mt-2 border-t border-slate-200 dark:border-slate-800 text-center">
                  <a href={`tel:${PHONE_NUMBER}`} className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-[#00A8CC] dark:text-slate-400 dark:hover:text-[#00A8CC] transition-colors bg-slate-50 dark:bg-slate-800/50 px-4 py-2 rounded-full">
                    <PhoneCall className="w-4 h-4" />
                    <span dir="ltr">{PHONE_NUMBER}</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}