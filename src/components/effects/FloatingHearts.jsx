import React, { useMemo } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * GPU-accelerated Floating Hearts component
 * Drifts softly from bottom towards top with subtle horizontal drift and gentle rotation.
 * Operates alongside existing FloatingPetals to create a tender, cinematic ambiance.
 */
export default function FloatingHearts({ count = 6, className = '' }) {
  const prefersReducedMotion = useReducedMotion();

  const heartColors = [
    { start: '#F8D7DA', stop: '#EAA8B4' }, // Soft pink
    { start: '#EAA8B4', stop: '#C58B94' }, // Muted rose
    { start: '#C58B94', stop: '#A95366' }, // Dusty burgundy-rose
    { start: '#D97286', stop: '#733E4B' }, // Warm burgundy
    { start: '#FDECEF', stop: '#F2C4CE' }, // Gentle blush
  ];

  const hearts = useMemo(() => {
    if (prefersReducedMotion) return [];

    return Array.from({ length: count }).map((_, i) => {
      const left = Math.random() * 96 + 2; // 2% to 98%
      const duration = 12 + Math.random() * 8; // 12s to 20s (slow, tranquil drift)
      const delay = Math.random() * 9; // Staggered start 0s to 9s
      const drift = -35 + Math.random() * 70; // -35px to +35px gentle horizontal sway
      const rotation = -18 + Math.random() * 36; // -18deg to +18deg
      const size = 12 + Math.random() * 10; // 12px to 22px
      const opacity = 0.4 + Math.random() * 0.35; // 0.40 to 0.75 subtle translucency
      const colorScheme = heartColors[i % heartColors.length];

      return {
        id: i,
        left: `${left}%`,
        duration: `${duration}s`,
        delay: `${delay}s`,
        drift: `${drift}px`,
        rotation: `${rotation}deg`,
        size,
        opacity,
        colorScheme,
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
          className="absolute bottom-0 animate-heart-float"
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
            <defs>
              <linearGradient
                id={`heartGrad-${heart.id}`}
                x1="0"
                y1="0"
                x2="1"
                y2="1"
              >
                <stop offset="0%" stopColor={heart.colorScheme.start} />
                <stop offset="100%" stopColor={heart.colorScheme.stop} />
              </linearGradient>
            </defs>
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill={`url(#heartGrad-${heart.id})`}
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
