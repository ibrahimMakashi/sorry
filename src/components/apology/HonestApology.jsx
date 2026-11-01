import React from 'react';
import { motion } from 'framer-motion';
import { storyConfig } from '../../data/storyConfig';
import { HeartDoodle } from '../scrapbook/DecorativeElements';

export default function HonestApology() {
  const apology = storyConfig.apology;

  return (
    <section
      id="apology"
      className="relative min-h-screen py-24 px-4 sm:px-6 bg-vintage-ivory overflow-hidden"
      aria-label="Honest Apology Notes"
    >
      {/* Background soft tint & delicate floral backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-vintage-paper via-vintage-ivory to-vintage-blush/20 pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-vintage-dusty/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-2xl mx-auto z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-handwriting text-2xl text-vintage-rose tracking-wider block mb-1">
            chapter four · honest words
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-vintage-wine">
            {apology.heading}
          </h2>
          <p className="font-serif italic text-base sm:text-lg text-vintage-ink/75 mt-3">
            {apology.subheading}
          </p>
        </motion.div>

        {/* 3 Handwritten Notes Attached to Scrapbook Page */}
        <div className="space-y-8 sm:space-y-10">
          {apology.notes.map((note, index) => {
            const rotations = [-1.2, 1.4, -0.8];
            const rot = rotations[index % rotations.length];

            return (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 35, rotate: rot * 1.5 }}
                whileInView={{ opacity: 1, y: 0, rotate: rot }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="vintage-paper-sheet rounded-sm p-6 sm:p-8 relative shadow-paper-lg"
              >
                {/* Washi tape pin */}
                <div 
                  className={`washi-tape ${index % 2 === 0 ? 'washi-tape-champagne' : 'washi-tape-rose'} -top-3 ${index % 2 === 0 ? 'left-8' : 'right-8'} w-24`} 
                />

                {/* Note Number & Tag */}
                <div className="flex items-center justify-between border-b border-vintage-champagne/40 pb-2 mb-4">
                  <span className="font-serif italic text-xs text-vintage-dusty tracking-wider uppercase">
                    Note 0{index + 1} · {note.tag}
                  </span>
                  <HeartDoodle strokeColor={note.accentColor} />
                </div>

                {/* Note Title */}
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-vintage-wine mb-3">
                  {note.title}
                </h3>

                {/* Note Handwritten Message */}
                <p className="font-body text-base sm:text-lg text-vintage-ink/90 leading-relaxed">
                  {note.content}
                </p>

                {/* Subtle bottom decorative line */}
                <div className="mt-5 pt-3 border-t border-dashed border-vintage-blush/60 flex justify-end">
                  <span className="font-handwriting text-base text-vintage-rose/80">
                    from the heart
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Note on Personalization */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="font-handwriting text-lg text-vintage-dusty">
            "Sincerity begins with understanding."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
