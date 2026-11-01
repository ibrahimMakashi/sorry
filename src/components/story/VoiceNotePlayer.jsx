import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Mic, Volume2 } from 'lucide-react';
import { storyConfig } from '../../data/storyConfig';
import { useAudio } from '../../context/AudioContext';
import SectionReveal from '../effects/SectionReveal';

export default function VoiceNotePlayer() {
  const config = storyConfig.voiceMessage;
  const audioRef = useRef(null);
  const { duckBackgroundMusic } = useAudio();

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

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
      className="relative py-20 sm:py-28 px-4 sm:px-6 bg-vintage-ivory overflow-hidden flex items-center justify-center border-t border-vintage-champagne/40"
      aria-label="A few words in my own voice"
    >
      <div className="relative max-w-xl mx-auto w-full z-10">
        
        {/* Section Header */}
        <SectionReveal className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-vintage-paper border border-vintage-champagne/70 shadow-xs text-vintage-dusty text-xs font-sans uppercase tracking-widest mb-3">
            <Mic className="w-3.5 h-3.5 text-vintage-rose" />
            <span>Chapter Eight · Voice Recording</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-vintage-wine">
            A few words, in my own voice — Ibrahim
          </h2>
          <p className="font-serif italic text-base sm:text-lg text-vintage-ink/75 mt-3">
            {config.supportingText}
          </p>
        </SectionReveal>

        {/* Vintage Tape Player Container */}
        <SectionReveal delay={0.2}>
          <div className="vintage-paper-sheet rounded-xl p-6 sm:p-9 shadow-paper-lg relative">
            <div className="washi-tape washi-tape-rose -top-3 left-1/2 -translate-x-1/2 w-36 -rotate-1" />

            <audio
              ref={audioRef}
              src={config.src}
              onTimeUpdate={onTimeUpdate}
              onLoadedMetadata={onLoadedMetadata}
              onEnded={onEnded}
              preload="metadata"
            />

            <div className="flex flex-col items-center">
              
              {/* Play / Pause Primary Button */}
              <button
                onClick={togglePlayback}
                className="w-16 h-16 rounded-full flex items-center justify-center bg-vintage-wine text-vintage-ivory hover:bg-vintage-espresso hover:scale-105 active:scale-95 transition-all duration-300 shadow-paper focus:outline-none focus:ring-4 focus:ring-vintage-rose/30 mt-2"
                aria-label={isPlaying ? "Pause voice message" : "Play voice message from Ibrahim"}
              >
                {isPlaying ? (
                  <Pause className="w-7 h-7 fill-current" />
                ) : (
                  <Play className="w-7 h-7 fill-current ml-1" />
                )}
              </button>

              {/* Waveform Visualization */}
              <div className="w-full mt-7 mb-3 px-2">
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

              {/* Timers */}
              <div className="w-full flex justify-between items-center font-sans text-xs text-vintage-dusty tracking-wider px-2">
                <span>{formatTime(currentTime)}</span>
                <span className="font-serif italic text-vintage-ink/70">
                  {isPlaying ? 'Playing spoken note...' : 'Optional · Tap to listen'}
                </span>
                <span>{formatTime(duration || 5.5)}</span>
              </div>

              {/* Note */}
              <p className="font-handwriting text-xl text-vintage-wine mt-5 text-center">
                "Some thoughts are meant to be heard softly."
              </p>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
