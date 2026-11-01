import React from 'react';
import SectionReveal from '../effects/SectionReveal';
import MemoryScene from './MemoryScene';
import { storyScenes } from '../../data/storyData';
import { Moon } from 'lucide-react';

export default function TheEvening() {
  const scene = storyScenes.find(s => s.id === 8);

  return (
    <section id="evening" className="relative py-16 sm:py-24 bg-[#EFE4D3]/90 border-y border-vintage-champagne/40" aria-label="Chapter 3: The Evening">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center mb-10 sm:mb-14">
        <SectionReveal>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-vintage-ivory border border-vintage-champagne/70 shadow-xs text-vintage-dusty text-xs font-sans uppercase tracking-widest mb-4">
            <Moon className="w-3.5 h-3.5 text-vintage-wine" />
            <span>Chapter Three · The Evening</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-vintage-wine tracking-tight mb-3">
            That Evening, I Kept Thinking
          </h2>

          <p className="font-handwriting text-xl sm:text-2xl text-vintage-rose">
            A quiet room, and all the courage I couldn't find
          </p>
        </SectionReveal>
      </div>

      {scene && <MemoryScene scene={scene} isAlternate={false} />}
    </section>
  );
}
