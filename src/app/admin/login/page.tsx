"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password === "Twezhinawa2026" || password === "twezhinawa2026") {
      localStorage.setItem("admin_auth", "true");
      document.cookie = "admin_auth=true; path=/; max-age=86400;";
      router.push("/admin");
    } else {
      setError("وشەی نهێنی هەڵەیە! تکایە وشەی ڕاست بنووسە.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 font-sans" dir="rtl">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#00A8CC]/10 text-[#00A8CC] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[#0A2540] dark:text-white">
            چوونەژوورەوەی بەڕێوەبەر
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
            تکایە وشەی نهێنی بنووسە بۆ دەستگەیشتن بە داشبۆرد
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              وشەی نهێنی (پاسۆرد)
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00A8CC] transition-all text-left"
              dir="ltr"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00A8CC] hover:bg-[#008BA8] text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#00A8CC]/20"
          >
            {loading ? "چاوەڕێ بکە..." : "چوونەژوورەوە"}
          </button>
        </form>
      </div>
    </div>
  );
}