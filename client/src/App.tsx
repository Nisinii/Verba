import React from 'react';
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Cpu } from 'lucide-react';

// --- Application Logic & Hooks ---
import { useAnalysis } from './hooks/useAnalysis';

// --- Component Library: Navigation & UI Shell ---
import { Header } from './components/organisms/Header';
import { Hero } from './components/organisms/Hero';
import { Footer } from './components/organisms/Footer';

// --- Component Library: Content & Layout Sections ---
import { Features } from './components/layout/Features';
import { Showcase } from './components/layout/Showcase';
import { Security } from './components/layout/Security';

// --- Component Library: Analysis Engine States ---
import { InputEngine } from './components/organisms/InputEngine';
import { AnalysisView } from './components/organisms/AnalysisView';

/**
 * Kairos: Main Application Entry Point
 * * Responsibilities:
 * - Orchestrates global layout and section transitions.
 * - Manages centralized 'Analysis Engine' state via the useAnalysis hook.
 * - Implements high-end interactive UI effects (Radial mouse tracking).
 * - Handles viewport navigation and smooth-scrolling.
 */
export default function App() {
  // Destructuring the core logic from our custom state machine hook
  const {
    file,
    setFile,
    jobDesc,
    setJobDesc,
    analysisState,
    result,
    handleAnalyze,
    resetAnalysis
  } = useAnalysis();

  // --- Global Interaction: Mouse Tracking ---
  // Motion values are used to drive the radial gradient background effect 
  // without triggering expensive React re-renders.
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  /**
   * Tracks cursor position relative to the viewport.
   * @param {React.MouseEvent} event 
   */
  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  /**
   * Triggers a smooth-scroll transition to a target section by ID.
   * @param {string} id - The ID of the target DOM element.
   */
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className="min-h-screen bg-[#050b09] selection:bg-[#d1b066] overflow-x-hidden relative text-white"
      onMouseMove={handleMouseMove}
    >
      {/* --- Dynamic Background: Radial spotlight effect following cursor --- */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-0 opacity-20 hidden md:block"
        style={{
          background: useMotionTemplate`radial-gradient(1000px circle at ${mouseX}px ${mouseY}px, rgba(209, 176, 102, 0.15), transparent 80%)`
        }}
      />

      <Header onNavigate={scrollToSection} />

      <main>
        {/* Landing Section */}
        <Hero onCtaClick={() => scrollToSection('input-engine')} />

        {/* Informational Sections */}
        <Features />
        <Showcase />

        {/* --- Analysis Engine Container --- 
            Implements a state machine to toggle between Input, Processing, and Result views.
        */}
        <section id="input-engine" className="py-20 md:py-32 px-6 md:px-12 bg-[#080e0c] relative z-20 border-t border-[#d1b066]/5 min-h-[600px]">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">

              {/* STATE: Idle - Waiting for user input */}
              {analysisState === 'idle' && (
                <InputEngine
                  file={file}
                  jobDesc={jobDesc}
                  onFileChange={(e) => e.target.files && setFile(e.target.files[0])}
                  onDescChange={(e) => setJobDesc(e.target.value)}
                  onAnalyze={handleAnalyze}
                />
              )}

              {/* STATE: Analyzing - Backend processing in progress */}
              {analysisState === 'analyzing' && (
                <div className="flex flex-col items-center justify-center py-20 space-y-12">
                  <div className="w-24 h-24 border border-[#d1b066]/20 rounded-full flex items-center justify-center relative">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 border-t-2 border-[#d1b066] rounded-full"
                    />
                    <Cpu className="w-8 h-8 text-[#d1b066]" />
                  </div>
                  <h3 className="text-xl font-serif text-white tracking-widest uppercase">
                    Processing Signal
                  </h3>
                </div>
              )}

              {/* STATE: Complete - Displaying intelligence results */}
              {analysisState === 'complete' && (
                <AnalysisView
                  result={result}
                  onReset={() => resetAnalysis(scrollToSection)}
                />
              )}

            </AnimatePresence>
          </div>
        </section>

        {/* Closing Section */}
        <Security />
      </main>

      <Footer />
    </div>
  );
}