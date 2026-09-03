"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import LevelSelectionModal from "./LevelSelectionModal";
import AssistanceModal from "./AssistanceModal";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLevelModal, setShowLevelModal] = useState(false);
  const [showAssistanceModal, setShowAssistanceModal] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  if (pathname?.startsWith("/admin")) return null;

  useEffect(() => {
    // Check initial theme from document class
    if (document.documentElement.classList.contains("dark")) {
      setTheme("dark");
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${
          isScrolled 
            ? "bg-white/90 dark:bg-[#020617]/90 backdrop-blur-md shadow-sm border-b border-slate-100 dark:border-slate-800 py-3 md:py-4" 
            : "bg-transparent py-4 md:py-6"
        }`}
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-5 flex items-center justify-between">
          
          {/* Logo Section */}
          <Link href="/" className="relative z-10" onClick={() => setIsMobileMenuOpen(false)}>
            <Logo />
          </Link>
          
          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-10">
            <button onClick={() => setShowLevelModal(true)} className="text-base font-semibold text-[#0A2540] dark:text-white hover:text-[#00A8CC] dark:hover:text-[#00A8CC] transition-colors">
              چۆن توێژینەوەکەم دروست بکەم؟
            </button>
            <Link href="/#source-finder" className="text-base font-semibold text-[#0A2540] dark:text-white hover:text-[#00A8CC] dark:hover:text-[#00A8CC] transition-colors">
              دۆزینەوەی سەرچاوەی زانستی
            </Link>
            <Link href="/journals" className="text-base font-semibold text-[#0A2540] dark:text-white hover:text-[#00A8CC] dark:hover:text-[#00A8CC] transition-colors">
              گۆڤارە نێودەوڵەتییەکان
            </Link>
          </nav>

          {/* Action Buttons & Mobile Toggle */}
          <div className="flex items-center gap-4 z-10">
            <button 
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle Theme"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            </button>
            
            <div className="hidden md:block">
              <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>
                <button onClick={() => setShowAssistanceModal(true)} className="px-6 py-2.5 md:px-8 md:py-3 text-base md:text-lg font-medium bg-[#00A8CC] hover:bg-[#008ba8] text-white rounded-xl transition-all flex items-center justify-center">
                  پێویستت بە یارمەتییە؟
                </button>
              </motion.div>
            </div>

            {/* Mobile Hamburger Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center text-[#0A2540] dark:text-white"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden bg-white/95 dark:bg-[#020617]/95 backdrop-blur-xl border-t border-slate-200/50 dark:border-slate-800"
            >
              <div className="container mx-auto px-4 py-6 flex flex-col gap-6">
                <button 
                  onClick={() => { setIsMobileMenuOpen(false); setShowLevelModal(true); }} 
                  className="text-right text-lg font-medium text-[#0A2540] dark:text-white"
                >
                  چۆن توێژینەوەکەم دروست بکەم؟
                </button>
                <Link 
                  href="/#source-finder" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-right text-lg font-medium text-[#0A2540] dark:text-white"
                >
                  دۆزینەوەی سەرچاوەی زانستی
                </Link>
                <Link 
                  href="/journals" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-right text-lg font-medium text-[#0A2540] dark:text-white"
                >
                  گۆڤارە نێودەوڵەتییەکان
                </Link>
                <button 
                  onClick={() => { setIsMobileMenuOpen(false); setShowAssistanceModal(true); }}
                  className="w-full mt-4 px-6 py-4 text-center text-lg font-medium bg-[#00A8CC] text-white rounded-xl"
                >
                  پێویستت بە یارمەتییە؟
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <LevelSelectionModal 
        isOpen={showLevelModal} 
        onClose={() => setShowLevelModal(false)} 
      />
      <AssistanceModal 
        isOpen={showAssistanceModal} 
        onClose={() => setShowAssistanceModal(false)} 
      />
    </>
  );
}
