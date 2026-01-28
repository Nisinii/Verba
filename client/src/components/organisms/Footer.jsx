import React from 'react';
import { Github, Linkedin } from 'lucide-react';

export const Footer = () => (
  <footer className="w-full bg-[#050b09] text-white/20 py-10 md:py-12 px-6 md:px-12 border-t border-[#d1b066]/5 relative z-10">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="text-[9px] uppercase tracking-[0.3em] font-medium text-[#d1b066]/40 text-center md:text-left">
        Proprietary Intelligence System — © {new Date().getFullYear()} Kairos.
      </div>
      <div className="flex gap-8">
        <Github className="w-4 h-4 hover:text-[#d1b066] cursor-pointer transition-colors" />
        <Linkedin className="w-4 h-4 hover:text-[#d1b066] cursor-pointer transition-colors" />
      </div>
    </div>
  </footer>
);