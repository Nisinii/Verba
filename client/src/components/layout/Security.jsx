import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, EyeOff, Lock } from 'lucide-react';

export const Security = () => (
  <section id="security-section" className="py-20 md:py-32 px-6 md:px-12 bg-[#080e0c] border-t border-[#d1b066]/5 overflow-hidden">
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">
      <div className="lg:col-span-5 order-2 lg:order-1 flex justify-center lg:justify-start">
        <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border border-[#d1b066]/10 rounded-full" />
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute inset-4 border border-[#d1b066]/5 rounded-full" />
          <div className="relative z-10 w-24 h-24 md:w-32 md:h-32 bg-[#0f241d]/40 backdrop-blur-xl border border-[#d1b066]/20 rounded-full flex items-center justify-center">
            <ShieldCheck className="w-10 h-10 md:w-14 md:h-14 text-[#d1b066]/60" />
          </div>
        </div>
      </div>
      <div className="lg:col-span-7 order-1 lg:order-2 space-y-8 md:space-y-12">
        <h2 className="text-4xl md:text-6xl font-serif text-white">Privacy First. <br/>By Design.</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-[#d1b066]/10 border border-[#d1b066]/20 rounded flex items-center justify-center shrink-0"><EyeOff className="w-5 h-5 text-[#d1b066]" /></div>
            <div><h4 className="text-white text-[11px] font-bold uppercase tracking-widest mb-2">Zero Retention</h4><p className="text-[11px] text-white/30 leading-relaxed">Files are wiped from memory immediately after the session ends.</p></div>
          </div>
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-[#d1b066]/10 border border-[#d1b066]/20 rounded flex items-center justify-center shrink-0"><Lock className="w-5 h-5 text-[#d1b066]" /></div>
            <div><h4 className="text-white text-[11px] font-bold uppercase tracking-widest mb-2">Secure Isolation</h4><p className="text-[11px] text-white/30 leading-relaxed">Vector analysis is performed in secured, isolated temporary environments.</p></div>
          </div>
        </div>
      </div>
    </div>
  </section>
);