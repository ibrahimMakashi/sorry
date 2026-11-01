import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, X, Check, EyeOff } from 'lucide-react';
import { isAnalyticsOptedOut, setAnalyticsOptOut } from '../../utils/analytics';

export default function PrivacyNotice() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOptedOut, setIsOptedOut] = useState(() => isAnalyticsOptedOut());

  const handleToggleOptOut = () => {
    const nextState = !isOptedOut;
    setIsOptedOut(nextState);
    setAnalyticsOptOut(nextState);
  };

  return (
    <>
      {/* Discreet footer trigger */}
      <div className="fixed bottom-3 left-4 z-30 select-none">
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-vintage-ivory/80 hover:bg-vintage-ivory text-vintage-dusty hover:text-vintage-wine border border-vintage-champagne/60 text-[10px] font-sans tracking-wider uppercase backdrop-blur-sm transition-all shadow-xs"
          aria-label="Privacy & Analytics information"
          title="Privacy & Analytics disclosure"
        >
          <Shield className="w-3 h-3 text-vintage-rose" />
          <span>Privacy & Analytics</span>
        </button>
      </div>

      {/* Elegant Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-vintage-espresso/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-md bg-[#FAF6EE] rounded-2xl p-6 sm:p-7 border border-vintage-champagne shadow-paper-lift text-vintage-ink select-none"
              role="dialog"
              aria-modal="true"
              aria-label="Privacy and analytics information"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-vintage-dusty hover:text-vintage-wine hover:bg-vintage-blush/30 transition-colors"
                aria-label="Close privacy notice"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Title & Icon */}
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-vintage-blush/50 flex items-center justify-center text-vintage-rose">
                  <Shield className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-xl font-bold text-vintage-wine">
                  Privacy & Visitor Analytics
                </h3>
              </div>

              {/* Body */}
              <div className="space-y-3 font-body text-xs sm:text-sm text-vintage-ink/85 leading-relaxed">
                <p>
                  This personal website uses <strong>Umami Analytics</strong> to anonymously measure aggregate story engagement (such as which chapters were read and reading time).
                </p>

                <ul className="space-y-1.5 pl-4 list-disc text-xs text-vintage-ink/80">
                  <li><strong>Cookieless</strong> &mdash; No tracking cookies are used.</li>
                  <li><strong>No Personal Data</strong> &mdash; Your name, email, IP address, and location are never collected or stored.</li>
                  <li><strong>Private</strong> &mdash; Text you draft or personal response options are never sent to analytics.</li>
                </ul>

                <p className="text-[11px] text-vintage-dusty font-serif italic pt-1">
                  Compliant with privacy principles and the Digital Personal Data Protection (DPDP) Act.
                </p>
              </div>

              {/* Opt-out toggle */}
              <div className="mt-5 pt-4 border-t border-vintage-champagne/60 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-sans text-vintage-wine font-medium">
                  <EyeOff className="w-4 h-4 text-vintage-dusty" />
                  <span>Opt-out on this browser:</span>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={isOptedOut}
                  onClick={handleToggleOptOut}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isOptedOut ? 'bg-vintage-wine' : 'bg-vintage-champagne/70'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isOptedOut ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {isOptedOut && (
                <p className="mt-2 text-[11px] text-vintage-rose font-sans text-right">
                  Analytics disabled for this browser.
                </p>
              )}

              {/* Done button */}
              <button
                onClick={() => setIsOpen(false)}
                className="w-full mt-5 py-2.5 rounded-full bg-vintage-wine text-vintage-ivory font-sans text-xs tracking-wider uppercase hover:bg-vintage-espresso transition-all shadow-xs"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
