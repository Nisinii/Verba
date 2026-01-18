import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Check, ArrowRight } from 'lucide-react';

interface InputSectionProps {
  file: File | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  jobDesc: string;
  setJobDesc: (val: string) => void;
  handleAnalyze: () => void;
  analysisState: string;
  resumeText: string;
}

export const InputSection = ({ 
  file, 
  handleFileChange, 
  jobDesc, 
  setJobDesc, 
  handleAnalyze, 
  analysisState,
  resumeText
}: InputSectionProps) => (
  <section id="input-engine" className="py-32 px-6 bg-[#08120e] relative z-20">
    <div className="absolute top-0 right-0 w-1/3 h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>

    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
      <div className="space-y-8">
        <h2 className="text-5xl md:text-6xl font-serif text-white leading-tight">Ready to Tee Off? <br/> <span className="text-[#d1b066]">Input Your Data.</span></h2>
        <p className="text-white/60 text-lg leading-relaxed max-w-md">Upload your resume and paste the job description below. Our AI caddie will analyze the terrain and suggest the perfect approach.</p>
        
        <div className="space-y-6 pt-4">
           {[1, 2, 3].map((num, i) => (
             <div key={i} className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-full border border-[#d1b066]/20 flex items-center justify-center text-[#d1b066] font-bold font-serif text-xl group-hover:bg-[#d1b066] group-hover:text-[#050b09] transition-all">{num}</div>
                <span className="text-white/80 font-medium tracking-wide group-hover:text-white transition-colors">
                  {i === 0 && "Upload PDF Resume"}
                  {i === 1 && "Input Target Job Vector"}
                  {i === 2 && "Receive Optimization Strategy"}
                </span>
             </div>
           ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#d1b066]/10 to-transparent p-[1px] rounded-[2rem] shadow-2xl shadow-black/50">
        <div className="bg-[#0f241d]/90 backdrop-blur-xl rounded-[2rem] p-8 md:p-12 border-t border-white/5 space-y-8">
           <div>
             <label className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-[#d1b066] mb-4"><span>Resume File</span></label>
             <div className="relative group cursor-pointer">
                <input type="file" accept=".pdf" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" />
                <div className={`w-full h-32 border border-dashed rounded-xl transition-all duration-300 flex flex-col items-center justify-center gap-3 ${file ? 'border-[#d1b066] bg-[#d1b066]/10' : 'border-white/10 bg-[#050b09]/50 hover:border-[#d1b066]/50 hover:bg-[#050b09]/80'}`}>
                   {file ? (
                      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center">
                         <Check className="w-6 h-6 text-[#d1b066] mb-1" />
                         <span className="text-sm font-bold text-white">{file.name}</span>
                         {resumeText && <span className="text-[10px] text-[#d1b066] uppercase tracking-widest mt-2">Text Extracted</span>}
                      </motion.div>
                   ) : (
                      <>
                         <Upload className="w-5 h-5 text-white/40" />
                         <span className="text-xs font-bold text-white/40 uppercase tracking-wide group-hover:text-white/60">Select PDF</span>
                      </>
                   )}
                </div>
             </div>
           </div>

           <div>
             <label className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-[#d1b066] mb-4"><span>Target Job Description</span></label>
             <textarea value={jobDesc} onChange={(e) => setJobDesc(e.target.value)} placeholder="Paste text here..." className="w-full h-32 bg-[#050b09]/50 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-[#d1b066]/50 focus:bg-[#050b09] transition-all resize-none placeholder:text-white/20" />
           </div>

           <button onClick={handleAnalyze} disabled={!resumeText || !jobDesc || analysisState !== 'idle'} className={`w-full py-5 rounded-xl font-bold tracking-widest text-xs uppercase flex items-center justify-center gap-2 transition-all shadow-lg ${(!resumeText || !jobDesc) ? 'bg-white/5 text-white/20 cursor-not-allowed' : 'bg-[#d1b066] text-[#050b09] hover:bg-[#bfa05a] hover:shadow-[#d1b066]/20'}`}>
             {analysisState === 'idle' ? (<>Analyze Fit <ArrowRight className="w-4 h-4" /></>) : (<span className="text-[#050b09] animate-pulse">Processing...</span>)}
           </button>
        </div>
      </div>
    </div>
  </section>
);