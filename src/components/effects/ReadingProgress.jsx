import React from 'react';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { trackInteraction } from '../../utils/analytics';

const sections = [
  { id: 'hero', label: '01 · Introduction' },
  { id: 'beginning', label: '02 · The Beginning' },
  { id: 'bosch-memories', label: '03 · Bosch Memories' },
  { id: 'evening', label: '04 · The Evening' },
  { id: 'dreams', label: '05 · The Dreams' },
  { id: 'message-2026', label: '06 · 2026 Message' },
  { id: 'unanswered-feelings', label: '07 · Unanswered Feelings' },
  { id: 'reflection', label: '08 · A Quiet Space' },
  { id: 'apology-letter', label: '09 · What I Wanted to Say' },
  { id: 'voice-note', label: '10 · Spoken Words' },
  { id: 'final-letter', label: '11 · Final Letter' },
  { id: 'closing', label: '12 · The Closing' }
];

export default function ReadingProgress() {
  const sectionIds = sections.map((s) => s.id);
  const { scrollProgress, activeSection } = useScrollProgress(sectionIds);

  const currentSectionObj = sections.find((s) => s.id === activeSection) || sections[0];

  const scrollTo = (id) => {
    trackInteraction('story_navigation_clicked', { target_section: id });
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Progress Bar for Mobile & Desktop */}
      <div 
        className="fixed top-0 left-0 right-0 h-[3px] bg-vintage-dusty/20 z-50 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="h-full bg-gradient-to-r from-vintage-dusty via-vintage-rose to-vintage-wine transition-all duration-150 ease-out"
          style={{ width: `${Math.round(scrollProgress * 100)}%` }}
        />
      </div>

      {/* Discrete Mobile Header Badge */}
      <div className="md:hidden fixed top-3 left-4 z-40 bg-vintage-ivory/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-vintage-champagne/40 shadow-sm text-[11px] font-sans tracking-wide text-vintage-ink/80 flex items-center gap-1.5 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-vintage-rose animate-pulse" />
        <span>{currentSectionObj.label}</span>
      </div>

      {/* Discrete Desktop Side Progress Rail */}
      <nav 
        className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 flex-col gap-2 z-40 bg-vintage-ivory/85 backdrop-blur-md p-2 rounded-full border border-vintage-champagne/40 shadow-paper"
        aria-label="Story chapter progress"
      >
        {sections.map((section) => {
          const isActive = section.id === activeSection;

          return (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              className="group relative flex items-center justify-end p-1 transition-all"
              aria-label={`Jump to ${section.label}`}
              title={section.label}
            >
              {/* Tooltip on hover */}
              <span className="absolute right-7 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-vintage-espresso text-vintage-ivory text-xs px-2.5 py-1 rounded shadow-md whitespace-nowrap font-serif tracking-wider">
                {section.label}
              </span>
              {/* Progress dot */}
              <span
                className={`block rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-2.5 h-2.5 bg-vintage-wine ring-2 ring-vintage-dusty'
                    : 'w-1.5 h-1.5 bg-vintage-champagne/70 group-hover:bg-vintage-dusty'
                }`}
              />
            </button>
          );
        })}
      </nav>
    </>
  );
}
