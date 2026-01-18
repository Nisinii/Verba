import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Target, Search } from 'lucide-react';
import { AnalysisResult } from '../types';

interface AnalysisSectionProps {
  analysisState: 'idle' | 'analyzing' | 'complete';
  scanStage: number;
  result: AnalysisResult | null;
  resetAnalysis: () => void;
}

export const AnalysisSection = ({ 
  analysisState, 
  scanStage, 
  result, 
  resetAnalysis 
}: AnalysisSectionProps) => (
  <AnimatePresence mode="wait">
    {analysisState !== 'idle' && (
      <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen w-full bg-[#050b09] py-32 px-6 relative z-30">
        <div className="max-w-7xl mx-auto">
          {analysisState === 'analyzing' ? (
            <div className="h-[50vh] flex flex-col items-center justify-center space-y-8 text-white">
               <div className="relative w-32 h-32">
                  <div className="absolute inset-0 border-4 border-[#d1b066]/20 rounded-full border-t-[#d1b066] animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center"><Cpu className="w-10 h-10 text-[#d1b066]" /></div>
               </div>
               <div className="text-center">
                  <h3 className="text-3xl font-serif mb-2">Analyzing Terrain</h3>
                  <p className="text-[#d1b066] uppercase tracking-widest text-sm">Phase {scanStage + 1} / 3</p>
               </div>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-16">
               <div className="flex flex-col md:flex-row justify-between items-end gap-6 text-white border-b border-white/10 pb-8">
                  <div>
                      <span className="text-[#d1b066] font-bold uppercase tracking-widest text-sm mb-2 block">Report Generated</span>
                      <h2 className="text-5xl font-serif">Analysis Results</h2>
                  </div>
                  <button onClick={resetAnalysis} className="text-white/60 hover:text-white underline text-sm uppercase tracking-widest">Start New Analysis</button>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  {/* Score */}
                  <div className="md:col-span-4 bg-[#0f241d] border border-white/5 p-10 rounded-2xl text-center shadow-2xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#d1b066]/5 rounded-bl-full"></div>
                      <Target className="w-8 h-8 text-[#d1b066] mx-auto mb-6 relative z-10" />
                      <h3 className="text-white/60 text-xs uppercase tracking-widest font-bold relative z-10">Match Score</h3>
                      <div className="text-8xl font-serif text-white my-6 relative z-10">{result?.match_score}%</div>
                      <p className="text-[#d1b066] text-sm relative z-10">
                        {result?.match_score! >= 80 ? "Top Tier Applicant" : "Needs Optimization"}
                      </p>
                  </div>

                  {/* Summary */}
                  <div className="md:col-span-8 bg-[#0f241d] border border-white/5 p-10 rounded-2xl flex flex-col justify-center shadow-2xl">
                      <h3 className="text-[#d1b066] text-xs uppercase tracking-widest font-bold mb-4 flex items-center gap-2"><Search className="w-4 h-4" /> Expert Insight</h3>
                      <p className="text-2xl text-white/90 font-light leading-relaxed">"{result?.summary}"</p>
                  </div>

                  {/* Gaps */}
                  <div className="md:col-span-6 bg-[#2d1b1b] border border-rose-500/10 p-8 rounded-2xl">
                      <h3 className="text-rose-400 text-xs uppercase tracking-widest font-bold mb-6">Missing Essentials</h3>
                      <div className="flex flex-wrap gap-3">
                         {result?.missing_skills.map((k, i) => (
                            <span key={i} className="px-4 py-2 bg-rose-500/10 text-rose-300 rounded-lg text-sm font-mono border border-rose-500/20">{k}</span>
                         ))}
                         {result?.missing_skills.length === 0 && <span className="text-white/50 italic">No missing skills detected.</span>}
                      </div>
                  </div>

                  {/* Rewrites */}
                  <div className="md:col-span-6 bg-[#0f241d] border border-[#d1b066]/20 p-8 rounded-2xl">
                      <h3 className="text-[#d1b066] text-xs uppercase tracking-widest font-bold mb-6">Optimization Strategy</h3>
                      <div className="space-y-4 h-64 overflow-y-auto pr-2 custom-scrollbar">
                         {result?.suggested_rewrites.map((change, i) => (
                            <div key={i} className="flex gap-4">
                               <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#d1b066]/20 text-[#d1b066] flex items-center justify-center font-mono text-xs border border-[#d1b066]/30">{i + 1}</span>
                               <div className="space-y-1">
                                  <p className="text-xs text-rose-400/70 line-through">{change.current}</p>
                                  <p className="text-sm text-white/90">{change.improved}</p>
                               </div>
                            </div>
                         ))}
                      </div>
                  </div>
                  
                  {/* ATS Check Row */}
                  <div className="md:col-span-12 bg-[#0f241d] border border-white/5 p-8 rounded-2xl">
                      <div className="flex items-center justify-between mb-6">
                         <h3 className="text-[#d1b066] text-xs uppercase tracking-widest font-bold">ATS Audit Log</h3>
                         <span className="text-white font-serif text-2xl">{result?.ats_check.score}/100</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         {result?.ats_check.issues.map((issue, i) => (
                            <div key={i} className="flex items-center gap-3 text-white/70 text-sm">
                               <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                               {issue}
                            </div>
                         ))}
                      </div>
                  </div>

               </div>
            </motion.div>
          )}
        </div>
      </motion.section>
    )}
  </AnimatePresence>
);