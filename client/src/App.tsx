import React, { useState } from 'react';
import axios from 'axios';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { InputSection } from './components/InputSection';
import { AnalysisSection } from './components/AnalysisSection';
import { AnalysisResult } from './types';

export default function App() {
  const [file, setFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [analysisState, setAnalysisState] = useState<'idle' | 'analyzing' | 'complete'>('idle');
  const [scanStage, setScanStage] = useState(0); 
  const [result, setResult] = useState<AnalysisResult | null>(null);

  // Mouse Follower Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // 1. File Handler
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      try {
        const response = await axios.post("http://127.0.0.1:8000/extract-resume", formData);
        setResumeText(response.data.full_text);
      } catch (error) {
        console.error("Extraction failed", error);
      }
    }
  };

  // 2. Scroll to Input Section
  const scrollToInput = () => {
    const el = document.getElementById('input-engine');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  // 3. Analysis Logic
  const handleAnalyze = async () => {
    if (!resumeText || !jobDesc) return;
    
    setAnalysisState('analyzing');
    setResult(null);
    setScanStage(0);

    setTimeout(() => setScanStage(1), 1500);
    setTimeout(() => setScanStage(2), 3000);

    try {
      const response = await axios.post("http://127.0.0.1:8000/analyze", {
        resume_text: resumeText,
        job_desc: jobDesc
      });
      setResult(response.data.analysis);
      setAnalysisState('complete');
    } catch (error) {
      console.error(error);
      setAnalysisState('idle'); 
    }
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Manrope:wght@300;400;500;600;700;800&display=swap');
          body { font-family: 'Manrope', sans-serif; }
          h1, h2, h3, .font-serif { font-family: 'DM Serif Display', serif; }
          .custom-scrollbar::-webkit-scrollbar { width: 4px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(209,176,102,0.3); border-radius: 4px; }
        `}
      </style>
      
      <div 
        className="min-h-screen bg-[#050b09] text-white selection:bg-[#d1b066] selection:text-[#050b09] font-sans overflow-x-hidden relative"
        onMouseMove={handleMouseMove}
      >
        <motion.div
          className="pointer-events-none fixed inset-0 z-0 opacity-40 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                800px circle at ${mouseX}px ${mouseY}px,
                rgba(16, 185, 129, 0.1),
                transparent 80%
              )
            `,
          }}
        />

        <Header />
        <HeroSection scrollToInput={scrollToInput} />
        <FeaturesSection />
        <InputSection 
          file={file}
          handleFileChange={handleFileChange}
          jobDesc={jobDesc}
          setJobDesc={setJobDesc}
          handleAnalyze={handleAnalyze}
          analysisState={analysisState}
          resumeText={resumeText}
        />

        <AnalysisSection 
          analysisState={analysisState}
          scanStage={scanStage}
          result={result}
          resetAnalysis={() => { 
            setAnalysisState('idle'); 
            setFile(null); 
            setJobDesc(""); 
            setResumeText("");
          }}
        />

        <Footer />
      </div>
    </>
  );
}