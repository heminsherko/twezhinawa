"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, PhoneCall, ChevronRight, CheckCircle2 } from "lucide-react";

// لیستی تەواوەتی کۆلێژ و بەشەکانی زانکۆکانی هەرێمی کوردستان
const universityData: Record<string, string[]> = {
  "پزیشکی و تەندروستی": ["پزیشکی گشتی", "پزیشکی ددان", "دەرمانسازی", "پەرستاری", "شیکاری نەخۆشییەکان", "تەندروستی گشتی", "سڕکردن", "تیشک", "چارەسەری سروشتی"],
  "ئەندازیاری": ["ئەندازیاری شارستانی", "ئەندازیاری تەلارسازی", "ئەندازیاری سۆفتوێر", "ئەندازیاری کۆمپیوتەر", "ئەندازیاری کارەبا", "ئەندازیاری میکانیک", "ئەندازیاری نەوت", "ئەندازیاری کیمیا", "ئەندازیاری سەرچاوەکانی ئاو", "ئەندازیاری ڕووپێوان", "ئەندازیاری فڕۆکەوانی"],
  "زانست و ئایتی": ["کۆمپیوتەر", "تەکنۆلۆجیای زانیاری (IT)", "بایۆلۆجی", "کیمیا", "فیزیا", "بیرکاری", "جیۆلۆجی", "ژینگە"],
  "پەروەردە و ئاداب": ["پەروەردەی گشتی", "زمانی کوردی", "زمانی ئینگلیزی", "زمانی عەرەبی", "دەروونناسی", "پەروەردەی تایبەت", "مێژوو", "جوگرافیا", "کۆمەڵناسی", "ڕاگەیاندن", "فەلسەفە"],
  "پەروەردەی بنەڕەتی": ["زمانی کوردی", "زمانی ئینگلیزی", "زمانی عەرەبی", "زانستە کۆمەڵایەتییەکان", "بیرکاری", "زانستە گشتییەکان", "باکخچەی ساوایان"],
  "یاسا و زانستە سیاسییەکان": ["یاسا", "زانستە سیاسییەکان", "پەیوەندییە نێودەوڵەتییەکان"],
  "کارگێڕی و ئابووری": ["کارگێڕی کار", "ژمێریاری", "ئابووری", "کارگێڕی بانک و دارایی", "گەشتیاری", "ئامار", "بەبازاڕکردن", "کارگێڕی گشتی"],
  "کشتوکاڵ و ڤێتێرنەری": ["ڤێتێرنەری", "پاراستنی ڕووەک", "سامانی ئاژەڵ", "زانستی خۆراک", "خاک و ئاو", "دارستان"]
};

// فەنکشنی زیرەک بۆ گێڕانەوەی ڕێنمایی تایبەت بەپێی جۆری کۆلێژ (بەپێی ستانداردی زانکۆکانی کوردستان)
const getGuidelinesByCollege = (college: string) => {
  if (college === "پزیشکی و تەندروستی" || college === "کشتوکاڵ و ڤێتێرنەری") {
    return [
      "هەڵبژاردنی ناونیشان و وەرگرتنی ڕەزامەندی لێژنەی ئەخلاقی توێژینەوە (Ethics Committee Approval) ئەگەر پەیوەست بوو بە نەخۆش یان ئاژەڵەوە.",
      "دیاریکردنی شێوازی توێژینەوە (وەک: Case Study, Cross-sectional, Clinical Trial) و قەبارەی سامپڵ.",
      "کۆکردنەوەی داتا لە نەخۆشخانەکان یان تاقیگەکان و پاراستنی نهێنی زانیارییەکان.",
      "شیکاری ئاماریی زانستی (Biostatistics) بۆ داتا تەندروستی و پزیشکییەکان بە بەکارهێنانی بەرنامەکانی وەک SPSS.",
      "تاوتوێکردنی ئەنجامەکان (Discussion) لە ڕووی کلینیکییەوە و بەراوردکردنیان لەگەڵ سەرچاوە پزیشکییە باوەڕپێکراوەکان (وەک PubMed و Scopus).",
      "دەرەنجام و ڕاسپاردەکان، لەگەڵ ڕێکخستنی سەرچاوەکان بە سیستەمی ڤانکۆڤەر (Vancouver) یان APA."
    ];
  } else if (college === "ئەندازیاری" || college === "زانست و ئایتی") {
    return [
      "دیاریکردنی کێشەی توێژینەوە و پێداچوونەوە بە لێکۆڵینەوەکانی پێشوو (Literature Review) بۆ دۆزینەوەی کەلێنی زانستی.",
      "میتۆدۆلۆژیا و دیزاینی پراکتیکی: ئامادەکردنی تاقیگە، کەرەستەکان، یان دروستکردنی مۆدێل/سیمولەیشن (وەک پڕۆگرامینگ یان MATLAB).",
      "ئەنجامدانی تاقیکردنەوەکان و کۆکردنەوەی داتای پراکتیکی (Experimental Data) بە وردییەکی زۆرەوە.",
      "شیکردنەوەی داتا و ئەنجامەکان، لەگەڵ دروستکردنی خشتە و هێڵکارییە زانستییەکان بۆ سەلماندنی گریمانەکان.",
      "تاوتوێکردنی ئەنجامەکان (Discussion) و شیکردنەوەی هۆکارە زانستییەکانی پشت دەرەنجامەکان.",
      "دەرەنجامەکان و پێشنیار بۆ داهاتوو، لەگەڵ ڕێکخستنی سەرچاوەکان بە سیستەمی IEEE یان Harvard."
    ];
  } else if (college === "یاسا و زانستە سیاسییەکان") {
    return [
      "هەڵبژاردنی ناونیشان و کێشەی توێژینەوەکە کە پەیوەست بێت بە پرسێکی هەنووکەیی کۆمەڵگا، کەلێنێکی یاسایی، یان دەستووری.",
      "داڕشتنی پلانی توێژینەوە (پلان، مەبەست، گرنگی، و گریمانەی توێژینەوە).",
      "بەکارهێنانی میتۆدی گونجاو: وەک میتۆدی وەسفی-شیکاری (Descriptive-Analytical) یان میتۆدی بەراوردکاری (Comparative) لە نێوان یاساکاندا.",
      "کۆکردنەوەی سەرچاوە بنەڕەتییەکان (دەقە یاساییەکان، بڕیارەکانی دادگا) و سەرچاوە لاوەکییەکان (پەرتووک و نامە ئەکادیمییەکان).",
      "شیکردنەوەی وردی دەقەکان، هەڵسەنگاندنیان، و خستنەڕووی بۆچوونی توێژەر.",
      "نووسینی دەرەنجامەکان و خستنەڕووی پێشنیارەکان (ڕاسپاردەکان) بۆ لایەنی یاسادانەر، لەگەڵ ڕێکخستنی سەرچاوەکان بەپێی سیستەمی زانکۆ."
    ];
  } else if (college === "کارگێڕی و ئابووری" || college === "پەروەردە و ئاداب" || college === "پەروەردەی بنەڕەتی") {
    return [
      "هەڵبژاردنی ناونیشانێکی گونجاو و پەسەندکردنی لەلایەن لێژنەی زانستی بەشەوە.",
      "داڕشتنی چوارچێوەی گشتی توێژینەوە: پێشەکی، کێشەی توێژینەوە، ئامانجەکان، گرنگی، و دانانی گریمانەکان.",
      "نووسینی لێکۆڵینەوەی پێشینە (Literature Review) و چوارچێوەی تیۆری توێژینەوەکە بە پشتبەستن بە سەرچاوە زانستییەکان.",
      "دیاریکردنی میتۆدۆلۆژیا: ئامادەکردنی ئامرازی کۆکردنەوەی داتا (فۆڕمی ڕاپرسی - Questionnaire، یان چاوپێکەوتن) و دیاریکردنی کۆمەڵگە و نموونەی توێژینەوە.",
      "شیکاری داتاکان بە بەکارهێنانی بەرنامە ئامارییەکانی وەک SPSS و خستنەڕووی ئەنجامەکان لە شێوەی خشتەدا.",
      "نووسینی دەرەنجامەکان، پێشنیارەکان، و ڕێکخستنی سەرچاوەکان بە سیستەمی APA."
    ];
  }
  return [
    "دیاریکردنی ناونیشان و نووسینی پێشەکییەکی زانستی.",
    "نووسینی لێکۆڵینەوەی پێشینە و بەکارهێنانی سەرچاوە باوەڕپێکراوەکان.",
    "دیاریکردنی میتۆدۆلۆژیای توێژینەوە.",
    "کۆکردنەوەی داتا و شیکارکردنیان.",
    "خستنەڕووی ئەنجامەکان و تاوتوێکردنیان.",
    "دەرەنجام و ڕێکخستنی سەرچاوەکان."
  ];
};

const fadeAnim = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.3 }
};

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function WizardContent() {
  const [step, setStep] = useState(0);
  const [level, setLevel] = useState("");
  const [college, setCollege] = useState("");
  const [department, setDepartment] = useState("");
  const [title, setTitle] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const lvl = searchParams.get("level");
    if (lvl) {
      setLevel(lvl);
      setStep(1);
    }
  }, [searchParams]);

  const guidelines = getGuidelinesByCollege(college);

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          
          {/* هەنگاوی ٠: ئاستی خوێندن */}
          {step === 0 && (
            <motion.div key="step0" {...fadeAnim} className="space-y-12 py-12">
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl text-[#00A8CC] mb-6" style={{ WebkitTextStroke: '0.6px currentColor' }}>
                  خوێندکاری چی ئاستێکیت؟
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-xl">تکایە ئاستی خوێندنەکەت هەڵبژێرە بۆ بەردەوامبوون</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {["دیبلۆم", "بەکالۆریۆس", "ماستەر", "دکتۆرا"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => { setLevel(opt); setStep(1); }}
                    className="bg-white dark:bg-[#1E293B] border-2 border-slate-200 dark:border-slate-700 p-8 rounded-3xl hover:bg-slate-50 dark:hover:bg-[#1E293B] hover:border-[#00A8CC] dark:hover:border-[#00A8CC] hover:shadow-[0_10px_30px_-10px_rgba(0,168,204,0.3)] hover:-translate-y-2 transition-all flex flex-col items-center justify-center group"
                  >
                    <span className="text-2xl font-bold text-[#0A2540] dark:text-slate-100 group-hover:text-[#00A8CC] transition-colors">{opt}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* هەنگاوی ١: هەڵبژاردنی کۆلێژ */}
          {step === 1 && (
            <motion.div key="step1" {...fadeAnim} className="space-y-6">
              <div className="text-center mb-12">
                <h1 className="text-3xl md:text-5xl text-[#00A8CC] mb-4" style={{ WebkitTextStroke: '0.6px currentColor' }}>
                  چۆن توێژینەوەکەم دروست بکەم؟
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-lg">هەنگاو بە هەنگاو ڕێنماییت دەکەین بۆ نووسینی توێژینەوەکەت بە پێی ستانداردی زانکۆکان</p>
              </div>
              
              <div className="flex items-center justify-between mb-8 px-2">
                <h2 className="text-2xl text-[#0A2540] dark:text-white text-center" style={{ WebkitTextStroke: '0.6px currentColor' }}>١. لە چ کۆلێژێک دەخوێنیت؟</h2>
                <button onClick={() => {
                  setStep(0);
                  // Remove level from URL if going back to step 0
                  const url = new URL(window.location.href);
                  url.searchParams.delete("level");
                  window.history.pushState({}, "", url.pathname + url.search);
                }} className="text-[#00A8CC] hover:underline text-sm">گەڕانەوە بۆ ئاستەکان</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.keys(universityData).map((col) => (
                  <button
                    key={col}
                    onClick={() => { setCollege(col); setStep(2); }}
                    className="bg-white/60 dark:bg-[#1E293B]/60 backdrop-blur-md border border-slate-200 dark:border-slate-700 p-6 rounded-2xl hover:bg-slate-50 dark:hover:bg-[#1E293B] hover:border-[#00A8CC] transition-colors text-right flex items-center justify-between group shadow-sm"
                  >
                    <span className="text-lg font-normal text-[#0A2540] dark:text-slate-100">{col}</span>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#00A8CC]" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* هەنگاوی ٢: هەڵبژاردنی بەش */}
          {step === 2 && (
            <motion.div key="step2" {...fadeAnim} className="space-y-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl text-[#0A2540] dark:text-white" style={{ WebkitTextStroke: '0.6px currentColor' }}>٢. بەشەکەت هەڵبژێرە</h2>
                <button onClick={() => setStep(1)} className="text-[#00A8CC] hover:underline text-sm">گەڕانەوە بۆ کۆلێژەکان</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {universityData[college]?.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => { setDepartment(dept); setStep(3); }}
                    className="bg-white/60 dark:bg-[#1E293B]/60 backdrop-blur-md border border-slate-200 dark:border-slate-700 p-6 rounded-2xl hover:bg-slate-50 dark:hover:bg-[#1E293B] hover:border-[#00A8CC] transition-colors text-right flex items-center justify-between group shadow-sm"
                  >
                    <span className="text-lg font-normal text-[#0A2540] dark:text-slate-100">{dept}</span>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#00A8CC]" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* هەنگاوی ٣: پرسیارکردن دەربارەی ناونیشان */}
          {step === 3 && (
            <motion.div key="step3" {...fadeAnim} className="max-w-2xl mx-auto space-y-6">
              <div className="flex items-center justify-between mb-8">
                <button onClick={() => setStep(2)} className="text-[#00A8CC] hover:underline text-sm">گەڕانەوە بۆ بەشەکان</button>
              </div>
              <div className="bg-white/60 dark:bg-[#1E293B]/60 backdrop-blur-md border border-slate-200 dark:border-slate-700 p-8 rounded-3xl shadow-sm">
                <h2 className="text-2xl text-[#0A2540] dark:text-white mb-6" style={{ WebkitTextStroke: '0.6px currentColor' }}>٣. ناونیشانی توێژینەوەکەت چییە؟</h2>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="لێرە ناونیشانی توێژینەوەکەت بنووسە..."
                  className="w-full bg-slate-50 dark:bg-[#020617] border border-slate-300 dark:border-slate-600 rounded-xl p-4 text-[#0A2540] dark:text-white focus:outline-none focus:border-[#00A8CC] mb-6 text-lg placeholder-slate-400"
                />
                <button 
                  onClick={() => setStep(4)}
                  disabled={!title}
                  className="w-full bg-[#00A8CC] hover:bg-cyan-600 text-white p-4 rounded-xl text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  بینینی قۆناغەکان و ڕێنماییەکان
                </button>
              </div>
            </motion.div>
          )}

          {/* هەنگاوی ٤: قۆناغەکانی توێژینەوە و یارمەتی */}
          {step === 4 && (
            <motion.div key="step4" {...fadeAnim} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* بەشی ڕێنماییەکان (لای ڕاست) */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl text-[#0A2540] dark:text-white" style={{ WebkitTextStroke: '0.6px currentColor' }}>قۆناغەکانی توێژینەوەکەت</h2>
                  <button onClick={() => setStep(3)} className="text-[#00A8CC] hover:underline text-sm">گۆڕینی ناونیشان</button>
                </div>
                <div className="bg-white/60 dark:bg-[#1E293B]/60 backdrop-blur-md border border-slate-200 dark:border-slate-700 p-8 rounded-3xl space-y-6 shadow-sm">
                  <div className="border-b border-slate-200 dark:border-slate-700 pb-4 mb-4">
                    <p className="text-slate-500 dark:text-slate-400 text-sm">ڕێنمایی تایبەت بە: ئاستی {level} - کۆلێژی {college} - بەشی {department}</p>
                    <p className="text-xl text-[#00A8CC] mt-2 font-semibold" style={{ WebkitTextStroke: '0.3px currentColor' }}>{title}</p>
                  </div>
                  
                  <ul className="space-y-5 text-lg text-slate-700 dark:text-slate-300">
                    {guidelines.map((guide, idx) => (
                      <li key={idx} className="flex gap-4 items-start leading-relaxed">
                        <CheckCircle2 className="text-[#00A8CC] w-6 h-6 shrink-0 mt-1" /> 
                        <span>{guide}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* بەشی پەیوەندیکردن (لای چەپ) */}
              <div className="space-y-6">
                <h2 className="text-2xl text-[#0A2540] dark:text-white mb-6" style={{ WebkitTextStroke: '0.6px currentColor' }}>ئێمە لێرەین بۆ یارمەتیدانت!</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-4">ئەگەر لە هەر قۆناغێکی توێژینەوەکەتدا پێویستت بە یارمەتی و ڕاوێژکارییە، ڕاستەوخۆ پەیوەندیمان پێوە بکە:</p>
                <div className="flex flex-col gap-4">
                  {/* WhatsApp */}
                  <a href={`https://wa.me/9647732640262?text=سڵاو، یارمەتیم پێویستە سەبارەت بە توێژینەوەی: ${title}`} target="_blank" rel="noreferrer" className="bg-white/60 dark:bg-[#1E293B]/60 backdrop-blur-md border border-slate-200 dark:border-slate-700 p-6 rounded-2xl flex flex-col items-center gap-3 hover:-translate-y-2 hover:border-[#25D366] hover:shadow-[0_10px_20px_-10px_rgba(37,211,102,0.4)] transition-all shadow-sm">
                    <MessageCircle className="w-10 h-10 text-[#25D366]" />
                    <span className="text-lg text-[#0A2540] dark:text-white">واتسئاپ</span>
                  </a>
                  {/* Telegram */}
                  <a href="https://t.me/+9647732640262" target="_blank" rel="noreferrer" className="bg-white/60 dark:bg-[#1E293B]/60 backdrop-blur-md border border-slate-200 dark:border-slate-700 p-6 rounded-2xl flex flex-col items-center gap-3 hover:-translate-y-2 hover:border-[#0088cc] hover:shadow-[0_10px_20px_-10px_rgba(0,136,204,0.4)] transition-all shadow-sm">
                    <Send className="w-10 h-10 text-[#0088cc]" />
                    <span className="text-lg text-[#0A2540] dark:text-white">تێلگرام</span>
                  </a>
                  {/* Viber */}
                  <a href="viber://chat?number=%2B9647732640262" target="_blank" rel="noreferrer" className="bg-white/60 dark:bg-[#1E293B]/60 backdrop-blur-md border border-slate-200 dark:border-slate-700 p-6 rounded-2xl flex flex-col items-center gap-3 hover:-translate-y-2 hover:border-[#665CAC] hover:shadow-[0_10px_20px_-10px_rgba(102,92,172,0.4)] transition-all shadow-sm">
                    <PhoneCall className="w-10 h-10 text-[#665CAC]" />
                    <span className="text-lg text-[#0A2540] dark:text-white">ڤایبەر</span>
                  </a>
                </div>
              </div>

            </motion.div>
          )}
          
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function ResearchWizard() {
  return (
    <Suspense fallback={<div className="min-h-screen py-16 px-4"></div>}>
      <WizardContent />
    </Suspense>
  );
}