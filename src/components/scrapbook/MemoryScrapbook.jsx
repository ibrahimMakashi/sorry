import React from 'react';
import { motion } from 'framer-motion';
import { memories, editorialAccents } from '../../data/memories';
import PolaroidCard from './PolaroidCard';
import { PressedFlower, HeartDoodle } from './DecorativeElements';

export default function MemoryScrapbook() {
  return (
    <section
      id="scrapbook"
      className="relative min-h-screen py-24 px-4 sm:px-6 md:px-8 bg-vintage-paper overflow-hidden"
      aria-label="Memory Scrapbook"
    >
      {/* Decorative ambient stains & soft lights */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-vintage-blush/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-vintage-champagne/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-handwriting text-2xl text-vintage-rose tracking-wider block mb-1">
            chapter two
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-vintage-wine">
            Little Moments, Beautiful Memories
          </h2>
          <p className="font-serif italic text-base sm:text-lg text-vintage-ink/75 mt-3 max-w-xl mx-auto leading-relaxed">
            "Some moments don't need grand descriptions. They simply stay with us."
          </p>

          {/* Guide tag for personalization */}
          <div className="inline-block mt-4 px-3.5 py-1 rounded-full bg-vintage-ivory/80 border border-vintage-champagne/50 text-[11px] font-sans text-vintage-dusty tracking-wide">
            ✦ Edit <code className="text-vintage-rose font-mono">src/data/memories.js</code> to link your personal photographs
          </div>
        </motion.div>

        {/* Vintage Scrapbook Arrangement */}
        {/* On desktop: staggered 2-column or 3-column collage layout */}
        {/* On mobile: vertical staggered column with imperfect tilts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-14 gap-x-8 lg:gap-x-10 items-start">
          {memories.map((memory, index) => {
            // Give even/odd items alternating vertical offsets on desktop for genuine scrapbook feel
            const isOffset = index % 2 === 1;

            return (
              <div 
                key={memory.id} 
                className={`relative flex justify-center ${isOffset ? 'md:mt-8' : ''}`}
              >
                {/* Random decorative dried flower or doodle beside some cards */}
                {index === 0 && (
                  <PressedFlower className="absolute -top-6 -left-4 z-20 hidden sm:block" />
                )}
                {index === 2 && (
                  <HeartDoodle className="absolute -bottom-5 -right-3 z-20 hidden sm:block" />
                )}
                {index === 4 && (
                  <PressedFlower className="absolute -top-5 -right-4 z-20 hidden sm:block" color="#A95366" />
                )}

                <PolaroidCard memory={memory} index={index} />
              </div>
            );
          })}
        </div>

        {/* Vintage Quote Scrap between sections */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 max-w-md mx-auto text-center p-6 bg-vintage-ivory/90 border border-vintage-champagne/50 rounded-sm shadow-paper relative rotate-1"
        >
          <div className="washi-tape washi-tape-rose -top-3 left-1/2 -translate-x-1/2 w-28 -rotate-1" />
          <p className="font-handwriting text-xl sm:text-2xl text-vintage-ink leading-relaxed">
            {editorialAccents[2].text}
          </p>
          <span className="block font-handwriting text-lg text-vintage-rose mt-2">
            — Ibrahim
          </span>
        </motion.div>
      </div>
    </section>
  );
}
