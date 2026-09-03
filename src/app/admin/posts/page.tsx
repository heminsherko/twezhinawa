"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Edit2, Trash2, Eye, X, Save } from "lucide-react";

interface Article {
  id: string;
  title: string;
  category: string;
  author: string;
  summary: string;
  content: string;
  status: "published" | "draft";
  date: string;
}

export default function AdminPosts() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<Article, "id" | "date">>({
    title: "",
    category: "گۆڤارە نێودەوڵەتییەکان",
    author: "",
    summary: "",
    content: "",
    status: "draft",
  });

  useEffect(() => {
    const saved = localStorage.getItem("admin_articles");
    if (saved) {
      setArticles(JSON.parse(saved));
    } else {
      // Dummy data for preview
      const dummy: Article[] = [
        { id: "1", title: "چۆنیەتی نووسینی پێشەکی توێژینەوە", category: "ڕێبەری توێژینەوە", author: "هێمن شێرکۆ", summary: "فێرکاری قۆناغ بە قۆناغ", content: "...", status: "published", date: "2024-05-12" },
      ];
      setArticles(dummy);
      localStorage.setItem("admin_articles", JSON.stringify(dummy));
    }
  }, []);

  const saveArticles = (newArticles: Article[]) => {
    setArticles(newArticles);
    localStorage.setItem("admin_articles", JSON.stringify(newArticles));
  };

  const handleSave = () => {
    if (!formData.title) return;
    
    if (editingId) {
      const updated = articles.map(a => a.id === editingId ? { ...a, ...formData } : a);
      saveArticles(updated);
    } else {
      const newArticle: Article = {
        ...formData,
        id: Date.now().toString(),
        date: new Date().toISOString().split("T")[0],
      };
      saveArticles([newArticle, ...articles]);
    }
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ title: "", category: "گۆڤارە نێودەوڵەتییەکان", author: "", summary: "", content: "", status: "draft" });
  };

  const handleEdit = (article: Article) => {
    setEditingId(article.id);
    setFormData({
      title: article.title,
      category: article.category,
      author: article.author,
      summary: article.summary,
      content: article.content,
      status: article.status,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("دڵنیایت لە سڕینەوەی ئەم بابەتە؟")) {
      saveArticles(articles.filter(a => a.id !== id));
    }
  };

  const filteredArticles = articles.filter(a => {
    const matchesSearch = a.title.includes(searchQuery) || a.author.includes(searchQuery);
    const matchesCat = filterCategory === "all" || a.category === filterCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0A2540] dark:text-white mb-2">بەڕێوەبردنی بابەتەکان</h1>
          <p className="text-slate-500 text-sm">زیادکردن و دەستکاریکردنی بڵاوکراوە و ڕێبەرەکانی توێژینەوە.</p>
        </div>
        <button 
          onClick={() => {
            setEditingId(null);
            setFormData({ title: "", category: "گۆڤارە نێودەوڵەتییەکان", author: "", summary: "", content: "", status: "draft" });
            setIsModalOpen(true);
          }}
          className="bg-[#00A8CC] hover:bg-[#008BA8] text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-colors font-medium shadow-md w-full md:w-auto justify-center"
        >
          <Plus className="w-5 h-5" />
          زیادکردنی بابەتی نوێ
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-[#0f172a] p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-4 mb-6 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="گەڕان بۆ ناونیشان..." 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pr-10 pl-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-[#00A8CC]"
          />
        </div>
        <select 
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value)}
          className="px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-[#00A8CC] md:w-64"
        >
          <option value="all">هەموو پۆلێنەکان</option>
          <option value="گۆڤارە نێودەوڵەتییەکان">گۆڤارە نێودەوڵەتییەکان</option>
          <option value="ڕێبەری توێژینەوە">ڕێبەری توێژینەوە</option>
          <option value="سەرچاوەکان">سەرچاوەکان</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-right whitespace-nowrap">
            <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-slate-500">
              <tr>
                <th className="px-6 py-4 font-medium">ناونیشان</th>
                <th className="px-6 py-4 font-medium">پۆلێن</th>
                <th className="px-6 py-4 font-medium">نووسەر</th>
                <th className="px-6 py-4 font-medium">دۆخ</th>
                <th className="px-6 py-4 font-medium">بەروار</th>
                <th className="px-6 py-4 font-medium text-center">کردارەکان</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <AnimatePresence>
                {filteredArticles.map(article => (
                  <motion.tr 
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={article.id} 
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-[#0A2540] dark:text-white max-w-[200px] truncate" title={article.title}>{article.title}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{article.category}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{article.author}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${article.status === 'published' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                        {article.status === 'published' ? 'بڵاوکراوەتەوە' : 'ڕەشنووس'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">{article.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-2 text-slate-400 hover:text-blue-500 transition-colors bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700"><Eye className="w-4 h-4" /></button>
                        <button onClick={() => handleEdit(article)} className="p-2 text-slate-400 hover:text-emerald-500 transition-colors bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(article.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {filteredArticles.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-slate-500">هیچ بابەتێک نەدۆزرایەوە.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CMS Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 w-full max-w-3xl max-h-[90vh] rounded-2xl md:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800"
            >
              <div className="p-5 md:p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                <h2 className="text-lg md:text-xl font-bold text-[#0A2540] dark:text-white">
                  {editingId ? "دەستکاریکردنی بابەت" : "بابەتی نوێ"}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-red-500 bg-white dark:bg-slate-800 rounded-full shadow-sm">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">ناونیشانی بابەت</label>
                  <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-[#00A8CC]" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">پۆلێن</label>
                    <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-[#00A8CC]">
                      <option value="گۆڤارە نێودەوڵەتییەکان">گۆڤارە نێودەوڵەتییەکان</option>
                      <option value="ڕێبەری توێژینەوە">ڕێبەری توێژینەوە</option>
                      <option value="سەرچاوەکان">سەرچاوەکان</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">نووسەر</label>
                    <input type="text" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-[#00A8CC]" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">پوختە</label>
                  <textarea rows={2} value={formData.summary} onChange={e => setFormData({...formData, summary: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-[#00A8CC] resize-none" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">ناوەڕۆک (HTML/Text)</label>
                  <textarea rows={6} value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-[#00A8CC] font-mono text-sm text-left" dir="ltr" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">دۆخی بڵاوکردنەوە</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" checked={formData.status === "published"} onChange={() => setFormData({...formData, status: "published"})} name="status" className="w-4 h-4 text-[#00A8CC]" />
                      <span className="text-sm">بڵاوکراوەتەوە</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" checked={formData.status === "draft"} onChange={() => setFormData({...formData, status: "draft"})} name="status" className="w-4 h-4 text-[#00A8CC]" />
                      <span className="text-sm">ڕەشنووس</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="p-5 md:p-6 border-t border-slate-200 dark:border-slate-800 flex flex-col-reverse md:flex-row justify-end gap-3 bg-slate-50 dark:bg-slate-800/50">
                <button onClick={() => setIsModalOpen(false)} className="w-full md:w-auto px-6 py-3 rounded-xl font-medium text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors">پاشگەزبوونەوە</button>
                <button onClick={handleSave} className="w-full md:w-auto bg-[#00A8CC] hover:bg-[#008BA8] text-white px-8 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors shadow-md">
                  <Save className="w-5 h-5" />
                  پاشەکەوتکردن
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}