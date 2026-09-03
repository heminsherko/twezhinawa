"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft, Download, GraduationCap, Search, Globe, Lightbulb, Star } from "lucide-react";
import { researchGuides, ResearchGuide } from "@/data/researchGuides";
import Logo from "./Logo";

interface ResearchGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeGuideId: string;
}

const ICONS = {
  GraduationCap: GraduationCap,
  Search: Search,
  Globe: Globe,
};

export default function ResearchGuideModal({ isOpen, onClose, activeGuideId }: ResearchGuideModalProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const guide = researchGuides.find(g => g.id === activeGuideId);

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, activeGuideId]);

  if (!isOpen || !guide) return null;

  const Icon = ICONS[guide.icon as keyof typeof ICONS] || GraduationCap;
  const stepCount = guide.steps.length;
  const step = guide.steps[currentStep];
  const progress = ((currentStep + 1) / stepCount) * 100;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/80 backdrop-blur-md print:bg-white print:backdrop-blur-none p-0 md:p-6 overflow-hidden" dir="rtl">
      
      {/* 
        PRINT STYLE BLOCK
        This ensures only the modal content is printed, and it is formatted for A4.
      */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-guide, #printable-guide * {
            visibility: visible;
          }
          #printable-guide {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 20px;
            box-shadow: none !important;
            background: white !important;
            color: black !important;
            overflow: visible !important;
          }
          .print-hidden {
            display: none !important;
          }
          .print-step-list {
            display: block !important;
          }
          .interactive-stepper {
            display: none !important;
          }
        }
      `}} />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full h-full md:h-auto md:max-h-full md:max-w-4xl bg-white dark:bg-[#0f172a] md:rounded-3xl shadow-2xl flex flex-col overflow-hidden relative"
        id="printable-guide"
      >
        {/* Header - Interactive & Print */}
        <div className="flex-shrink-0 p-4 md:p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50 print:bg-white print:border-b-2 print:border-black">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center print:hidden ${
              guide.color === "blue" ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30" : 
              guide.color === "purple" ? "bg-purple-100 text-purple-600 dark:bg-purple-900/30" : 
              "bg-teal-100 text-teal-600 dark:bg-teal-900/30"
            }`}>
              <Icon className="w-6 h-6" />
            </div>
            <div className="hidden print:block print:w-16 print:h-16 print:-mr-2">
              <Logo />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#0A2540] dark:text-white print:text-black">{guide.title}</h2>
              <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 print:text-gray-700">{guide.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 print-hidden">
            <button 
              onClick={handlePrint}
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl transition-colors font-medium text-sm"
            >
              <Download className="w-4 h-4" />
              داگرتنی وەک PDF
            </button>
            <button 
              onClick={onClose} 
              className="p-3 text-slate-400 hover:text-red-500 bg-white dark:bg-slate-800 rounded-full shadow-sm border border-slate-200 dark:border-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 print:p-0 print:overflow-visible">
          
          {/* Mobile Print Button */}
          <button 
            onClick={handlePrint}
            className="md:hidden flex items-center justify-center gap-2 w-full mb-6 px-4 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl transition-colors font-medium text-sm print-hidden border border-slate-200 dark:border-slate-700"
          >
            <Download className="w-5 h-5" />
            داگرتنی ئەم ڕێبەڕە وەک PDF
          </button>

          {/* INTERACTIVE STEPPER VIEW (Hidden on Print) */}
          <div className="interactive-stepper h-full flex flex-col">
            <div className="flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium text-sm mb-2 border border-slate-200 dark:border-slate-700">
                    هەنگاوی {currentStep + 1} لە {stepCount}
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-[#0A2540] dark:text-white leading-[1.4]">
                    {step.title}
                  </h3>
                  
                  <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
                    {step.content}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    {step.analogy && (
                      <div className="p-5 rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/50">
                        <div className="flex items-center gap-2 mb-3 text-blue-600 dark:text-blue-400 font-bold">
                          <Lightbulb className="w-5 h-5" />
                          بە نموونە:
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{step.analogy}</p>
                      </div>
                    )}
                    
                    {step.goldenTip && (
                      <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/50">
                        <div className="flex items-center gap-2 mb-3 text-amber-600 dark:text-amber-400 font-bold">
                          <Star className="w-5 h-5" />
                          تێبینی زێڕین:
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{step.goldenTip}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* PRINT LIST VIEW (Hidden on Screen) */}
          <div className="hidden print-step-list space-y-10 mt-6">
            {guide.steps.map((s, idx) => (
              <div key={idx} className="pb-8 border-b border-gray-200 break-inside-avoid">
                <h3 className="text-2xl font-bold text-black mb-3">
                  {s.title}
                </h3>
                <p className="text-lg text-gray-800 leading-relaxed mb-4">
                  {s.content}
                </p>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {s.analogy && (
                    <div className="p-4 rounded-xl border-2 border-gray-100 bg-gray-50">
                      <div className="font-bold text-gray-900 mb-2">بە نموونە:</div>
                      <p className="text-gray-700">{s.analogy}</p>
                    </div>
                  )}
                  {s.goldenTip && (
                    <div className="p-4 rounded-xl border-2 border-gray-100 bg-gray-50">
                      <div className="font-bold text-gray-900 mb-2">تێبینی زێڕین:</div>
                      <p className="text-gray-700">{s.goldenTip}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div className="text-center pt-8 text-gray-500 font-medium">
              ئەم ڕێبەرە بەرهەمی پلاتفۆرمی توێژینەوەی زانستییە - twezhinawa.com
            </div>
          </div>

        </div>

        {/* Footer Navigation - Interactive Stepper */}
        <div className="flex-shrink-0 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-4 md:p-6 print-hidden">
          
          {/* Progress Bar */}
          <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full mb-6 overflow-hidden">
            <motion.div 
              className="h-full bg-[#00A8CC]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
            >
              <ChevronRight className="w-5 h-5" />
              هەنگاوی پێشوو
            </button>
            
            {currentStep < stepCount - 1 ? (
              <button
                onClick={() => setCurrentStep(prev => Math.min(stepCount - 1, prev + 1))}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all bg-[#00A8CC] hover:bg-[#008BA8] text-white shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                هەنگاوی دواتر
                <ChevronLeft className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                تەواو
              </button>
            )}
          </div>
        </div>
        
      </motion.div>
    </div>
  );
}
