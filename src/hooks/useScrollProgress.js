import { useState, useEffect } from 'react';

/**
 * Hook to track overall window scroll progress (0 to 1) and active section ID
 */
export function useScrollProgress(sectionIds = []) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(sectionIds[0] || '');

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const currentProgress = totalHeight > 0 ? Math.min(Math.max(window.scrollY / totalHeight, 0), 1) : 0;
          setScrollProgress(currentProgress);

          // Find current active section
          if (sectionIds.length > 0) {
            const viewportMiddle = window.scrollY + window.innerHeight * 0.35;
            for (let i = sectionIds.length - 1; i >= 0; i--) {
              const el = document.getElementById(sectionIds[i]);
              if (el && el.offsetTop <= viewportMiddle) {
                setActiveSection(sectionIds[i]);
                break;
              }
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds]);

  return { scrollProgress, activeSection };
}
