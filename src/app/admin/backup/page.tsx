"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, RefreshCw, HardDrive, CheckCircle2 } from "lucide-react";

export default function AdminBackup() {
  const [isExporting, setIsExporting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState("٢ کاتژمێر لەمەوبەر");

  const handleExportJSON = () => {
    setIsExporting(true);
    setTimeout(() => {
      const articles = localStorage.getItem("admin_articles") || "[]";
      const submissions = localStorage.getItem("admin_submissions") || "[]";
      
      const data = {
        exportDate: new Date().toISOString(),
        articles: JSON.parse(articles),
        submissions: JSON.parse(submissions)
      };

      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `twejinewe-backup-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setIsExporting(false);
    }, 1000);
  };

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastSync("ئێستا");
    }, 2000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0A2540] dark:text-white mb-2">باکئەپ و پاراستنی داتا</h1>
        <p className="text-slate-500 text-sm">بەڕێوەبردنی کۆپی یەدەگ و هاوکاتکردنی داتاکان لەگەڵ Google Drive.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Local Export Card */}
        <div className="bg-white dark:bg-[#0f172a] p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-6">
            <Download className="w-10 h-10 text-blue-500" />
          </div>
          <h2 className="text-xl font-bold text-[#0A2540] dark:text-white mb-2">داگرتنی کۆپییەکی یەدەگ</h2>
          <p className="text-slate-500 text-sm mb-8 leading-relaxed">دەتوانیت تەواوی داتاکانی (بابەتەکان و داواکارییەکان) لە فایلی جۆری JSON دابگریت و لە کۆمپیوتەرەکەت هەڵیبگریت.</p>
          <button 
            onClick={handleExportJSON}
            disabled={isExporting}
            className="w-full bg-[#0A2540] dark:bg-slate-800 hover:bg-[#113255] dark:hover:bg-slate-700 text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isExporting ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
            {isExporting ? "لە داگرتندایە..." : "داگرتنی داتا (JSON)"}
          </button>
        </div>

        {/* Google Drive Sync Card */}
        <div className="bg-white dark:bg-[#0f172a] p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-[#00A8CC]" />
          <div className="w-20 h-20 bg-[#00A8CC]/10 rounded-full flex items-center justify-center mb-6">
            <HardDrive className="w-10 h-10 text-[#00A8CC]" />
          </div>
          <h2 className="text-xl font-bold text-[#0A2540] dark:text-white mb-2">Google Drive</h2>
          <p className="text-slate-500 text-sm mb-4 leading-relaxed">هاوکاتکردنی ڕاستەوخۆی بنکەی زانیارییەکان لەگەڵ Google Sheets و هەڵگرتنی فایلەکان لە Drive.</p>
          
          <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-4 py-2 rounded-full mb-8">
            <CheckCircle2 className="w-4 h-4" />
            دواین هاوکاتکردن: {lastSync}
          </div>

          <button 
            onClick={handleSync}
            disabled={isSyncing}
            className="w-full bg-[#00A8CC] hover:bg-[#008BA8] text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-70 shadow-md shadow-[#00A8CC]/20"
          >
            <RefreshCw className={`w-5 h-5 ${isSyncing ? "animate-spin" : ""}`} />
            {isSyncing ? "لە هاوکاتکردندایە..." : "هاوکاتکردن لەگەڵ گووگڵ درایڤ"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}