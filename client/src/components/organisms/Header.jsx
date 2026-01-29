import React from 'react';
import { motion } from 'framer-motion';
import logoImg from '../../assets/logo.png';

export const Header = ({ onNavigate }) => (
  <motion.header 
    initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: "circOut" }}
    className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-3 md:py-4 bg-[#050b09]/90 backdrop-blur-md border-b border-[#d1b066]/5"
  >
    <div className="text-white font-serif font-bold text-xl md:text-2xl tracking-tight flex items-center gap-2 md:gap-3">
      <div className="w-7 h-7 md:w-8 md:h-8 rounded-sm overflow-hidden flex items-center justify-center transition-transform group-hover:scale-110">
        <img 
          src={logoImg} 
          alt="Kairos Logo" 
          className="w-full h-full object-contain"
        />
      </div>
      KAIROS<span className="text-[#d1b066] ml-[-4px]">.</span>
    </div>
    
    <nav className="hidden md:flex gap-10 bg-[#0f241d]/60 px-8 py-2.5 rounded-full border border-[#d1b066]/10">
      {[{ label: 'Engine', id: 'input-engine' }, { label: 'Features', id: 'features-section' }, { label: 'Security', id: 'security-section' }].map((item) => (
        <button key={item.label} onClick={() => onNavigate(item.id)} className="text-white/50 hover:text-[#d1b066] text-[10px] font-bold uppercase tracking-[0.2em] transition-all">
          {item.label}
        </button>
      ))}
    </nav>
    <div className="w-7 h-7 md:w-8 md:h-8 invisible"></div>
  </motion.header>
);