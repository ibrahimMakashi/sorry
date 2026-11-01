import React from 'react';

export function PressedFlower({ className = '', color = '#C58B94' }) {
  return (
    <div className={`pointer-events-none select-none ${className}`} aria-hidden="true">
      <svg width="44" height="44" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="8" fill="#733E4B" opacity="0.8" />
        <ellipse cx="50" cy="28" rx="8" ry="16" fill={color} opacity="0.75" />
        <ellipse cx="50" cy="72" rx="8" ry="16" fill={color} opacity="0.75" />
        <ellipse cx="28" cy="50" rx="16" ry="8" fill="#F0D9D8" opacity="0.85" />
        <ellipse cx="72" cy="50" rx="16" ry="8" fill="#F0D9D8" opacity="0.85" />
        <ellipse cx="35" cy="35" rx="12" ry="7" transform="rotate(-45 35 35)" fill={color} opacity="0.65" />
        <ellipse cx="65" cy="35" rx="12" ry="7" transform="rotate(45 65 35)" fill={color} opacity="0.65" />
        <ellipse cx="35" cy="65" rx="12" ry="7" transform="rotate(45 35 65)" fill={color} opacity="0.65" />
        <ellipse cx="65" cy="65" rx="12" ry="7" transform="rotate(-45 65 65)" fill={color} opacity="0.65" />
        <circle cx="50" cy="50" r="4" fill="#D6BE97" />
      </svg>
    </div>
  );
}

export function HeartDoodle({ className = '', strokeColor = '#A95366' }) {
  return (
    <div className={`pointer-events-none select-none ${className}`} aria-hidden="true">
      <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
        <path
          d="M20 32 C12 25, 4 19, 4 11 C4 6, 8 3, 13 3 C16 3, 18.5 4.5, 20 7 C21.5 4.5, 24 3, 27 3 C32 3, 36 6, 36 11 C36 19, 28 25, 20 32 Z"
          stroke={strokeColor}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="45"
          className="opacity-75"
        />
      </svg>
    </div>
  );
}

export function VintageStamp({ text = "Cherished", className = "" }) {
  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-dashed border-vintage-rose/50 bg-vintage-ivory/95 shadow-sm transform rotate-[-4deg] pointer-events-none select-none ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-vintage-wine/70" />
      <span className="font-serif text-[11px] uppercase tracking-wider text-vintage-wine font-semibold">
        {text}
      </span>
    </div>
  );
}

export function WashiTape({ tapeColor = "champagne", className = "" }) {
  let colorClass = "washi-tape-champagne";
  if (tapeColor === "rose") colorClass = "washi-tape-rose";
  if (tapeColor === "paper") colorClass = "bg-vintage-paper/90";

  return (
    <div className={`washi-tape ${colorClass} ${className}`} aria-hidden="true" />
  );
}
