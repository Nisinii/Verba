import React from 'react';
import { Upload, ArrowRight, Check } from 'lucide-react';
import { Button } from '../atoms/Button';

/**
 * Kairos UI: Input Engine
 * * The primary data-entry portal for the Kairos analysis pipeline.
 * * Handles asynchronous file selection and multi-line text input.
 * * Design Features:
 * - Glassmorphic card container with gradient borders.
 * - Dynamic feedback for file selection states (Empty vs. Populated).
 * - Step-by-step visual guide for user onboarding.
 * * @param {Object} props
 * @param {File|null} props.file - The currently selected PDF resume file.
 * @param {string} props.jobDesc - The raw text of the target job description.
 * @param {Function} props.onFileChange - Event handler for the hidden file input.
 * @param {Function} props.onDescChange - Event handler for the job description textarea.
 * @param {Function} props.onAnalyze - The trigger function for the backend AI pipeline.
 * @param {boolean} props.isAnalyzing - Loading state to prevent duplicate submissions.
 */
export const InputEngine = ({ 
  file, 
  jobDesc, 
  onFileChange, 
  onDescChange, 
  onAnalyze, 
  isAnalyzing 
}) => {
  // Constant for instructional steps to keep JSX clean and maintainable
  const steps = [
    "Upload PDF Resume", 
    "Input Target Job Vector", 
    "Receive Optimization Strategy"
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 items-center">
      
      {/* Left Column: Instructional Narrative */}
      <div className="space-y-8">
        <h2 className="text-4xl md:text-7xl font-serif text-white leading-tight">
          Ready to Tee Off? <br/>
          <span className="text-[#d1b066]">Input Your Data.</span>
        </h2>
        <p className="text-white/40 text-base md:text-lg leading-relaxed max-w-md font-light">
          Upload your resume and paste the job description below. 
          Our AI engine will analyze the terrain and suggest the perfect approach.
        </p>
        
        {/* Visual Roadmap: Helps user understand the process flow */}
        <div className="space-y-5 md:space-y-6 pt-4">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center gap-4 md:gap-6 group">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#d1b066]/20 flex items-center justify-center text-[#d1b066] font-serif text-lg transition-colors group-hover:bg-[#d1b066] group-hover:text-[#050b09]">
                {i + 1}
              </div>
              <span className="text-white/60 font-medium tracking-widest uppercase text-[9px] md:text-[10px] group-hover:text-white transition-colors">
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Interactive Form Card */}
      <div className="bg-gradient-to-br from-[#d1b066]/20 to-transparent p-[1px] rounded-sm shadow-2xl">
        <div className="bg-[#0f241d]/80 backdrop-blur-xl p-6 md:p-12 space-y-8">
          
          {/* File Upload Zone: Hidden native input with custom stylized UI */}
          <div className="space-y-4">
            <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d1b066] block">
              Resume Architecture
            </label>
            <div className="relative h-32 border border-dashed border-white/10 flex items-center justify-center bg-[#050b09]/50 cursor-pointer group hover:border-[#d1b066]/30 transition-all">
              <input 
                type="file" 
                accept=".pdf" 
                onChange={onFileChange} 
                className="absolute inset-0 opacity-0 cursor-pointer z-20" 
              />
              {file ? (
                // Success State: Shown once a file is successfully buffered
                <div className="text-center px-4">
                  <Check className="w-6 h-6 text-[#d1b066] mx-auto mb-1" />
                  <span className="text-[10px] font-bold text-white uppercase break-all">
                    {file.name}
                  </span>
                </div>
              ) : (
                // Empty State: Initial prompt
                <div className="text-center">
                  <Upload className="w-5 h-5 text-white/20 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold text-white/20 uppercase">
                    Select PDF Dossier
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Text Input Zone: For pasting high-volume target data */}
          <div className="space-y-4">
            <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d1b066] block">
              Target Requirements
            </label>
            <textarea 
              value={jobDesc} 
              onChange={onDescChange} 
              placeholder="Paste Job Description..." 
              className="w-full h-40 bg-[#050b09]/50 border border-white/10 p-4 text-sm text-white focus:outline-none focus:border-[#d1b066]/30 transition-all resize-none placeholder:text-white/10" 
            />
          </div>

          {/* Submission Control: Includes validation logic to prevent empty requests */}
          <Button 
            onClick={onAnalyze} 
            disabled={!file || !jobDesc || isAnalyzing} 
            className="w-full flex items-center justify-center gap-3"
          >
            {isAnalyzing ? (
              'Processing Signal...' 
            ) : (
              <>Commence Analysis <ArrowRight className="w-4 h-4" /></>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};