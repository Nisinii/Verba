import React from 'react';
import { Github, Linkedin } from 'lucide-react';

/**
 * Kairos UI: Global Footer
 * * The final baseline component for the application.
 * * Responsibilities:
 * - Displays dynamic copyright information.
 * - Provides social/professional connectivity via Lucide icons.
 * - Reinforces the premium brand identity through specialized typography.
 * * @returns {JSX.Element} The rendered global footer.
 */
export const Footer = () => {
  // Dynamic constant to ensure the copyright year is always up-to-date
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="w-full bg-[#050b09] text-white/20 py-10 md:py-12 px-6 md:px-12 border-t border-[#d1b066]/5 relative z-10"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">

        {/* Branding & Legal Notice: 
            Utilizes ultra-small, wide-tracked typography for a technical, high-end feel.
        */}
        <div className="text-[9px] uppercase tracking-[0.3em] font-medium text-[#d1b066]/40 text-center md:text-left">
          Proprietary Intelligence System — © {currentYear} Kairos.
        </div>

        {/* Social Connectivity Block: 
            Interactive SVG icons with smooth color transitions on hover.
        */}
        <div className="flex gap-8">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Repository"
          >
            <Github className="w-4 h-4 hover:text-[#d1b066] cursor-pointer transition-colors" />
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4 hover:text-[#d1b066] cursor-pointer transition-colors" />
          </a>
        </div>

      </div>
    </footer>
  );
};