import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, BarChart3, Users } from 'lucide-react';
import { VARIANTS } from '../../data/constants';

export const Features = () => (
  <section id="features-section" className="py-20 md:py-32 px-6 md:px-12 bg-[#050b09] relative z-20">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16 md:mb-24">
        <span className="text-[#d1b066] font-bold uppercase tracking-[0.3em] text-[10px] mb-3 block">The Championship Standard</span>
        <h2 className="text-4xl md:text-6xl font-serif text-white">Engineered Success</h2>
      </div>

      <motion.div variants={VARIANTS.stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {[{ icon: ShieldCheck, title: "ATS Compliance", desc: "Our engines reverse-engineer Applicant Tracking Systems." },
            { icon: BarChart3, title: "Semantic Scoring", desc: "We analyze vector distance between experience and requirements." },
            { icon: Users, title: "Competitive Edge", desc: "Gain insights from thousands of successful profiles." }
          ].map((f, i) => (
            <motion.div key={i} variants={VARIANTS.fadeInUp} className="bg-[#0f241d]/40 backdrop-blur-md p-8 md:p-10 rounded-tr-[3rem] rounded-bl-[1rem] border border-[#d1b066]/5 group">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[#050b09] border border-[#d1b066]/20 rounded-full flex items-center justify-center text-[#d1b066] mb-6 md:mb-8 group-hover:bg-[#d1b066] group-hover:text-[#050b09] transition-all">
                <f.icon className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <h3 className="text-xl md:text-2xl font-serif font-bold text-white mb-3 md:mb-4 group-hover:text-[#d1b066] transition-colors">{f.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed font-light">{f.desc}</p>
            </motion.div>
          ))}
      </motion.div>
    </div>
  </section>
);