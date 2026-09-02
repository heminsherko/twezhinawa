"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, PhoneCall, ChevronRight, CheckCircle2, Award, Book, GraduationCap, Library } from "lucide-react";

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

// فەنکشنی زیرەک بۆ گێڕانەوەی ڕێنمایی تایبەت بەپێی جۆری کۆلێژ
const getGuidelinesByCollege = (college: string) => {
  if (college === "پزیشکی و تەندروستی" || college === "کشتوکاڵ و ڤێتێرنەری") {
    return [
      "هەڵبژاردنی ناونیشان و وەرگرتنی ڕەزامەندی لێژنەی ئەخلاقی توێژینەوە (Ethics Committee).",
      "دیاریکردنی شێوازی توێژینەوە و قەبارەی سامپڵ.",
      "کۆکردنەوەی داتا لە نەخۆشخانەکان یان تاقیگەکان و پاراستنی نهێنی زانیارییەکان.",
      "شیکاری ئاماریی زانستی بۆ داتاکان بە بەکارهێنانی بەرنامەکانی وەک SPSS.",
      "تاوتوێکردنی ئەنجامەکان (Discussion) لە ڕووی کلینیکییەوە.",
      "دەرەنجام و ڕاسپاردەکان، لەگەڵ ڕێکخستنی سەرچاوەکان بە سیستەمی ڤانکۆڤەر (Vancouver) یان APA."
    ];
  } else if (college === "ئەندازیاری" || college === "زانست و ئایتی") {
    return [
      "دیاریکردنی کێشەی توێژینەوە و پێداچوونەوە بە لێکۆڵینەوەکانی پێشوو (Literature Review).",
      "میتۆدۆلۆژیا و دیزاینی پراکتیکی: ئامادەکردنی تاقیگە یان دروستکردنی مۆدێل/سیمولەیشن.",
      "ئەنجامدانی تاقیکردنەوەکان و کۆکردنەوەی داتای پراکتیکی.",
      "شیکردنەوەی داتا و ئەنجامەکان، لەگەڵ دروستکردنی خشتە و هێڵکارییە زانستییەکان.",
      "تاوتوێکردنی ئەنجامەکان و شیکردنەوەی هۆکارە زانستییەکانی پشت دەرەنجامەکان.",
      "دەرەنجامەکان و پێشنیار بۆ داهاتوو، لەگەڵ ڕێکخستنی سەرچاوەکان بە سیستەمی IEEE یان Harvard."
    ];
  } else if (college === "یاسا و زانستە سیاسییەکان") {
    return [
      "هەڵبژاردنی ناونیشان و کێشەی توێژینەوەکە کە پەیوەست بێت بە پرسێکی هەنووکەیی یان کەلێنێکی یاسایی.",
      "داڕشتنی پلانی توێژینەوە (پلان، مەبەست، گرنگی، و گریمانەی توێژینەوە).",
      "بەکارهێنانی میتۆدی گونجاو: وەک میتۆدی وەسفی-شیکاری یان بەراوردکاری.",
      "کۆکردنەوەی سەرچاوە بنەڕەتییەکان و سەرچاوە لاوەکییەکان.",
      "شیکردنەوەی وردی دەقەکان، هەڵسەنگاندنیان، و خستنەڕووی بۆچوونی توێژەر.",
      "نووسینی دەرەنجامەکان و پێشنیارەکان بۆ لایەنی یاسادانەر."
    ];
  }
  return [
    "هەڵبژاردنی ناونیشانێکی گونجاو و پەسەندکردنی لەلایەن لێژنەی زانستی بەشەوە.",
    "داڕشتنی چوارچێوەی گشتی توێژینەوە: پێشەکی، کێشەی توێژینەوە، ئامانجەکان.",
    "نووسینی لێکۆڵینەوەی پێشینە (Literature Review).",
    "دیاریکردنی میتۆدۆلۆژیا و ئامرازی کۆکردنەوەی داتا (وەک فۆڕمی ڕاپرسی).",
    "شیکاری داتاکان بە بەکارهێنانی بەرنامە ئامارییەکان و خستنەڕووی ئەنجامەکان.",
    "نووسینی دەرەنجامەکان، پێشنیارەکان، و ڕێکخستنی سەرچاوەکان بە سیستەمی APA."
  ];
};

const fadeAnim = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.3 }
};

export default function ResearchWizard() {
  const [step, setStep] = useState(1);
  const [level, setLevel] = useState("");
  const [college, setCollege] = useState("");
  const [department, setDepartment] = useState("");
  const [title, setTitle] = useState("");

  const guidelines = getGuidelinesByCollege(college);

  return (
    <div className="min-h-screen bg-transparent text-[#0A2540] dark:text-slate-100 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* هێدەر */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl text-[#00A8CC] mb-4" style={{ WebkitTextStroke: '0.6px currentColor' }}>
            چۆن توێژینەوەکەم دروست بکەم؟
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">هەنگاو بە هەنگاو ڕێنماییت دەکەین بۆ نووسینی توێژینەوەکەت بە پێی ستانداردی زانکۆکان</p>
        </div>

        <AnimatePresence mode="wait">
          
          {/* هەنگاوی ١: هەڵبژاردنی قۆناغ */}
          {step === 1 && (
            <motion.div key="step1" {...fadeAnim} className="space-y-6">
              <h2 className="text-2xl text-[#0A2540] dark:text-white text-center mb-8" style={{ WebkitTextStroke: '0.6px currentColor' }}>
                ١. ئایا خوێندکاری چی قۆناغێکیت؟
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                <button onClick={() => { setLevel("دیبلۆم"); setStep(2); }} className="bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-slate-700 p-8 rounded-3xl hover:-translate-y-2 hover:border-[#00A8CC] hover:shadow-[0_10px_30px_-10px_rgba(0,168,204,0.4)] transition-all flex flex-col items-center gap-4 group">
                  <div className="bg-[#00A8CC]/10 p-4 rounded-2xl text-[#00A8CC] group-hover:scale-110 transition-transform"><Award className="w-10 h-10" /></div>
                  <span className="text-xl font-normal">دیبلۆم</span>
                </button>

                <button onClick={() => { setLevel("بەکالۆریۆس"); setStep(2); }} className="bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-slate-700 p-8 rounded-3xl hover:-translate-y-2 hover:border-[#00A8CC] hover:shadow-[0_10px_30px_-10px_rgba(0,168,204,0.4)] transition-all flex flex-col items-center gap-4 group">
                  <div className="bg-[#00A8CC]/10 p-4 rounded-2xl text-[#00A8CC] group-hover:scale-110 transition-transform"><Book className="w-10 h-10" /></div>
                  <span className="text-xl font-normal">بەکالۆریۆس</span>
                </button>

                <button onClick={() => { setLevel("ماستەر"); setStep(2); }} className="bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-slate-700 p-8 rounded-3xl hover:-translate-y-2 hover:border-[#00A8CC] hover:shadow-[0_10px_30px_-10px_rgba(0,168,204,0.4)] transition-all flex flex-col items-center gap-4 group">
                  <div className="bg-[#00A8CC]/10 p-4 rounded-2xl text-[#00A8CC] group-hover:scale-110 transition-transform"><GraduationCap className="w-10 h-10" /></div>
                  <span className="text-xl font-normal">ماستەر</span>
                </button>

                <button onClick={() => { setLevel("دکتۆرا"); setStep(2); }} className="bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-slate-700 p-8 rounded-3xl hover:-translate-y-2 hover:border-[#00A8CC] hover:shadow-[0_10px_30px_-10px_rgba(0,168,204,0.4)] transition-all flex flex-col items-center gap-4 group">
                  <div className="bg-[#00A8CC]/10 p-4 rounded-2xl text-[#00A8CC] group-hover:scale-110 transition-transform"><Library className="w-10 h-10" /></div>
                  <span className="text-xl font-normal">دکتۆرا</span>
                </button>

              </div>
            </motion.div>
          )}

          {/* هەنگاوی ٢: هەڵبژاردنی کۆلێژ */}
          {step === 2 && (
            <motion.div key="step2" {...fadeAnim} className="space-y-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl text-[#0A2540] dark:text-white" style={{ WebkitTextStroke: '0.6px currentColor' }}>٢. لە چ کۆلێژێک دەخوێنیت؟</h2>
                <button onClick={() => setStep(1)} className="text-[#00A8CC] hover:underline text-sm">گەڕانەوە بۆ قۆناغەکان</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.keys(universityData).map((col) => (
                  <button
                    key={col}
                    onClick={() => { setCollege(col); setStep(3); }}
                    className="bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-slate-700 p-6 rounded-2xl hover:border-[#00A8CC] dark:hover:border-[#00A8CC] transition-colors text-right flex items-center justify-between group shadow-sm"
                  >
                    <span className="text-lg font-normal text-[#0A2540] dark:text-white">{col}</span>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#00A8CC]" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* هەنگاوی ٣: هەڵبژاردنی بەش */}
          {step === 3 && (
            <motion.div key="step3" {...fadeAnim} className="space-y-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl text-[#0A2540] dark:text-white" style={{ WebkitTextStroke: '0.6px currentColor' }}>٣. بەشەکەت هەڵبژێرە</h2>
                <button onClick={() => setStep(2)} className="text-[#00A8CC] hover:underline text-sm">گەڕانەوە بۆ کۆلێژەکان</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {universityData[college]?.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => { setDepartment(dept); setStep(4); }}
                    className="bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-slate-700 p-6 rounded-2xl hover:border-[#00A8CC] dark:hover:border-[#00A8CC] transition-colors text-right flex items-center justify-between group shadow-sm"
                  >
                    <span className="text-lg font-normal text-[#0A2540] dark:text-white">{dept}</span>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#00A8CC]" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* هەنگاوی ٤: پرسیارکردن دەربارەی ناونیشان */}
          {step === 4 && (
            <motion.div key="step4" {...fadeAnim} className="max-w-2xl mx-auto space-y-6">
              <div className="flex items-center justify-between mb-8">
                <button onClick={() => setStep(3)} className="text-[#00A8CC] hover:underline text-sm">گەڕانەوە بۆ بەشەکان</button>
              </div>
              <div className="bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-slate-700 p-8 rounded-3xl shadow-sm">
                <h2 className="text-2xl text-[#0A2540] dark:text-white mb-6" style={{ WebkitTextStroke: '0.6px currentColor' }}>٤. ناونیشانی توێژینەوەکەت چییە؟</h2>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="لێرە ناونیشانی توێژینەوەکەت بنووسە..."
                  className="w-full bg-[#F4F7F6] dark:bg-[#020617] border border-[#E2E8F0] dark:border-slate-600 rounded-xl p-4 text-[#0A2540] dark:text-white focus:outline-none focus:border-[#00A8CC] mb-6 text-lg transition-colors"
                />
                <button 
                  onClick={() => setStep(5)}
                  disabled={!title}
                  className="w-full bg-[#00A8CC] hover:bg-[#008BA8] text-white p-4 rounded-xl text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                >
                  بینینی قۆناغەکان و ڕێنماییەکان
                </button>
              </div>
            </motion.div>
          )}

          {/* هەنگاوی ٥: قۆناغەکانی توێژینەوە و یارمەتی */}
          {step === 5 && (
            <motion.div key="step5" {...fadeAnim} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* بەشی ڕێنماییەکان (لای ڕاست) */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl text-[#0A2540] dark:text-white" style={{ WebkitTextStroke: '0.6px currentColor' }}>قۆناغەکانی توێژینەوەکەت</h2>
                  <button onClick={() => setStep(4)} className="text-[#00A8CC] hover:underline text-sm">گۆڕینی ناونیشان</button>
                </div>
                <div className="bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-slate-700 p-8 rounded-3xl space-y-6 shadow-sm">
                  <div className="border-b border-[#E2E8F0] dark:border-slate-700 pb-4 mb-4">
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">
                      قۆناغی: {level} | کۆلێژی {college} | بەشی {department}
                    </p>
                    <p className="text-xl text-[#00A8CC] mt-2 font-semibold" style={{ WebkitTextStroke: '0.3px currentColor' }}>{title}</p>
                  </div>
                  
                  <ul className="space-y-5 text-lg text-[#0A2540] dark:text-slate-300">
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
                  <a href={`https://wa.me/9647732640262?text=سڵاو، یارمەتیم پێویستە سەبارەت بە توێژینەوەی: ${title}`} target="_blank" rel="noreferrer" className="bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-slate-700 p-6 rounded-2xl flex flex-col items-center gap-3 hover:-translate-y-2 hover:border-[#25D366] hover:shadow-[0_10px_20px_-10px_rgba(37,211,102,0.4)] transition-all shadow-sm text-[#0A2540] dark:text-white">
                    <MessageCircle className="w-10 h-10 text-[#25D366]" />
                    <span className="text-lg">واتسئاپ</span>
                  </a>
                  {/* Telegram */}
                  <a href="https://t.me/+9647732640262" target="_blank" rel="noreferrer" className="bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-slate-700 p-6 rounded-2xl flex flex-col items-center gap-3 hover:-translate-y-2 hover:border-[#0088cc] hover:shadow-[0_10px_20px_-10px_rgba(0,136,204,0.4)] transition-all shadow-sm text-[#0A2540] dark:text-white">
                    <Send className="w-10 h-10 text-[#0088cc]" />
                    <span className="text-lg">تێلگرام</span>
                  </a>
                  {/* Viber */}
                  <a href="viber://chat?number=%2B9647732640262" target="_blank" rel="noreferrer" className="bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-slate-700 p-6 rounded-2xl flex flex-col items-center gap-3 hover:-translate-y-2 hover:border-[#665CAC] hover:shadow-[0_10px_20px_-10px_rgba(102,92,172,0.4)] transition-all shadow-sm text-[#0A2540] dark:text-white">
                    <PhoneCall className="w-10 h-10 text-[#665CAC]" />
                    <span className="text-lg">ڤایبەر</span>
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