import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import EnvelopeOpening from './components/intro/EnvelopeOpening';
import CinematicHero from './components/hero/CinematicHero';
import TheBeginning from './components/story/TheBeginning';
import TheBoschMemories from './components/story/TheBoschMemories';
import TheEvening from './components/story/TheEvening';
import TheDreams from './components/story/TheDreams';
import TheMessageIn2026 from './components/story/TheMessageIn2026';
import UnansweredFeelings from './components/story/UnansweredFeelings';
import OptionalReflection from './components/story/OptionalReflection';
import ApologyLetter from './components/story/ApologyLetter';
import VoiceNotePlayer from './components/story/VoiceNotePlayer';
import FinalLetterClimax from './components/story/FinalLetterClimax';
import RoseGarden from './components/ending/RoseGarden';
import FloatingPetals from './components/effects/FloatingPetals';
import FloatingHearts from './components/effects/FloatingHearts';
import ReadingProgress from './components/effects/ReadingProgress';
import MusicControl from './components/audio/MusicControl';
import ScrapbookCompanion from './components/character/ScrapbookCompanion';
import RosiePopLetter from './components/RosieMessage/RosiePopLetter';
import PrivacyNotice from './components/effects/PrivacyNotice';
import { AudioProvider } from './context/AudioContext';
import { useScrollProgress } from './hooks/useScrollProgress';
import { initAnalytics, setupStorySectionObservers } from './utils/analytics';

const sectionList = [
  'hero',
  'beginning',
  'bosch-memories',
  'evening',
  'dreams',
  'message-2026',
  'unanswered-feelings',
  'reflection',
  'apology-letter',
  'voice-note',
  'final-letter',
  'closing'
];

const observableSectionIds = [
  'hero',
  'scene-1',
  'scene-2',
  'scene-3',
  'scene-4',
  'scene-5',
  'scene-6',
  'scene-7',
  'scene-8',
  'scene-9',
  'scene-10',
  'unanswered-feelings',
  'reflection',
  'apology-letter',
  'voice-note',
  'final-letter',
  'closing'
];

function MainContent() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  const { activeSection } = useScrollProgress(sectionList);

  // Initialize Umami Analytics once on page mount
  useEffect(() => {
    initAnalytics();
  }, []);

  // Set up 50% threshold observers for all story scenes and sections when envelope opens
  useEffect(() => {
    if (!isEnvelopeOpen) return;

    // Small delay to ensure all DOM elements are mounted and laid out
    const timer = setTimeout(() => {
      const cleanup = setupStorySectionObservers(observableSectionIds);
      return cleanup;
    }, 200);

    return () => clearTimeout(timer);
  }, [isEnvelopeOpen]);

  const handleOpenComplete = () => {
    setIsEnvelopeOpen(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleReplay = () => {
    setIsEnvelopeOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBeginStory = () => {
    const el = document.getElementById('beginning');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-vintage-paper text-vintage-ink selection:bg-vintage-dusty/30 selection:text-vintage-espresso overflow-x-hidden">
      
      {/* Global Ambient Background Music Controller */}
      <MusicControl />

      {/* SECTION 01 — ENVELOPE INTRODUCTION */}
      <AnimatePresence mode="wait">
        {!isEnvelopeOpen && (
          <EnvelopeOpening 
            key="envelope"
            onOpenComplete={handleOpenComplete} 
          />
        )}
      </AnimatePresence>

      {/* MAIN CINEMATIC STORY EXPERIENCE */}
      {isEnvelopeOpen && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
          className="relative"
        >
          {/* Subtle Ambient Floating Petals & Soft Floating Hearts throughout story */}
          <FloatingPetals count={8} />
          <FloatingHearts count={6} />

          {/* Reading Progress Indicator */}
          <ReadingProgress />

          {/* Cute Animated Companion Mascot (Rosie) */}
          <ScrapbookCompanion
            currentChapter={activeSection || 'hero'}
          />

          {/* Special Written Letter Sent by Rosie (pops up on screen after 4-5s) */}
          <RosiePopLetter />

          {/* SECTION 02 — CINEMATIC HERO */}
          <CinematicHero onReadStory={handleBeginStory} />

          {/* SECTION 03 — THE BEGINNING (Scenes 01 & 02) */}
          <TheBeginning />

          {/* SECTION 04 — THE BOSCH MEMORIES (Scenes 03, 04, 05, 06, 07) */}
          <TheBoschMemories />

          {/* SECTION 05 — THE EVENING (Scene 08) */}
          <TheEvening />

          {/* SECTION 06 — THE DREAMS (Scene 09) */}
          <TheDreams />

          {/* SECTION 07 — THE MESSAGE IN 2026 (Scene 10) */}
          <TheMessageIn2026 />

          {/* SECTION 08 — THE UNANSWERED FEELINGS */}
          <UnansweredFeelings />

          {/* OPTIONAL REFLECTION SPACE (Non-blocking) */}
          <OptionalReflection />

          {/* SECTION 09 — THE APOLOGY / PERSONAL LETTER ("What I Wanted to Say") */}
          <ApologyLetter />

          {/* SECTION 10 — PERSONAL VOICE NOTE ("A few words, in my own voice — Ibrahim") */}
          <VoiceNotePlayer />

          {/* SECTION 11 — FINAL LETTER ("Before You Close This Letter" -> "Thank you for being you, Ananya.") */}
          <FinalLetterClimax />

          {/* SECTION 12 — FINAL VISUAL SURPRISE & REVISIT OPTION */}
          <RoseGarden onReplay={handleReplay} />

          {/* Privacy & Analytics disclosure & opt-out toggle */}
          <PrivacyNotice />
        </motion.main>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AudioProvider>
      <MainContent />
    </AudioProvider>
  );
}
