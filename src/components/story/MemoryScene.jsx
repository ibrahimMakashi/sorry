import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionReveal from '../effects/SectionReveal';
import AnanyaName from '../effects/AnanyaName';
import { trackInteraction } from '../../utils/analytics';
import { Calendar, Sparkles, MessageCircle, Moon, Clock } from 'lucide-react';

export default function MemoryScene({ scene, isAlternate = false }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const imgSrc = imageError ? scene.fallbackImage : scene.image;

  return (
    <article
      id={`scene-${scene.id}`}
      className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 max-w-5xl mx-auto"
      aria-label={`${scene.date}: ${scene.title}`}
    >
      <SectionReveal>
        <div className={`flex flex-col ${isAlternate ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-8 lg:gap-12`}>
          
          {/* ── IMAGE COLUMN ── */}
          <div className="w-full lg:w-1/2 flex flex-col items-center">
            <div className="relative w-full max-w-lg group">
              
              {/* Scrapbook Tape Accent */}
              <div className="absolute -top-3 left-8 w-20 h-5 bg-vintage-tape transform -rotate-2 rounded-xs shadow-xs z-10 pointer-events-none" />
              <div className="absolute -top-3 right-8 w-20 h-5 bg-vintage-tape transform rotate-3 rounded-xs shadow-xs z-10 pointer-events-none" />

              {/* Framed Image Container */}
              <div 
                onClick={() => trackInteraction('gallery_image_opened', { scene_id: scene.id })}
                className="relative bg-[#FBF7EF] p-2.5 sm:p-3.5 rounded-lg shadow-paper border border-vintage-champagne/60 overflow-hidden cursor-pointer"
              >
                <div className="relative aspect-[4/3] w-full rounded-md overflow-hidden bg-vintage-paper/50 flex items-center justify-center">
                  
                  {/* Subtle placeholder while loading */}
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-vintage-paper/80 animate-pulse">
                      <span className="font-handwriting text-vintage-dusty text-sm">Loading illustration...</span>
                    </div>
                  )}

                  <img
                    src={imgSrc}
                    alt={scene.alt || scene.title}
                    loading="lazy"
                    decoding="async"
                    onLoad={() => setImageLoaded(true)}
                    onError={() => {
                      if (!imageError) {
                        setImageError(true);
                      }
                    }}
                    className={`w-full h-full object-contain sm:object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015] ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </div>

                {/* Subtle caption strip below image */}
                <div className="mt-2.5 px-2 flex items-center justify-between text-xs text-vintage-dusty font-serif italic">
                  <span>Scene {scene.sceneNumber}</span>
                  <span className="font-sans text-[10px] uppercase tracking-wider">{scene.subtitle}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── TEXT & STORY COLUMN ── */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            
            {/* Date & Chapter Stamp */}
            <div className="flex items-center gap-2 mb-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-vintage-ivory border border-vintage-champagne/60 shadow-xs text-vintage-wine font-sans text-xs font-semibold tracking-wider">
                <Calendar className="w-3.5 h-3.5 text-vintage-rose" />
                <span>{scene.date}</span>
              </div>
              <span className="font-handwriting text-vintage-rose text-base">
                ~ {scene.chapter}
              </span>
            </div>

            {/* Scene Heading */}
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-vintage-wine font-bold leading-tight mb-4">
              {scene.title}
            </h3>

            {/* Subtitle note */}
            {scene.subtitle && (
              <p className="font-sans text-xs uppercase tracking-widest text-vintage-dusty font-medium mb-4">
                {scene.subtitle}
              </p>
            )}

            {/* Narrative Paragraphs */}
            <div className="space-y-3 font-body text-vintage-ink/90 text-sm sm:text-base leading-relaxed">
              {scene.narrative.map((para, idx) => (
                <p key={idx}>
                  {para.includes("Ananya") ? (
                    <span>
                      {para.split("Ananya").map((part, pIdx, arr) => (
                        <React.Fragment key={pIdx}>
                          {part}
                          {pIdx < arr.length - 1 && <AnanyaName>Ananya</AnanyaName>}
                        </React.Fragment>
                      ))}
                    </span>
                  ) : (
                    para
                  )}
                </p>
              ))}
            </div>

            {/* Special Highlight for Scene 05: Kannada Question */}
            {scene.specialKannaQuote && (
              <div className="mt-5 p-4 rounded-lg bg-vintage-ivory border-l-4 border-vintage-rose shadow-xs">
                <p className="font-serif text-xl sm:text-2xl font-bold text-vintage-wine mb-1">
                  "{scene.specialKannaQuote}"
                </p>
                <p className="font-sans text-xs text-vintage-dusty italic">
                  Transliteration: <span className="font-medium text-vintage-ink/80">{scene.kannadaTransliteration}</span>
                </p>
                <p className="font-serif italic text-sm text-vintage-rose mt-1">
                  Meaning: "{scene.kannadaMeaning}"
                </p>
              </div>
            )}

            {/* Special Highlight for Scene 09: Dream Quote */}
            {scene.dreamQuote && (
              <div className="mt-5 p-4 rounded-lg bg-amber-50/70 border border-amber-200/80 shadow-xs">
                <div className="flex items-center gap-1.5 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-1">
                  <Moon className="w-3.5 h-3.5 text-amber-600" />
                  <span>{scene.dreamLabel}</span>
                </div>
                <p className="font-serif italic text-lg sm:text-xl text-vintage-wine font-medium">
                  "{scene.dreamQuote}"
                </p>
              </div>
            )}

            {/* Special Highlight for Scene 10: Chat Messages */}
            {scene.chat && (
              <div className="mt-5 p-4 rounded-lg bg-vintage-ivory border border-vintage-champagne/50 shadow-xs space-y-2.5 max-w-sm">
                <div className="flex items-center gap-1.5 text-[11px] font-sans text-vintage-dusty uppercase tracking-wider border-b border-vintage-champagne/40 pb-1.5 mb-2">
                  <MessageCircle className="w-3.5 h-3.5 text-vintage-rose" />
                  <span>2026 Conversation</span>
                </div>
                
                {/* Ibrahim bubble */}
                <div className="flex flex-col items-start">
                  <span className="text-[10px] font-sans text-vintage-dusty mb-0.5">Ibrahim</span>
                  <div className="bg-[#EBE2D3] text-vintage-ink text-xs sm:text-sm px-3.5 py-2 rounded-2xl rounded-tl-none font-sans">
                    {scene.chat[0].text}
                  </div>
                </div>

                {/* Ananya bubble */}
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-sans text-vintage-dusty mb-0.5">Ananya</span>
                  <div className="bg-vintage-wine text-vintage-ivory text-xs sm:text-sm px-3.5 py-2 rounded-2xl rounded-tr-none font-sans font-medium">
                    {scene.chat[1].text}
                  </div>
                </div>
              </div>
            )}

            {/* Subtle Handwritten Quote Accent */}
            {scene.highlightQuote && !scene.specialKannaQuote && !scene.dreamQuote && !scene.chat && (
              <div className="mt-5 pt-3 border-t border-vintage-champagne/40 flex items-center gap-2">
                <span className="font-handwriting text-lg sm:text-xl text-vintage-rose">
                  "{scene.highlightQuote}"
                </span>
              </div>
            )}
          </div>
        </div>
      </SectionReveal>
    </article>
  );
}
