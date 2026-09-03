"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Globe, Award, AlertTriangle, BookOpen, ExternalLink, Library } from "lucide-react";
import ArticleModal from "../../components/ArticleModal";

export default function JournalsPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("admin_articles");
    if (saved) {
      const parsed = JSON.parse(saved);
      const filtered = parsed.filter((a: any) => a.category === "گۆڤارە نێودەوڵەتییەکان" && a.status === "published");
      setArticles(filtered);
    }
  }, []);

  return (
    <div className="min-h-screen pt-10 pb-20 px-4">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* بەشی پێشوازی */}
        <div className="text-center space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl text-[#0A2540] dark:text-white"
            style={{ WebkitTextStroke: '0.6px currentColor' }}
          >
            گۆڤارە نێودەوڵەتییەکان و بڵاوکردنەوەی زانستی
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed"
          >
            ڕێبەری باوەڕپێکراو بۆ دۆزینەوەی گۆڤارە ئاست بەرزەکانی Scopus و Clarivate، و خۆپاراستن لە گۆڤارە ساختەکان.
          </motion.p>
        </div>

        {/* داتابەیسەکان */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl text-[#0A2540] dark:text-white mb-6 border-b border-[#E2E8F0] dark:border-slate-700 pb-4" style={{ WebkitTextStroke: '0.6px currentColor' }}>
            ١. داتابەیسە باوەڕپێکراوەکان
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.length > 0 ? (
              articles.map(article => (
                <button 
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className="bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-slate-700 rounded-2xl p-6 hover:-translate-y-2 hover:border-[#00A8CC] transition-all group shadow-sm flex flex-col items-start gap-4 text-right"
                >
                  <div className="bg-[#00A8CC]/10 p-4 rounded-xl text-[#00A8CC]">
                    <BookOpen className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl text-[#0A2540] dark:text-white flex items-center gap-2" style={{ WebkitTextStroke: '0.4px currentColor' }}>
                      {article.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm leading-relaxed">
                      {article.summary}
                    </p>
                  </div>
                </button>
              ))
            ) : (
              <>
                {/* Scopus */}
                <a href="https://www.scopus.com/sources.uri" target="_blank" rel="noreferrer" className="bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-slate-700 rounded-2xl p-6 hover:-translate-y-2 hover:border-[#00A8CC] transition-all group shadow-sm flex flex-col items-start gap-4">
                  <div className="bg-[#00A8CC]/10 p-4 rounded-xl text-[#00A8CC]">
                    <Globe className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl text-[#0A2540] dark:text-white flex items-center gap-2" style={{ WebkitTextStroke: '0.4px currentColor' }}>
                      Scopus <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm leading-relaxed">
                      گەورەترین داتابەیسی توێژینەوە و گۆڤارە زانستییەکان لە جیهاندا.
                    </p>
                  </div>
                </a>

                {/* Clarivate */}
                <a href="https://mjl.clarivate.com/home" target="_blank" rel="noreferrer" className="bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-slate-700 rounded-2xl p-6 hover:-translate-y-2 hover:border-[#00A8CC] transition-all group shadow-sm flex flex-col items-start gap-4">
                  <div className="bg-[#00A8CC]/10 p-4 rounded-xl text-[#00A8CC]">
                    <Award className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl text-[#0A2540] dark:text-white flex items-center gap-2" style={{ WebkitTextStroke: '0.4px currentColor' }}>
                      Web of Science <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm leading-relaxed">
                      مەرجەعی فەرمی بۆ زانینی Impact Factor و ئاستی گۆڤارەکان.
                    </p>
                  </div>
                </a>

                {/* DOAJ */}
                <a href="https://doaj.org/" target="_blank" rel="noreferrer" className="bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-slate-700 rounded-2xl p-6 hover:-translate-y-2 hover:border-[#00A8CC] transition-all group shadow-sm flex flex-col items-start gap-4">
                  <div className="bg-[#00A8CC]/10 p-4 rounded-xl text-[#00A8CC]">
                    <Library className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl text-[#0A2540] dark:text-white flex items-center gap-2" style={{ WebkitTextStroke: '0.4px currentColor' }}>
                      DOAJ <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm leading-relaxed">
                      لیستی گۆڤارە باوەڕپێکراوەکانی کراوە (Open Access).
                    </p>
                  </div>
                </a>
              </>
            )}
          </div>
        </motion.section>

        {/* ئاستەکانی گۆڤار Quartiles */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl text-[#0A2540] dark:text-white mb-6 border-b border-[#E2E8F0] dark:border-slate-700 pb-4" style={{ WebkitTextStroke: '0.6px currentColor' }}>
            ٢. ئاستەکانی گۆڤار (Quartiles)
          </h2>
          <div className="bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-slate-700 rounded-3xl p-8 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div className="p-4 rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                <h3 className="text-2xl text-green-600 dark:text-green-400 mb-2" style={{ WebkitTextStroke: '0.5px currentColor' }}>Q1</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">باشترین ٢٥٪ی گۆڤارەکان (پێشەنگ)</p>
              </div>
              <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <h3 className="text-2xl text-blue-600 dark:text-blue-400 mb-2" style={{ WebkitTextStroke: '0.5px currentColor' }}>Q2</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">لە ٢٥٪ تا ٥٠٪ی گۆڤارەکان (بەهێز)</p>
              </div>
              <div className="p-4 rounded-2xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                <h3 className="text-2xl text-yellow-600 dark:text-yellow-400 mb-2" style={{ WebkitTextStroke: '0.5px currentColor' }}>Q3</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">لە ٥٠٪ تا ٧٥٪ی گۆڤارەکان (مامناوەند)</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <h3 className="text-2xl text-slate-600 dark:text-slate-400 mb-2" style={{ WebkitTextStroke: '0.5px currentColor' }}>Q4</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">کەمترین ئاست (ئاسایی)</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* گۆڤارە ساختەکان */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/50 rounded-3xl p-8 shadow-sm flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
            <div className="flex items-start gap-4">
              <div className="bg-red-100 dark:bg-red-900/50 p-4 rounded-full text-red-600 dark:text-red-400 shrink-0">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl text-red-700 dark:text-red-400 mb-2" style={{ WebkitTextStroke: '0.6px currentColor' }}>
                  خۆپاراستن لە گۆڤارە ساختەکان (Predatory Journals)
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl">
                  زۆرێک لە گۆڤارەکان تەنها بۆ وەرگرتنی پارە توێژینەوە بڵاو دەکەنەوە بەبێ پێداچوونەوەی زانستی (Peer-Review). پێش ناردنی توێژینەوەکەت، دڵنیابە کە ناوی گۆڤارەکە لە لیستی ڕەشی (Beall's List)دا نییە.
                </p>
              </div>
            </div>
            <a 
              href="https://beallslist.net/" 
              target="_blank" 
              rel="noreferrer"
              className="shrink-0 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors flex items-center gap-2 font-sans dir-ltr"
              dir="ltr"
            >
              <ExternalLink className="w-4 h-4" /> Check Beall's List
            </a>
          </div>
        </motion.section>

      </div>
      
      <ArticleModal 
        article={selectedArticle} 
        isOpen={!!selectedArticle} 
        onClose={() => setSelectedArticle(null)} 
      />
    </div>
  );
}