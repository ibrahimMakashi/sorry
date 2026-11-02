import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '../../context/AudioContext';
import { recordNameClick } from '../../utils/nameInteractionTracker';

/**
 * Interactive Ibrahim Name component
 * When clicked, triggers a delicate burst of warm mini hearts/sparks
 * and tracks anonymous click counts to notify on repeated interaction.
 */
export default function IbrahimName({ children = "Ibrahim", className = "", style = {} }) {
  const { playSound } = useAudio();
  const [bursts, setBursts] = useState([]);

  const handleClick = (e) => {
    e.stopPropagation();
    playSound('paperUnfold');
    recordNameClick('my_name_clicked');

    // Get click coordinates in viewport space
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX || (rect.left + rect.width / 2);
    const y = e.clientY || (rect.top + rect.height / 2);

    const burstId = Date.now() + Math.random();

    // 6 mini heart/spark particles
    const particleCount = 6;
    const particles = Array.from({ length: particleCount }).map((_, i) => {
      const angle = (i / particleCount) * 2 * Math.PI + (Math.random() * 0.4 - 0.2);
      const distance = 35 + Math.random() * 45;
      const targetX = Math.cos(angle) * distance;
      const targetY = Math.sin(angle) * distance;
      const scale = 0.6 + Math.random() * 0.5;

      return {
        id: i,
        targetX,
        targetY,
        scale,
      };
    });

    const newBurst = { id: burstId, x, y, particles };
    setBursts((prev) => [...prev, newBurst]);

    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== burstId));
    }, 850);
  };

  return (
    <>
      <span
        onClick={handleClick}
        className={`inline-block cursor-pointer select-none transition-all duration-200 active:scale-95 hover:text-vintage-rose ${className}`}
        style={style}
        role="button"
        tabIndex={0}
        aria-label="Tap Ibrahim's name"
        title="Tap to interact"
      >
        {children}
      </span>

      {/* Floating Mini Hearts on Click */}
      <AnimatePresence>
        {bursts.map((burst) => (
          <div
            key={burst.id}
            className="fixed pointer-events-none z-50"
            style={{ left: burst.x, top: burst.y }}
            aria-hidden="true"
          >
            {burst.particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ x: 0, y: 0, opacity: 1, scale: 0.2 }}
                animate={{
                  x: p.targetX,
                  y: p.targetY,
                  opacity: 0,
                  scale: p.scale,
                }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#A95366">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </motion.div>
            ))}
          </div>
        ))}
      </AnimatePresence>
    </>
  );
}
