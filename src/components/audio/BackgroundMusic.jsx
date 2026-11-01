import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { storyConfig } from '../../data/storyConfig';

/**
 * Ambient background music controller with gentle tone synthesizer fallback
 * Never autoplays without explicit user interaction.
 */
export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasAudioFile, setHasAudioFile] = useState(true);
  const audioRef = useRef(null);
  const audioCtxRef = useRef(null);
  const oscIntervalRef = useRef(null);

  const config = storyConfig.backgroundMusic;

  // Gentle acoustic chord progression via Web Audio API when no file is present
  const playGentleAcousticNote = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Soft pentatonic chords (Db, F, Ab, C - warm romantic dream)
      const notes = [261.63, 329.63, 392.00, 523.25, 440.00, 349.23];
      const randomFreq = notes[Math.floor(Math.random() * notes.length)];

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(randomFreq, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 1.2);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 4.0);
    } catch {
      // Audio context restricted or unavailable
    }
  };

  const startAmbientSynth = () => {
    playGentleAcousticNote();
    oscIntervalRef.current = setInterval(() => {
      playGentleAcousticNote();
    }, 2800);
  };

  const stopAmbientSynth = () => {
    if (oscIntervalRef.current) {
      clearInterval(oscIntervalRef.current);
      oscIntervalRef.current = null;
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      if (audioRef.current && hasAudioFile) {
        audioRef.current.pause();
      }
      stopAmbientSynth();
      setIsPlaying(false);
    } else {
      if (audioRef.current && hasAudioFile) {
        audioRef.current.play().catch(() => {
          setHasAudioFile(false);
          startAmbientSynth();
        });
      } else {
        startAmbientSynth();
      }
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      stopAmbientSynth();
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  if (!config.enabled) return null;

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <audio
        ref={audioRef}
        src={config.src}
        loop
        preload="none"
        onError={() => setHasAudioFile(false)}
      />

      <button
        onClick={toggleMusic}
        className={`flex items-center gap-2 px-3 py-2 rounded-full border shadow-paper transition-all duration-300 ${
          isPlaying
            ? 'bg-vintage-wine text-vintage-ivory border-vintage-wine ring-2 ring-vintage-dusty/40 scale-105'
            : 'bg-vintage-ivory/90 hover:bg-vintage-ivory text-vintage-espresso border-vintage-champagne/60 hover:border-vintage-rose'
        }`}
        aria-label={isPlaying ? 'Pause background melody' : 'Play soft background melody'}
        title={isPlaying ? 'Pause ambient music' : 'Play soft ambient music'}
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-4 h-4 text-vintage-champagne animate-pulse" />
            <span className="text-xs font-serif tracking-wider pr-1">Soft Melody Playing</span>
          </>
        ) : (
          <>
            <Music className="w-4 h-4 text-vintage-rose" />
            <span className="text-xs font-serif tracking-wider pr-1">Play Gentle Music</span>
          </>
        )}
      </button>
    </div>
  );
}
