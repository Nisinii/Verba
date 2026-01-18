import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, BarChart3, Users } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const FeatureCard = ({ icon: Icon, title, desc, delay }: { icon: any, title: string, desc: string, delay: number }) => (
  <motion.div 
    variants={fadeInUp}
    className="bg-[#0f241d]/80 backdrop-blur-md p-8 rounded-tr-[3rem] rounded-bl-[1rem] shadow-xl border border-[#d1b066]/10 hover:border-[#d1b066]/30 hover:shadow-2xl hover:shadow-[#d1b066]/5 transition-all hover:-translate-y-1 group relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 w-20 h-20 bg-[#d1b066]/5 rounded-bl-[4rem] -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
    <div className="w-12 h-12 bg-[#050b09] border border-[#d1b066]/20 rounded-full flex items-center justify-center text-[#d1b066] mb-6 relative z-10 group-hover:bg-[#d1b066] group-hover:text-[#050b09] transition-colors">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-xl font-serif font-bold text-white mb-3 group-hover:text-[#d1b066] transition-colors">{title}</h3>
    <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
  </motion.div>
);

export const FeaturesSection = () => (
  <section className="py-32 px-6 bg-[#050b09] relative z-20">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <span className="text-[#d1b066] font-bold uppercase tracking-widest text-xs mb-3 block opacity-80">Why Choose Verba?</span>
        <h2 className="text-4xl md:text-5xl font-serif text-white">The Championship Standard</h2>
      </div>

      <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <FeatureCard delay={0.1} icon={ShieldCheck} title="ATS Compliance" desc="Our engines reverse-engineer Applicant Tracking Systems to ensure your resume never gets filtered out before a human sees it."/>
         <FeatureCard delay={0.3} icon={BarChart3} title="Semantic Scoring" desc="We don't just match keywords; we analyze the vector distance between your experience and the job's core requirements."/>
         <FeatureCard delay={0.5} icon={Users} title="Competitive Edge" desc="Gain insights derived from thousands of successful profiles. Know exactly where you stand against the top 1% of applicants."/>
      </motion.div>
    </div>
  </section>
);