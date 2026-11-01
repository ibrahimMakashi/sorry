import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionReveal from '../effects/SectionReveal';
import { storyConfig } from '../../data/storyConfig';
import { sendResponseEmail } from '../../services/emailService';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Feather, CheckCircle2, ArrowDown, Loader2, AlertCircle } from 'lucide-react';

export default function OptionalReflection({ onContinue }) {
  const config = storyConfig.reflection;
  const prefersReducedMotion = useReducedMotion();

  const [selectedOption, setSelectedOption] = useState(null);
  const [status, setStatus] = useState('idle'); // 'idle' | 'preparing' | 'sending' | 'success' | 'error'
  const timerRef = useRef(null);

  // Clear any pending timer on component unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Optional safe analytics helper
  const trackAnalytics = (eventName) => {
    try {
      if (typeof window !== 'undefined' && window.umami && typeof window.umami.track === 'function') {
        window.umami.track(eventName);
      }
    } catch {
      // Safe fallback - no op
    }
  };

  const handleSelectOption = (option) => {
    if (status === 'preparing' || status === 'sending' || status === 'success') return;

    setSelectedOption(option);
    setStatus('preparing');
    trackAnalytics('response_option_selected');

    // Clear previous timer if any
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Automatically trigger the email after exactly 1 second
    timerRef.current = setTimeout(async () => {
      setStatus('sending');

      try {
        const result = await sendResponseEmail(option);

        if (result.success) {
          setStatus('success');
          trackAnalytics('response_submitted');
        } else {
          setStatus('error');
        }
      } catch {
        setStatus('error');
      }
    }, 1000);
  };

  const handleSkip = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    trackAnalytics('response_skipped');
    handleScrollDown();
  };

  const handleScrollDown = () => {
    if (onContinue) {
      onContinue();
    } else {
      const nextEl = document.getElementById('apology-letter');
      if (nextEl) nextEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isBusy = status === 'preparing' || status === 'sending';

  return (
    <section
      id="reflection"
      className="relative py-16 sm:py-24 bg-vintage-paper"
      aria-label="Optional Visitor Response"
    >
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        <SectionReveal>
          <div className="p-6 sm:p-9 rounded-2xl bg-vintage-ivory border border-vintage-champagne/70 shadow-paper relative">
            
            {/* Vintage Washi Tape Top Accent */}
            <div className="washi-tape washi-tape-champagne -top-3 left-1/2 -translate-x-1/2 w-32 -rotate-1" />

            {/* Header Badge */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-vintage-paper border border-vintage-champagne/60 text-vintage-dusty text-xs font-sans uppercase tracking-wider mb-3">
                <Feather className="w-3.5 h-3.5 text-vintage-rose" />
                <span>A Quiet Space For You</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-vintage-wine mb-2">
                {config.heading}
              </h3>

              <p className="font-body text-xs sm:text-sm text-vintage-ink/80 leading-relaxed max-w-md mx-auto">
                {config.subtitle}
              </p>
            </div>

            {/* Success State */}
            {status === 'success' ? (
              <motion.div
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="py-6 px-4 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-xs">
                  <CheckCircle2 className="w-7 h-7" />
                </div>

                <h4 className="font-serif text-xl sm:text-2xl font-bold text-vintage-wine mb-2">
                  Thank You
                </h4>

                <p className="font-body text-sm sm:text-base text-vintage-ink/85 leading-relaxed max-w-sm mx-auto mb-6">
                  {config.successMessage}
                </p>

                <button
                  onClick={handleScrollDown}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-vintage-wine text-vintage-ivory font-sans text-xs tracking-widest uppercase hover:bg-vintage-espresso transition-all shadow-paper"
                >
                  <span>CONTINUE READING</span>
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ) : (
              /* Selection Form */
              <div className="space-y-4">
                
                {/* Options List */}
                <div className="space-y-2.5" role="radiogroup" aria-label="Response options">
                  {config.options.map((option, idx) => {
                    const isSelected = selectedOption === option;

                    return (
                      <motion.div
                        key={idx}
                        whileHover={prefersReducedMotion || isBusy ? {} : { scale: 1.008 }}
                        whileTap={prefersReducedMotion || isBusy ? {} : { scale: 0.995 }}
                        transition={{ duration: 0.2 }}
                      >
                        <button
                          type="button"
                          role="radio"
                          aria-checked={isSelected}
                          disabled={isBusy}
                          onClick={() => handleSelectOption(option)}
                          className={`w-full flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl border text-left cursor-pointer transition-all duration-200 select-none ${
                            isSelected
                              ? 'border-vintage-wine bg-vintage-blush/35 shadow-xs text-vintage-wine font-medium ring-1 ring-vintage-wine/25'
                              : 'border-vintage-champagne/70 bg-vintage-paper/40 hover:bg-vintage-paper/80 hover:border-vintage-dusty/60 text-vintage-ink/85'
                          } ${isBusy && !isSelected ? 'opacity-60 cursor-not-allowed' : ''}`}
                        >
                          {/* Radio Circle Indicator */}
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors ${
                              isSelected
                                ? 'border-vintage-wine bg-vintage-ivory'
                                : 'border-vintage-champagne bg-vintage-paper'
                            }`}
                          >
                            {isSelected && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-2 h-2 rounded-full bg-vintage-wine"
                              />
                            )}
                          </div>

                          {/* Option Text */}
                          <span className="font-body text-xs sm:text-sm leading-snug flex-1">
                            {option}
                          </span>
                        </button>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Live Trigger Status Indicator */}
                <AnimatePresence>
                  {isBusy && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="py-2 text-center flex items-center justify-center gap-2 text-vintage-wine text-xs font-sans tracking-wide"
                    >
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-vintage-rose" />
                      <span>
                        {status === 'preparing' ? 'Sending your response in a moment...' : 'Sending your response...'}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Polite Error Message on Delivery Failure */}
                <AnimatePresence>
                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-3.5 rounded-xl bg-vintage-blush/40 border border-vintage-rose/30 text-vintage-wine text-xs text-center flex items-center justify-center gap-2"
                    >
                      <AlertCircle className="w-4 h-4 text-vintage-rose flex-shrink-0" />
                      <span>{config.errorMessage}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Bottom Skip Action */}
                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={handleSkip}
                    disabled={isBusy}
                    className="text-xs font-sans text-vintage-dusty hover:text-vintage-ink py-2 px-4 transition-colors disabled:opacity-40"
                  >
                    {config.skipText}
                  </button>
                </div>
              </div>
            )}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
