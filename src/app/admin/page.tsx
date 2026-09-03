"use client";

import { useState, useEffect } from "react";
import { Activity, Users, FileText, CheckCircle, FilePlus, CloudLightning } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const [statsData, setStatsData] = useState({
    articles: 0,
    submissions: 0,
    visitors: "٢,٤٥٠",
  });

  useEffect(() => {
    const articles = JSON.parse(localStorage.getItem("admin_articles") || "[]");
    const submissions = JSON.parse(localStorage.getItem("admin_submissions") || "[]");
    setStatsData({
      articles: articles.length,
      submissions: submissions.length,
      visitors: "٢,٤٥٠"
    });
  }, []);

  const stats = [
    { title: "کۆی سەردانکەران", value: statsData.visitors, icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "داواکارییە نوێیەکان", value: statsData.submissions.toString(), icon: Activity, color: "text-green-500", bg: "bg-green-500/10" },
    { title: "بابەتە بڵاوکراوەکان", value: statsData.articles.toString(), icon: FileText, color: "text-purple-500", bg: "bg-purple-500/10" },
    { title: "دۆخی سیستەم", value: "چالاكە", icon: CheckCircle, color: "text-teal-500", bg: "bg-teal-500/10" },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div className="mb-10 pt-2">
        <h1 className="text-3xl md:text-4xl font-bold text-[#0A2540] dark:text-white mb-3 leading-relaxed">بەخێربێیت، بەڕێوەبەر 👋</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed">لێرەوە دەتوانیت سەرجەم بەشەکانی ماڵپەڕەکە بەڕێوەبەریت و ئامارەکان ببینیت.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              key={i} 
              className="bg-white dark:bg-[#0f172a] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow"
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${stat.bg}`}>
                <Icon className={`w-7 h-7 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-[#0A2540] dark:text-white">{stat.value}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-[#0A2540] dark:text-white">دوایین چالاکییەکان</h3>
            <span className="text-sm text-slate-400">ئەمڕۆ</span>
          </div>
          <div className="space-y-4">
            <div className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
              <div>
                <p className="text-sm font-medium text-[#0A2540] dark:text-white mb-1">سیستەم باکئەپ کرا سەرکەوتووانە</p>
                <p className="text-xs text-slate-500">بە شێوەی ئۆتۆماتیکی پاشەکەوت کرا بۆ گووگڵ درایڤ</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
              <div>
                <p className="text-sm font-medium text-[#0A2540] dark:text-white mb-1">چوونەژوورەوەی بەڕێوەبەر</p>
                <p className="text-xs text-slate-500">لە ئایپی 192.168.1.1 سەرکەوتوو بوو</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-[#0A2540] dark:text-white mb-6">کردارە خێراکان</h3>
          <div className="space-y-3">
            <Link href="/admin/posts" className="flex items-center gap-3 w-full p-4 rounded-xl bg-[#00A8CC]/10 text-[#00A8CC] hover:bg-[#00A8CC]/20 transition-colors font-medium">
              <FilePlus className="w-5 h-5" />
              نووسینی بابەتی نوێ
            </Link>
            <Link href="/admin/backup" className="flex items-center gap-3 w-full p-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors font-medium">
              <CloudLightning className="w-5 h-5" />
              باکئەپکردنی خێرا
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}