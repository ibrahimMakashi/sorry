import React from 'react';
import SectionReveal from '../effects/SectionReveal';
import MemoryScene from './MemoryScene';
import { storyScenes } from '../../data/storyData';
import { Sparkles, CloudMoon } from 'lucide-react';

export default function TheDreams() {
  const scene = storyScenes.find(s => s.id === 9);

  return (
    <section id="dreams" className="relative py-16 sm:py-24 bg-gradient-to-b from-[#F9F4EB] via-[#FFFBF0] to-vintage-paper overflow-hidden" aria-label="Chapter 4: The Dreams">
      
      {/* Soft Dreamy Ambient Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-200/20 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-rose-200/20 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center mb-10 sm:mb-14 relative z-10">
        <SectionReveal>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100/80 border border-amber-300/60 shadow-xs text-amber-900 text-xs font-sans uppercase tracking-widest mb-4">
            <CloudMoon className="w-3.5 h-3.5 text-amber-700" />
            <span>Chapter Four · The Dreams</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-vintage-wine tracking-tight mb-3">
            The Dreams That Never Left
          </h2>

          <p className="font-handwriting text-xl sm:text-2xl text-amber-800/90">
            More than two and a half years of memories preserved in sleep
          </p>
        </SectionReveal>
      </div>

      {scene && <MemoryScene scene={scene} isAlternate={true} />}
    </section>
  );
}
