import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function WaxSeal({ onClick, isOpen = false }) {
  return (
    <div className="relative flex items-center justify-center">
      {/* Animated pulsing ripple ring to draw attention and invite click */}
      {!isOpen && (
        <>
          <motion.span
            animate={{ scale: [1, 1.45], opacity: [0.65, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
            className="absolute -inset-1 rounded-full border-2 border-vintage-rose pointer-events-none"
          />
          <motion.span
            animate={{ scale: [1, 1.25], opacity: [0.4, 0] }}
            transition={{ duration: 2.2, delay: 0.6, repeat: Infinity, ease: 'easeOut' }}
            className="absolute -inset-2 rounded-full border border-vintage-champagne pointer-events-none"
          />
        </>
      )}

      <motion.button
        type="button"
        onClick={onClick}
        animate={
          isOpen
            ? {}
            : {
                scale: [1, 1.07, 1],
                boxShadow: [
                  "0 4px 14px rgba(115, 62, 75, 0.45)",
                  "0 6px 20px rgba(169, 83, 102, 0.6)",
                  "0 4px 14px rgba(115, 62, 75, 0.45)",
                ],
              }
        }
        transition={{
          duration: 2.4,
          repeat: isOpen ? 0 : Infinity,
          ease: "easeInOut",
        }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        className="wax-seal group focus:outline-none focus:ring-4 focus:ring-vintage-rose/30 relative z-10"
        aria-label="Break wax seal and open letter"
        title="Tap the wax seal to open"
      >
        <div className="wax-seal-inner">
          {/* Embossed Heart SVG with subtle shimmer */}
          <svg 
            viewBox="0 0 24 24" 
            className="w-5 h-5 text-vintage-paper fill-current opacity-90 drop-shadow-sm transition-transform duration-300 group-hover:scale-115"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>

        {/* Wax Droplet details around rim */}
        <span className="absolute -bottom-1 -right-0.5 w-3 h-3 rounded-full bg-[#733E4B] shadow-inner opacity-80" />
        <span className="absolute -top-1 left-2 w-2.5 h-2.5 rounded-full bg-[#8C4656] shadow-inner opacity-75" />
        <span className="absolute top-2 -left-1 w-2 h-2 rounded-full bg-[#522530] opacity-70" />
      </motion.button>

      {/* Floating subtle "Tap to open" badge */}
      {!isOpen && (
        <motion.div
          animate={{ y: [0, -3, 0], opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-7 pointer-events-none whitespace-nowrap bg-vintage-ivory/90 backdrop-blur-xs px-2 py-0.5 rounded-full border border-vintage-champagne/60 shadow-xs flex items-center gap-1"
        >
          <Sparkles className="w-2.5 h-2.5 text-vintage-rose" />
          <span className="font-handwriting text-[11px] text-vintage-wine font-semibold">tap to open</span>
        </motion.div>
      )}
    </div>
  );
}
