import React from 'react';
import SectionReveal from '../effects/SectionReveal';
import MemoryScene from './MemoryScene';
import { storyScenes, storySections } from '../../data/storyData';
import { Sparkles, BookOpen } from 'lucide-react';

export default function TheBeginning() {
  const scenes = storyScenes.filter(s => s.id === 1 || s.id === 2);

  return (
    <section id="beginning" className="relative py-16 sm:py-24 bg-vintage-paper" aria-label="Chapter 1: The Beginning">
      
      {/* Chapter 1 Title Header & Intro Note */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center mb-12 sm:mb-16">
        <SectionReveal>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vintage-ivory border border-vintage-champagne/60 shadow-xs text-vintage-dusty text-xs font-sans uppercase tracking-widest mb-4">
            <BookOpen className="w-3.5 h-3.5 text-vintage-rose" />
            <span>Chapter One · The Beginning</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-vintage-wine tracking-tight mb-6">
            Where It All Began
          </h2>

          <div className="p-6 sm:p-8 rounded-xl bg-vintage-ivory/80 border border-vintage-champagne/60 shadow-paper relative">
            <div className="washi-tape washi-tape-champagne -top-3 left-1/2 -translate-x-1/2 w-28 -rotate-1" />
            <p className="font-body italic text-base sm:text-lg text-vintage-ink/85 leading-relaxed whitespace-pre-line">
              "{storySections.beginningIntro.quote}"
            </p>
          </div>
        </SectionReveal>
      </div>

      {/* Scenes 01 and 02 */}
      <div className="space-y-6 sm:space-y-12">
        {scenes.map((scene, idx) => (
          <MemoryScene key={scene.id} scene={scene} isAlternate={idx % 2 === 1} />
        ))}
      </div>
    </section>
  );
}
