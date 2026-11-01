import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { WashiTape, VintageStamp, HeartDoodle } from './DecorativeElements';
import { Camera, Image as ImageIcon } from 'lucide-react';

export default function PolaroidCard({ memory, index }) {
  const [imgError, setImgError] = useState(false);
  const isPersonal = memory.type === 'personal';

  // Use personal photo, or fallback to mood photography
  const imageSource = (!imgError && isPersonal) 
    ? memory.image 
    : (memory.fallbackStock || memory.image);

  return (
    <motion.article
      initial={{ opacity: 0, y: 35, rotate: memory.rotation * 1.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: memory.rotation }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="relative polaroid-card rounded-sm w-full max-w-[280px] sm:max-w-[340px] mx-auto group select-none"
    >
      {/* Washi Tape Strip on Top */}
      <WashiTape
        tapeColor={memory.tapeColor}
        className="-top-3 left-1/2 -translate-x-1/2 w-28 -rotate-1"
      />

      {/* Image Frame */}
      <div className="relative aspect-[4/3] bg-vintage-paper overflow-hidden rounded-xs border border-vintage-champagne/30 shadow-inner">
        <img
          src={imageSource}
          alt={memory.title || "Scrapbook photograph"}
          loading="lazy"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter contrast-[1.03] sepia-[0.12]"
        />

        {/* Clear Badge distinguishing Personal vs Editorial/Placeholder */}
        <div className="absolute bottom-2 left-2 z-10">
          {isPersonal ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-vintage-wine/85 text-vintage-ivory text-[10px] font-sans tracking-wide">
              <Camera className="w-2.5 h-2.5" />
              Personal Photo
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-vintage-espresso/80 text-vintage-ivory/90 text-[10px] font-sans tracking-wide backdrop-blur-sm">
              <ImageIcon className="w-2.5 h-2.5 text-vintage-champagne" />
              Placeholder Mood
            </span>
          )}
        </div>

        {/* Vintage Vignette Overlay inside photo */}
        <div className="absolute inset-0 bg-radial-vignette opacity-20 pointer-events-none" />
      </div>

      {/* Stamp Accent */}
      {memory.stamp && (
        <div className="absolute -top-2 -right-2 z-20">
          <VintageStamp text={memory.stamp} />
        </div>
      )}

      {/* Caption & Handwritten Note */}
      <div className="pt-4 pb-1 px-1">
        <div className="flex items-baseline justify-between gap-2 border-b border-vintage-blush/60 pb-1.5 mb-2">
          <h4 className="font-serif text-base sm:text-lg font-semibold text-vintage-wine">
            {memory.title}
          </h4>
          {memory.date && (
            <span className="font-sans text-[11px] text-vintage-dusty tracking-wider whitespace-nowrap">
              {memory.date}
            </span>
          )}
        </div>

        <p className="font-handwriting text-lg sm:text-xl text-vintage-ink leading-snug">
          {memory.caption}
        </p>

        {memory.note && (
          <p className="font-serif italic text-xs text-vintage-ink/60 mt-2">
            “{memory.note}”
          </p>
        )}
      </div>

      {/* Tiny Heart Doodle in corner */}
      <div className="absolute bottom-2 right-3">
        <HeartDoodle strokeColor="#C58B94" />
      </div>
    </motion.article>
  );
}
