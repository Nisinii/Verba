/**
 * Kairos Configuration & Static Assets
 * * This file serves as the Single Source of Truth for the application's data layer.
 * * Contains: 
 * - Mock API responses for development.
 * - Transformation samples for the Showcase UI.
 * - Framer Motion variants for consistent global animations.
 */

/**
 * Mock result schema mirroring the Gemini AI backend output.
 * Used for fallback states and development testing.
 * @type {Object}
 */
export const MOCK_RESPONSE = {
  matchScore: 89,
  missingKeywords: ["Kubernetes", "gRPC", "Microservices Patterns"],
  suggestedChanges: [
    "Quantify your backend optimization impact (e.g., 'reduced latency by 40%').",
    "Move 'TypeScript' to the top of your skills list for this frontend role.",
    "Add a dedicated section for 'Cloud Architecture' to address the AWS requirement."
  ],
  summary: "Exceptional candidate profile. Your mastery of the React/Python stack creates a strong narrative. The gap lies in orchestration tools—bridging this makes you a top 1% applicant."
};

/**
 * Educational samples for the 'Showcase' component.
 * Demonstrates the "before vs. after" semantic refinement of professional experience.
 * @type {Array<{before: string, after: string, tag: string}>}
 */
export const OPTIMIZATION_SAMPLES = [
  {
    before: "Managed a team of developers and worked on the company website.",
    after: "Orchestrated a cross-functional squad of 8 engineers to re-architect the core platform, resulting in a 40% reduction in TTI (Time to Interactive).",
    tag: "Quantification"
  },
  {
    before: "Used React and Node.js for various projects.",
    after: "Leveraged React and Node.js to implement a distributed micro-frontend architecture, increasing deployment frequency by 2.5x.",
    tag: "Semantic Alignment"
  }
];

/**
 * Framer Motion Animation Variants
 * * Defines a unified motion language across the application.
 * * 'fadeInUp': Standard entry animation for content blocks.
 * * 'stagger': Parent orchestration to delay children animations sequentially.
 */
export const VARIANTS = {
  fadeInUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  },
  stagger: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.2 } 
    }
  }
};