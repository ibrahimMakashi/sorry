import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, X } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useAudio } from '../../context/AudioContext';
import AnanyaName from '../effects/AnanyaName';
import IbrahimName from '../effects/IbrahimName';

/**
 * RosiePopLetter
 * 
 * Pops up as an authentic handwritten keepsake letter delivered by Rosie
 * after ~4.5 seconds on the main screen.
 * 
 * Features:
 * - Genuine vintage parchment paper look with washi tape, delivery badge & dried flower.
 * - Distinct spring pop-up animation with soft blur backdrop.
 * - Exact quote with glowing rose-pink highlight.
 * - Coordinates with Rosie companion who announces: "A letter just for you! 💌".
 * - Session-guarded & visibility-aware.
 */
export default function RosiePopLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { playSound } = useAudio();

  const timerRef = useRef(null);
  const remainingTimeRef = useRef(4500); // 4.5 seconds
  const lastStartRef = useRef(null);

  useEffect(() => {
    // Check if already seen in this session or dismissed
    try {
      if (sessionStorage.getItem('rosie_popped_letter_seen') === 'true' || isDismissed) {
        return;
      }
    } catch {
      // safe fallback
    }

    const startTimer = () => {
      lastStartRef.current = Date.now();
      timerRef.current = setTimeout(() => {
        setIsOpen(true);
        try {
          playSound('paperUnfold');
        } catch {}
        // Notify Rosie companion on main screen to react with joy
        try {
          window.dispatchEvent(new CustomEvent('rosie_letter_popped'));
        } catch {}
        try {
          sessionStorage.setItem('rosie_popped_letter_seen', 'true');
        } catch {}
      }, remainingTimeRef.current);
    };

    const pauseTimer = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      if (lastStartRef.current) {
        const elapsed = Date.now() - lastStartRef.current;
        remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsed);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        pauseTimer();
      } else if (document.visibilityState === 'visible' && remainingTimeRef.current > 0 && !isOpen) {
        startTimer();
      }
    };

    if (document.visibilityState === 'visible') {
      startTimer();
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isOpen, isDismissed, playSound]);

  const handleClose = () => {
    try {
      playSound('buttonClick');
    } catch {}
    setIsOpen(false);
    setIsDismissed(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-vintage-ink/45 backdrop-blur-[4px] select-none"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-label="A special letter from Ibrahim delivered by Rosie"
        >
          {/* Main Letter Card */}
          <motion.div
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.78, y: 40, rotate: -3 }
            }
            animate={
              prefersReducedMotion
                ? { opacity: 1 }
                : {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    rotate: 0,
                    transition: {
                      type: 'spring',
                      stiffness: 260,
                      damping: 20,
                      mass: 0.9,
                    },
                  }
            }
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.82, y: 30, transition: { duration: 0.28 } }
            }
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[420px] sm:max-w-[490px] md:max-w-[530px] bg-[#FAF6EE] text-vintage-ink rounded-lg p-6 sm:p-9 md:p-10 shadow-[0_20px_50px_rgba(43,29,26,0.35)] border border-[#E2D2BC] overflow-hidden"
            style={{
              backgroundImage: 'radial-gradient(#E8DAC7 0.8px, transparent 0.8px)',
              backgroundSize: '18px 18px',
            }}
          >
            {/* Washi Tape Strip at Top Center */}
            <div className="washi-tape washi-tape-rose -top-3 left-1/2 -translate-x-1/2 w-32 sm:w-36 -rotate-1 shadow-sm" />

            {/* Close Button (✕) */}
            <button
              onClick={handleClose}
              className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 p-1.5 rounded-full text-vintage-dusty hover:text-vintage-rose hover:bg-vintage-champagne/25 transition-colors focus:outline-none focus:ring-1 focus:ring-vintage-rose/50 z-20"
              aria-label="Close letter"
              title="Close letter"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Postal Stamp / Delivery Badge by Rosie in Top-Right */}
            <div className="flex items-center justify-between border-b border-vintage-champagne/50 pb-3 mb-5 sm:mb-6 pr-8">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#F3EDE0] border border-[#DFCDB3] text-vintage-dusty text-[10px] sm:text-[11px] font-sans uppercase tracking-widest">
                <Sparkles className="w-3 h-3 text-vintage-rose" />
                <span>Special Delivery</span>
                <span className="w-1 h-1 rounded-full bg-vintage-rose/60" />
                <span className="text-vintage-rose font-medium">via Rosie 🌸</span>
              </div>

              {/* Little date / keepsake badge */}
              <div className="hidden sm:flex items-center gap-1 font-serif italic text-xs text-vintage-dusty">
                <span>keepsake note</span>
              </div>
            </div>

            {/* Salutation */}
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-vintage-wine mb-4 sm:mb-6 tracking-tight">
              Dear <AnanyaName>Ananya</AnanyaName>,
            </h3>

            {/* Letter Body — Exact Requested Content */}
            <div className="my-4 sm:my-6">
              <p className="font-handwriting text-xl sm:text-2xl md:text-[26px] text-vintage-ink leading-relaxed sm:leading-loose">
                and in the most selfish way possible,{' '}
                <span className="text-vintage-rose font-bold drop-shadow-[0_0_10px_rgba(217,114,134,0.45)] border-b-2 border-vintage-rose/30 pb-0.5 inline">
                  i hope nobody will admires you the way i do
                </span>
              </p>
            </div>

            {/* Sign-off */}
            <div className="mt-6 sm:mt-8 pt-4 border-t border-vintage-champagne/45 flex flex-col items-end">
              <span className="font-serif italic text-xs sm:text-sm text-vintage-ink/70">
                With all my heart,
              </span>
              <span className="font-handwriting text-2xl sm:text-3xl text-vintage-rose font-semibold mt-1">
                <IbrahimName>Ibrahim</IbrahimName> ♡
              </span>
            </div>

            {/* Subtle Pressed Flower Corner Motif */}
            <div className="absolute bottom-2 left-3 sm:bottom-3 sm:left-4 pointer-events-none opacity-25">
              <svg width="45" height="45" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="10" fill="#733E4B" />
                <ellipse cx="50" cy="30" rx="9" ry="16" fill="#C58B94" />
                <ellipse cx="50" cy="70" rx="9" ry="16" fill="#C58B94" />
                <ellipse cx="30" cy="50" rx="16" ry="9" fill="#F0D9D8" />
                <ellipse cx="70" cy="50" rx="16" ry="9" fill="#F0D9D8" />
              </svg>
            </div>

            {/* Action Button: Continue Reading */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleClose}
                className="px-5 py-2 rounded-full text-xs font-sans uppercase tracking-widest text-vintage-wine bg-vintage-blush/40 hover:bg-vintage-blush/70 border border-vintage-rose/30 transition-all duration-300 shadow-sm hover:scale-[1.02]"
              >
                Continue to My Story &rarr;
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
