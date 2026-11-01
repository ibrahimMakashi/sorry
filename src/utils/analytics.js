/**
 * Privacy-Friendly Analytics Utility for "A Letter for Ananya"
 * Powered by Umami Analytics (https://umami.is)
 * 
 * Strict Privacy Commitments:
 * - Cookieless, privacy-preserving tracking by default.
 * - No IP address storage, no device fingerprinting, no PII.
 * - No tracking of text typed into forms or personal responses.
 * - Respects Do-Not-Track and visitor opt-out preferences.
 */

// In-memory set to ensure section events fire only once per page session
const viewedSections = new Set();

// Active engagement tracking state
let activeSeconds = 0;
let lastActiveTimestamp = Date.now();
let engagementTimer = null;
let reachedFinalLetter = false;
const firedMilestones = new Set();
const MILESTONES = [30, 60, 120, 300, 600, 900];
const INACTIVITY_TIMEOUT_MS = 30000; // 30 seconds inactivity threshold

/**
 * Check if the visitor has opted out of analytics
 */
export function isAnalyticsOptedOut() {
  if (typeof window === 'undefined') return true;
  try {
    return localStorage.getItem('umami.disabled') === '1';
  } catch {
    return false;
  }
}

/**
 * Set visitor opt-out preference
 */
export function setAnalyticsOptOut(optOut) {
  if (typeof window === 'undefined') return;
  try {
    if (optOut) {
      localStorage.setItem('umami.disabled', '1');
      console.info('🛡️ [Analytics] Analytics disabled by visitor preference.');
    } else {
      localStorage.removeItem('umami.disabled');
      console.info('🛡️ [Analytics] Analytics enabled by visitor preference.');
      initAnalytics();
    }
  } catch (err) {
    console.warn('Failed to save analytics preference', err);
  }
}

/**
 * Determine device category without personal identification
 */
export function getDeviceCategory() {
  if (typeof window === 'undefined') return 'unknown';
  const width = window.innerWidth;
  if (width < 640) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

// Queue for events fired before window.umami has finished loading
const pendingEventsQueue = [];

/**
 * Flush any queued custom events once Umami is ready
 */
function flushPendingEvents() {
  if (typeof window === 'undefined' || !window.umami || typeof window.umami.track !== 'function') {
    return;
  }
  while (pendingEventsQueue.length > 0) {
    const item = pendingEventsQueue.shift();
    try {
      window.umami.track(item.eventName, item.data);
    } catch {
      // Ignore silently
    }
  }
}

/**
 * Initialize analytics, active engagement timers, and event flushing
 * (The official Umami script is loaded declaratively via index.html)
 */
export function initAnalytics() {
  if (typeof window === 'undefined') return;

  // If visitor is opted out, remove the script element from DOM
  if (isAnalyticsOptedOut()) {
    const script = document.querySelector('script[src*="umami"]');
    if (script) {
      script.remove();
    }
    return;
  }

  // Poll briefly for window.umami ready state to flush any early queued events
  let checkAttempts = 0;
  const readyInterval = setInterval(() => {
    checkAttempts += 1;
    if (window.umami && typeof window.umami.track === 'function') {
      flushPendingEvents();
      clearInterval(readyInterval);
    } else if (checkAttempts >= 30) { // Stop polling after ~15s (e.g. adblocker)
      clearInterval(readyInterval);
    }
  }, 500);

  // Start active engagement tracking
  initActiveEngagementTracker();
}

/**
 * Core event tracking function with safe fallbacks and queueing
 * 
 * @param {string} eventName - Standardized event name
 * @param {object} [eventData] - Anonymous non-PII properties
 */
export function trackEvent(eventName, eventData = {}) {
  if (typeof window === 'undefined') return;
  if (isAnalyticsOptedOut()) return;

  // Include coarse device category automatically
  const sanitizedData = {
    device_category: getDeviceCategory(),
    ...eventData,
  };

  // Safe Umami tracking: track immediately if ready, or queue until script loads
  try {
    if (window.umami && typeof window.umami.track === 'function') {
      window.umami.track(eventName, sanitizedData);
    } else {
      pendingEventsQueue.push({ eventName, data: sanitizedData });
    }
  } catch (err) {
    console.warn(`[Analytics] Track event failed silently: ${eventName}`, err);
  }
}

/**
 * Map section IDs to standardized story engagement event names
 */
const SECTION_EVENT_MAP = {
  'envelope': 'envelope_intro_viewed',
  'hero': 'hero_section_viewed',
  'scene-1': 'scene_01_first_meeting',
  'scene-2': 'scene_02_womens_day',
  'scene-3': 'scene_03_resignation',
  'scene-4': 'scene_04_first_shift_visit',
  'scene-5': 'scene_05_are_you_sad',
  'scene-6': 'scene_06_words_i_couldnt_say',
  'scene-7': 'scene_07_last_goodbye',
  'scene-8': 'scene_08_regret',
  'scene-9': 'scene_09_dream',
  'scene-10': 'scene_10_reconnection',
  'unanswered-feelings': 'unanswered_feelings_viewed',
  'reflection': 'response_section_viewed',
  'apology-letter': 'apology_letter_viewed',
  'voice-note': 'voice_note_section_viewed',
  'final-letter': 'final_letter_viewed',
  'closing': 'rose_garden_viewed',
  'rose-garden': 'rose_garden_viewed',
};

/**
 * Track a story section view once per page session
 * 
 * @param {string} sectionId - HTML id of the viewed section
 */
export function trackSectionView(sectionId) {
  if (!sectionId || viewedSections.has(sectionId)) return;

  const eventName = SECTION_EVENT_MAP[sectionId] || `${sectionId.replace(/-/g, '_')}_viewed`;
  viewedSections.add(sectionId);

  trackEvent(eventName, { section_id: sectionId });

  // Mark if final letter reached
  if (sectionId === 'final-letter' && !reachedFinalLetter) {
    reachedFinalLetter = true;
    trackEvent('final_letter_reached');
  }
}

/**
 * Track user interaction events safely
 * 
 * @param {string} interactionName - Standardized interaction name
 * @param {object} [properties] - Non-sensitive context
 */
export function trackInteraction(interactionName, properties = {}) {
  trackEvent(interactionName, properties);
}

/**
 * Active engagement timer
 * Counts active seconds ONLY when tab is visible and visitor was active within 30s
 */
function initActiveEngagementTracker() {
  if (engagementTimer) return;

  const updateActivity = () => {
    lastActiveTimestamp = Date.now();
  };

  // Passive activity listeners
  const activityEvents = ['mousemove', 'keydown', 'touchstart', 'scroll', 'click'];
  activityEvents.forEach((ev) => {
    window.addEventListener(ev, updateActivity, { passive: true });
  });

  // Ticker running every second
  engagementTimer = setInterval(() => {
    const isVisible = document.visibilityState === 'visible';
    const isRecentlyActive = Date.now() - lastActiveTimestamp <= INACTIVITY_TIMEOUT_MS;

    if (isVisible && isRecentlyActive) {
      activeSeconds += 1;

      // Check milestones
      MILESTONES.forEach((milestone) => {
        if (activeSeconds >= milestone && !firedMilestones.has(milestone)) {
          firedMilestones.add(milestone);
          trackEvent('active_engagement_milestone', {
            seconds: milestone,
            reached_final_letter: reachedFinalLetter,
          });
        }
      });
    }
  }, 1000);

  // Send summary on page hide / unload
  const handlePageExit = () => {
    if (activeSeconds > 5) {
      trackEvent('active_engagement_summary', {
        active_seconds: Math.round(activeSeconds),
        reached_final_letter: reachedFinalLetter,
      });
    }
  };

  window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      handlePageExit();
    }
  });
  window.addEventListener('pagehide', handlePageExit);
}

/**
 * Set up an IntersectionObserver on story elements with 50% visibility threshold
 * Automatically unobserves after firing to avoid duplicate scroll triggers.
 * 
 * @param {string[]} elementIds - List of element IDs to observe
 * @returns {() => void} Cleanup function to disconnect observer
 */
export function setupStorySectionObservers(elementIds = []) {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return () => {};
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id) {
            trackSectionView(id);
            observer.unobserve(entry.target);
          }
        }
      });
    },
    {
      threshold: 0.5, // 50% section visibility required
    }
  );

  // Observe each existing DOM element
  elementIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      observer.observe(el);
    }
  });

  return () => {
    observer.disconnect();
  };
}
