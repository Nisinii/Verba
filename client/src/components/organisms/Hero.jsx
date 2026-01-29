import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '../atoms/Button';

/**
 * Kairos UI: Hero Section
 * * The flagship entry point of the application designed to establish 
 * brand authority and immediate value proposition.
 * * Features:
 * - Scroll-linked parallax effects on the content layer for perceived depth.
 * - Multi-layered gradient masking for readability over high-resolution imagery.
 * - Dynamic typography using a mix of Serif (Heritage) and Sans-Serif (Modern) fonts.
 * * @param {Object} props
 * @param {Function} props.onCtaClick - Smooth-scroll handler to the 'Engine' section.
 */
export const Hero = ({ onCtaClick }) => {
  // --- Scroll-Linked Animation Logic ---
  const { scrollY } = useScroll();

  // Content 'y' offset moves slower than the background (Parallax)
  const y = useTransform(scrollY, [0, 500], [0, 100]);

  // Content fades out as the user scrolls down for a smooth transition
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative h-screen w-full flex items-center px-6 md:px-24 z-10 overflow-hidden">

      {/* --- Background Composition Layer --- */}
      <div className="absolute inset-0 z-0">
        {/* Optimized background image with low brightness to ensure text contrast */}
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2600&auto=format&fit=crop"
          alt="Premium Architecture Background"
          className="w-full h-full object-cover brightness-[0.25]"
        />

        {/* Gradient Overlay: Horizontal (Readability) & Vertical (Section Blending) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050b09] via-[#050b09]/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#050b09] to-transparent"></div>
      </div>

      {/* --- Content Layer --- */}
      <motion.div
        style={{ y, opacity }}
        className="z-10 max-w-4xl text-white"
      >
        {/* Secondary Headline / Eyebrow Text */}
        <div className="flex items-center gap-4 mb-6 md:mb-8">
          <div className="h-[1px] w-8 md:w-12 bg-[#d1b066]"></div>
          <span className="uppercase tracking-[0.4em] text-[8px] md:text-[10px] font-bold text-[#d1b066]">
            Strategic Career Intelligence
          </span>
        </div>

        {/* Primary Headline: Large-scale serif with gradient text treatment */}
        <h1 className="text-5xl md:text-8xl leading-[1.1] mb-8 md:mb-10 font-serif">
          Master Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d1b066] to-[#f4e4bc]">
            Professional Game.
          </span>
        </h1>

        {/* Value Proposition Description */}
        <p className="text-white/50 text-base md:text-xl max-w-xl leading-relaxed font-light mb-10 md:mb-12">
          Don't leave your career to chance. Kairos provides the strategic insight,
          semantic analysis, and competitive edge you need to win.
        </p>

        {/* Primary Call to Action */}
        <Button onClick={onCtaClick}>Start Analysis</Button>
      </motion.div>
    </section>
  );
};