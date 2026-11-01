import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { storyConfig } from '../../data/storyConfig';
import { useAudio } from '../../context/AudioContext';
import { Heart, MessageSquare, Clock, Check, ArrowDown, Sparkles } from 'lucide-react';
import SectionReveal from '../effects/SectionReveal';

export default function GentleQuestion({ selectedOption: initialSelected = null, onSelectOption }) {
  const [selectedOption, setSelectedOption] = useState(initialSelected);
  const feelings = storyConfig.feelingsSpace;
  const { playSound } = useAudio();

  const getIcon = (id) => {
    switch (id) {
      case 'talk':
        return <MessageSquare className="w-4 h-4 text-vintage-rose" />;
      case 'time':
        return <Clock className="w-4 h-4 text-vintage-dusty" />;
      default:
        return <Heart className="w-4 h-4 text-vintage-wine" />;
    }
  };

  const handleSelect = (id) => {
    setSelectedOption(id);
    playSound('paperUnfold');
    if (onSelectOption) {
      onSelectOption(id);
    }
  };

  const scrollToNext = () => {
    const el = document.getElementById('voice-note');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="feelings-space"
      className="relative min-h-[85vh] py-24 px-4 sm:px-6 bg-vintage-paper flex items-center justify-center overflow-hidden"
      aria-label="A Space For Your Feelings"
    >
      <div className="absolute inset-0 bg-radial-vignette opacity-20 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 bg-vintage-blush/25 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-xl mx-auto text-center z-10 w-full">
        
        {/* Section Header */}
        <SectionReveal className="mb-10">
          <span className="font-handwriting text-2xl text-vintage-rose tracking-wider block mb-1">
            chapter six · your space
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-vintage-wine leading-tight">
            {feelings.heading}
          </h2>
          <p className="font-serif italic text-base sm:text-lg text-vintage-ink/80 mt-4 max-w-md mx-auto leading-relaxed">
            Please take your time and choose an option whenever you feel comfortable. There is no rush or pressure at all.
          </p>
        </SectionReveal>

        {/* 3 Gentle, Respectful Interaction Choices */}
        <SectionReveal delay={0.2}>
          <div className="flex flex-col gap-3.5 max-w-md mx-auto">
            {feelings.options.map((option) => {
              const isSelected = selectedOption === option.id;

              return (
                <motion.button
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.98 }}
                  className={`group flex items-center justify-between p-4 rounded-lg border transition-all duration-300 text-left ${
                    isSelected
                      ? 'bg-vintage-ivory border-vintage-wine shadow-paper ring-1 ring-vintage-wine/30'
                      : 'bg-vintage-ivory/80 hover:bg-vintage-ivory border-vintage-champagne/70 shadow-sm hover:border-vintage-rose'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-vintage-paper">
                      {getIcon(option.id)}
                    </div>
                    <span className="font-serif text-base sm:text-lg text-vintage-wine font-medium">
                      {option.label}
                    </span>
                  </div>

                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                    isSelected
                      ? 'border-vintage-wine bg-vintage-wine text-vintage-ivory'
                      : 'border-vintage-champagne group-hover:border-vintage-dusty'
                  }`}>
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </SectionReveal>

        {/* Soft, Reassuring Response Display */}
        <div className="min-h-[110px] mt-8 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {selectedOption ? (
              <motion.div
                key={selectedOption}
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="p-5 rounded-md bg-vintage-ivory border border-vintage-champagne/70 shadow-paper max-w-md w-full flex flex-col items-center gap-3"
              >
                <p className="font-handwriting text-xl sm:text-2xl text-vintage-rose leading-relaxed">
                  {feelings.options.find(o => o.id === selectedOption)?.response}
                </p>

                {/* Continue button smoothly appearing */}
                <button
                  onClick={scrollToNext}
                  className="mt-2 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-vintage-wine hover:bg-vintage-espresso text-vintage-ivory font-serif text-xs uppercase tracking-wider transition-all duration-300 shadow-sm"
                >
                  <span>Continue Reading</span>
                  <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-1.5"
              >
                <span className="font-handwriting text-base sm:text-lg text-vintage-dusty/85">
                  (Take all the time you need · Choose an option whenever you're ready to turn the page)
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
