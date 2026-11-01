import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '../../context/AudioContext';
import { trackInteraction } from '../../utils/analytics';

export default function AnanyaName({ children = "Ananya", className = "", style = {} }) {
  const { playSound } = useAudio();
  const [bursts, setBursts] = useState([]);

  const handleClick = (e) => {
    e.stopPropagation();
    playSound('flowerBurst');
    trackInteraction('ananya_name_clicked');

    // Get click coordinates in viewport space
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX || (rect.left + rect.width / 2);
    const y = e.clientY || (rect.top + rect.height / 2);

    const burstId = Date.now() + Math.random();
    
    // Generate 8-10 delicate flower petal particles
    const particleCount = 8;
    const particles = Array.from({ length: particleCount }).map((_, i) => {
      const angle = (i / particleCount) * 2 * Math.PI + (Math.random() * 0.4 - 0.2);
      const distance = 40 + Math.random() * 55; // 40px to 95px outward
      const targetX = Math.cos(angle) * distance;
      const targetY = Math.sin(angle) * distance;
      const rotation = -180 + Math.random() * 360;
      const scale = 0.7 + Math.random() * 0.5;
      const flowerType = i % 3; // 0: blush rose, 1: cream daisy, 2: golden sparkle

      return {
        id: i,
        targetX,
        targetY,
        rotation,
        scale,
        flowerType,
      };
    });

    const newBurst = { id: burstId, x, y, particles };
    setBursts((prev) => [...prev, newBurst]);

    // Clean up after animation finishes (850ms)
    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== burstId));
    }, 850);
  };

  return (
    <>
      <span
        onClick={handleClick}
        className={`inline-block cursor-pointer select-none transition-transform duration-200 active:scale-95 hover:text-vintage-rose ${className}`}
        style={style}
        role="button"
        tabIndex={0}
        aria-label="Tap Ananya for flowers"
        title="Tap my name for a little flower surprise"
      >
        {children}
      </span>

      {/* Portal-like Fixed Particle Container for Flower Bursts */}
      <AnimatePresence>
        {bursts.map((burst) => (
          <div
            key={burst.id}
            className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
            aria-hidden="true"
          >
            {burst.particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{
                  x: burst.x,
                  y: burst.y,
                  opacity: 1,
                  scale: 0.2,
                  rotate: 0,
                }}
                animate={{
                  x: burst.x + p.targetX,
                  y: burst.y + p.targetY,
                  opacity: 0,
                  scale: p.scale,
                  rotate: p.rotation,
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute -top-3 -left-3"
              >
                {p.flowerType === 0 && (
                  // Tiny Blush Rose
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="6" fill="#F0D9D8" stroke="#C58B94" strokeWidth="1" />
                    <circle cx="12" cy="12" r="3.5" fill="#A95366" />
                    <circle cx="12" cy="12" r="1.5" fill="#733E4B" />
                  </svg>
                )}
                {p.flowerType === 1 && (
                  // Cream Floral Petal
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <ellipse cx="12" cy="6" rx="3" ry="5" fill="#FBF7EF" stroke="#D6BE97" strokeWidth="0.75" />
                    <ellipse cx="12" cy="18" rx="3" ry="5" fill="#FBF7EF" stroke="#D6BE97" strokeWidth="0.75" />
                    <ellipse cx="6" cy="12" rx="5" ry="3" fill="#FBF7EF" stroke="#D6BE97" strokeWidth="0.75" />
                    <ellipse cx="18" cy="12" rx="5" ry="3" fill="#FBF7EF" stroke="#D6BE97" strokeWidth="0.75" />
                    <circle cx="12" cy="12" r="2.5" fill="#C58B94" />
                  </svg>
                )}
                {p.flowerType === 2 && (
                  // Golden Sparkle Heart Petal
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                      fill="#C58B94"
                      opacity="0.9"
                    />
                  </svg>
                )}
              </motion.div>
            ))}
          </div>
        ))}
      </AnimatePresence>
    </>
  );
}
