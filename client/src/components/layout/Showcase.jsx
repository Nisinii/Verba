import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { OPTIMIZATION_SAMPLES } from '../../data/constants';

export const Showcase = () => (
  <section className="py-20 md:py-32 px-6 md:px-12 bg-[#050b09] relative z-20 overflow-hidden">
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 items-center">
      <div>
        <span className="text-[#d1b066] font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">The Kairos Method</span>
        <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 md:mb-8">Tactical Refinement.</h2>
        <p className="text-white/40 text-base md:text-lg max-w-md font-light leading-relaxed mb-8 md:mb-12">
          Generic descriptions fail to trigger ATS interest. Our engine re-architects your experience to align with high-value semantic vectors.
        </p>
        <div className="flex gap-10 md:gap-12">
          <div><div className="text-white font-serif text-2xl md:text-3xl mb-1">42%</div><div className="text-[10px] uppercase tracking-widest text-[#d1b066]/60">Avg. Score Lift</div></div>
          <div><div className="text-white font-serif text-2xl md:text-3xl mb-1">10k+</div><div className="text-[10px] uppercase tracking-widest text-[#d1b066]/60">Patterns Analyzed</div></div>
        </div>
      </div>
      <div className="space-y-6">
        {OPTIMIZATION_SAMPLES.map((sample, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.2 }}
            className="bg-[#0f241d]/30 border border-[#d1b066]/10 p-6 md:p-8 rounded-sm"
          >
            <div className="text-[9px] uppercase tracking-widest text-[#d1b066]/40 mb-4 md:mb-6 flex justify-between items-center">
              <span>Vector: {sample.tag}</span><TrendingUp className="w-3 h-3" />
            </div>
            <div className="space-y-3 md:space-y-4">
              <div className="text-xs text-white/30 line-through italic">{sample.before}</div>
              <div className="text-sm text-[#d1b066] font-medium leading-relaxed pl-4 border-l-2 border-[#d1b066]/30">{sample.after}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);