"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, User, Tag } from "lucide-react";

interface Article {
  id: string;
  title: string;
  category: string;
  author: string;
  summary: string;
  content: string;
  status: string;
  date: string;
}

interface ArticleModalProps {
  article: Article | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ArticleModal({ article, isOpen, onClose }: ArticleModalProps) {
  return (
    <AnimatePresence>
      {isOpen && article && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" dir="rtl">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white dark:bg-[#0f172a] w-full max-w-3xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col relative"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
              <div className="flex gap-4 items-center overflow-hidden pr-2">
                 <h2 className="text-xl md:text-2xl font-bold text-[#0A2540] dark:text-white truncate" title={article.title}>{article.title}</h2>
              </div>
              <button onClick={onClose} className="p-2 text-slate-400 hover:text-red-500 bg-white dark:bg-slate-800 rounded-full shadow-sm transition-colors shrink-0">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-6 md:p-10">
              <div className="flex flex-wrap gap-4 mb-8 text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full">
                  <User className="w-4 h-4" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full">
                  <Calendar className="w-4 h-4" />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full">
                  <Tag className="w-4 h-4" />
                  <span>{article.category}</span>
                </div>
              </div>

              {article.summary && (
                <div className="mb-8 p-6 bg-[#00A8CC]/5 border-r-4 border-[#00A8CC] rounded-l-xl text-[#0A2540] dark:text-slate-200 text-lg leading-relaxed font-medium">
                  {article.summary}
                </div>
              )}

              <div 
                className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-loose prose-headings:text-[#0A2540] dark:prose-headings:text-white prose-a:text-[#00A8CC]"
                dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br />') }}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}