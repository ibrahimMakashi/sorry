import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WaxSeal from './WaxSeal';
import FloatingPetals from '../effects/FloatingPetals';
import FloatingHearts from '../effects/FloatingHearts';
import AnanyaName from '../effects/AnanyaName';
import IbrahimName from '../effects/IbrahimName';
import FlyingCompanion from './FlyingCompanion';
import RosieMessage from '../RosieMessage/RosieMessage';
import { storyConfig } from '../../data/storyConfig';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useAudio } from '../../context/AudioContext';
import { trackSectionView, trackInteraction } from '../../utils/analytics';
import { ArrowRight, Heart, Sparkles } from 'lucide-react';

export default function EnvelopeOpening({ onOpenComplete }) {
  // Explicit state machine: 'closed' | 'opening' | 'opened' | 'transitioning'
  const [envelopeState, setEnvelopeState] = useState('closed');
  const [isRosieSpecialActive, setIsRosieSpecialActive] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { playSound, startBackgroundMusic } = useAudio();

  useEffect(() => {
    trackSectionView('envelope');
  }, []);

  const handleOpenEnvelope = () => {
    if (envelopeState !== 'closed') return;

    trackInteraction('envelope_opened');
    // Start background music seamlessly on user gesture
    startBackgroundMusic();
    // Play softened envelope sound effects
    playSound('waxSeal');
    setTimeout(() => {
      playSound('envelopeOpen');
    }, 240);

    if (prefersReducedMotion) {
      setEnvelopeState('opened');
      return;
    }

    setEnvelopeState('opening');

    // Flap folds open, then letter glides out and envelope stays opened
    setTimeout(() => {
      setEnvelopeState('opened');
      playSound('paperUnfold');
    }, 1200);
  };

  const handleNext = () => {
    if (envelopeState !== 'opened') return;
    playSound('softTransition');
    setEnvelopeState('transitioning');

    setTimeout(() => {
      onOpenComplete();
    }, 650);
  };

  const handleSkip = () => {
    startBackgroundMusic();
    setEnvelopeState('transitioning');
    onOpenComplete();
  };

  const isOpen = envelopeState === 'opening' || envelopeState === 'opened' || envelopeState === 'transitioning';

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: envelopeState === 'transitioning' ? 0 : 1 }}
      exit={{ opacity: 0, transition: { duration: 0.7, ease: 'easeInOut' } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-vintage-paper px-4 py-6 overflow-hidden select-none"
      aria-label="Opening envelope"
    >
      {/* Background vignette & ambient glow */}
      <div className="absolute inset-0 bg-radial-vignette opacity-25 pointer-events-none" />
      <div className="absolute w-[320px] h-[320px] md:w-[500px] md:h-[500px] rounded-full bg-vintage-blush/30 blur-3xl pointer-events-none animate-glow" />

      {/* Floating Petals & Soft Floating Hearts */}
      <FloatingPetals count={9} />
      <FloatingHearts count={6} />

      {/* Skip button for accessibility */}
      <button
        onClick={handleSkip}
        className="absolute top-5 right-5 z-40 text-xs font-sans tracking-widest text-vintage-ink/60 hover:text-vintage-rose transition-colors py-1.5 px-3.5 rounded-full border border-vintage-champagne/40 bg-vintage-ivory/60 backdrop-blur-sm shadow-sm"
        aria-label="Skip envelope animation directly to letter"
      >
        SKIP TO STORY &rarr;
      </button>

      {/* Flying Companion Mascot (Rosie) - moves to bottom right when opened so she never overlaps the letter! */}
      {!isRosieSpecialActive && <FlyingCompanion envelopeState={envelopeState} />}

      {/* Rosie Special Animated Message (Feature 2) */}
      <RosieMessage
        envelopeState={envelopeState}
        onVisibleChange={setIsRosieSpecialActive}
        onDismiss={() => setIsRosieSpecialActive(false)}
      />

      {/* Top subtle hint: FADES OUT COMPLETELY when envelope is opened so it NEVER overlaps the letter! */}
      <div className="relative z-20 flex flex-col items-center mb-4 sm:mb-6 w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{
            opacity: isOpen ? 0 : 1,
            y: isOpen ? -30 : 0,
            pointerEvents: isOpen ? 'none' : 'auto',
          }}
          transition={{ duration: 0.4 }}
          className="text-center mt-6 sm:mt-8"
        >
          <span className="font-handwriting text-2xl sm:text-3xl text-vintage-rose tracking-wide block">
            A handwritten keepsake
          </span>
        </motion.div>
      </div>

      {/* Envelope Stage Container */}
      <div className="relative envelope-wrapper w-full max-w-[315px] sm:max-w-[385px] md:max-w-[440px] h-[215px] sm:h-[245px] md:h-[265px] flex items-center justify-center z-20 mt-2 sm:mt-4">
        
        {/* Envelope Structure */}
        <div 
          onClick={envelopeState === 'closed' ? handleOpenEnvelope : undefined}
          className={`relative w-full h-full rounded-lg shadow-paper-lift border border-[#D8C7B0] ${
            envelopeState === 'closed' ? 'cursor-pointer hover:shadow-paper-lg transition-shadow duration-300' : ''
          }`}
          style={{ perspective: 1200 }}
        >
          {/* LAYER 1: Deep Envelope Interior Cavity (Back) */}
          <div className="absolute inset-0 bg-[#E5D7C2] rounded-lg shadow-inner z-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#C8B8A0] via-[#D8C9B4] to-[#E8DCCB] opacity-80" />
          </div>

          {/* LAYER 2: Top Triangular Flap (Folds open upward in 3D) */}
          <motion.div
            initial={false}
            animate={{
              rotateX: isOpen ? 180 : 0,
              zIndex: isOpen ? 5 : 35,
            }}
            transition={{
              duration: prefersReducedMotion ? 0.2 : 0.8,
              ease: [0.4, 0, 0.2, 1],
            }}
            style={{ transformOrigin: 'top center', transformStyle: 'preserve-3d' }}
            className="absolute top-0 left-0 w-full h-[50%] overflow-visible pointer-events-none"
          >
            {/* The triangular paper flap */}
            <svg 
              className="w-full h-full filter drop-shadow-md" 
              viewBox="0 0 400 135" 
              preserveAspectRatio="none"
            >
              <polygon points="0,0 400,0 200,135" fill="#E8DCCB" stroke="#D3C1A8" strokeWidth="1" />
            </svg>

            {/* Wax Seal placed at flap apex (Gently fades out when flap folds back so it never clips at top) */}
            <motion.div
              animate={{ opacity: isOpen ? 0 : 1 }}
              transition={{ duration: 0.35 }}
              className="absolute bottom-[-22px] left-1/2 -translate-x-1/2 pointer-events-auto"
            >
              <WaxSeal onClick={handleOpenEnvelope} isOpen={isOpen} />
            </motion.div>
          </motion.div>

          {/* LAYER 3: The Handcrafted Letter Note (Emerges and shines cleanly in the spotlight) */}
          <motion.div
            initial={{ y: 0, opacity: 0 }}
            animate={
              isOpen
                ? { y: -135, opacity: 1, scale: 1.02, rotate: -0.7 }
                : { y: 0, opacity: 0, scale: 0.95 }
            }
            transition={{
              delay: prefersReducedMotion ? 0 : 0.45,
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute left-2.5 right-2.5 sm:left-4 sm:right-4 top-2 sm:top-3 h-[96%] sm:h-[98%] bg-[#FBF7EF] rounded-md shadow-paper-lift border border-[#D6BE97]/80 p-4 sm:p-5 flex flex-col justify-between z-30"
          >
            {/* Washi tape at top of the letter */}
            <div className="washi-tape washi-tape-rose -top-2.5 left-1/2 -translate-x-1/2 w-28 -rotate-1" />

            <div>
              {/* Note Header */}
              <div className="flex justify-between items-center border-b border-vintage-blush pb-1.5 mb-2.5">
                <span className="font-serif italic text-[11px] sm:text-xs text-vintage-dusty">
                  From <IbrahimName className="text-vintage-rose font-medium">Ibrahim</IbrahimName>
                </span>
                <span className="font-serif text-[10px] sm:text-[11px] text-vintage-dusty">
                  For <AnanyaName className="text-vintage-rose font-medium">Ananya</AnanyaName>
                </span>
              </div>

              {/* Salutation */}
              <h3 className="font-serif text-lg sm:text-xl text-vintage-wine font-semibold">
                Dear <AnanyaName>Ananya</AnanyaName>,
              </h3>

              {/* Note Body */}
              <p className="font-handwriting text-sm sm:text-base text-vintage-ink mt-2 leading-relaxed">
                I made this for you, because some words deserve more than a quick message...
              </p>
            </div>

            {/* Note Footer with delicate dried flower */}
            <div className="flex justify-between items-center text-xs text-vintage-dusty font-serif italic pt-2 border-t border-vintage-champagne/40">
              <span className="font-handwriting text-vintage-rose/90 text-sm">
                take your time reading ♡
              </span>
              <div className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-vintage-rose fill-vintage-rose/30" />
              </div>
            </div>
          </motion.div>

          {/* LAYER 4: Front Envelope Pocket Folds */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 400 250" preserveAspectRatio="none">
              {/* Left fold triangle */}
              <polygon points="0,0 180,125 0,250" fill="#E2D4BE" opacity="0.92" />
              {/* Right fold triangle */}
              <polygon points="400,0 220,125 400,250" fill="#DDD0B8" opacity="0.92" />
              {/* Bottom fold triangle */}
              <polygon points="0,250 400,250 200,120" fill="#EAE0CE" stroke="#D3C1A8" strokeWidth="1" />
            </svg>
          </div>

          {/* LAYER 5: VINTAGE CROCHET / LACE RIBBON BAND ACROSS ENVELOPE (MATCHING SCRAPBOOK PHOTO) */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: isOpen ? 0 : 1 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 z-25 pointer-events-none"
          >
            {/* Horizontal Vintage Crochet Lace Ribbon Band */}
            <div className="absolute top-[61%] left-0 right-0 h-6 -translate-y-1/2 flex items-center shadow-xs overflow-hidden">
              {/* Repeating SVG Antique Crochet Eyelet Lace Pattern */}
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 24">
                <defs>
                  <pattern id="crochetLacePattern" width="24" height="24" patternUnits="userSpaceOnUse">
                    {/* Lace base ribbon */}
                    <rect width="24" height="24" fill="#F7F1E4" opacity="0.95" />
                    {/* Top scalloped lace loops */}
                    <path d="M 0,0 Q 6,4 12,0 Q 18,4 24,0" stroke="#DFCBB2" strokeWidth="1.2" fill="none" />
                    {/* Bottom scalloped lace loops */}
                    <path d="M 0,24 Q 6,20 12,24 Q 18,20 24,24" stroke="#DFCBB2" strokeWidth="1.2" fill="none" />
                    {/* Center eyelet diamond flower cutouts */}
                    <circle cx="6" cy="12" r="2.2" fill="#EADBC6" />
                    <circle cx="18" cy="12" r="2.2" fill="#EADBC6" />
                    <circle cx="12" cy="7" r="1.5" fill="#EADBC6" />
                    <circle cx="12" cy="17" r="1.5" fill="#EADBC6" />
                    {/* Lace mesh crisscross thread texture */}
                    <line x1="0" y1="6" x2="24" y2="18" stroke="#D8C4A9" strokeWidth="0.6" strokeDasharray="1 2" opacity="0.6" />
                    <line x1="0" y1="18" x2="24" y2="6" stroke="#D8C4A9" strokeWidth="0.6" strokeDasharray="1 2" opacity="0.6" />
                  </pattern>
                </defs>
                <rect width="100%" height="24" fill="url(#crochetLacePattern)" />
              </svg>
            </div>

            {/* Delicate Tied Crochet Lace Bow (Matches the bow in the reference image) */}
            <div className="absolute top-[61%] left-[38%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center filter drop-shadow-sm">
              <svg width="48" height="42" viewBox="0 0 60 50" fill="none">
                {/* Bow left loop (crochet lace texture) */}
                <path d="M 30,22 C 14,8 4,14 12,26 C 18,32 26,24 30,22 Z" fill="#F8F3E8" stroke="#DEC8AF" strokeWidth="1.2" />
                <circle cx="16" cy="20" r="2" fill="#EADCC8" />
                {/* Bow right loop */}
                <path d="M 30,22 C 46,8 56,14 48,26 C 42,32 34,24 30,22 Z" fill="#F8F3E8" stroke="#DEC8AF" strokeWidth="1.2" />
                <circle cx="44" cy="20" r="2" fill="#EADCC8" />
                {/* Bow center knot */}
                <ellipse cx="30" cy="22" rx="4.5" ry="3.8" fill="#EFE5D3" stroke="#D2BCA0" strokeWidth="1.2" />
                {/* Left trailing lace tail */}
                <path d="M 28,24 Q 22,36 14,46 L 19,45 Q 26,36 30,26 Z" fill="#F6F0E3" stroke="#DEC8AF" strokeWidth="1" />
                {/* Right trailing lace tail */}
                <path d="M 32,24 Q 38,36 46,46 L 41,45 Q 34,36 30,26 Z" fill="#F6F0E3" stroke="#DEC8AF" strokeWidth="1" />
              </svg>
            </div>

            {/* Delicate Linen String connecting bow to the tied tag */}
            <svg className="absolute top-[61%] left-[38%] w-24 h-12 overflow-visible">
              <path d="M 0 0 Q 18 10 32 14" stroke="#D3BD9F" strokeWidth="1.5" strokeDasharray="3 1.5" fill="none" />
            </svg>
          </motion.div>

          {/* LAYER 6: TIED GIFT TAG (CLEAN TEXT ONLY, NO SEAL ON THE CARD AS REQUESTED) */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{
              opacity: isOpen ? 0 : 1,
              scale: isOpen ? 0.92 : 1,
              y: isOpen ? 10 : 0,
            }}
            transition={{ duration: 0.35 }}
            className={`absolute top-[71%] left-[54%] -translate-x-1/2 -translate-y-1/2 z-40 bg-[#FDFBF7] px-5 py-2.5 sm:px-6 sm:py-3 rounded-sm shadow-md border border-dashed border-[#C58B94]/70 transform -rotate-1.5 ${
              isOpen ? 'pointer-events-none' : 'pointer-events-auto'
            }`}
          >
            {/* Tag Eyelet Hole at top-left corner where string attaches */}
            <div className="absolute -top-1.5 left-2.5 w-2.5 h-2.5 rounded-full bg-[#E8DCB] border border-[#C58B94] shadow-inner flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-[#733E4B]" />
            </div>

            {/* Clean Text Only (No mini seal circle!) */}
            <div className="flex flex-col items-center text-center">
              <span className="text-[9px] sm:text-[10px] uppercase font-sans tracking-[0.22em] text-vintage-dusty font-semibold mb-0.5">
                Confidential & Personal
              </span>
              <span className="font-serif text-2xl sm:text-3xl text-vintage-wine font-bold tracking-wide whitespace-nowrap">
                To <AnanyaName className="text-vintage-rose hover:text-vintage-wine transition-colors">Ananya</AnanyaName> ♡
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Dynamic Interaction Controls Below Envelope */}
      <div className="text-center mt-7 sm:mt-8 z-20 min-h-[90px] flex flex-col items-center justify-center">
        {envelopeState === 'closed' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <p className="font-serif italic text-base sm:text-lg text-vintage-ink/80 mb-3">
              "{storyConfig.envelopeSubtitle}"
            </p>
            <button
              onClick={handleOpenEnvelope}
              className="group inline-flex items-center gap-2 px-7 py-2.5 rounded-full bg-vintage-wine text-vintage-ivory font-sans text-xs tracking-widest uppercase hover:bg-vintage-espresso transition-all duration-300 shadow-paper hover:shadow-paper-lg"
            >
              <span>{storyConfig.envelopeButtonText}</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </button>
          </motion.div>
        )}

        {envelopeState === 'opening' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-vintage-rose font-handwriting text-xl"
          >
            <Sparkles className="w-4 h-4 animate-spin text-vintage-rose" />
            <span>Unfolding your letter...</span>
          </motion.div>
        )}

        {/* STEP 2: The Envelope Stays OPEN and Displays TAP TO NEXT Button */}
        {envelopeState === 'opened' && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col items-center gap-2.5"
          >
            <p className="font-serif italic text-sm text-vintage-ink/75">
              "{storyConfig.envelopeNextSubtext}"
            </p>
            <button
              onClick={handleNext}
              className="group relative inline-flex items-center gap-3 px-8 py-3 rounded-xl bg-vintage-wine hover:bg-vintage-espresso text-vintage-ivory font-serif text-base tracking-wider uppercase shadow-paper-lg hover:shadow-paper-lift transition-all duration-300 ring-2 ring-vintage-dusty/40"
            >
              <span>{storyConfig.envelopeNextButtonText}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
