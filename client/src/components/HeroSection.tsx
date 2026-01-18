import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface HeroSectionProps {
  scrollToInput: () => void;
}

export const HeroSection = ({ scrollToInput }: HeroSectionProps) => {
  const { scrollY } = useScroll();
  const heroTextY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative h-screen w-full flex items-center px-6 md:px-20 z-10 overflow-hidden">
      <div className="absolute inset-0 z-0">
         <img src="https://images.unsplash.com/photo-1590005354167-68b5600084bd?q=80&w=2600&auto=format&fit=crop" alt="Background" className="w-full h-full object-cover" />
         <div className="absolute inset-0 bg-gradient-to-r from-[#050b09]/95 via-[#050b09]/50 to-transparent"></div>
         <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#050b09] to-transparent"></div>
      </div>

      <motion.div style={{ y: heroTextY, opacity: heroOpacity }} className="z-10 max-w-4xl text-white mt-20">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="flex items-center gap-4 mb-6">
          <div className="h-[1px] w-16 bg-[#d1b066]"></div>
          <span className="uppercase tracking-[0.3em] text-xs font-bold text-[#d1b066] shadow-black drop-shadow-md">Premium Career Architecture</span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="text-6xl md:text-8xl leading-tight mb-8 drop-shadow-2xl">
          Master Your <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d1b066] to-[#f4e4bc]">Professional Game.</span>
        </motion.h1>
        
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className="text-white/70 text-lg md:text-xl max-w-xl leading-relaxed font-light mb-12">
          Don't leave your career to chance. Verba provides the strategic insight, semantic analysis, and competitive edge you need to win.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-wrap gap-4">
          <button onClick={scrollToInput} className="bg-[#d1b066] text-[#050b09] px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-[#bfa05a] transition-all hover:scale-105 shadow-[0_0_30px_-5px_rgba(209,176,102,0.4)]">Start Analysis</button>
        </motion.div>
      </motion.div>
    </section>
  );
};