import React from 'react';
import SectionReveal from '../effects/SectionReveal';
import MemoryScene from './MemoryScene';
import { storyScenes } from '../../data/storyData';
import { Sparkles, Clock } from 'lucide-react';

export default function TheBoschMemories() {
  const scenes = storyScenes.filter(s => s.id >= 3 && s.id <= 7);

  return (
    <section id="bosch-memories" className="relative py-16 sm:py-24 bg-gradient-to-b from-vintage-paper via-vintage-ivory to-vintage-paper" aria-label="Chapter 2: The Bosch Memories">
      
      {/* Chapter 2 Title Header */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center mb-12 sm:mb-16">
        <SectionReveal>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vintage-ivory border border-vintage-champagne/60 shadow-xs text-vintage-dusty text-xs font-sans uppercase tracking-widest mb-4">
            <Clock className="w-3.5 h-3.5 text-vintage-rose" />
            <span>Chapter Two · The Bosch Memories</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-vintage-wine tracking-tight mb-4">
            The Days We Worked Together
          </h2>

          <p className="font-handwriting text-xl sm:text-2xl text-vintage-rose">
            Five moments in March 2024 that stayed etched in my memory
          </p>
        </SectionReveal>
      </div>

      {/* Scenes 03, 04, 05, 06, 07 */}
      <div className="space-y-6 sm:space-y-12">
        {scenes.map((scene, idx) => (
          <MemoryScene key={scene.id} scene={scene} isAlternate={idx % 2 === 1} />
        ))}
      </div>
    </section>
  );
}
