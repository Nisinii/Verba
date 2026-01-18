import React from 'react';
import { Github, Linkedin } from 'lucide-react';

export const Footer = () => (
  <footer className="w-full bg-[#050b09] text-white/30 py-16 px-6 border-t border-[#d1b066]/10 relative z-10">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#d1b066]/50">
        © {new Date().getFullYear()} Verba Intelligence Systems.
      </div>
      <div className="flex gap-6">
        <Github className="w-4 h-4 hover:text-[#d1b066] transition-colors cursor-pointer" />
        <Linkedin className="w-4 h-4 hover:text-[#d1b066] transition-colors cursor-pointer" />
      </div>
    </div>
  </footer>
);