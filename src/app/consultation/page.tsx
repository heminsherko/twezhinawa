"use client";

import { motion } from "framer-motion";
import { MessageCircle, Send, PhoneCall } from "lucide-react";

const contactMethods = [
  {
    id: "whatsapp",
    title: "واتسئاپ (WhatsApp)",
    url: "https://wa.me/9647732640262?text=سڵاو،%20مەبەستمە%20ڕاوێژکاری%20زانستی%20وەربگرم%20سەبارەت%20بە%20توێژینەوەکەم.",
    color: "#25D366",
    hoverShadow: "hover:shadow-[0_10px_30px_-10px_rgba(37,211,102,0.5)]",
    icon: MessageCircle
  },
  {
    id: "telegram",
    title: "تێلگرام (Telegram)",
    url: "https://t.me/heminsherko",
    color: "#0088cc",
    hoverShadow: "hover:shadow-[0_10px_30px_-10px_rgba(0,136,204,0.5)]",
    icon: Send
  },
  {
    id: "viber",
    title: "ڤایبەر (Viber)",
    url: "viber://chat?number=%2B9647732640262",
    color: "#665CAC",
    hoverShadow: "hover:shadow-[0_10px_30px_-10px_rgba(102,92,172,0.5)]",
    icon: PhoneCall
  }
];

export default function Consultation() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="flex-1 flex items-center justify-center py-24 relative overflow-hidden">
      {/* Ambient Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00A8CC]/5 dark:bg-[#00A8CC]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#00A8CC]/5 dark:bg-[#00A8CC]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-[#0A2540] dark:text-white transition-colors" style={{ WebkitTextStroke: "0.6px currentColor" }}>
            داواکردنی ڕاوێژکاری <span className="text-[#00A8CC]">زانستی</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mt-6 max-w-2xl mx-auto leading-relaxed font-medium">
            لە ڕێگەی یەکێک لەم تۆڕانەی خوارەوە ڕاستەوخۆ پەیوەندیمان پێوە بکە بۆ وەرگرتنی ڕاوێژی ئەکادیمی.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {contactMethods.map((method) => {
            const Icon = method.icon;
            return (
              <motion.div key={method.id} variants={itemVariants}>
                <a 
                  href={method.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block group bg-white/80 dark:bg-[#1E293B]/60 backdrop-blur-xl border border-slate-200 dark:border-slate-700 hover:border-transparent rounded-3xl p-10 flex flex-col items-center gap-6 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden ${method.hoverShadow}`}
                  style={{ borderColor: "transparent" }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = method.color)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "transparent")}
                >
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" 
                    style={{ backgroundColor: method.color }} 
                  />
                  
                  <div 
                    className="w-24 h-24 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-sm relative z-10"
                    style={{ backgroundColor: `${method.color}15`, border: `1px solid ${method.color}40` }}
                  >
                    <Icon className="w-12 h-12" style={{ color: method.color }} />
                  </div>
                  
                  <h2 
                    className="text-2xl font-bold text-[#0A2540] dark:text-white transition-colors relative z-10" 
                    style={{ WebkitTextStroke: "0.6px currentColor" }}
                  >
                    {method.title}
                  </h2>
                </a>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
