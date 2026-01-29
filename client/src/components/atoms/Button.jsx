import React from 'react';

/**
 * Kairos UI: Atomic Button Component
 * * A highly reusable, themed button supporting multiple visual variants.
 * Designed with a premium, high-contrast aesthetic (Gold & Deep Green).
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content to be rendered inside the button (text or icons).
 * @param {Function} [props.onClick] - Optional click handler function.
 * @param {'primary' | 'secondary' | 'ghost'} [props.variant='primary'] - Visual style of the button.
 * @param {string} [props.className=''] - Additional Tailwind CSS classes for custom overrides.
 * @param {boolean} [props.disabled=false] - Disables interaction and applies muted styling.
 * @param {'button' | 'submit' | 'reset'} [props.type='button'] - Standard HTML button types.
 */
export const Button = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  disabled = false,
  type = 'button'
}) => {

  // Base structural styles: handles typography, spacing, and transitions
  const baseStyles = "font-bold uppercase tracking-[0.2em] text-[10px] transition-all py-4 md:py-5 px-8 md:px-12 active:scale-95";

  // Variant-specific styling logic
  const primaryStyles = `bg-[#d1b066] text-[#050b09] hover:bg-[#bfa05a] ${!disabled ? 'shadow-[0_10px_30px_-10px_rgba(209,176,102,0.3)]' : 'shadow-none'
    } disabled:bg-white/5 disabled:text-white/10`;

  const variants = {
    primary: primaryStyles,
    secondary: "bg-transparent border border-[#d1b066]/20 text-[#d1b066] hover:bg-[#d1b066]/10",
    ghost: "text-white/50 hover:text-[#d1b066] bg-transparent"
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};