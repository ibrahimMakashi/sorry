import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Mic, Sparkles, Heart, Volume2 } from 'lucide-react';
import { storyConfig } from '../../data/storyConfig';
import { useAudio } from '../../context/AudioContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import SectionReveal from '../effects/SectionReveal';
import { voiceCaptions, voiceLetterMeta } from '../../data/voiceCaptions';

export default function VoiceNotePlayer() {
  const config = storyConfig.voiceMessage;
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);
  const { duckBackgroundMusic } = useAudio();
  const prefersReducedMotion = useReducedMotion();

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(43.34);
  const [isEnded, setIsEnded] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [audioSrc, setAudioSrc] = useState(voiceLetterMeta.audioSrc);

  // 28 animated waveform bars
  const baseWaveform = [
    24, 38, 65, 42, 55, 88, 76, 45, 62, 92, 68, 78,
    52, 68, 86, 94, 64, 48, 72, 88, 54, 42, 65, 48,
    36, 58, 72, 34
  ];

  // Primary toggle play / pause
  const togglePlayback = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      duckBackgroundMusic(false);
    } else {
      // If audio already completed, restart from beginning
      if (isEnded) {
        audioRef.current.currentTime = 0;
        setCurrentTime(0);
        setIsEnded(false);
      }
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          duckBackgroundMusic(true);
        })
        .catch((err) => {
          console.warn("Audio playback error:", err);
          // Try fallback source if primary fails
          if (audioSrc !== voiceLetterMeta.fallbackAudioSrc) {
            setAudioSrc(voiceLetterMeta.fallbackAudioSrc);
          } else {
            setAudioError(true);
          }
        });
    }
  };

  // Replay control resets both audio and caption experience
  const handleReplay = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    setCurrentTime(0);
    setIsEnded(false);
    audioRef.current.play()
      .then(() => {
        setIsPlaying(true);
        duckBackgroundMusic(true);
      })
      .catch((err) => {
        console.warn("Replay error:", err);
      });
  };

  // Interactive seeking through slider or click
  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    if (isEnded && newTime < (duration - 0.5)) {
      setIsEnded(false);
    }
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      const cur = audioRef.current.currentTime;
      setCurrentTime(cur);
      if (cur >= (duration - 0.2) && !isEnded) {
        setIsEnded(true);
        setIsPlaying(false);
        duckBackgroundMusic(false);
      }
    }
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      const dur = audioRef.current.duration;
      if (dur && !isNaN(dur) && dur > 0) {
        setDuration(dur);
      }
    }
  };

  const onEnded = () => {
    setIsPlaying(false);
    setIsEnded(true);
    duckBackgroundMusic(false);
  };

  // Cleanup ducking on component unmount
  useEffect(() => {
    return () => {
      duckBackgroundMusic(false);
    };
  }, [duckBackgroundMusic]);

  // Formatter for elapsed / total time
  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds <= 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Synchronized caption computation
  const getActiveCaption = () => {
    if (isEnded || (duration > 0 && currentTime >= duration - 0.4)) {
      return {
        key: 'final',
        text: voiceLetterMeta.finalClosingMessage,
        isFinal: true
      };
    }

    // Exact active phrase according to currentTime
    const active = voiceCaptions.find(c => currentTime >= c.start && currentTime < c.end);
    if (active) {
      return {
        key: `caption-${active.id}`,
        id: active.id,
        text: active.text,
        isFinal: false
      };
    }

    // Before first spoken line (0 to 2.0s)
    if (currentTime < voiceCaptions[0].start) {
      return {
        key: 'pre-speech',
        text: isPlaying ? "..." : "Tap play to listen to my voice letter...",
        isIntro: true
      };
    }

    // Natural pause retention: keep previous phrase visible until next phrase starts
    const prev = [...voiceCaptions].reverse().find(c => currentTime >= c.start);
    if (prev) {
      return {
        key: `caption-${prev.id}`,
        id: prev.id,
        text: prev.text,
        isFinal: false
      };
    }

    return null;
  };

  const activeCaption = getActiveCaption();
  const progressPercent = duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0;

  return (
    <section
      id="voice-note"
      className="relative py-20 sm:py-28 px-4 sm:px-6 bg-vintage-ivory overflow-hidden flex items-center justify-center border-t border-vintage-champagne/40"
      aria-label="A Voice Letter in my own voice"
    >
      {/* Delicate warm ambient lighting bloom */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-vintage-blush/25 rounded-full blur-[110px] pointer-events-none" />

      <div className="relative max-w-2xl mx-auto w-full z-10">
        
        {/* Section Header */}
        <SectionReveal className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-vintage-paper border border-vintage-champagne/70 shadow-xs text-vintage-dusty text-xs font-sans uppercase tracking-widest mb-3">
            <Mic className="w-3.5 h-3.5 text-vintage-rose" />
            <span>{voiceLetterMeta.badgeLabel}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-vintage-wine tracking-tight">
            A few words, in my own voice — Ibrahim
          </h2>
          <p className="font-serif italic text-base sm:text-lg text-vintage-ink/75 mt-2.5">
            {config.supportingText}
          </p>
        </SectionReveal>

        {/* Vintage Paper Keepsake Player */}
        <SectionReveal delay={0.15}>
          <div className="vintage-paper-sheet rounded-2xl p-6 sm:p-10 shadow-paper-lift relative border border-vintage-champagne/70 overflow-hidden bg-[#FAF6EE]">
            <div className="washi-tape washi-tape-rose -top-3 left-1/2 -translate-x-1/2 w-36 -rotate-1" />

            {/* Hidden Native Audio Element */}
            <audio
              ref={audioRef}
              src={audioSrc}
              onTimeUpdate={onTimeUpdate}
              onLoadedMetadata={onLoadedMetadata}
              onEnded={onEnded}
              onError={() => {
                if (audioSrc !== voiceLetterMeta.fallbackAudioSrc) {
                  setAudioSrc(voiceLetterMeta.fallbackAudioSrc);
                } else {
                  setAudioError(true);
                }
              }}
              preload="metadata"
            />

            <div className="flex flex-col items-center">
              
              {/* ── CENTER: AUDIO SOUNDWAVE VISUALIZER ── */}
              <div 
                className="w-full max-w-lg mb-6 px-2 flex flex-col items-center cursor-pointer select-none"
                onClick={togglePlayback}
                title={isPlaying ? "Pause audio" : "Play audio"}
              >
                <div className="flex items-center justify-between gap-1 sm:gap-1.5 h-16 w-full px-2 py-1 rounded-xl bg-vintage-paper/50 border border-vintage-champagne/40">
                  {baseWaveform.map((heightPercent, i) => {
                    const barProgress = (i / baseWaveform.length) * 100;
                    const isPassed = progressPercent >= barProgress;

                    // Dynamic wave animation when playing
                    const animScale = isPlaying 
                      ? [1, 1.25, 0.85, 1.15, 1][i % 5]
                      : 1;

                    return (
                      <motion.div
                        key={i}
                        animate={
                          isPlaying && !prefersReducedMotion
                            ? {
                                height: [
                                  `${heightPercent * 0.7}%`,
                                  `${Math.min(heightPercent * 1.2, 100)}%`,
                                  `${heightPercent * 0.85}%`
                                ]
                              }
                            : { height: `${heightPercent}%` }
                        }
                        transition={{
                          duration: 0.6 + (i % 4) * 0.15,
                          repeat: isPlaying ? Infinity : 0,
                          repeatType: 'reverse',
                          ease: 'easeInOut'
                        }}
                        className="flex-1 rounded-full transition-colors duration-200"
                        style={{
                          backgroundColor: isPassed
                            ? '#733E4B'
                            : isPlaying
                            ? '#C58B94'
                            : '#D6BE97',
                          opacity: isPassed ? 1 : isPlaying ? 0.75 : 0.45
                        }}
                      />
                    );
                  })}
                </div>
              </div>

              {/* ── SYNCHRONIZED ANIMATED CAPTIONS CONTAINER ── */}
              <div className="w-full min-h-[95px] sm:min-h-[110px] flex items-center justify-center text-center px-4 py-3 my-2 rounded-xl bg-vintage-ivory/80 border border-vintage-champagne/60 shadow-xs relative">
                <AnimatePresence mode="wait">
                  {activeCaption && (
                    <motion.div
                      key={activeCaption.key}
                      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="flex flex-col items-center justify-center max-w-lg"
                    >
                      {activeCaption.isFinal ? (
                        <div className="flex flex-col items-center gap-1.5">
                          <div className="flex items-center gap-1.5 text-vintage-rose text-xs font-serif italic mb-1">
                            <Sparkles className="w-3.5 h-3.5 fill-vintage-rose/30" />
                            <span>Voice Letter Complete</span>
                          </div>
                          <p className="font-serif italic text-xl sm:text-2xl md:text-3xl font-bold text-vintage-wine tracking-tight leading-snug">
                            "{activeCaption.text}"
                          </p>
                        </div>
                      ) : activeCaption.isIntro ? (
                        <p className="font-serif italic text-sm sm:text-base text-vintage-dusty">
                          {activeCaption.text}
                        </p>
                      ) : (
                        <div className="flex flex-col items-center gap-1">
                          <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-vintage-wine font-semibold tracking-wide leading-relaxed drop-shadow-xs">
                            "{activeCaption.text}"
                          </p>
                          <span className="text-[10px] font-sans text-vintage-dusty tracking-widest uppercase mt-0.5">
                            {activeCaption.id} of {voiceCaptions.length}
                          </span>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ── SCRUBBER & TIMESTAMPS ── */}
              <div className="w-full max-w-lg mt-5 mb-2 px-1">
                {/* Interactive Scrubber Slider */}
                <div className="relative w-full flex items-center group">
                  <input
                    type="range"
                    min="0"
                    max={duration || 43.34}
                    step="0.05"
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-2 bg-vintage-champagne/60 rounded-lg appearance-none cursor-pointer accent-vintage-wine focus:outline-none focus:ring-2 focus:ring-vintage-rose/40"
                    aria-label="Seek voice recording playback"
                  />
                </div>

                {/* Timestamps */}
                <div className="w-full flex justify-between items-center font-sans text-xs text-vintage-dusty tracking-wider mt-2">
                  <span className="font-mono text-[11px] text-vintage-ink/80 font-medium">
                    {formatTime(currentTime)}
                  </span>
                  <span className="font-serif italic text-xs text-vintage-dusty">
                    {isPlaying ? 'Playing spoken voice note...' : isEnded ? 'Ended' : 'Ready to listen'}
                  </span>
                  <span className="font-mono text-[11px] text-vintage-ink/80 font-medium">
                    {formatTime(duration)}
                  </span>
                </div>
              </div>

              {/* ── BOTTOM CONTROLS: PLAY/PAUSE & REPLAY ── */}
              <div className="flex items-center justify-center gap-5 mt-4">
                
                {/* Replay Button */}
                <button
                  type="button"
                  onClick={handleReplay}
                  className="p-3 rounded-full text-vintage-dusty hover:text-vintage-wine hover:bg-vintage-paper transition-all duration-200 border border-vintage-champagne/50 shadow-xs focus:outline-none focus:ring-2 focus:ring-vintage-rose/30"
                  aria-label="Replay voice recording from start"
                  title="Replay from start"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Primary Play / Pause Button */}
                <button
                  type="button"
                  onClick={togglePlayback}
                  className="w-16 h-16 rounded-full flex items-center justify-center bg-vintage-wine text-vintage-ivory hover:bg-vintage-espresso hover:scale-105 active:scale-95 transition-all duration-300 shadow-paper-lg focus:outline-none focus:ring-4 focus:ring-vintage-rose/30"
                  aria-label={isPlaying ? "Pause voice recording" : "Play my voice recording"}
                >
                  {isPlaying ? (
                    <Pause className="w-7 h-7 fill-current" />
                  ) : (
                    <Play className="w-7 h-7 fill-current ml-1" />
                  )}
                </button>

                {/* Subtle Voice Indicator Badge */}
                <div 
                  className="p-3 rounded-full text-vintage-dusty border border-vintage-champagne/40 bg-vintage-paper/50"
                  title="Voice letter recording"
                >
                  <Volume2 className={`w-4 h-4 ${isPlaying ? 'text-vintage-rose animate-pulse' : 'text-vintage-dusty'}`} />
                </div>
              </div>

              {/* Small Note */}
              <p className="font-handwriting text-base sm:text-lg text-vintage-dusty mt-6 text-center select-none">
                "{voiceLetterMeta.disclaimer}"
              </p>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
