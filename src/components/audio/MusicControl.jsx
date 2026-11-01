import React from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';
import { trackInteraction } from '../../utils/analytics';

export default function MusicControl() {
  const { isMusicPlaying, isMuted, toggleMusic, toggleMute } = useAudio();

  const handleToggleMusic = () => {
    const nextPlaying = !isMusicPlaying;
    toggleMusic();
    trackInteraction(nextPlaying ? 'music_enabled' : 'music_disabled');
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    toggleMute();
    trackInteraction(nextMuted ? 'music_muted' : 'music_unmuted');
  };

  return (
    <div className="fixed top-4 right-4 z-40 flex items-center gap-2 select-none">
      <button
        onClick={handleToggleMusic}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border shadow-paper transition-all duration-300 backdrop-blur-md ${
          isMusicPlaying && !isMuted
            ? 'bg-vintage-wine text-vintage-ivory border-vintage-wine ring-2 ring-vintage-dusty/40 scale-102'
            : 'bg-vintage-ivory/90 hover:bg-vintage-ivory text-vintage-espresso border-vintage-champagne/70'
        }`}
        aria-label={isMusicPlaying && !isMuted ? 'Pause background music' : 'Play background music'}
        title={isMusicPlaying && !isMuted ? 'Pause background music' : 'Play romantic music'}
      >
        {isMusicPlaying && !isMuted ? (
          <>
            <span className="flex items-center gap-0.5 h-3">
              <span className="w-0.5 h-3 bg-vintage-champagne animate-[bounce_1s_infinite_100ms] rounded-full" />
              <span className="w-0.5 h-2 bg-vintage-champagne animate-[bounce_1s_infinite_300ms] rounded-full" />
              <span className="w-0.5 h-3.5 bg-vintage-champagne animate-[bounce_1s_infinite_200ms] rounded-full" />
            </span>
            <span className="text-[11px] font-serif tracking-wider hidden sm:inline">Music on</span>
          </>
        ) : (
          <>
            <Music className="w-3.5 h-3.5 text-vintage-rose" />
            <span className="text-[11px] font-serif tracking-wider hidden sm:inline">Music off</span>
          </>
        )}
      </button>

      {/* Quick Mute Toggle */}
      <button
        onClick={handleToggleMute}
        className="p-1.5 rounded-full bg-vintage-ivory/90 hover:bg-vintage-ivory text-vintage-espresso border border-vintage-champagne/70 shadow-sm"
        aria-label={isMuted ? "Unmute all sound" : "Mute all sound"}
        title={isMuted ? "Unmute sound" : "Mute all sound"}
      >
        {isMuted ? (
          <VolumeX className="w-3.5 h-3.5 text-vintage-dusty" />
        ) : (
          <Volume2 className="w-3.5 h-3.5 text-vintage-wine" />
        )}
      </button>
    </div>
  );
}
