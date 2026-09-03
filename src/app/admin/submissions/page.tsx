"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Trash2, Mail, Phone, Clock, CheckCircle, CircleDashed } from "lucide-react";

interface Submission {
  id: string;
  name: string;
  contact: string;
  topic: string;
  date: string;
  status: "new" | "in-progress" | "completed";
}

export default function AdminSubmissions() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("admin_submissions");
    if (saved) {
      setSubmissions(JSON.parse(saved));
    } else {
      const dummy: Submission[] = [
        { id: "1", name: "ئەحمەد سیروان", contact: "0750 123 4567", topic: "هاوکاری لە نووسینی پێشەکی", date: "2024-05-14", status: "new" },
        { id: "2", name: "سارا محەمەد", contact: "sara@example.com", topic: "پێداچوونەوەی سەرچاوەکان", date: "2024-05-13", status: "in-progress" },
        { id: "3", name: "کۆسار کاروان", contact: "0770 987 6543", topic: "ڕاوێژکاری ماستەرنامە", date: "2024-05-10", status: "completed" },
      ];
      setSubmissions(dummy);
      localStorage.setItem("admin_submissions", JSON.stringify(dummy));
    }
  }, []);

  const saveSubmissions = (newSubs: Submission[]) => {
    setSubmissions(newSubs);
    localStorage.setItem("admin_submissions", JSON.stringify(newSubs));
  };

  const handleStatusChange = (id: string, newStatus: Submission["status"]) => {
    const updated = submissions.map(s => s.id === id ? { ...s, status: newStatus } : s);
    saveSubmissions(updated);
  };

  const handleDelete = (id: string) => {
    if (confirm("دڵنیایت لە سڕینەوەی ئەم داواکارییە؟")) {
      saveSubmissions(submissions.filter(s => s.id !== id));
    }
  };

  const filtered = submissions.filter(s => 
    s.name.includes(searchQuery) || s.topic.includes(searchQuery) || s.contact.includes(searchQuery)
  );

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0A2540] dark:text-white mb-2">داواکارییەکان</h1>
        <p className="text-slate-500 text-sm">بەڕێوەبردن و بەدواداچوونی داواکاری و پرسیاری توێژەران.</p>
      </div>

      <div className="bg-white dark:bg-[#0f172a] p-4 rounded-2xl border border-slate-200 dark:border-slate-800 mb-6 shadow-sm">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="گەڕان بەدوای ناو، بابەت یان ژمارە..." 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pr-10 pl-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-[#00A8CC]"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-right whitespace-nowrap">
            <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-slate-500">
              <tr>
                <th className="px-6 py-4 font-medium">ناو</th>
                <th className="px-6 py-4 font-medium">پەیوەندی</th>
                <th className="px-6 py-4 font-medium">بابەتی داواکاری</th>
                <th className="px-6 py-4 font-medium">بەروار</th>
                <th className="px-6 py-4 font-medium">دۆخ</th>
                <th className="px-6 py-4 font-medium text-center">کردارەکان</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <AnimatePresence>
                {filtered.map(sub => (
                  <motion.tr 
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={sub.id} 
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-bold text-[#0A2540] dark:text-white">{sub.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-500 font-mono" dir="ltr">
                      <div className="flex items-center justify-end gap-2">
                        {sub.contact.includes("@") ? <Mail className="w-4 h-4 text-slate-400" /> : <Phone className="w-4 h-4 text-slate-400" />}
                        {sub.contact}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300 max-w-[200px] truncate" title={sub.topic}>{sub.topic}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{sub.date}</td>
                    <td className="px-6 py-4">
                      <select 
                        value={sub.status}
                        onChange={(e) => handleStatusChange(sub.id, e.target.value as Submission["status"])}
                        className={`text-xs font-bold rounded-full px-3 py-1.5 outline-none appearance-none cursor-pointer border-0 ${
                          sub.status === 'new' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 
                          sub.status === 'in-progress' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' : 
                          'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                        }`}
                      >
                        <option value="new">نوێ</option>
                        <option value="in-progress">لە کاردایە</option>
                        <option value="completed">تەواوکراو</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => handleDelete(sub.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-slate-500">هیچ داواکارییەکی هاوتا نەدۆزرایەوە.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}