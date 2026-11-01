import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import { storyConfig } from '../data/storyConfig';

const AudioContext = createContext(null);

export function AudioProvider({ children }) {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const bgMusicRef = useRef(null);
  const audioCtxRef = useRef(null);
  const soundCache = useRef({});
  const isDuckedRef = useRef(false);

  // Initialize or resume Web Audio Context
  const getAudioContext = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!audioCtxRef.current && AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume().catch(() => {});
      }
      return audioCtxRef.current;
    } catch {
      return null;
    }
  }, []);

  // Web Audio Synthesizer Fallbacks (zero failure tolerance)
  const synthSound = useCallback((type) => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'waxSeal') {
        // Soft subtle seal crack
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(680, now);
        osc.frequency.exponentialRampToValueAtTime(140, now + 0.15);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === 'envelopeOpen' || type === 'paperUnfold') {
        // Soft whisper paper swoosh
        osc.type = 'sine';
        osc.frequency.setValueAtTime(260, now);
        osc.frequency.linearRampToValueAtTime(160, now + 0.35);
        gain.gain.setValueAtTime(0.10, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
        osc.start(now);
        osc.stop(now + 0.4);
      } else if (type === 'flowerBurst') {
        // Magical pentatonic sparkles
        const freqs = [523.25, 659.25, 783.99, 1046.50, 1318.51];
        freqs.forEach((f, idx) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.type = 'sine';
          o.frequency.setValueAtTime(f, now + idx * 0.06);
          g.gain.setValueAtTime(0.18, now + idx * 0.06);
          g.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.45);
          o.connect(g);
          g.connect(ctx.destination);
          o.start(now + idx * 0.06);
          o.stop(now + idx * 0.06 + 0.5);
        });
      } else if (type === 'characterPop') {
        // Cute marimba pop
        osc.type = 'sine';
        osc.frequency.setValueAtTime(660, now);
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.15);
        gain.gain.setValueAtTime(0.28, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === 'softTransition') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.5);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
        osc.start(now);
        osc.stop(now + 0.65);
      }
    } catch {
      // Safe fallback
    }
  }, [getAudioContext, isMuted]);

  // Reusable sound effect player
  const playSound = useCallback((name) => {
    if (isMuted) return;

    const audioUrl = storyConfig.audio[name];
    if (!audioUrl) {
      synthSound(name);
      return;
    }

    try {
      let audio = soundCache.current[name];
      if (!audio) {
        audio = new Audio(audioUrl);
        soundCache.current[name] = audio;
      }

      const volMap = {
        waxSeal: storyConfig.audioSettings.envelopeVolume,
        envelopeOpen: storyConfig.audioSettings.envelopeVolume,
        paperUnfold: storyConfig.audioSettings.envelopeVolume,
        flowerBurst: storyConfig.audioSettings.flowerVolume,
        characterPop: storyConfig.audioSettings.characterVolume,
        softTransition: 0.3,
      };

      audio.volume = volMap[name] || 0.3;
      audio.currentTime = 0;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser policy rejects audio element playback, use Web Audio API synth
          synthSound(name);
        });
      }
    } catch {
      synthSound(name);
    }
  }, [isMuted, synthSound]);

  // Start background music
  const startBackgroundMusic = useCallback(() => {
    if (isMuted) return;

    if (!bgMusicRef.current) {
      const audio = new Audio(storyConfig.audio.backgroundMusic);
      audio.loop = true;
      audio.volume = storyConfig.audioSettings.backgroundVolume;
      bgMusicRef.current = audio;
    }

    const audio = bgMusicRef.current;
    audio.volume = isDuckedRef.current 
      ? 0.08 
      : storyConfig.audioSettings.backgroundVolume;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsMusicPlaying(true);
        })
        .catch(() => {
          // Autoplay was blocked, will wait for user interaction
          setIsMusicPlaying(false);
        });
    }
  }, [isMuted]);

  // Pause background music
  const pauseBackgroundMusic = useCallback(() => {
    if (bgMusicRef.current) {
      bgMusicRef.current.pause();
    }
    setIsMusicPlaying(false);
  }, []);

  // Toggle background music
  const toggleMusic = useCallback(() => {
    if (isMusicPlaying) {
      pauseBackgroundMusic();
    } else {
      startBackgroundMusic();
    }
  }, [isMusicPlaying, pauseBackgroundMusic, startBackgroundMusic]);

  // Toggle global mute
  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const nextMuted = !prev;
      if (bgMusicRef.current) {
        bgMusicRef.current.muted = nextMuted;
        if (!nextMuted && !bgMusicRef.current.paused) {
          setIsMusicPlaying(true);
        } else if (nextMuted) {
          setIsMusicPlaying(false);
        }
      }
      return nextMuted;
    });
  }, []);

  // Duck music when voice note plays
  const duckBackgroundMusic = useCallback((duck) => {
    isDuckedRef.current = duck;
    if (bgMusicRef.current && isMusicPlaying) {
      bgMusicRef.current.volume = duck 
        ? 0.06 
        : storyConfig.audioSettings.backgroundVolume;
    }
  }, [isMusicPlaying]);

  // Attempt initial autoplay + listen for first user interaction
  useEffect(() => {
    // Attempt 1: Automatic playback on load
    startBackgroundMusic();

    // Attempt 2: If autoplay blocked, trigger on first user click or tap anywhere
    const handleFirstInteraction = () => {
      setHasInteracted(true);
      getAudioContext();
      if (!isMusicPlaying && !isMuted) {
        startBackgroundMusic();
      }
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction, { passive: true });
    window.addEventListener('touchstart', handleFirstInteraction, { passive: true });
    window.addEventListener('keydown', handleFirstInteraction, { passive: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
      }
    };
  }, [startBackgroundMusic, isMusicPlaying, isMuted, getAudioContext]);

  return (
    <AudioContext.Provider
      value={{
        isMusicPlaying,
        isMuted,
        hasInteracted,
        startBackgroundMusic,
        pauseBackgroundMusic,
        toggleMusic,
        toggleMute,
        playSound,
        duckBackgroundMusic,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
