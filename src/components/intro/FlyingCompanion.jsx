import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '../../context/AudioContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Sparkles, Heart } from 'lucide-react';

export default function FlyingCompanion({ envelopeState = 'closed' }) {
  const { playSound } = useAudio();
  const prefersReducedMotion = useReducedMotion();
  const [bubbleText, setBubbleText] = useState("I want to say something to you... ♡");
  const [bubbleSubtext, setBubbleSubtext] = useState("I am truly sorry, Ananya 🌸");
  const [isSpinning, setIsSpinning] = useState(false);
  const [showBubble, setShowBubble] = useState(true);

  const isOpened = envelopeState === 'opened' || envelopeState === 'transitioning';

  useEffect(() => {
    if (envelopeState === 'closed') {
      setBubbleText("I want to say something to you... ♡");
      setBubbleSubtext("I am truly sorry, Ananya 🌸");
      setShowBubble(true);
    } else if (envelopeState === 'opening') {
      setBubbleText("I wrote this message from my heart... 💌");
      setBubbleSubtext("Please take your time reading...");
      setShowBubble(true);
    } else if (envelopeState === 'opened') {
      setBubbleText("I am deeply sorry, Ananya... ♡");
      setBubbleSubtext("Please read my letter 💌");
      setShowBubble(true);
      const timer = setTimeout(() => setShowBubble(false), 9000);
      return () => clearTimeout(timer);
    }
  }, [envelopeState]);

  const handleTap = (e) => {
    e.stopPropagation();
    playSound('characterPop');
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 600);

    const phrases = [
      { text: "I want to say I'm truly sorry... ♡", sub: "Every word comes from my heart 🌸" },
      { text: "I am sorry for making you feel uncomfortable... ♡", sub: "I respect you deeply ✨" },
      { text: "I wrote this letter with honesty & sincerity 💌", sub: "Take all the time you need ♡" },
      { text: "I am sorry, Ananya... please read my letter ♡", sub: "No rush or pressure at all 🌸" },
      { text: "I truly value you and respect your answer ♡", sub: "Forever grateful for you ✨" },
    ];
    const picked = phrases[Math.floor(Math.random() * phrases.length)];
    setBubbleText(picked.text);
    setBubbleSubtext(picked.sub);
    setShowBubble(true);
  };

  /* ── Mascot SVG ── shared between both states */
  const MascotBody = (
    <motion.div
      animate={
        isSpinning
          ? { rotate: 360, scale: [1, 1.25, 1] }
          : { scale: [1, 1.05, 1] }
      }
      transition={{
        duration: isSpinning ? 0.6 : 2.5,
        repeat: isSpinning ? 0 : Infinity,
        ease: "easeInOut",
      }}
      className="w-14 h-14 sm:w-16 sm:h-16 relative flex-shrink-0"
    >
      <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-lg">
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

        <ellipse cx="40" cy="88" rx="8" ry="6" fill="#C58B94" stroke="#A95366" strokeWidth="0.8" />
        <ellipse cx="60" cy="88" rx="8" ry="6" fill="#C58B94" stroke="#A95366" strokeWidth="0.8" />

        <circle cx="50" cy="54" r="34" fill="url(#flyingRosieVibrantGradient)" stroke="#C58B94" strokeWidth="1.6" />

        <ellipse cx="32" cy="58" rx="7" ry="4" fill="#D97286" opacity="0.75" />
        <ellipse cx="68" cy="58" rx="7" ry="4" fill="#D97286" opacity="0.75" />

        <circle cx="36" cy="49" r="4" fill="#3B2629" />
        <circle cx="38" cy="47" r="1.6" fill="#FFFFFF" />
        <circle cx="35" cy="51" r="0.7" fill="#FFFFFF" />

        <circle cx="64" cy="49" r="4" fill="#3B2629" />
        <circle cx="66" cy="47" r="1.6" fill="#FFFFFF" />
        <circle cx="63" cy="51" r="0.7" fill="#FFFFFF" />

        <path d="M44 57 Q50 64 56 57" stroke="#3B2629" strokeWidth="2.4" strokeLinecap="round" fill="none" />

        <motion.path
          animate={prefersReducedMotion ? {} : { rotate: [-10, 15, -10] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "18px 56px" }}
          d="M18 56 Q10 44 16 36"
          stroke="#C58B94"
          strokeWidth="3.6"
          strokeLinecap="round"
          fill="none"
        />
        <path d="M82 56 Q88 50 84 42" stroke="#C58B94" strokeWidth="3.6" strokeLinecap="round" fill="none" />

        <circle cx="34" cy="24" r="5.5" fill="#F8E7E7" stroke="#C58B94" strokeWidth="1" />
        <circle cx="34" cy="24" r="2.2" fill="#733E4B" />

        <defs>
          <linearGradient id="flyingRosieVibrantGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFDFC" />
            <stop offset="50%" stopColor="#FCE4E7" />
            <stop offset="100%" stopColor="#EAA8B4" />
          </linearGradient>
        </defs>
      </svg>

      <Sparkles className="w-3 h-3 text-vintage-rose absolute -top-1 -right-1 animate-pulse pointer-events-none" />
      <Heart className="w-2.5 h-2.5 text-vintage-rose fill-vintage-rose/50 absolute -bottom-1 -left-1 pointer-events-none" />
    </motion.div>
  );

  /* ── Speech bubble content ── shared */
  const BubbleContent = ({ align = 'center', pointerSide = 'bottom-center' }) => (
    <AnimatePresence>
      {showBubble && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className={`max-w-[200px] sm:max-w-[240px] bg-[#FDFBF7] px-3 py-2 rounded-2xl border border-[#D6BE97] shadow-paper-lift relative pointer-events-none text-${align}`}
          style={{
            borderBottomLeftRadius: pointerSide === 'bottom-left' ? '4px' : undefined,
            borderBottomRightRadius: pointerSide === 'bottom-right' ? '4px' : undefined,
          }}
        >
          <p className="leading-snug text-vintage-wine font-semibold text-[11px] sm:text-xs">
            {bubbleText}
          </p>
          {bubbleSubtext && (
            <p className="font-handwriting text-vintage-rose text-[11px] sm:text-xs mt-0.5">
              {bubbleSubtext}
            </p>
          )}
          {/* Pointer triangle at the bottom pointing down toward Rosie */}
          {pointerSide === 'bottom-center' && (
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#FDFBF7] rotate-45 border-r border-b border-[#D6BE97]" />
          )}
          {pointerSide === 'bottom-right' && (
            <div className="absolute -bottom-1.5 right-4 w-3 h-3 bg-[#FDFBF7] rotate-45 border-r border-b border-[#D6BE97]" />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );

  /* ════════════════════════════════════════════
     CLOSED STATE — character flies across top,
     bubble sits ABOVE it so it looks like speech
     ════════════════════════════════════════════ */
  if (!isOpened) {
    return (
      <div className="fixed inset-x-0 top-10 sm:top-12 flex justify-center pointer-events-none z-35">
        <motion.div
          animate={
            prefersReducedMotion
              ? {}
              : {
                  x: [-75, -25, 55, 80, 20, -50, -75],
                  y: [0, -12, 10, -6, 12, -4, 0],
                  rotate: [-4, 5, -3, 5, -4, 4, -4],
                }
          }
          transition={{ duration: 8.0, repeat: Infinity, ease: "easeInOut" }}
          className="relative pointer-events-auto flex flex-col items-center cursor-pointer select-none"
          onClick={handleTap}
          title="Tap Rosie!"
          aria-label="Rosie the companion"
        >
          {/* ✅ Bubble ABOVE Rosie — pointer pointing DOWN toward her */}
          <BubbleContent align="center" pointerSide="bottom-center" />

          {/* Small gap so the pointer tip doesn't merge into Rosie */}
          <div className="h-2" />

          {MascotBody}
        </motion.div>
      </div>
    );
  }

  /* ════════════════════════════════════════════
     OPENED STATE — centered at the bottom of the
     screen below the letter, bubble still above
     ════════════════════════════════════════════ */
  return (
    <div className="fixed bottom-6 inset-x-0 flex justify-center pointer-events-none z-35">
      <motion.div
        animate={
          prefersReducedMotion
            ? {}
            : { y: [0, -6, 0], rotate: [-2, 2, -2] }
        }
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="relative pointer-events-auto flex flex-col items-center cursor-pointer select-none"
        onClick={handleTap}
        title="Tap Rosie!"
        aria-label="Rosie the companion"
      >
        {/* ✅ Bubble ABOVE Rosie when envelope is opened too */}
        <BubbleContent align="center" pointerSide="bottom-center" />

        <div className="h-2" />

        {MascotBody}
      </motion.div>
    </div>
  );
}
