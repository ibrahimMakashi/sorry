import React from 'react';
import { motion } from 'framer-motion';
import { storyConfig } from '../../data/storyConfig';
import { Heart, ChevronDown } from 'lucide-react';
import AnanyaName from '../effects/AnanyaName';

export default function CinematicHero({ onReadStory }) {
  const hero = storyConfig.hero;

  const scrollToNext = () => {
    if (onReadStory) {
      onReadStory();
    } else {
      const nextEl = document.getElementById('beginning');
      if (nextEl) nextEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 py-20 overflow-hidden bg-vintage-paper"
      aria-label="Cinematic Introduction"
    >
      {/* Warm Golden Hour & Romantic Gradient Atmosphere */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-vintage-blush/40 via-vintage-paper to-vintage-ivory pointer-events-none" 
      />

      {/* Subtle radial soft light bloom */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] h-[340px] sm:h-[600px] bg-vintage-champagne/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-vintage-dusty/15 rounded-full blur-[80px] pointer-events-none" />

      {/* Decorative Vintage Dried Rose Illustration */}
      <div className="absolute top-10 left-6 sm:left-12 opacity-35 pointer-events-none select-none">
        <svg width="80" height="120" viewBox="0 0 100 150" fill="none">
          <path d="M50 140 Q 55 90 40 40 Q 30 10 50 10 Q 70 10 60 40 Q 45 90 50 140" stroke="#C58B94" strokeWidth="1.5" strokeDasharray="3 3"/>
          <path d="M42 65 Q 15 50 25 75 Q 35 75 42 65" fill="#F0D9D8" stroke="#C58B94" strokeWidth="1"/>
          <path d="M58 85 Q 85 70 75 95 Q 65 95 58 85" fill="#F0D9D8" stroke="#C58B94" strokeWidth="1"/>
          <circle cx="50" cy="18" r="14" fill="#C58B94" opacity="0.6"/>
        </svg>
      </div>

      <div className="relative max-w-2xl mx-auto text-center z-10">
        
        {/* Top Tag Label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-vintage-ivory/80 border border-vintage-champagne/50 shadow-sm mb-6"
        >
          <Heart className="w-3.5 h-3.5 text-vintage-rose fill-vintage-rose/30" />
          <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-widest text-vintage-ink/80 uppercase">
            {hero.topLabel}
          </span>
        </motion.div>

        {/* Main Title "A Letter for Ananya" */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.4 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-vintage-wine tracking-tight mb-4"
        >
          A Letter for <AnanyaName>Ananya</AnanyaName>
        </motion.h1>

        {/* Handwritten Underline Stroke */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.7, ease: 'easeOut' }}
          className="w-28 sm:w-36 h-1 bg-vintage-dusty mx-auto mb-6 rounded-full opacity-80"
        />

        {/* Tagline / Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-serif italic text-xl sm:text-2xl md:text-3xl text-vintage-ink/90 font-medium leading-relaxed max-w-xl mx-auto mb-4"
        >
          "{hero.subtitle}"
        </motion.p>

        {/* Supporting Line */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="font-body text-base sm:text-lg text-vintage-ink/85 leading-relaxed max-w-lg mx-auto mb-10"
        >
          {hero.supportingLine}
        </motion.p>

        {/* CTA Button Group */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-col items-center gap-4"
        >
          <button
            onClick={scrollToNext}
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-vintage-wine text-vintage-ivory font-sans font-medium text-sm tracking-wider uppercase shadow-paper hover:shadow-paper-lift hover:bg-vintage-espresso transition-all duration-300"
          >
            <span>{hero.primaryCta}</span>
            <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
          </button>

          <span className="font-handwriting text-lg sm:text-xl text-vintage-dusty/90">
            {hero.reassurance}
          </span>
        </motion.div>
      </div>

      {/* Floating Gentle Scroll Arrow at bottom */}
      <div 
        onClick={scrollToNext}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
        aria-hidden="true"
      >
        <span className="font-handwriting text-sm text-vintage-ink/60">scroll gently</span>
        <ChevronDown className="w-4 h-4 text-vintage-dusty animate-bounce" />
      </div>
    </section>
  );
}
