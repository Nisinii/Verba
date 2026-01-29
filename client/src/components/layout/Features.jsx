import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, BarChart3, Users } from 'lucide-react';
import { VARIANTS } from '../../data/constants';

/**
 * Kairos UI: Features Section
 * * Layout component displaying the core value propositions of the Kairos engine.
 * * Uses Framer Motion for scroll-triggered stagger animations.
 * * Design Pattern: Card Grid with glassmorphism (backdrop-blur) and custom border radii.
 * * @returns {JSX.Element} The rendered section containing feature cards.
 */
export const Features = () => {
  /**
   * Data definition for feature set.
   * Moving this inside the component or to a constant file keeps the JSX clean.
   */
  const featureData = [
    {
      icon: ShieldCheck,
      title: "ATS Compliance",
      desc: "Our engines reverse-engineer Applicant Tracking Systems to ensure profile visibility."
    },
    {
      icon: BarChart3,
      title: "Semantic Scoring",
      desc: "We analyze vector distance between professional experience and job requirements."
    },
    {
      icon: Users,
      title: "Competitive Edge",
      desc: "Gain strategic insights derived from thousands of industry-leading successful profiles."
    }
  ];

  return (
    <section id="features-section" className="py-20 md:py-32 px-6 md:px-12 bg-[#050b09] relative z-20">
      <div className="max-w-7xl mx-auto">

        {/* Section Header: Centered typography with branding accent */}
        <div className="text-center mb-16 md:mb-24">
          <span className="text-[#d1b066] font-bold uppercase tracking-[0.3em] text-[10px] mb-3 block">
            The Championship Standard
          </span>
          <h2 className="text-4xl md:text-6xl font-serif text-white">Engineered Success</h2>
        </div>

        {/* Animation Wrapper: Orchestrates the 'stagger' effect for children cards.
          Viewport 'once: true' ensures the animation only fires the first time it enters the frame.
        */}
        <motion.div
          variants={VARIANTS.stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
        >
          {featureData.map((f, i) => (
            <motion.div
              key={i}
              variants={VARIANTS.fadeInUp}
              className="bg-[#0f241d]/40 backdrop-blur-md p-8 md:p-10 rounded-tr-[3rem] rounded-bl-[1rem] border border-[#d1b066]/5 group"
            >
              {/* Icon Container: Themed with gold border and interactive hover states */}
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[#050b09] border border-[#d1b066]/20 rounded-full flex items-center justify-center text-[#d1b066] mb-6 md:mb-8 group-hover:bg-[#d1b066] group-hover:text-[#050b09] transition-all">
                <f.icon className="w-5 h-5 md:w-6 md:h-6" />
              </div>

              {/* Feature Content */}
              <h3 className="text-xl md:text-2xl font-serif font-bold text-white mb-3 md:mb-4 group-hover:text-[#d1b066] transition-colors">
                {f.title}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed font-light">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};