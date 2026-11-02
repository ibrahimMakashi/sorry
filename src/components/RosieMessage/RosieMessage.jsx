import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, X } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useAudio } from '../../context/AudioContext';

/**
 * RosieMessage — Feature 2: Rosie Appears with a Special Animated Message
 * 
 * - Appears after ~4.5 seconds on the homepage (envelope screen).
 * - Pauses if document is hidden, cancels if user navigates or opens envelope.
 * - Shown once per homepage visit (guarded by sessionStorage).
 * - Displays exact message with highlighted phrase in soft rose-pink / burgundy glow.
 * - Scrapbook styling with Rosie mascot, floating mini-hearts, and dismiss button.
 */
export default function RosieMessage({
  envelopeState = 'closed',
  onDismiss,
  onVisibleChange,
  className = '',
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { playSound } = useAudio();

  const timerRef = useRef(null);
  const remainingTimeRef = useRef(4500); // 4.5 seconds
  const lastStartRef = useRef(null);

  useEffect(() => {
    // If envelope is opening/opened, or already dismissed
    if (envelopeState !== 'closed' || isDismissed) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      setIsVisible(false);
      if (onVisibleChange) onVisibleChange(false);
      return;
    }

    // Check sessionStorage
    try {
      if (sessionStorage.getItem('rosie_special_message_seen') === 'true') {
        return;
      }
    } catch (e) {
      // Fallback if sessionStorage is restricted
    }

    const startTimer = () => {
      lastStartRef.current = Date.now();
      timerRef.current = setTimeout(() => {
        setIsVisible(true);
        if (onVisibleChange) onVisibleChange(true);
        try {
          sessionStorage.setItem('rosie_special_message_seen', 'true');
        } catch (e) {}
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
      } else if (document.visibilityState === 'visible' && remainingTimeRef.current > 0 && !isVisible) {
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
  }, [envelopeState, isDismissed, isVisible, onVisibleChange]);

  const handleClose = (e) => {
    if (e) e.stopPropagation();
    try {
      playSound('buttonClick');
    } catch (err) {}
    setIsVisible(false);
    setIsDismissed(true);
    if (onVisibleChange) onVisibleChange(false);
    if (onDismiss) onDismiss();
  };

  if (!isVisible || envelopeState !== 'closed') {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <div
          className={`fixed inset-x-0 top-12 sm:top-14 md:top-16 z-40 flex justify-center px-4 pointer-events-none select-none ${className}`}
          role="region"
          aria-label="Special message from Rosie"
        >
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -20, scale: 0.94 }}
            animate={
              prefersReducedMotion
                ? { opacity: 1 }
                : {
                    opacity: 1,
                    y: [0, -6, 0],
                    scale: 1,
                    transition: {
                      y: {
                        duration: 3.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      },
                      opacity: { duration: 0.6 },
                      scale: { duration: 0.6 },
                    },
                  }
            }
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -15, scale: 0.92, transition: { duration: 0.4 } }}
            className="pointer-events-auto relative flex flex-col sm:flex-row items-center sm:items-start gap-3 bg-[#FFFDF9]/95 backdrop-blur-md px-5 py-4 sm:px-6 sm:py-5 rounded-2xl border border-vintage-champagne/60 shadow-[0_8px_30px_rgba(66,50,47,0.18)] max-w-[340px] sm:max-w-[460px] md:max-w-[500px]"
          >
            {/* Washi tape accent on top */}
            <div className="washi-tape washi-tape-rose -top-3 left-8 w-20 rotate-[-3deg] hidden sm:block" />

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 p-1.5 rounded-full text-vintage-ink/50 hover:text-vintage-rose hover:bg-vintage-champagne/20 transition-colors focus:outline-none focus:ring-1 focus:ring-vintage-rose/50"
              aria-label="Dismiss message"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Rosie Character Mascot */}
            <div className="relative flex-shrink-0 mt-1">
              <motion.div
                animate={
                  prefersReducedMotion
                    ? {}
                    : {
                        rotate: [-3, 3, -3],
                        scale: [1, 1.04, 1],
                      }
                }
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                className="w-14 h-14 sm:w-16 sm:h-16 relative"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-md">
                  <ellipse cx="50" cy="94" rx="26" ry="5" fill="#733E4B" opacity="0.18" />

                  {/* Left Wing */}
                  <motion.g
                    animate={prefersReducedMotion ? {} : { rotate: [-16, 18, -16], scaleY: [0.88, 1.12, 0.88] }}
                    transition={{ duration: 0.32, repeat: Infinity, ease: "easeInOut" }}
                    style={{ transformOrigin: "26px 42px" }}
                  >
                    <ellipse cx="16" cy="38" rx="16" ry="8.5" fill="#FFFBF5" stroke="#C5A059" strokeWidth="1.2" opacity="0.95" />
                  </motion.g>

                  {/* Right Wing */}
                  <motion.g
                    animate={prefersReducedMotion ? {} : { rotate: [16, -18, 16], scaleY: [0.88, 1.12, 0.88] }}
                    transition={{ duration: 0.32, repeat: Infinity, ease: "easeInOut" }}
                    style={{ transformOrigin: "74px 42px" }}
                  >
                    <ellipse cx="84" cy="38" rx="16" ry="8.5" fill="#FFFBF5" stroke="#C5A059" strokeWidth="1.2" opacity="0.95" />
                  </motion.g>

                  {/* Feet */}
                  <ellipse cx="40" cy="88" rx="8" ry="6" fill="#C58B94" stroke="#A95366" strokeWidth="0.8" />
                  <ellipse cx="60" cy="88" rx="8" ry="6" fill="#C58B94" stroke="#A95366" strokeWidth="0.8" />

                  {/* Body */}
                  <circle cx="50" cy="54" r="34" fill="url(#rosieSpecialGradient)" stroke="#C58B94" strokeWidth="1.6" />

                  {/* Cheeks */}
                  <ellipse cx="32" cy="58" rx="7" ry="4" fill="#D97286" opacity="0.75" />
                  <ellipse cx="68" cy="58" rx="7" ry="4" fill="#D97286" opacity="0.75" />

                  {/* Eyes */}
                  <circle cx="36" cy="49" r="4" fill="#3B2629" />
                  <circle cx="38" cy="47" r="1.6" fill="#FFFFFF" />
                  <circle cx="35" cy="51" r="0.7" fill="#FFFFFF" />

                  <circle cx="64" cy="49" r="4" fill="#3B2629" />
                  <circle cx="66" cy="47" r="1.6" fill="#FFFFFF" />
                  <circle cx="63" cy="51" r="0.7" fill="#FFFFFF" />

                  {/* Sweet Smile */}
                  <path d="M44 57 Q50 64 56 57" stroke="#3B2629" strokeWidth="2.4" strokeLinecap="round" fill="none" />

                  {/* Hair / flower curl */}
                  <circle cx="34" cy="24" r="5.5" fill="#F8E7E7" stroke="#C58B94" strokeWidth="1" />
                  <circle cx="34" cy="24" r="2.2" fill="#733E4B" />

                  <defs>
                    <linearGradient id="rosieSpecialGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FFFDFC" />
                      <stop offset="50%" stopColor="#FCE4E7" />
                      <stop offset="100%" stopColor="#EAA8B4" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Floating mini hearts and sparkles around Rosie */}
                <motion.div
                  animate={prefersReducedMotion ? {} : { y: [-2, -7, -2], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-1 -right-1"
                >
                  <Sparkles className="w-3.5 h-3.5 text-vintage-rose animate-pulse" />
                </motion.div>
                <motion.div
                  animate={prefersReducedMotion ? {} : { y: [1, -5, 1], scale: [0.9, 1.15, 0.9], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                  className="absolute -bottom-1 -left-1"
                >
                  <Heart className="w-3 h-3 text-vintage-rose fill-vintage-rose/60" />
                </motion.div>
              </motion.div>
            </div>

            {/* Speech / Scrapbook Message Content */}
            <div className="flex-1 pr-4 sm:pr-6 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 mb-1 text-[11px] font-sans uppercase tracking-wider text-vintage-rose/80 font-medium">
                <span>Rosie's whisper</span>
                <span className="w-1 h-1 rounded-full bg-vintage-rose/60" />
                <span>from the heart</span>
              </div>

              {/* Exact user requested message with highlighted quote */}
              <p className="font-handwriting text-base sm:text-lg md:text-xl text-vintage-ink leading-relaxed">
                and in the most selfish way possible,{' '}
                <span className="text-vintage-wine font-semibold text-vintage-rose drop-shadow-[0_0_8px_rgba(217,114,134,0.45)] border-b border-vintage-rose/30 pb-0.5 inline">
                  i hope nobody will admires you the way i do
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
