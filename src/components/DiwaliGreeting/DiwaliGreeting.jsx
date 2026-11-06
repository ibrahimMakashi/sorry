import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Heart } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useAudio } from '../../context/AudioContext';
import { trackInteraction } from '../../utils/analytics';
import AnanyaName from '../effects/AnanyaName';

/**
 * DiwaliGreeting Component
 * 
 * A cinematic Diwali greeting card that appears ~2.5 seconds after page load.
 * Independent of envelope state (works whether envelope is closed, opening, or opened).
 * Romantic scrapbook aesthetic with handcrafted SVG Diya, warm golden glow, and delicate details.
 */
export default function DiwaliGreeting() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { playSound } = useAudio();

  const timerRef = useRef(null);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    // Check if dismissed during this session
    try {
      if (sessionStorage.getItem('diwali_greeting_dismissed') === 'true') {
        return;
      }
    } catch {
      // safe fallback
    }

    if (hasTriggeredRef.current || isDismissed) {
      return;
    }

    // 2.5-second timer from initial website load
    timerRef.current = setTimeout(() => {
      hasTriggeredRef.current = true;
      setIsVisible(true);
      try {
        playSound('flowerBurst');
      } catch {}
      try {
        trackInteraction('diwali_greeting_shown');
      } catch {}
    }, 2500);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isDismissed, playSound]);

  // Handle escape key
  useEffect(() => {
    if (!isVisible) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleDismiss();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible]);

  const handleDismiss = () => {
    try {
      playSound('buttonClick');
    } catch {}
    try {
      trackInteraction('diwali_greeting_closed');
    } catch {}
    try {
      sessionStorage.setItem('diwali_greeting_dismissed', 'true');
    } catch {}
    setIsVisible(false);
    setIsDismissed(true);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div
          className="fixed inset-0 z-[75] flex items-center justify-center p-4 sm:p-6 bg-vintage-ink/40 backdrop-blur-[3.5px] select-none"
          onClick={handleDismiss}
          role="dialog"
          aria-modal="true"
          aria-label="Diwali Greeting for Ananya"
        >
          {/* Subtle Ambient Golden Particles in Background */}
          {!prefersReducedMotion && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 0.7, 0.4] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-1/4 left-1/3 w-72 h-72 rounded-full bg-amber-200/15 blur-3xl pointer-events-none"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.2, 0.6, 0.3] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-rose-300/15 blur-3xl pointer-events-none"
              />
            </div>
          )}

          {/* Cinematic Greeting Card Container */}
          <motion.div
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.94, y: 20, rotate: -1 }
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
                      duration: 0.75,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  }
            }
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    scale: 0.95,
                    y: 15,
                    transition: { duration: 0.55, ease: 'easeInOut' },
                  }
            }
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[420px] sm:max-w-[480px] md:max-w-[500px] bg-[#FAF6EE] text-vintage-ink rounded-2xl p-6 sm:p-8 md:p-9 shadow-[0_22px_60px_rgba(43,29,26,0.32),0_4px_20px_rgba(197,160,89,0.22)] border border-[#E4D5BE] overflow-hidden"
            style={{
              backgroundImage: 'radial-gradient(#E8DAC7 0.9px, transparent 0.9px)',
              backgroundSize: '20px 20px',
            }}
          >
            {/* Washi Tape Strip at Top Center (Vintage Champagne / Warm Gold) */}
            <div className="washi-tape washi-tape-champagne -top-3 left-1/2 -translate-x-1/2 w-32 sm:w-36 -rotate-1 shadow-sm" />

            {/* Accessible Close Button (✕) */}
            <button
              onClick={handleDismiss}
              className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 p-1.5 rounded-full text-vintage-dusty hover:text-vintage-rose hover:bg-vintage-champagne/25 transition-colors focus:outline-none focus:ring-1 focus:ring-vintage-rose/50 z-20"
              aria-label="Close Diwali greeting"
              title="Close greeting"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Decorative Top Festival Badge */}
            <div className="flex items-center justify-center mb-3 sm:mb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#F3EDE0] border border-[#DFCDB3] text-vintage-dusty text-[10px] sm:text-[11px] font-sans uppercase tracking-widest shadow-2xs">
                <Sparkles className="w-3 h-3 text-amber-500 animate-pulse" />
                <span className="text-amber-800/80 font-medium tracking-widest">Shubh Deepawali</span>
                <Sparkles className="w-3 h-3 text-amber-500 animate-pulse" />
              </div>
            </div>

            {/* Handcrafted Living Diya Lamp */}
            <div className="relative flex flex-col items-center justify-center my-1 sm:my-2">
              {/* Golden Ambient Halo Glow */}
              <motion.div
                animate={
                  prefersReducedMotion
                    ? {}
                    : {
                        scale: [1, 1.15, 0.95, 1.1, 1],
                        opacity: [0.55, 0.8, 0.5, 0.75, 0.55],
                      }
                }
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-3 w-20 h-20 rounded-full bg-gradient-to-t from-amber-500/25 via-amber-300/40 to-yellow-100/50 blur-lg pointer-events-none"
              />

              <svg
                width="72"
                height="56"
                viewBox="0 0 100 80"
                className="drop-shadow-md relative z-10"
                fill="none"
              >
                <defs>
                  {/* Flame Gradients */}
                  <linearGradient id="diwaliFlameInner" x1="0.5" y1="0" x2="0.5" y2="1">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="30%" stopColor="#FFF4B8" />
                    <stop offset="100%" stopColor="#FFA41C" />
                  </linearGradient>
                  <linearGradient id="diwaliFlameOuter" x1="0.5" y1="0" x2="0.5" y2="1">
                    <stop offset="0%" stopColor="#FFE082" />
                    <stop offset="45%" stopColor="#FF9800" />
                    <stop offset="100%" stopColor="#E65100" />
                  </linearGradient>
                  {/* Diya Base Gradient (Warm Terracotta with Burnished Gold Trim) */}
                  <linearGradient id="diwaliDiyaBody" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#D97A53" />
                    <stop offset="45%" stopColor="#B8532F" />
                    <stop offset="100%" stopColor="#7E2D18" />
                  </linearGradient>
                  <linearGradient id="diwaliGoldTrim" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#D4AF37" />
                    <stop offset="50%" stopColor="#FFF2C6" />
                    <stop offset="100%" stopColor="#D4AF37" />
                  </linearGradient>
                </defs>

                {/* Diya Ground Shadow */}
                <ellipse cx="50" cy="74" rx="34" ry="5" fill="#42322F" opacity="0.22" />

                {/* Diya Base Body */}
                <path
                  d="M14 48 C14 66 30 73 50 73 C70 73 86 66 86 48 C86 45 84 45 80 47 C70 52 30 52 20 47 C16 45 14 45 14 48 Z"
                  fill="url(#diwaliDiyaBody)"
                  stroke="#6B2513"
                  strokeWidth="1"
                />

                {/* Diya Rim / Opening */}
                <ellipse cx="50" cy="48" rx="36" ry="7.5" fill="#8A341C" />
                <ellipse cx="50" cy="48" rx="32" ry="5.5" fill="#6B2513" />
                {/* Oil surface */}
                <ellipse cx="50" cy="49" rx="27" ry="4" fill="#4A1C0E" />

                {/* Gold Filigree Ornamentation on rim */}
                <path
                  d="M17 48 Q 50 56 83 48"
                  stroke="url(#diwaliGoldTrim)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Delicate Gold Dots on Diya */}
                <circle cx="50" cy="62" r="1.8" fill="url(#diwaliGoldTrim)" />
                <circle cx="38" cy="60" r="1.4" fill="url(#diwaliGoldTrim)" />
                <circle cx="62" cy="60" r="1.4" fill="url(#diwaliGoldTrim)" />
                <circle cx="28" cy="56" r="1.2" fill="url(#diwaliGoldTrim)" />
                <circle cx="72" cy="56" r="1.2" fill="url(#diwaliGoldTrim)" />

                {/* Animated Warm Living Flame */}
                <motion.g
                  animate={
                    prefersReducedMotion
                      ? {}
                      : {
                          scaleY: [1, 1.08, 0.94, 1.05, 1],
                          scaleX: [1, 0.96, 1.04, 0.97, 1],
                          rotate: [-1.2, 1.2, -1.8, 1.8, -1.2],
                        }
                  }
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ transformOrigin: '50px 46px' }}
                >
                  {/* Outer Flame Teardrop */}
                  <path
                    d="M50 8 C43 22 36 34 38 43 C40 50 46 51 50 51 C54 51 60 50 62 43 C64 34 57 22 50 8 Z"
                    fill="url(#diwaliFlameOuter)"
                    opacity="0.95"
                  />
                  {/* Inner Flame Core */}
                  <path
                    d="M50 16 C46 25 42 34 44 42 C45 47 48 48 50 48 C52 48 55 47 56 42 C58 34 54 25 50 16 Z"
                    fill="url(#diwaliFlameInner)"
                  />
                  {/* Center Wick Bright Point */}
                  <ellipse cx="50" cy="42" rx="3.5" ry="5.5" fill="#FFFFFF" opacity="0.92" />
                </motion.g>
              </svg>
            </div>

            {/* Main Greeting Title */}
            <div className="text-center mt-2 mb-3">
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-vintage-wine tracking-tight">
                Happy Diwali, <AnanyaName>Ananya</AnanyaName> 🪔
              </h2>
            </div>

            {/* Greeting Body Paragraphs */}
            <div className="text-center space-y-3 font-serif text-sm sm:text-base text-vintage-ink/90 leading-relaxed px-1 sm:px-3">
              <p>
                May this Diwali bring you light, peace, happiness, and countless beautiful moments.
              </p>

              {/* Highlighted Emphasized Phrase */}
              <div className="py-1">
                <p className="font-handwriting text-lg sm:text-xl md:text-2xl text-vintage-rose font-bold leading-snug drop-shadow-[0_0_12px_rgba(214,190,151,0.55)]">
                  “Some lights brighten a room, and some memories brighten the heart.”
                </p>
              </div>

              <p className="font-medium text-vintage-wine/90">
                Wishing you a beautiful Diwali.
              </p>
            </div>

            {/* Subtle Divider */}
            <div className="w-16 h-px bg-vintage-champagne/50 mx-auto my-4" />

            {/* Optional Handwritten Secondary Line */}
            <div className="text-center">
              <p className="font-handwriting text-sm sm:text-base text-vintage-dusty italic">
                A little Diwali wish from me to you.
              </p>
            </div>

            {/* Action / Dismiss Button */}
            <div className="mt-5 flex justify-center">
              <button
                onClick={handleDismiss}
                className="px-6 py-2 rounded-full text-xs font-sans uppercase tracking-widest text-vintage-wine bg-vintage-champagne/25 hover:bg-vintage-champagne/45 border border-vintage-champagne/60 transition-all duration-300 shadow-2xs hover:scale-[1.02] focus:outline-none focus:ring-1 focus:ring-vintage-rose/50"
              >
                Continue to My Story &rarr;
              </button>
            </div>

            {/* Decorative Corner Floral / Sparkle Motifs */}
            <div className="absolute -bottom-2 -left-2 pointer-events-none opacity-20 text-vintage-dusty">
              <Sparkles className="w-8 h-8" />
            </div>
            <div className="absolute -bottom-2 -right-2 pointer-events-none opacity-20 text-vintage-dusty">
              <Sparkles className="w-8 h-8" />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
