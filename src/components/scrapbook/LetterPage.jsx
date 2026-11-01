import React from 'react';
import { motion } from 'framer-motion';
import { storyConfig } from '../../data/storyConfig';
import AnanyaName from '../effects/AnanyaName';

export default function LetterPage() {
  const intro = storyConfig.introLetter;

  return (
    <section
      id="letter-page"
      className="relative min-h-screen py-24 px-4 sm:px-6 flex items-center justify-center bg-vintage-paper bg-vintage-paper overflow-hidden"
      aria-label="Introductory Letter"
    >
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-vintage-blush/25 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-xl w-full mx-auto z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <span className="font-handwriting text-2xl text-vintage-rose tracking-wider block mb-1">
            chapter one
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-vintage-wine">
            {intro.title}
          </h2>
          <p className="font-serif italic text-base sm:text-lg text-vintage-ink/70 mt-2">
            {intro.subtitle}
          </p>
        </motion.div>

        {/* Vintage Diary Page Paper Sheet */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: -2 }}
          whileInView={{ opacity: 1, y: 0, rotate: -0.8 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="vintage-paper-sheet deckled-edge rounded-sm p-6 sm:p-10 md:p-12 relative overflow-hidden"
        >
          {/* Washi tape at top */}
          <div className="washi-tape washi-tape-champagne -top-3 left-1/2 -translate-x-1/2 w-32 -rotate-1" />

          {/* Pressed Flower in Top-Right Corner */}
          <div className="absolute top-4 right-4 pointer-events-none select-none opacity-85">
            <svg width="60" height="60" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="10" fill="#733E4B" opacity="0.8" />
              <ellipse cx="50" cy="30" rx="9" ry="16" fill="#C58B94" opacity="0.75" />
              <ellipse cx="50" cy="70" rx="9" ry="16" fill="#C58B94" opacity="0.75" />
              <ellipse cx="30" cy="50" rx="16" ry="9" fill="#F0D9D8" opacity="0.8" />
              <ellipse cx="70" cy="50" rx="16" ry="9" fill="#F0D9D8" opacity="0.8" />
              <circle cx="50" cy="50" r="5" fill="#D6BE97" />
              {/* Stem */}
              <path d="M50 70 Q 55 90 48 98" stroke="#493D38" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
            </svg>
          </div>

          {/* Faint Postal Stamp in Top-Left */}
          <div className="inline-flex items-center gap-2 border border-vintage-dusty/40 rounded px-2.5 py-1 mb-6 bg-vintage-ivory/90">
            <span className="text-[10px] uppercase font-sans tracking-widest text-vintage-dusty">
              Date:
            </span>
            <span className="font-handwriting text-sm text-vintage-ink">
              {intro.datePlaceholder}
            </span>
          </div>

          {/* Letter Salutation */}
          <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-vintage-wine mb-6">
            Dear <AnanyaName>Ananya</AnanyaName>,
          </h3>

          {/* Letter Body Paragraphs */}
          <div className="space-y-4 font-serif text-base sm:text-lg text-vintage-ink/90 leading-relaxed">
            {intro.paragraphs.map((para, idx) => (
              <p key={idx} className="indent-4">
                {para}
              </p>
            ))}
          </div>

          {/* Signoff */}
          <div className="mt-8 pt-4 border-t border-vintage-champagne/40 flex flex-col items-end">
            <span className="font-serif italic text-sm text-vintage-ink/70">
              {intro.closing}
            </span>
            <span className="font-handwriting text-2xl sm:text-3xl text-vintage-rose mt-1 font-semibold">
              {storyConfig.senderName}
            </span>
          </div>

          {/* Decorative faint stamp at bottom corner */}
          <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full border-2 border-dashed border-vintage-rose/20 flex items-center justify-center -rotate-12 pointer-events-none">
            <span className="font-sans text-[9px] uppercase tracking-widest text-vintage-rose/30">
              Sincere Words
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
