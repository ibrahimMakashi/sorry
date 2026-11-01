import React from 'react';
import SectionReveal from '../effects/SectionReveal';
import { storySections } from '../../data/storyData';
import { Compass, ShieldCheck } from 'lucide-react';

export default function UnansweredFeelings() {
  const content = storySections.unansweredFeelings;

  return (
    <section id="unanswered-feelings" className="relative py-20 sm:py-28 bg-[#F8F2E8] border-y border-vintage-champagne/40" aria-label="Chapter 6: Some Feelings Remain Unanswered">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <SectionReveal>
          
          {/* Header Badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-vintage-ivory border border-vintage-champagne/70 shadow-xs text-vintage-dusty text-xs font-sans uppercase tracking-widest mb-4">
              <Compass className="w-3.5 h-3.5 text-vintage-rose" />
              <span>Chapter Six · Honesty & Acceptance</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-vintage-wine tracking-tight mb-4">
              {content.title}
            </h2>

            <div className="w-20 h-0.5 bg-vintage-dusty/60 mx-auto rounded-full" />
          </div>

          {/* Elegant Parchment Letter Card */}
          <div className="bg-[#FCF9F3] p-7 sm:p-10 rounded-xl shadow-paper border border-vintage-champagne/70 relative">
            
            {/* Washi tape accents */}
            <div className="washi-tape washi-tape-champagne -top-3 left-1/2 -translate-x-1/2 w-32 -rotate-1" />

            <div className="space-y-4 font-body text-base sm:text-lg text-vintage-ink/90 leading-relaxed">
              {content.paragraphs.map((para, idx) => (
                <p 
                  key={idx}
                  className={idx === 2 || idx === 3 ? "font-serif italic text-lg sm:text-xl text-vintage-wine/90 py-1" : ""}
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Respectful closing sign-off */}
            <div className="mt-8 pt-6 border-t border-vintage-champagne/50 flex items-center justify-between text-xs text-vintage-dusty font-serif italic">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-vintage-rose" />
                <span>Honesty and mutual respect</span>
              </div>
              <span className="font-handwriting text-base text-vintage-rose">— Ibrahim</span>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
