import React from 'react';
import { motion } from 'framer-motion';
import { Target, Search, RefreshCw } from 'lucide-react';

/**
 * Kairos UI: Analysis View (Result Dashboard)
 * * The primary data-visualization layer of the application.
 * * Orchestrates the display of AI-generated insights, scores, and technical gaps.
 * * Design: Modular grid system with distinct "data-cards" for high scannability.
 * * @param {Object} props
 * @param {Object} props.result - The formatted analysis object from the Gemini backend.
 * @param {number} props.result.matchScore - ATS compatibility percentage.
 * @param {string} props.result.summary - Qualitative overview of candidate alignment.
 * @param {string[]} props.result.missingKeywords - Top technical skills absent in the resume.
 * @param {string[]} props.result.suggestedChanges - Actionable bullet points for resume optimization.
 * @param {Function} props.onReset - Callback to clear state and return to InputEngine.
 */
export const AnalysisView = ({ result, onReset }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="space-y-10 md:space-y-12"
  >
    {/* --- View Header --- 
        Provides clear navigation context and an immediate "exit" or "reset" path.
    */}
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-[#d1b066]/10 pb-10 md:pb-12 gap-6">
      <div className="space-y-2">
        <h2 className="text-4xl md:text-6xl font-serif text-white">Analysis Result</h2>
      </div>
      <button
        onClick={onReset}
        className="text-[#d1b066] text-[10px] uppercase font-bold tracking-widest hover:underline flex items-center gap-2"
      >
        <RefreshCw className="w-3 h-3" /> Discard & Restart
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

      {/* --- Card 01: Match Score (Quantitative) --- 
          Visual focus point using large typography and a radial background accent.
      */}
      <div className="md:col-span-4 bg-[#0f241d]/60 border border-[#d1b066]/10 p-10 rounded-2xl text-center shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#d1b066]/5 rounded-bl-full group-hover:scale-110 transition-transform duration-500"></div>
        <Target className="w-8 h-8 text-[#d1b066] mx-auto mb-6 relative z-10" />
        <h3 className="text-white/60 text-[10px] uppercase tracking-[0.3em] font-bold relative z-10">Match Score</h3>
        <div className="text-8xl font-serif text-white my-6 relative z-10 drop-shadow-[0_0_15px_rgba(209,176,102,0.3)]">
          {result?.matchScore}%
        </div>
        <p className="text-[#d1b066] text-xs font-bold uppercase tracking-widest relative z-10">Top Tier Applicant</p>
      </div>

      {/* --- Card 02: Expert Insight (Qualitative) --- 
          Converts raw data into a narrative summary.
      */}
      <div className="md:col-span-8 bg-[#0f241d]/30 border border-white/5 p-10 rounded-2xl flex flex-col justify-center shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d1b066]/20 to-transparent"></div>
        <h3 className="text-[#d1b066] text-[10px] uppercase tracking-[0.3em] font-bold mb-6 flex items-center gap-3">
          <Search className="w-4 h-4" /> Expert System Insight
        </h3>
        <p className="text-2xl md:text-3xl text-white/90 font-light leading-relaxed font-serif italic">
          "{result?.summary}"
        </p>
      </div>

      {/* --- Card 03: Missing Essentials (Technical Gaps) --- 
          Utilizes a "Tag" system for quick scanning of technical keywords.
      */}
      <div className="md:col-span-6 bg-[#0f241d]/40 border border-[#d1b066]/10 p-10 rounded-2xl shadow-xl relative group">
        <h3 className="text-[#d1b066] text-[10px] font-bold uppercase tracking-[0.3em] mb-8">Missing Essentials</h3>
        <div className="flex flex-wrap gap-3">
          {result?.missingKeywords.map((k, i) => (
            <span key={i} className="px-5 py-2.5 bg-[#d1b066]/5 text-[#d1b066] rounded-lg text-xs font-mono border border-[#d1b066]/20 hover:bg-[#d1b066]/10 transition-colors">
              {k}
            </span>
          ))}
        </div>
      </div>

      {/* --- Card 04: Optimization Strategy (Action Plan) --- 
          The most interactive part of the dashboard; lists specific steps for improvement.
      */}
      <div className="md:col-span-6 bg-[#0f241d]/50 border border-[#d1b066]/20 p-10 rounded-2xl shadow-xl">
        <h3 className="text-[#d1b066] text-[10px] font-bold uppercase tracking-[0.3em] mb-8">Optimization Strategy</h3>
        <div className="space-y-6">
          {result?.suggestedChanges.map((change, i) => (
            <div key={i} className="flex gap-6 items-start group">
              {/* Ordered bullet system for priority visualization */}
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#d1b066]/10 text-[#d1b066] flex items-center justify-center font-serif text-sm border border-[#d1b066]/20 group-hover:bg-[#d1b066] group-hover:text-[#050b09] transition-all duration-300">
                {i + 1}
              </span>
              <p className="text-sm text-white/70 leading-relaxed pt-1.5 group-hover:text-white transition-colors">
                {change}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);