"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Loader2 } from "lucide-react";
import Logo from "@/components/Logo";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "هەڵەیەک ڕوویدا");
      }
    } catch (err) {
      setError("هێڵی ئینتەرنێتەکەت بپشکنە");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] flex flex-col justify-center items-center p-4" dir="rtl">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 p-8">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#0A2540] dark:text-white mb-2">چوونەژوورەوەی بەڕێوەبەر</h1>
          <p className="text-slate-500 dark:text-slate-400">وشەی تێپەڕ بنووسە بۆ چوونە ناو پانێڵ</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="وشەی تێپەڕ..."
                className="w-full pl-4 pr-12 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#00A8CC] outline-none transition-all text-slate-700 dark:text-white"
                required
              />
              <Lock className="w-5 h-5 text-slate-400 absolute top-1/2 -translate-y-1/2 right-4" />
            </div>
            {error && <p className="text-red-500 text-sm mt-2 font-medium">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00A8CC] hover:bg-[#008BA8] text-white py-4 rounded-xl font-bold text-lg transition-all flex justify-center items-center disabled:opacity-70"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "چوونەژوورەوە"}
          </button>
        </form>
      </div>
    </div>
  );
}