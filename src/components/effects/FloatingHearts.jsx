import React, { useMemo } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Lightweight, GPU-accelerated Floating Hearts component
 * Drifts softly from the bottom toward the top of the viewport alongside FloatingPetals.
 * Uses GPU translate3d with gentle horizontal drift and rotation.
 */
export default function FloatingHearts({ count = 6, className = '' }) {
  const prefersReducedMotion = useReducedMotion();

  // Romantic palette: soft rose-pink, muted rose, warm burgundy, dusty blush
  const palette = [
    { fill: '#EAA8B4', stroke: '#C58B94' }, // Soft rose-pink
    { fill: '#C58B94', stroke: '#A95366' }, // Muted rose
    { fill: '#A95366', stroke: '#733E4B' }, // Dusty burgundy-rose
    { fill: '#D97286', stroke: '#C58B94' }, // Warm pinkish rose
    { fill: '#F2C4CE', stroke: '#EAA8B4' }, // Gentle blush
    { fill: '#733E4B', stroke: '#522530' }, // Deep burgundy accent
  ];

  const hearts = useMemo(() => {
    if (prefersReducedMotion) return [];

    return Array.from({ length: count }).map((_, i) => {
      const left = 4 + Math.random() * 92; // 4% to 96% across viewport
      const duration = 13 + Math.random() * 7; // 13s to 20s (slow, serene upward drift)
      // Stagger delays with negative values so hearts appear immediately across the viewport on mount
      const delay = -Math.random() * duration; 
      const drift = -35 + Math.random() * 70; // -35px to +35px gentle horizontal sway
      const rotation = -20 + Math.random() * 40; // -20deg to +20deg
      const size = 13 + Math.random() * 9; // 13px to 22px
      const opacity = 0.5 + Math.random() * 0.35; // 0.50 to 0.85
      const color = palette[i % palette.length];

      return {
        id: i,
        left: `${left}%`,
        duration: `${duration}s`,
        delay: `${delay}s`,
        drift: `${drift}px`,
        rotation: `${rotation}deg`,
        size,
        opacity,
        color,
      };
    });
  }, [count, prefersReducedMotion]);

  if (prefersReducedMotion || hearts.length === 0) return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none overflow-hidden z-10 ${className}`}
      aria-hidden="true"
    >
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute top-0 animate-heart-float"
          style={{
            left: heart.left,
            animationDuration: heart.duration,
            animationDelay: heart.delay,
            '--heart-x-drift': heart.drift,
            '--heart-rotation': heart.rotation,
            '--heart-opacity': heart.opacity,
          }}
        >
          <svg
            width={heart.size}
            height={heart.size}
            viewBox="0 0 24 24"
            fill="none"
            className="drop-shadow-sm filter"
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill={heart.color.fill}
              stroke={heart.color.stroke}
              strokeWidth="0.5"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
