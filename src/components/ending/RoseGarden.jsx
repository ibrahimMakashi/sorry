import React from 'react';
import { motion } from 'framer-motion';
import { storyConfig } from '../../data/storyConfig';
import { RotateCcw, Heart, Sparkles, BookOpen } from 'lucide-react';
import AnanyaName from '../effects/AnanyaName';
import IbrahimName from '../effects/IbrahimName';
import confetti from 'canvas-confetti';

export default function RoseGarden({ onReplay }) {
  const surprise = storyConfig.finalSurprise;

  const triggerDelicatePetals = () => {
    try {
      confetti({
        particleCount: 28,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#F0D9D8', '#C58B94', '#A95366', '#D6BE97'],
        shapes: ['circle'],
        scalar: 1.2,
        gravity: 0.8,
        ticks: 200,
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <footer
      id="closing"
      className="relative min-h-[70vh] py-20 px-4 sm:px-6 bg-gradient-to-b from-vintage-paper via-[#F6ECE0] to-[#FAF6EE] flex flex-col items-center justify-center overflow-hidden text-center border-t border-vintage-champagne/40"
      aria-label="The Closing of a Keepsake"
    >
      <div className="relative max-w-xl mx-auto z-10">
        
        {/* Blossoming Rose Layered Illustration */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-36 h-36 sm:w-44 sm:h-44 mx-auto mb-6 cursor-pointer group"
          onClick={triggerDelicatePetals}
          title="Tap the rose for gentle petals"
        >
          <div className="absolute inset-0 rounded-full bg-vintage-rose/20 blur-xl group-hover:bg-vintage-rose/35 transition-all duration-500" />

          <svg viewBox="0 0 200 200" className="w-full h-full filter drop-shadow-md">
            <circle cx="100" cy="100" r="80" fill="none" stroke="#D6BE97" strokeWidth="1" strokeDasharray="4 4" opacity="0.6"/>
            
            <path d="M100 135 Q 102 175 92 195" stroke="#42322F" strokeWidth="3" strokeLinecap="round" opacity="0.75"/>
            <path d="M98 160 Q 65 150 75 170 Q 95 166 98 160" fill="#DECDB8" stroke="#42322F" strokeWidth="1.5" opacity="0.85"/>
            <path d="M100 150 Q 135 140 125 160 Q 105 156 100 150" fill="#DECDB8" stroke="#42322F" strokeWidth="1.5" opacity="0.85"/>

            <path d="M100 35 C65 35 45 70 55 105 C65 140 135 140 145 105 C155 70 135 35 100 35 Z" fill="#F0D9D8" opacity="0.95"/>
            <path d="M100 48 C75 48 60 75 68 100 C76 125 124 125 132 100 C140 75 125 48 100 48 Z" fill="#C58B94" opacity="0.9"/>
            <path d="M100 60 C82 60 72 80 78 100 C84 118 116 118 122 100 C128 80 118 60 100 60 Z" fill="#A95366" opacity="0.9"/>
            <path d="M100 72 C88 72 82 86 86 98 C90 110 110 110 114 98 C118 86 112 72 100 72 Z" fill="#733E4B"/>

            <circle cx="100" cy="88" r="8" fill="#522530"/>
            <path d="M96 86 Q 100 82 104 86 Q 100 92 96 86" stroke="#F4EBDD" strokeWidth="1.5" fill="none" opacity="0.8"/>
          </svg>

          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 font-handwriting text-xs text-vintage-rose opacity-80 whitespace-nowrap">
            (tap the rose for petals)
          </span>
        </motion.div>

        {/* Ending Heading */}
        <span className="font-handwriting text-2xl text-vintage-rose tracking-wider block mb-1">
          the closing of a keepsake
        </span>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-3xl sm:text-4xl font-bold text-vintage-wine mb-3"
        >
          {surprise.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-body text-base text-vintage-ink/80 max-w-md mx-auto leading-relaxed mb-6"
        >
          {surprise.supportingText}
        </motion.p>

        {/* Thank You Note */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="inline-block p-4 sm:p-5 rounded-lg bg-vintage-ivory/90 border border-vintage-champagne/70 shadow-paper mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-1.5">
            <Heart className="w-4 h-4 text-vintage-rose fill-vintage-rose/30" />
            <span className="font-serif font-bold text-xl sm:text-2xl text-vintage-wine">
              Thank you for being you, <AnanyaName>Ananya</AnanyaName>.
            </span>
            <Heart className="w-4 h-4 text-vintage-rose fill-vintage-rose/30" />
          </div>

          <span className="font-handwriting text-xl text-vintage-rose block font-semibold">
            — <IbrahimName>Ibrahim</IbrahimName>
          </span>
        </motion.div>

        {/* Replay Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col items-center gap-2"
        >
          <button
            onClick={onReplay}
            className="group inline-flex items-center gap-2 px-7 py-2.5 rounded-full bg-vintage-ivory hover:bg-vintage-paper text-vintage-wine font-sans font-medium text-xs tracking-widest uppercase border border-vintage-champagne/80 shadow-paper hover:shadow-paper-lg transition-all duration-300"
          >
            <RotateCcw className="w-3.5 h-3.5 transition-transform duration-500 group-hover:-rotate-180" />
            <span>{surprise.replayButtonText}</span>
          </button>
        </motion.div>
      </div>
    </footer>
  );
}
