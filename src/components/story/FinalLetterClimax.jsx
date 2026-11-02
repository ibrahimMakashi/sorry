import React from 'react';
import SectionReveal from '../effects/SectionReveal';
import AnanyaName from '../effects/AnanyaName';
import IbrahimName from '../effects/IbrahimName';
import { storySections } from '../../data/storyData';
import { Sparkles, Heart } from 'lucide-react';

export default function FinalLetterClimax() {
  const content = storySections.finalLetter;

  return (
    <section id="final-letter" className="relative py-24 sm:py-32 bg-vintage-paper" aria-label="Chapter 9: Before You Close This Letter">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <SectionReveal>
          
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-vintage-ivory border border-vintage-champagne/70 shadow-xs text-vintage-dusty text-xs font-sans uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5 text-vintage-rose" />
              <span>Chapter Nine · The Final Letter</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-vintage-wine tracking-tight mb-4">
              {content.heading}
            </h2>

            <div className="w-24 h-0.5 bg-vintage-dusty/60 mx-auto rounded-full" />
          </div>

          {/* Letter Parchment */}
          <div className="bg-[#FAF6ED] p-8 sm:p-12 md:p-16 rounded-2xl shadow-paper-lift border border-vintage-champagne/80 relative text-center">
            
            <div className="washi-tape washi-tape-rose -top-3.5 left-1/2 -translate-x-1/2 w-36 -rotate-1" />

            <div className="space-y-5 font-body text-base sm:text-lg text-vintage-ink/90 leading-relaxed max-w-xl mx-auto">
              {content.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* The Climax Final Line */}
            <div className="my-10 py-6 border-y border-vintage-champagne/60">
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-vintage-wine tracking-tight">
                Thank you for being you, <AnanyaName>Ananya</AnanyaName>.
              </h1>
            </div>

            {/* Signature */}
            <div className="flex flex-col items-center gap-2">
              <span className="font-handwriting text-3xl text-vintage-wine font-semibold">
                — <IbrahimName>Ibrahim</IbrahimName>
              </span>
              <span className="font-serif italic text-xs text-vintage-dusty">
                With honesty, gratitude, and respect
              </span>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
