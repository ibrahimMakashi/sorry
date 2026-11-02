import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '../../context/AudioContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Sparkles, Heart, X } from 'lucide-react';

export default function ScrapbookCompanion({ currentChapter = 'hero' }) {
  const { playSound } = useAudio();
  const prefersReducedMotion = useReducedMotion();
  const [bubbleText, setBubbleText] = useState("Hi, Ananya! ♡");
  const [showBubble, setShowBubble] = useState(true);
  const [showSpecialWhisper, setShowSpecialWhisper] = useState(false);
  const [isJump, setIsJump] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const mainTimerRef = useRef(null);
  const remainingTimeRef = useRef(4500); // 4.5 seconds after landing on main screen
  const lastStartRef = useRef(null);

  // 4.5s Timer on Main Screen to reveal the special animated message with a distinct spring-bloom animation
  useEffect(() => {
    try {
      if (sessionStorage.getItem('rosie_main_message_seen') === 'true') {
        return;
      }
    } catch {
      // safe fallback
    }

    const startMainTimer = () => {
      lastStartRef.current = Date.now();
      mainTimerRef.current = setTimeout(() => {
        setIsHidden(false); // Make sure Rosie is visible
        setShowSpecialWhisper(true);
        setShowBubble(false); // suppress tiny generic bubble
        setIsJump(true);
        setTimeout(() => setIsJump(false), 600);
        try {
          playSound('flowerBurst');
        } catch {}
        try {
          sessionStorage.setItem('rosie_main_message_seen', 'true');
        } catch {}
      }, remainingTimeRef.current);
    };

    const pauseMainTimer = () => {
      if (mainTimerRef.current) {
        clearTimeout(mainTimerRef.current);
        mainTimerRef.current = null;
      }
      if (lastStartRef.current) {
        const elapsed = Date.now() - lastStartRef.current;
        remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsed);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        pauseMainTimer();
      } else if (document.visibilityState === 'visible' && remainingTimeRef.current > 0 && !showSpecialWhisper) {
        startMainTimer();
      }
    };

    if (document.visibilityState === 'visible') {
      startMainTimer();
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (mainTimerRef.current) {
        clearTimeout(mainTimerRef.current);
        mainTimerRef.current = null;
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [showSpecialWhisper, playSound]);

  // Contextual messages per chapter of the story
  useEffect(() => {
    let msg = "";
    if (currentChapter === 'hero') {
      msg = "Hi, Ananya! ♡";
    } else if (currentChapter === 'beginning') {
      msg = "Where it all began at Bosch...";
    } else if (currentChapter === 'bosch-memories') {
      msg = "March 2024... unforgettable days.";
    } else if (currentChapter === 'evening') {
      msg = "A quiet room, thinking back...";
    } else if (currentChapter === 'dreams') {
      msg = "A memory preserved in dreams ✨";
    } else if (currentChapter === 'message-2026') {
      msg = "Two and a half years later 💌";
    } else if (currentChapter === 'unanswered-feelings') {
      msg = "Honesty and deep respect...";
    } else if (currentChapter === 'reflection') {
      msg = "Take your time... no rush at all ♡";
    } else if (currentChapter === 'apology-letter') {
      msg = "Words I wanted to say...";
    } else if (currentChapter === 'voice-note') {
      msg = "Listening quietly...";
    } else if (currentChapter === 'final-letter') {
      msg = "This page is special...";
    } else if (currentChapter === 'closing') {
      msg = "Thank you for reading, Ananya! 🌸";
    }

    if (msg) {
      setBubbleText(msg);
      // Only show small generic bubble if special whisper is not actively open
      if (!showSpecialWhisper) {
        setShowBubble(true);
        const timer = setTimeout(() => {
          setShowBubble(false);
        }, 4200);
        return () => clearTimeout(timer);
      }
    }
  }, [currentChapter, showSpecialWhisper]);

  // Click interaction on character
  const handleTap = (e) => {
    e.stopPropagation();
    playSound('characterPop');
    setIsJump(true);
    setTimeout(() => setIsJump(false), 450);

    const randomPhrases = [
      "I'm here with you! ♡",
      "Take all the time you need.",
      "A little flower for you 🌸",
      "I mean every word.",
      "Thank you for reading this story ♡",
      "and in the most selfish way possible, i hope nobody will admires you the way i do ♡"
    ];
    const picked = randomPhrases[Math.floor(Math.random() * randomPhrases.length)];
    setBubbleText(picked);
    setShowBubble(true);
    setTimeout(() => setShowBubble(false), 4000);
  };

  const showHeadphones = currentChapter === 'voice-note';
  const showFlower = currentChapter === 'dreams' || currentChapter === 'beginning';
  const showHeart = currentChapter === 'final-letter';
  const isCelebratory = currentChapter === 'closing';

  if (isHidden) {
    return (
      <button
        onClick={() => setIsHidden(false)}
        className="fixed bottom-14 right-4 z-40 p-2 rounded-full bg-vintage-ivory/85 border border-vintage-champagne/80 text-vintage-dusty hover:text-vintage-rose shadow-md text-xs font-serif flex items-center gap-1 backdrop-blur-sm"
        title="Show cute companion"
      >
        <span className="text-sm">🌸</span>
        <span className="text-[10px]">Show Rosie</span>
      </button>
    );
  }

  return (
    <div
      className="fixed bottom-12 right-4 sm:right-6 z-40 select-none pointer-events-auto"
      aria-label="Cute companion character"
    >
      <div className="relative flex flex-col items-end">
        {/* SPECIAL ANIMATED WHISPER ON MAIN SCREEN — Spring bloom & tilt entrance */}
        <AnimatePresence>
          {showSpecialWhisper && (
            <motion.div
              initial={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 45, x: 15, scale: 0.75, rotate: 5 }
              }
              animate={
                prefersReducedMotion
                  ? { opacity: 1 }
                  : {
                      opacity: 1,
                      y: 0,
                      x: 0,
                      scale: 1,
                      rotate: 0,
                      transition: {
                        type: 'spring',
                        stiffness: 240,
                        damping: 18,
                        mass: 0.8,
                      },
                    }
              }
              exit={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      y: 25,
                      scale: 0.85,
                      transition: { duration: 0.28 },
                    }
              }
              className="mb-3 max-w-[280px] sm:max-w-[340px] md:max-w-[380px] bg-[#FFFDF9]/98 backdrop-blur-md px-4 py-3.5 sm:px-5 sm:py-4 rounded-2xl rounded-br-xs border border-vintage-champagne/90 shadow-[0_12px_36px_rgba(66,50,47,0.22)] relative text-left pointer-events-auto"
              style={{
                transformOrigin: 'bottom right',
              }}
            >
              {/* Top Rose Washi Tape Accent */}
              <div className="washi-tape washi-tape-rose -top-2.5 right-6 w-16 rotate-[2.5deg]" />

              {/* Close Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playSound('buttonClick');
                  setShowSpecialWhisper(false);
                }}
                className="absolute top-2 right-2 p-1 rounded-full text-vintage-ink/40 hover:text-vintage-rose hover:bg-vintage-champagne/20 transition-colors focus:outline-none focus:ring-1 focus:ring-vintage-rose/50"
                aria-label="Dismiss message"
                title="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              {/* Header with Sparkles */}
              <div className="inline-flex items-center gap-1.5 mb-1.5 text-[10px] sm:text-[11px] font-sans uppercase tracking-wider text-vintage-rose font-medium">
                <Sparkles className="w-3 h-3 text-vintage-rose animate-spin-slow" />
                <span>Rosie's whisper ♡</span>
              </div>

              {/* Exact message content with highlighted quote */}
              <p className="font-handwriting text-base sm:text-lg text-vintage-ink leading-relaxed pr-3">
                and in the most selfish way possible,{' '}
                <span className="text-vintage-wine font-semibold text-vintage-rose drop-shadow-[0_0_8px_rgba(217,114,134,0.45)] border-b border-vintage-rose/30 pb-0.5 inline">
                  i hope nobody will admires you the way i do
                </span>
              </p>

              {/* Speech Pointer pointing down right toward Rosie */}
              <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-[#FFFDF9] rotate-45 border-r border-b border-vintage-champagne/90" />

              {/* Rising Mini Hearts from Rosie */}
              {!prefersReducedMotion && (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 5, scale: 0.5 }}
                    animate={{
                      opacity: [0, 1, 0],
                      y: [-5, -35],
                      x: [0, -12],
                      scale: [0.6, 1.1, 0.9],
                    }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      ease: 'easeOut',
                      delay: 0.2,
                    }}
                    className="absolute -top-3 right-8 pointer-events-none"
                  >
                    <Heart className="w-3.5 h-3.5 text-vintage-rose fill-vintage-rose/70" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 5, scale: 0.5 }}
                    animate={{
                      opacity: [0, 1, 0],
                      y: [0, -42],
                      x: [0, 10],
                      scale: [0.5, 1, 0.8],
                    }}
                    transition={{
                      duration: 2.8,
                      repeat: Infinity,
                      ease: 'easeOut',
                      delay: 1.0,
                    }}
                    className="absolute -top-2 right-2 pointer-events-none"
                  >
                    <Heart className="w-2.5 h-2.5 text-vintage-dusty fill-vintage-dusty/60" />
                  </motion.div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Standard Contextual Speech Bubble (only when special whisper is not showing) */}
        <AnimatePresence>
          {showBubble && !showSpecialWhisper && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="mb-2 max-w-[190px] sm:max-w-[220px] bg-vintage-ivory/95 backdrop-blur-md px-3.5 py-2 rounded-2xl rounded-br-xs border border-vintage-champagne/70 shadow-paper text-vintage-ink text-xs font-serif italic text-right relative pointer-events-none"
            >
              <p className="leading-snug">{bubbleText}</p>
              <div className="absolute -bottom-1.5 right-4 w-3 h-3 bg-vintage-ivory rotate-45 border-r border-b border-vintage-champagne/70" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mascot Body */}
        <div className="relative group cursor-pointer" onClick={handleTap}>
          <motion.div
            animate={
              isJump
                ? { y: [-15, 0], scale: [1.15, 1], rotate: [-8, 8, 0] }
                : isCelebratory
                ? { y: [0, -5, 0], rotate: [-4, 4, -4] }
                : { y: [0, -3, 0] }
            }
            transition={{
              duration: isJump ? 0.4 : isCelebratory ? 1.4 : 3.0,
              repeat: isJump ? 0 : Infinity,
              ease: "easeInOut",
            }}
            className="w-14 h-14 sm:w-16 sm:h-16 relative"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-md">
              <ellipse cx="50" cy="94" rx="28" ry="6" fill="#42322F" opacity="0.15" />

              <ellipse cx="40" cy="88" rx="8" ry="6" fill="#C58B94" />
              <ellipse cx="60" cy="88" rx="8" ry="6" fill="#C58B94" />

              <circle cx="50" cy="54" r="36" fill="url(#rosieGradientScrapbook)" stroke="#C58B94" strokeWidth="1.2" />

              <ellipse cx="32" cy="58" rx="6" ry="3.5" fill="#C58B94" opacity="0.65" />
              <ellipse cx="68" cy="58" rx="6" ry="3.5" fill="#C58B94" opacity="0.65" />

              <circle cx="36" cy="50" r="3.5" fill="#42322F" />
              <circle cx="37.5" cy="48.5" r="1.2" fill="#FFFFFF" />

              <circle cx="64" cy="50" r="3.5" fill="#42322F" />
              <circle cx="65.5" cy="48.5" r="1.2" fill="#FFFFFF" />

              <path
                d="M45 58 Q50 63 55 58"
                stroke="#42322F"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />

              <path
                d="M17 56 Q10 46 16 38"
                stroke="#C58B94"
                strokeWidth="3.6"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M83 56 Q90 52 86 44"
                stroke="#C58B94"
                strokeWidth="3.6"
                strokeLinecap="round"
                fill="none"
              />

              <circle cx="34" cy="24" r="5" fill="#F0D9D8" stroke="#C58B94" strokeWidth="1" />
              <circle cx="34" cy="24" r="2" fill="#A95366" />

              {showHeadphones && (
                <g>
                  <path d="M22 52 Q50 16 78 52" stroke="#733E4B" strokeWidth="3" fill="none" />
                  <rect x="18" y="46" width="7" height="14" rx="3.5" fill="#733E4B" />
                  <rect x="75" y="46" width="7" height="14" rx="3.5" fill="#733E4B" />
                </g>
              )}

              {showFlower && (
                <g transform="translate(68, 48)">
                  <line x1="0" y1="12" x2="0" y2="0" stroke="#42322F" strokeWidth="1.5" />
                  <circle cx="0" cy="0" r="4.5" fill="#F0D9D8" />
                  <circle cx="0" cy="0" r="2" fill="#A95366" />
                </g>
              )}

              {showHeart && (
                <g transform="translate(43, 62) scale(0.65)">
                  <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    fill="#A95366"
                  />
                </g>
              )}

              <defs>
                <linearGradient id="rosieGradientScrapbook" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFFDFC" />
                  <stop offset="50%" stopColor="#FCE4E7" />
                  <stop offset="100%" stopColor="#EAA8B4" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsHidden(true);
            }}
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-vintage-dusty/70 hover:bg-vintage-rose text-white text-[9px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            title="Hide companion"
            aria-label="Hide companion"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
