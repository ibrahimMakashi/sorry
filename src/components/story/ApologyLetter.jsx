import React from 'react';
import SectionReveal from '../effects/SectionReveal';
import AnanyaName from '../effects/AnanyaName';
import { storySections } from '../../data/storyData';
import { Mail, Heart } from 'lucide-react';

export default function ApologyLetter() {
  const content = storySections.apologyLetter;

  return (
    <section id="apology-letter" className="relative py-20 sm:py-28 bg-vintage-paper" aria-label="Chapter 7: What I Wanted to Say">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <SectionReveal>
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-vintage-ivory border border-vintage-champagne/70 shadow-xs text-vintage-dusty text-xs font-sans uppercase tracking-widest mb-4">
              <Mail className="w-3.5 h-3.5 text-vintage-rose" />
              <span>Chapter Seven · A Personal Message</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-vintage-wine tracking-tight mb-4">
              {content.heading}
            </h2>

            <div className="w-20 h-0.5 bg-vintage-dusty/60 mx-auto rounded-full" />
          </div>

          {/* Vintage Handwritten Letter Paper */}
          <div className="bg-[#FAF6EE] p-8 sm:p-12 rounded-xl shadow-paper-lg border border-vintage-champagne/80 relative">
            
            {/* Top Washi Tape */}
            <div className="washi-tape washi-tape-rose -top-3 left-1/2 -translate-x-1/2 w-32 -rotate-1" />

            {/* Salutation */}
            <p className="font-serif text-2xl sm:text-3xl font-bold text-vintage-wine mb-6">
              <AnanyaName>Ananya</AnanyaName>,
            </p>

            {/* Letter Body Paragraphs */}
            <div className="space-y-4 font-body text-base sm:text-lg text-vintage-ink/90 leading-relaxed">
              <p>There were things I wanted to tell you back then, but I never found the courage.</p>
              <p>Years passed, and those memories stayed with me.</p>
              <p>I eventually decided to reach out and tell you how I felt. I know that your feelings are different, and I respect that.</p>
              <p className="font-serif italic text-lg sm:text-xl text-vintage-wine font-medium py-1">
                If anything I said or did made you uncomfortable, I am genuinely sorry.
              </p>
              <p>I never wanted my feelings to become a burden for you.</p>
              <p>I simply wanted to be honest about a chapter of my life that meant a lot to me.</p>
              <p>Thank you for the moments we shared at Bosch, even if they were ordinary moments for you.</p>
              <p>They became memories I will always remember.</p>
            </div>

            {/* Signature */}
            <div className="mt-8 pt-6 border-t border-vintage-champagne/50 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-vintage-rose text-xs font-serif italic">
                <Heart className="w-3.5 h-3.5 fill-vintage-rose/30" />
                <span>Written with sincerity</span>
              </div>
              <span className="font-handwriting text-2xl text-vintage-wine font-semibold">
                — Ibrahim
              </span>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
