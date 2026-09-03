"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, CheckCircle2 } from "lucide-react";

interface AssistanceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AssistanceModal({ isOpen, onClose }: AssistanceModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    topic: "",
    details: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call and save to localStorage
    setTimeout(() => {
      const existing = JSON.parse(localStorage.getItem("admin_submissions") || "[]");
      const newSubmission = {
        id: Date.now().toString(),
        name: formData.name,
        contact: formData.contact,
        topic: formData.topic,
        details: formData.details, // optional detail field for now, though dashboard doesn't show it yet
        date: new Date().toISOString().split("T")[0],
        status: "new",
      };
      
      localStorage.setItem("admin_submissions", JSON.stringify([newSubmission, ...existing]));
      
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Close modal after showing success message
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ name: "", contact: "", topic: "", details: "" });
        onClose();
      }, 3000);
    }, 1000);
  };

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
              <h2 className="text-xl font-bold text-[#0A2540] dark:text-white">پێویستت بە یارمەتییە؟</h2>
              <button onClick={onClose} className="p-2 text-slate-400 hover:text-red-500 bg-white dark:bg-slate-800 rounded-full shadow-sm transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  className="flex flex-col items-center justify-center py-10 text-center"
                >
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0A2540] dark:text-white mb-2">سەرکەوتوو بوو!</h3>
                  <p className="text-slate-500 dark:text-slate-400">داواکارییەکەت بە سەرکەوتوویی نێردرا! لە نزیکترین کاتدا پەیوەندیت پێوە دەکەین.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                    فۆڕمەکە پڕبکەرەوە و ئێمە پەیوەندیت پێوە دەکەین بۆ هاوکاری لە توێژینەوەکەت.
                  </p>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">ناوی تەواو</label>
                    <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-[#00A8CC] transition-colors" placeholder="ناوی سێیانی..." />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">ژمارەی تەلەفۆن یان ئیمەیڵ</label>
                    <input required type="text" value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-[#00A8CC] transition-colors text-left" dir="ltr" placeholder="0750 XXX XXXX" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">جۆری توێژینەوە / بابەت</label>
                    <input required type="text" value={formData.topic} onChange={e => setFormData({...formData, topic: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-[#00A8CC] transition-colors" placeholder="بۆ نموونە: ماستەرنامە..." />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">زانیاری زیاتر (ئارەزوومەندانە)</label>
                    <textarea rows={3} value={formData.details} onChange={e => setFormData({...formData, details: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-[#00A8CC] resize-none transition-colors" placeholder="هەر تێبینییەکت هەیە بینووسە..." />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-[#00A8CC] hover:bg-[#008BA8] text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-md shadow-[#00A8CC]/20 disabled:opacity-70 mt-2"
                  >
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                    {isSubmitting ? "لە ناردندایە..." : "ناردنی داواکاری"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}