import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { storyConfig } from '../../data/storyConfig';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { HeartDoodle } from '../scrapbook/DecorativeElements';
import AnanyaName from '../effects/AnanyaName';
import { Heart, Eye } from 'lucide-react';

export default function FinalLetter() {
  const [showAllDirectly, setShowAllDirectly] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const letter = storyConfig.finalLetter;

  const shouldRevealInstantly = showAllDirectly || prefersReducedMotion;

  return (
    <section
      id="final-letter"
      className="relative min-h-screen py-24 px-4 sm:px-6 bg-[#EFE4D2] overflow-hidden flex items-center justify-center"
      aria-label="The Final Handwritten Letter"
    >
      {/* Darker warm vignette for emotional focus */}
      <div className="absolute inset-0 bg-radial-vignette opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-vintage-rose/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-2xl w-full mx-auto z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <span className="font-handwriting text-2xl text-vintage-rose tracking-wider block mb-1">
            chapter eight · the climax
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-vintage-wine">
            {letter.heading}
          </h2>
          <p className="font-serif italic text-base sm:text-lg text-vintage-ink/75 mt-2">
            {letter.subheading}
          </p>

          {!shouldRevealInstantly && (
            <button
              onClick={() => setShowAllDirectly(true)}
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-sans tracking-wider text-vintage-dusty hover:text-vintage-rose transition-colors py-1 px-3 rounded-full border border-vintage-champagne/40 bg-vintage-ivory/60"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{letter.readWholeButtonText}</span>
            </button>
          )}
        </motion.div>

        {/* The Vintage Handwritten Page */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="vintage-paper-sheet deckled-edge rounded-sm p-6 sm:p-10 md:p-14 relative shadow-paper-lift overflow-hidden"
        >
          {/* Top Washi Tapes (Dual Corners) */}
          <div className="washi-tape washi-tape-rose -top-3 left-8 w-28 -rotate-2" />
          <div className="washi-tape washi-tape-champagne -top-3 right-8 w-24 rotate-1" />

          {/* Pressed Dried Rose in bottom corner */}
          <div className="absolute bottom-4 right-4 pointer-events-none select-none opacity-85">
            <svg width="70" height="70" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="14" fill="#733E4B" opacity="0.9" />
              <circle cx="45" cy="46" r="9" fill="#A95366" opacity="0.85" />
              <circle cx="54" cy="52" r="8" fill="#C58B94" opacity="0.8" />
              <path d="M50 64 Q 52 85 45 96" stroke="#42322F" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
              <path d="M48 78 Q 30 70 38 84 Q 48 80 48 78" fill="#D6BE97" opacity="0.7"/>
            </svg>
          </div>

          {/* Salutation */}
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-vintage-wine mb-6">
            Dear <AnanyaName>Ananya</AnanyaName>,
          </h3>

          {/* Letter Paragraphs with line-by-line reveal */}
          <div className="space-y-4 font-serif text-base sm:text-lg text-vintage-ink/90 leading-relaxed">
            {letter.paragraphs.map((paragraph, idx) => {
              // Highlight placeholder tags in vintage blush so user knows to personalize them
              const hasPlaceholder = paragraph.includes('[WRITE') || paragraph.includes('[ACKNOWLEDGE');

              return (
                <motion.p
                  key={idx}
                  initial={shouldRevealInstantly ? false : { opacity: 0, y: 15 }}
                  whileInView={shouldRevealInstantly ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: shouldRevealInstantly ? 0 : 0.2 + idx * 0.15 }}
                  className={`indent-4 ${hasPlaceholder ? 'bg-vintage-blush/30 p-2 rounded border-l-2 border-vintage-rose' : ''}`}
                >
                  {paragraph}
                </motion.p>
              );
            })}
          </div>

          {/* Signature Block */}
          <motion.div
            initial={shouldRevealInstantly ? false : { opacity: 0 }}
            whileInView={shouldRevealInstantly ? {} : { opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: shouldRevealInstantly ? 0 : 1.6 }}
            className="mt-12 pt-6 border-t border-vintage-champagne/40 flex flex-col items-end"
          >
            <span className="font-serif italic text-sm text-vintage-ink/75">
              {letter.closing}
            </span>
            <span className="font-handwriting text-3xl sm:text-4xl text-vintage-wine mt-1.5 font-bold">
              {storyConfig.senderName}
            </span>
            <div className="mt-1">
              <HeartDoodle strokeColor="#A95366" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
