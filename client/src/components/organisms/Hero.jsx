import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '../atoms/Button';

export const Hero = ({ onCtaClick }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative h-screen w-full flex items-center px-6 md:px-24 z-10 overflow-hidden">
      <div className="absolute inset-0 z-0">
         <img 
           src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2600&auto=format&fit=crop" 
           alt="Premium Background" className="w-full h-full object-cover brightness-[0.25]" 
         />
         <div className="absolute inset-0 bg-gradient-to-r from-[#050b09] via-[#050b09]/40 to-transparent"></div>
         <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#050b09] to-transparent"></div>
      </div>

      <motion.div style={{ y, opacity }} className="z-10 max-w-4xl text-white">
        <div className="flex items-center gap-4 mb-6 md:mb-8">
          <div className="h-[1px] w-8 md:w-12 bg-[#d1b066]"></div>
          <span className="uppercase tracking-[0.4em] text-[8px] md:text-[10px] font-bold text-[#d1b066]">Strategic Career Intelligence</span>
        </div>

        <h1 className="text-5xl md:text-8xl leading-[1.1] mb-8 md:mb-10 font-serif">
          Master Your <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d1b066] to-[#f4e4bc]">Professional Game.</span>
        </h1>
        
        <p className="text-white/50 text-base md:text-xl max-w-xl leading-relaxed font-light mb-10 md:mb-12">
          Don't leave your career to chance. Kairos provides the strategic insight, semantic analysis, and competitive edge you need to win.
        </p>

        <Button onClick={onCtaClick}>Start Analysis</Button>
      </motion.div>
    </section>
  );
};