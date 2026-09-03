"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, Copy, Trash2, CheckCircle2, User, Loader2, Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";

// Pre-baked intelligent responses tailored for Kurdish academic research
const aiKnowledgeBase: Record<string, string> = {
  "چۆن دەست بە نووسینی توێژینەوەکەم بکەم؟": "بۆ دەستپێکردنی توێژینەوەیەک، سەرەتا پێویستت بە هەڵبژاردنی ناونیشانێکی گونجاوە کە کێشەیەکی دیاریکراو چارەسەر بکات. پاشان پێشەکییەکی کورت بنووسە کە تێیدا کێشەکە و گرنگییەکەی بخەیتەڕوو. دواتر بەدوای سەرچاوەی پەیوەندیداردا بگەڕێ و پلانی توێژینەوەکەت دابنێ (میتۆدۆلۆژیا).",
  "شێوازی ڕیفەرێنسدانی APA چۆنە؟": "شێوازی APA یەکێکە لە باوترین سیستەمەکان. لە ناو دەقدا بەم شێوەیە دەبێت: (ناوی کۆتایی نووسەر، ساڵی دەرچوون). بۆ نموونە: (Smith, 2023). لە کۆتایی توێژینەوەکەشدا بەم شێوەیە دەبێت: ناوی نووسەر. (ساڵ). ناونیشانی پەرتووک/توێژینەوە. ناوی بڵاوکەرەوە.",
  "چۆن گۆڤاری باوەڕپێکراوی Scopus بدۆزمەوە؟": "بۆ دۆزینەوەی گۆڤاری باوەڕپێکراوی سکۆپەس، سەردانی ماڵپەڕی فەرمی Scopus (scopus.com/sources) بکە. لەوێ دەتوانیت بەپێی پسپۆڕییەکەت (Subject Area) یان ناونیشان بگەڕێیت. دڵنیابە لەوەی گۆڤارەکە 'Active'ـە و لە ڕیزبەندی 'Predatory Journals' نییە.",
  "ڕێگاکانی پێداچوونەوە بە ئەدەبیاتی توێژینەوە (Literature Review)": "بۆ نووسینی Literature Review، سەرەتا هەموو توێژینەوە پێشووەکانی پەیوەست بە بابەتەکەت کۆبکەرەوە. پاشان پوختەیان بکە، خاڵە لاوازەکانیان بدۆزەوە (Research Gap)، و ڕوونی بکەرەوە کە توێژینەوەکەی تۆ چۆن ئەو بۆشاییە زانستییە پڕ دەکاتەوە.",
};

const defaultResponse = "سوپاس بۆ پرسیارەکەت. من یاریدەدەری زیرەکی دەستکردم بۆ توێژینەوەی زانستی. تکایە پرسیارەکەت بە وردی بپرسە بۆ ئەوەی باشترین ڕێنمایی ئەکادیمیت پێشکەش بکەم.";

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  isTyping?: boolean;
}

export default function AIAssistant() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "ai",
      content: "سڵاو! من یاریدەدەری زیرەکی دەستکردی (AI) توێژینەوەی زانستیم. چۆن دەتوانم هاوکاریت بکەم لە توێژینەوەکەتدا؟",
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Hide on admin routes
  if (pathname?.startsWith("/admin")) return null;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [isOpen, messages]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsAiTyping(true);

    setTimeout(() => {
      // Find the response or fallback
      const responseText = aiKnowledgeBase[text] || defaultResponse;
      
      const aiMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        role: "ai", 
        content: responseText,
        isTyping: true 
      };
      
      setMessages(prev => [...prev, aiMsg]);
      setIsAiTyping(false);
      
      // Typewriter effect simulation
      let currentLength = 0;
      const typeInterval = setInterval(() => {
        currentLength += 2;
        if (currentLength >= responseText.length) {
          clearInterval(typeInterval);
          setMessages(prev => prev.map(msg => 
            msg.id === aiMsg.id ? { ...msg, isTyping: false } : msg
          ));
        }
      }, 20);
    }, 800);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClear = () => {
    setMessages([
      {
        id: "welcome",
        role: "ai",
        content: "سڵاو! من یاریدەدەری زیرەکی دەستکردی (AI) توێژینەوەی زانستیم. چۆن دەتوانم هاوکاریت بکەم لە توێژینەوەکەتدا؟",
      }
    ]);
  };

  return (
    <div className="fixed bottom-6 left-6 z-[100]" dir="rtl">
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#0A2540] to-[#00A8CC] text-white flex items-center justify-center shadow-lg shadow-[#00A8CC]/30 hover:shadow-[#00A8CC]/50 transition-shadow relative overflow-hidden group"
          >
            {/* Pulse effect */}
            <div className="absolute inset-0 rounded-full animate-ping bg-[#00A8CC]/40 opacity-75 duration-1000"></div>
            <Sparkles className="w-8 h-8 relative z-10" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
            className="absolute bottom-0 left-0 w-[350px] sm:w-[400px] h-[600px] max-h-[85vh] bg-white dark:bg-[#0f172a] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0A2540] to-[#00A8CC] p-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3 text-white">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm relative">
                  <Bot className="w-6 h-6" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-[#0A2540] rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base leading-tight">یاریدەدەری زیرەکی دەستکرد</h3>
                  <p className="text-white/80 text-xs flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                    ڕاستەوخۆ چالاکە
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-white/80">
                <button onClick={handleClear} className="p-2 hover:bg-white/20 rounded-full transition-colors" title="پاککردنەوەی گفتوگۆ">
                  <Trash2 className="w-4 h-4" />
                </button>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/20 rounded-full transition-colors" title="داخستن">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900/50 relative scroll-smooth">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-3 max-w-[90%] ${msg.role === "user" ? "mr-auto flex-row-reverse" : "ml-auto"}`}>
                  <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center ${msg.role === "user" ? "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300" : "bg-[#00A8CC]/10 text-[#00A8CC]"}`}>
                    {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  
                  <div className="group relative">
                    <div className={`p-3 md:p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user" 
                        ? "bg-[#0A2540] text-white rounded-tr-sm" 
                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-tl-sm shadow-sm"
                    }`}>
                      {msg.content}
                      {msg.isTyping && <span className="inline-block w-1 h-4 bg-[#00A8CC] ml-1 animate-pulse align-middle"></span>}
                    </div>

                    {/* Copy Button for AI responses */}
                    {msg.role === "ai" && !msg.isTyping && (
                      <button 
                        onClick={() => handleCopy(msg.content, msg.id)}
                        className="absolute -left-10 top-2 p-1.5 bg-white dark:bg-slate-700 text-slate-400 hover:text-[#00A8CC] rounded-lg shadow-sm border border-slate-200 dark:border-slate-600 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="کۆپیکردن"
                      >
                        {copiedId === msg.id ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {isAiTyping && (
                <div className="flex gap-3 max-w-[90%] ml-auto">
                  <div className="w-8 h-8 shrink-0 rounded-full bg-[#00A8CC]/10 text-[#00A8CC] flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="p-4 rounded-2xl rounded-tl-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex gap-1 items-center">
                    <span className="w-2 h-2 bg-[#00A8CC]/40 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-[#00A8CC]/60 rounded-full animate-bounce" style={{ animationDelay: "0.15s" }}></span>
                    <span className="w-2 h-2 bg-[#00A8CC] rounded-full animate-bounce" style={{ animationDelay: "0.3s" }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            {messages.length <= 2 && (
              <div className="p-3 bg-white dark:bg-[#0f172a] border-t border-slate-100 dark:border-slate-800 flex gap-2 overflow-x-auto no-scrollbar whitespace-nowrap scroll-smooth">
                {Object.keys(aiKnowledgeBase).map((prompt, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleSend(prompt)}
                    className="shrink-0 bg-slate-50 dark:bg-slate-800 hover:bg-[#00A8CC]/10 text-slate-600 dark:text-slate-300 hover:text-[#00A8CC] border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-full text-xs transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }} 
              className="p-4 bg-white dark:bg-[#0f172a] border-t border-slate-200 dark:border-slate-800 flex items-end gap-2 shrink-0"
            >
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend(inputValue);
                  }
                }}
                placeholder="پرسیارەکەت بنووسە..."
                className="flex-1 max-h-[120px] min-h-[44px] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-[#00A8CC] text-sm resize-none text-right"
                rows={1}
              />
              <button 
                type="submit" 
                disabled={!inputValue.trim() || isAiTyping}
                className="w-[44px] h-[44px] shrink-0 bg-[#0A2540] dark:bg-slate-700 hover:bg-[#00A8CC] disabled:opacity-50 disabled:hover:bg-[#0A2540] dark:disabled:hover:bg-slate-700 text-white rounded-xl flex items-center justify-center transition-colors"
              >
                <Send className="w-5 h-5 rtl:rotate-180" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
