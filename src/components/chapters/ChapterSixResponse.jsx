import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { storyConfig } from '../../data/storyConfig';
import { useAudio } from '../../context/AudioContext';
import { CheckCircle2, Heart, ArrowDown, Send } from 'lucide-react';
import SectionReveal from '../effects/SectionReveal';

export default function ChapterSixResponse({ isCompleted = false, onComplete }) {
  const [responseMessage, setResponseMessage] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [validationError, setValidationError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(isCompleted);

  const { playSound } = useAudio();
  const config = storyConfig.chapterSix;

  const handleSelectPrompt = (prompt) => {
    setSelectedPrompt(prompt);
    setValidationError('');
    if (prompt === config.optOutText) {
      setResponseMessage(config.optOutText);
    } else if (prompt !== "Something else...") {
      // If user clicks a prompt, fill or append it
      setResponseMessage(prev => prev ? `${prev} ${prompt}` : prompt);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = responseMessage.trim();

    if (!trimmed && !selectedPrompt) {
      setValidationError("Please share a few words or select an option above before we turn the page.");
      playSound('characterPop');
      return;
    }

    setValidationError('');
    setIsSubmitting(true);
    playSound('paperUnfold');

    setTimeout(() => {
      setIsSubmitting(false);
      setHasSubmitted(true);
      playSound('flowerBurst');
      if (onComplete) {
        onComplete(trimmed || selectedPrompt);
      }
    }, 600);
  };

  const handleContinueToNext = () => {
    const el = document.getElementById('voice-note');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="chapter-six"
      className="relative min-h-[90vh] py-24 px-4 sm:px-6 bg-vintage-paper flex items-center justify-center overflow-hidden"
      aria-label="Chapter 6 Mandatory Reflection"
    >
      {/* Background soft ambient gradient */}
      <div className="absolute inset-0 bg-radial-vignette opacity-20 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 bg-vintage-blush/25 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-2xl mx-auto w-full z-10">
        
        {/* Section Header */}
        <SectionReveal className="text-center mb-10">
          <span className="font-handwriting text-2xl text-vintage-rose tracking-wider block mb-1">
            chapter six · your reflection
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-vintage-wine">
            {config.heading}
          </h2>
          <p className="font-serif italic text-base sm:text-lg text-vintage-ink/80 mt-3 max-w-lg mx-auto">
            {config.subtitle}
          </p>
        </SectionReveal>

        {/* Vintage Paper Card Form */}
        <SectionReveal delay={0.2}>
          <div className="vintage-paper-sheet deckled-edge rounded-lg p-6 sm:p-10 shadow-paper-lift relative">
            {/* Top Washi Tape */}
            <div className="washi-tape washi-tape-rose -top-3 left-1/2 -translate-x-1/2 w-36 -rotate-1" />

            {/* Prompt Question */}
            <div className="mb-6">
              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-vintage-wine mb-2">
                "{config.question}"
              </h3>
              <p className="font-body text-xs sm:text-sm text-vintage-dusty">
                Take your time. Your honest thoughts help me understand what truly matters to you.
              </p>
            </div>

            {!hasSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Quick Selectable Prompts Chips */}
                <div>
                  <span className="block font-sans text-xs uppercase tracking-wider text-vintage-ink/70 mb-2.5">
                    Quick thought suggestions:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {config.prompts.map((p, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => handleSelectPrompt(p)}
                        className={`text-xs font-serif px-3 py-1.5 rounded-full border transition-all ${
                          selectedPrompt === p
                            ? 'bg-vintage-wine text-vintage-ivory border-vintage-wine'
                            : 'bg-vintage-ivory/80 text-vintage-ink hover:bg-vintage-blush/40 border-vintage-champagne/70'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Multiline Textarea */}
                <div className="relative">
                  <textarea
                    rows={4}
                    value={responseMessage}
                    onChange={(e) => {
                      setResponseMessage(e.target.value);
                      if (validationError) setValidationError('');
                    }}
                    placeholder="Write your honest thoughts here..."
                    className="w-full p-4 rounded-md bg-vintage-ivory border border-vintage-champagne/80 text-vintage-ink font-body text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-vintage-rose/50 shadow-inner resize-none placeholder:text-vintage-dusty/60"
                  />
                  <div className="flex justify-between items-center text-[11px] text-vintage-dusty px-1 mt-1 font-serif">
                    <span>Private reflection</span>
                    <span>{responseMessage.length} characters</span>
                  </div>
                </div>

                {/* Honest Opt-out choice */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => handleSelectPrompt(config.optOutText)}
                    className={`text-xs font-serif italic underline-offset-4 hover:underline transition-colors ${
                      selectedPrompt === config.optOutText ? 'text-vintage-wine font-semibold' : 'text-vintage-dusty'
                    }`}
                  >
                    "{config.optOutText}"
                  </button>
                </div>

                {/* Validation Error Message */}
                {validationError && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded bg-amber-50 border border-amber-200 text-amber-800 text-xs font-serif"
                  >
                    {validationError}
                  </motion.div>
                )}

                {/* Submit Action Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-vintage-wine hover:bg-vintage-espresso text-vintage-ivory font-serif text-sm sm:text-base tracking-wider uppercase transition-all shadow-paper hover:shadow-paper-lg"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? "Sharing thoughts..." : "Share With Ibrahim & Unlock Next Page"}</span>
                  </button>
                </div>
              </form>
            ) : (
              /* Success & Acknowledgement State */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-6 text-center space-y-4"
              >
                <div className="w-12 h-12 mx-auto rounded-full bg-vintage-blush/50 border border-vintage-rose/40 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-vintage-rose" />
                </div>

                <h4 className="font-serif text-2xl font-bold text-vintage-wine">
                  {config.successMessage}
                </h4>

                {responseMessage && (
                  <div className="p-4 rounded bg-vintage-blush/20 border border-vintage-rose/20 text-vintage-ink font-handwriting text-xl max-w-md mx-auto text-left">
                    “{responseMessage}”
                  </div>
                )}

                <p className="font-serif italic text-xs text-vintage-dusty max-w-sm mx-auto">
                  Your words are held with utmost care. You can now proceed to the next chapter.
                </p>

                <div className="pt-4">
                  <button
                    onClick={handleContinueToNext}
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-vintage-wine hover:bg-vintage-espresso text-vintage-ivory font-serif text-sm tracking-widest uppercase shadow-paper hover:shadow-paper-lg transition-all"
                  >
                    <span>{config.continueButtonText}</span>
                    <ArrowDown className="w-4 h-4 animate-bounce" />
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
