import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { promises } from '../../data/promises';
import { Sparkles, ChevronDown, CheckCircle2 } from 'lucide-react';
import { PressedFlower } from '../scrapbook/DecorativeElements';

export default function PromiseCards() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <section
      id="promises"
      className="relative min-h-screen py-24 px-4 sm:px-6 bg-vintage-paper overflow-hidden"
      aria-label="Personal Commitments"
    >
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-vintage-champagne/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-handwriting text-2xl text-vintage-rose tracking-wider block mb-1">
            chapter five · better actions
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-vintage-wine">
            Not Just Words, But Things I Want To Do Better
          </h2>
          <p className="font-serif italic text-base sm:text-lg text-vintage-ink/75 mt-3 max-w-lg mx-auto">
            Meaningful, realistic commitments that I hold myself accountable to every single day.
          </p>
          <span className="inline-block mt-2 font-handwriting text-base text-vintage-dusty">
            (Tap any card to unfold my personal commitment)
          </span>
        </motion.div>

        {/* Cards Grid: Stacked on mobile, 2-column on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {promises.map((item, idx) => {
            const isExpanded = expandedId === item.id;

            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                onClick={() => toggleExpand(item.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleExpand(item.id);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-expanded={isExpanded}
                className={`vintage-paper-sheet rounded-sm p-6 sm:p-7 cursor-pointer transition-all duration-300 relative select-none ${
                  isExpanded
                    ? 'ring-2 ring-vintage-dusty shadow-paper-lift bg-vintage-ivory'
                    : 'hover:shadow-paper hover:-translate-y-1'
                }`}
              >
                {/* Washi tape at corner */}
                <div className="washi-tape washi-tape-champagne -top-3 right-6 w-20 -rotate-2" />

                {/* Card Top: Number & Subtitle */}
                <div className="flex items-center justify-between border-b border-vintage-champagne/40 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-lg text-vintage-rose">
                      {item.number}
                    </span>
                    <span className="font-sans text-[11px] uppercase tracking-wider text-vintage-dusty">
                      · {item.subtitle}
                    </span>
                  </div>

                  <span className={`p-1 rounded-full transition-transform duration-300 ${isExpanded ? 'rotate-180 bg-vintage-blush/60' : 'text-vintage-dusty'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </div>

                {/* Card Title */}
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-vintage-wine mb-2">
                  {item.title}
                </h3>

                {/* Summary */}
                <p className="font-body text-sm sm:text-base text-vintage-ink/85 leading-relaxed">
                  {item.summary}
                </p>

                {/* Unfolding Secondary Handwritten Note */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      className="overflow-hidden mt-5 pt-4 border-t border-dashed border-vintage-dusty/50"
                    >
                      <div className="flex items-start gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-vintage-champagne flex-shrink-0 mt-0.5 animate-pulse" />
                        <span className="font-serif italic text-xs uppercase tracking-wider text-vintage-wine font-semibold">
                          My Commitment to You
                        </span>
                      </div>

                      <p className="font-handwriting text-lg sm:text-xl text-vintage-ink leading-snug bg-vintage-blush/20 p-3.5 rounded border border-vintage-rose/20">
                        {item.detail}
                      </p>

                      <div className="flex justify-between items-center mt-3 text-xs text-vintage-dusty font-serif italic">
                        <span>Holding myself accountable</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-vintage-rose" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
