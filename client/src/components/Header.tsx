import React from 'react';
import { motion } from 'framer-motion';

export const Header = () => (
  <motion.header 
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    transition={{ duration: 0.8, ease: "circOut" }}
    className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-6 bg-gradient-to-b from-[#050b09]/90 to-transparent backdrop-blur-[2px]"
  >
    <div className="text-white font-serif font-bold text-2xl tracking-wide flex items-center gap-2">
      <div className="w-8 h-8 bg-[#d1b066] rounded-tr-xl rounded-bl-xl flex items-center justify-center text-[#050b09] font-sans font-bold text-lg shadow-[0_0_15px_rgba(209,176,102,0.3)]">V</div>
      VERBA<span className="text-[#d1b066]">.</span>
    </div>
    
    <nav className="hidden md:flex gap-10 bg-[#0f241d]/60 backdrop-blur-md px-8 py-3 rounded-full border border-[#d1b066]/10 shadow-2xl">
      {['Analysis', 'ATS Audit', 'Rewrites', 'Interview'].map((item) => (
        <button key={item} className="text-white/70 hover:text-[#d1b066] text-xs font-bold uppercase tracking-widest transition-colors">
          {item}
        </button>
      ))}
    </nav>

    <button onClick={() => window.location.reload()} className="bg-[#d1b066] hover:bg-[#bfa05a] text-[#050b09] px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest transition-all shadow-[0_0_20px_-5px_rgba(209,176,102,0.4)] hover:scale-105">
      Reset System
    </button>
  </motion.header>
);