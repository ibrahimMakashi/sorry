import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Mic, Sparkles, Volume2 } from 'lucide-react';
import { storyConfig } from '../../data/storyConfig';
import { useAudio } from '../../context/AudioContext';
import SectionReveal from '../effects/SectionReveal';

export default function VoiceMessage() {
  const config = storyConfig.voiceMessage;
  const audioRef = useRef(null);
  const { duckBackgroundMusic } = useAudio();

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // 24 waveform bars for vintage tape recorder look
  const waveformBars = [
    30, 45, 75, 40, 60, 90, 85, 45, 65, 95, 70, 80,
    50, 65, 85, 90, 60, 45, 75, 90, 50, 40, 60, 35
  ];

  const togglePlayback = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      duckBackgroundMusic(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          duckBackgroundMusic(true);
        })
        .catch((err) => {
          console.warn("Audio playback error:", err);
        });
    }
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 5.5);
    }
  };

  const onEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    duckBackgroundMusic(false);
  };

  useEffect(() => {
    return () => {
      duckBackgroundMusic(false);
    };
  }, [duckBackgroundMusic]);

  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds <= 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section
      id="voice-note"
      className="relative min-h-[85vh] py-24 px-4 sm:px-6 bg-vintage-ivory overflow-hidden flex items-center justify-center"
      aria-label="Voice Message from Ibrahim"
    >
      <div className="relative max-w-xl mx-auto w-full z-10">
        
        {/* Section Header */}
        <SectionReveal className="text-center mb-10">
          <span className="font-handwriting text-2xl text-vintage-rose tracking-wider block mb-1">
            chapter seven · personal voice
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-vintage-wine">
            {config.heading}
          </h2>
          <p className="font-serif italic text-base sm:text-lg text-vintage-ink/75 mt-3">
            {config.supportingText}
          </p>
        </SectionReveal>

        {/* Vintage Voice Note Player Container */}
        <SectionReveal delay={0.2}>
          <div className="vintage-paper-sheet rounded-lg p-6 sm:p-9 shadow-paper-lg relative">
            {/* Top Washi Tape */}
            <div className="washi-tape washi-tape-rose -top-3 left-1/2 -translate-x-1/2 w-36 -rotate-1" />

            {/* Audio element pointing to dummy/real audio file */}
            <audio
              ref={audioRef}
              src={config.src}
              onTimeUpdate={onTimeUpdate}
              onLoadedMetadata={onLoadedMetadata}
              onEnded={onEnded}
              preload="metadata"
            />

            {/* Player Main Interface */}
            <div className="flex flex-col items-center">
              
              {/* Vintage Microphone / Cassette Badge */}
              <div className="relative w-20 h-20 rounded-full bg-vintage-blush/40 border-2 border-vintage-rose/30 flex items-center justify-center mb-6 shadow-inner">
                <Mic className="w-9 h-9 text-vintage-rose" />
                {isPlaying && (
                  <span className="absolute inset-0 rounded-full border-2 border-vintage-wine animate-ping opacity-40" />
                )}
              </div>

              {/* Play / Pause Primary Button */}
              <button
                onClick={togglePlayback}
                className="w-16 h-16 rounded-full flex items-center justify-center bg-vintage-wine text-vintage-ivory hover:bg-vintage-espresso hover:scale-105 active:scale-95 transition-all duration-300 shadow-paper focus:outline-none focus:ring-4 focus:ring-vintage-rose/30"
                aria-label={isPlaying ? "Pause voice message" : "Play voice message from Ibrahim"}
              >
                {isPlaying ? (
                  <Pause className="w-7 h-7 fill-current" />
                ) : (
                  <Play className="w-7 h-7 fill-current ml-1" />
                )}
              </button>

              {/* Waveform Visualization */}
              <div className="w-full mt-8 mb-4 px-2">
                <div className="flex items-center justify-between gap-1 h-12">
                  {waveformBars.map((heightPercent, i) => {
                    const barProgress = (i / waveformBars.length) * 100;
                    const isPassed = progressPercent >= barProgress;

                    return (
                      <div
                        key={i}
                        className="flex-1 rounded-full transition-all duration-200"
                        style={{
                          height: `${heightPercent}%`,
                          backgroundColor: isPassed
                            ? '#733E4B'
                            : isPlaying
                            ? '#C58B94'
                            : '#D6BE97',
                          opacity: isPassed ? 1 : 0.45,
                          transform: isPlaying && isPassed ? 'scaleY(1.18)' : 'scaleY(1)'
                        }}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Progress Timers */}
              <div className="w-full flex justify-between items-center font-sans text-xs text-vintage-dusty tracking-wider px-2">
                <span>{formatTime(currentTime)}</span>
                <span className="font-serif italic text-vintage-ink/70">
                  {isPlaying ? 'Playing Ibrahim\'s recording...' : 'Tap play to listen'}
                </span>
                <span>{formatTime(duration || 5.5)}</span>
              </div>

              {/* Handwritten Caption */}
              <p className="font-handwriting text-2xl text-vintage-wine mt-6 text-center font-semibold">
                "{config.caption}"
              </p>

              {/* Clear notice regarding demo status */}
              {config.isDemo && (
                <div className="mt-4 px-3 py-1.5 rounded-full bg-vintage-paper border border-vintage-champagne/60 text-[11px] font-sans text-vintage-dusty text-center">
                  ✦ Demo voice note loaded · Ready for real audio replacement
                </div>
              )}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
