import React from 'react';
import SectionReveal from '../effects/SectionReveal';
import MemoryScene from './MemoryScene';
import { storyScenes } from '../../data/storyData';
import { Send, MessageSquare } from 'lucide-react';

export default function TheMessageIn2026() {
  const scene = storyScenes.find(s => s.id === 10);

  return (
    <section id="message-2026" className="relative py-16 sm:py-24 bg-vintage-paper" aria-label="Chapter 5: The Message in 2026">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center mb-10 sm:mb-14">
        <SectionReveal>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-vintage-ivory border border-vintage-champagne/70 shadow-xs text-vintage-dusty text-xs font-sans uppercase tracking-widest mb-4">
            <Send className="w-3.5 h-3.5 text-vintage-rose" />
            <span>Chapter Five · The Year 2026</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-vintage-wine tracking-tight mb-3">
            A Message After All These Years
          </h2>

          <p className="font-handwriting text-xl sm:text-2xl text-vintage-rose">
            Reaching out across two and a half years of silence
          </p>
        </SectionReveal>
      </div>

      {scene && <MemoryScene scene={scene} isAlternate={false} />}
    </section>
  );
}
