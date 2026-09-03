"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, RefreshCw, HardDrive, CheckCircle2, Link as LinkIcon, AlertCircle, XCircle, Clock } from "lucide-react";

export default function AdminBackup() {
  const [isExporting, setIsExporting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [lastSync, setLastSync] = useState("هێشتا هاوکات نەکراوە");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error" | ""; text: string }>({ type: "", text: "" });

  useEffect(() => {
    const savedUrl = localStorage.getItem("admin_google_webhook");
    if (savedUrl) setWebhookUrl(savedUrl);
    const syncTime = localStorage.getItem("admin_last_sync");
    if (syncTime) setLastSync(syncTime);
  }, []);

  const handleWebhookChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWebhookUrl(e.target.value);
    localStorage.setItem("admin_google_webhook", e.target.value);
    setStatusMessage({ type: "", text: "" });
  };

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

  const handleTestConnection = async () => {
    if (!webhookUrl) {
      setStatusMessage({ type: "error", text: "تکایە سەرەتا بەستەری وێبهوکەکە دابنێ." });
      return;
    }
    
    setIsTesting(true);
    setStatusMessage({ type: "", text: "" });
    
    try {
      const res = await fetch("/api/backup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: webhookUrl, test: true })
      });
      
      const result = await res.json();
      
      if (res.ok) {
        setStatusMessage({ type: "success", text: "سەرکەوتوو بوو! پەیوەندی بە گووگڵەوە دروست کرا." });
      } else {
        setStatusMessage({ type: "error", text: result.error || "کێشەیەک ڕوویدا لە کاتی پەیوەندیکردندا." });
      }
    } catch (error) {
      setStatusMessage({ type: "error", text: "هەڵەیەک ڕوویدا. دڵنیابە لە خێرایی ئینتەرنێتەکەت." });
    } finally {
      setIsTesting(false);
    }
  };

  const handleSync = async () => {
    if (!webhookUrl) {
      setStatusMessage({ type: "error", text: "تکایە سەرەتا بەستەری وێبهوکەکە دابنێ پێش هاوکاتکردن." });
      return;
    }

    setIsSyncing(true);
    setStatusMessage({ type: "", text: "" });
    
    try {
      const articles = JSON.parse(localStorage.getItem("admin_articles") || "[]");
      const submissions = JSON.parse(localStorage.getItem("admin_submissions") || "[]");
      
      const data = { articles, submissions };

      const res = await fetch("/api/backup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: webhookUrl, data, test: false })
      });
      
      const result = await res.json();
      
      if (res.ok) {
        const timeNow = new Date().toLocaleString("ku-IQ") || "ئێستا";
        setLastSync(timeNow);
        localStorage.setItem("admin_last_sync", timeNow);
        setStatusMessage({ type: "success", text: "داتاکان بە سەرکەوتوویی هاوکات کران لەگەڵ گووگڵ." });
      } else {
        setStatusMessage({ type: "error", text: result.error || "کێشەیەک ڕوویدا لە کاتی هاوکاتکردندا." });
      }
    } catch (error) {
      setStatusMessage({ type: "error", text: "هەڵەیەک ڕوویدا لە ناردنی داتاکان." });
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0A2540] dark:text-white mb-2">باکئەپ و پاراستنی داتا</h1>
        <p className="text-slate-500 text-sm">بەڕێوەبردنی کۆپی یەدەگ و هاوکاتکردنی داتاکان لەگەڵ Google Drive / Sheets.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Local Export Card */}
        <div className="bg-white dark:bg-[#0f172a] p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-6">
            <Download className="w-10 h-10 text-blue-500" />
          </div>
          <h2 className="text-xl font-bold text-[#0A2540] dark:text-white mb-2">داگرتنی کۆپییەکی یەدەگ (Local)</h2>
          <p className="text-slate-500 text-sm mb-8 leading-relaxed">دەتوانیت تەواوی داتاکانی (بابەتەکان و داواکارییەکان) لە فایلی جۆری JSON دابگریت و لە کۆمپیوتەرەکەت هەڵیبگریت.</p>
          
          <div className="mt-auto w-full">
            <button 
              onClick={handleExportJSON}
              disabled={isExporting}
              className="w-full bg-[#0A2540] dark:bg-slate-800 hover:bg-[#113255] dark:hover:bg-slate-700 text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isExporting ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
              {isExporting ? "لە داگرتندایە..." : "داگرتنی داتا (JSON)"}
            </button>
          </div>
        </div>

        {/* Google Drive Sync Card */}
        <div className="bg-white dark:bg-[#0f172a] p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col text-right relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-[#00A8CC]" />
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-[#00A8CC]/10 rounded-2xl flex items-center justify-center shrink-0">
              <HardDrive className="w-8 h-8 text-[#00A8CC]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#0A2540] dark:text-white">Google Drive & Sheets Setup</h2>
              <p className="text-slate-500 text-sm mt-1">هاوکاتکردنی ڕاستەوخۆ لەگەڵ گووگڵ</p>
            </div>
          </div>
          
          <div className="space-y-4 mb-6 text-right">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">بەستەری وێبهوک (Google Script URL)</label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  value={webhookUrl}
                  onChange={handleWebhookChange}
                  dir="ltr"
                  placeholder="https://script.google.com/macros/s/..." 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-[#00A8CC] text-left font-mono text-sm"
                />
              </div>
            </div>
          </div>

          {statusMessage.text && (
            <div className={`p-4 rounded-xl mb-6 flex items-start gap-3 text-sm font-medium ${
              statusMessage.type === "success" 
                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50" 
                : "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400 border border-red-200 dark:border-red-900/50"
            }`}>
              {statusMessage.type === "success" ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <XCircle className="w-5 h-5 shrink-0" />}
              {statusMessage.text}
            </div>
          )}

          <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-4 py-2 rounded-full mb-6 mx-auto md:mx-0 w-fit">
            <Clock className="w-4 h-4 shrink-0" />
            دواین هاوکاتکردن: {lastSync}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-auto">
            <button 
              onClick={handleTestConnection}
              disabled={isTesting || isSyncing}
              className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-[#0A2540] dark:text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isTesting ? <RefreshCw className="w-5 h-5 animate-spin" /> : <AlertCircle className="w-5 h-5" />}
              تاقیکردنەوەی پەیوەندی
            </button>
            <button 
              onClick={handleSync}
              disabled={isSyncing || isTesting}
              className="w-full bg-[#00A8CC] hover:bg-[#008BA8] text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-70 shadow-md shadow-[#00A8CC]/20"
            >
              <RefreshCw className={`w-5 h-5 ${isSyncing ? "animate-spin" : ""}`} />
              هاوکاتکردنی ڕاستەوخۆ
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}