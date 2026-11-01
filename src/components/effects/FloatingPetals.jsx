import React, { useMemo } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Lightweight, GPU-accelerated floating rose petals component
 * Uses CSS keyframe animations with randomized parameters for natural drift.
 */
export default function FloatingPetals({ count = 12, className = '' }) {
  const prefersReducedMotion = useReducedMotion();

  // If user requested reduced motion, render nothing or very subtle static accents
  const petals = useMemo(() => {
    if (prefersReducedMotion) return [];
    
    // Create configured petals
    return Array.from({ length: count }).map((_, i) => {
      const left = Math.random() * 100; // 0% to 100%
      const duration = 9 + Math.random() * 9; // 9s to 18s
      const delay = Math.random() * 8; // 0s to 8s
      const drift = -80 + Math.random() * 160; // -80px to +80px
      const rotation = 180 + Math.random() * 360;
      const size = 16 + Math.random() * 14; // 16px to 30px
      const opacity = 0.45 + Math.random() * 0.45;
      
      return {
        id: i,
        left: `${left}%`,
        duration: `${duration}s`,
        delay: `${delay}s`,
        drift: `${drift}px`,
        rotation: `${rotation}deg`,
        size,
        opacity,
      };
    });
  }, [count, prefersReducedMotion]);

  if (prefersReducedMotion || petals.length === 0) return null;

  return (
    <div 
      className={`fixed inset-0 pointer-events-none overflow-hidden z-10 ${className}`}
      aria-hidden="true"
    >
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute top-0 animate-petal"
          style={{
            left: petal.left,
            animationDuration: petal.duration,
            animationDelay: petal.delay,
            '--petal-x-drift': petal.drift,
            '--petal-rotation': petal.rotation,
            opacity: petal.opacity,
          }}
        >
          <svg
            width={petal.size}
            height={petal.size * 1.3}
            viewBox="0 0 24 32"
            fill="none"
            className="drop-shadow-sm filter"
          >
            <path
              d="M12 2C6 7 2 15 2 22C2 27.5 6.5 30 12 30C17.5 30 22 27.5 22 22C22 15 18 7 12 2Z"
              fill="url(#petalGrad)"
            />
            {/* Subtle petal vein */}
            <path
              d="M12 8C12 16 12 24 12 27"
              stroke="#A95366"
              strokeWidth="0.75"
              strokeLinecap="round"
              opacity="0.4"
            />
            <defs>
              <linearGradient id="petalGrad" x1="12" y1="2" x2="12" y2="30" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F0D9D8" />
                <stop offset="0.45" stopColor="#C58B94" />
                <stop offset="1" stopColor="#A95366" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      ))}
    </div>
  );
}
