import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, EyeOff, Lock } from 'lucide-react';

/**
 * Kairos UI: Security & Trust Section
 * * Communicates the data handling and privacy protocols of the application.
 * * Design Features: 
 * - Circular SVG motion orchestration to visualize "active protection".
 * - Bento-grid style layout for security features.
 * - Glassmorphism effects consistent with the brand's premium dark theme.
 * * @returns {JSX.Element} The rendered Security section.
 */
export const Security = () => {
  /**
   * Data definition for security pillars.
   * Centralizing content here makes it easier to manage translations or updates.
   */
  const securityFeatures = [
    {
      icon: EyeOff,
      title: "Zero Retention",
      desc: "Files are wiped from server memory immediately after the analysis session terminates."
    },
    {
      icon: Lock,
      title: "Secure Isolation",
      desc: "Vector analysis is performed in secured, isolated temporary environments to prevent data leaks."
    }
  ];

  return (
    <section
      id="security-section"
      className="py-20 md:py-32 px-6 md:px-12 bg-[#080e0c] border-t border-[#d1b066]/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">

        {/* Visual Composition: Animated Shield & Rotating Orbits */}
        <div className="lg:col-span-5 order-2 lg:order-1 flex justify-center lg:justify-start">
          <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">

            {/* Outer Orbit: Slow CW rotation */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border border-[#d1b066]/10 rounded-full"
            />

            {/* Inner Orbit: Faster CCW rotation */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 border border-[#d1b066]/5 rounded-full"
            />

            {/* Core Shield: Glassmorphic center piece */}
            <div className="relative z-10 w-24 h-24 md:w-32 md:h-32 bg-[#0f241d]/40 backdrop-blur-xl border border-[#d1b066]/20 rounded-full flex items-center justify-center">
              <ShieldCheck className="w-10 h-10 md:w-14 md:h-14 text-[#d1b066]/60" />
            </div>
          </div>
        </div>

        {/* Content Composition: Typography and Feature Grid */}
        <div className="lg:col-span-7 order-1 lg:order-2 space-y-8 md:space-y-12">
          <h2 className="text-4xl md:text-6xl font-serif text-white">
            Privacy First. <br />By Design.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
            {securityFeatures.map((item, index) => (
              <div key={index} className="flex gap-4">
                {/* Icon Wrapper: High-contrast gold accent */}
                <div className="w-10 h-10 bg-[#d1b066]/10 border border-[#d1b066]/20 rounded flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-[#d1b066]" />
                </div>

                <div>
                  <h4 className="text-white text-[11px] font-bold uppercase tracking-widest mb-2">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-white/30 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};