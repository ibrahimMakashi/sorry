/**
 * Name Interaction Tracker
 * 
 * Tracks anonymous click interactions on Ibrahim's and Ananya's names.
 * When either name receives 5 clicks within a rolling 60-second window,
 * an email notification is delivered via EmailJS to Ibrahim.
 * 
 * Privacy & Safety Protections:
 * - Cookieless, zero PII, no IP or device fingerprinting.
 * - Rolling 60-second time window.
 * - Minimum threshold of 5 clicks before triggering.
 * - Maximum 1 notification per browser session.
 * - 30-minute global cooldown via localStorage.
 * - Respects visitor privacy opt-out (no email sent if opted out).
 */

import { trackInteraction } from './analytics';
import { isAnalyticsOptedOut } from './analytics';
import { sendNameInteractionEmail } from '../services/emailService';

// In-memory rolling click timestamps for the current page session
const clickHistory = {
  my_name_clicked: [],
  her_name_clicked: []
};

const THRESHOLD = 5;
const ROLLING_WINDOW_MS = 60 * 1000; // 60 seconds
const COOLDOWN_MS = 30 * 60 * 1000;  // 30 minutes

/**
 * Check if notifications are in cooldown or already sent this session
 */
function isNotificationBlocked() {
  if (typeof window === 'undefined') return true;

  // 1. Check visitor privacy opt-out
  if (isAnalyticsOptedOut()) {
    return true;
  }

  // 2. Check session-level limit (max 1 notification per browser session)
  try {
    if (sessionStorage.getItem('name_notification_sent') === '1') {
      return true;
    }
  } catch {
    // safe fallback
  }

  // 3. Check 30-minute cooldown
  try {
    const cooldownUntil = localStorage.getItem('name_notification_cooldown');
    if (cooldownUntil && Date.now() < Number(cooldownUntil)) {
      return true;
    }
  } catch {
    // safe fallback
  }

  return false;
}

/**
 * Record a name click event and trigger notification if threshold is reached
 * 
 * @param {'my_name_clicked' | 'her_name_clicked'} type - Event category
 */
export function recordNameClick(type) {
  if (typeof window === 'undefined') return;

  // Track the anonymous interaction with existing Umami integration
  trackInteraction(type);

  // If visitor has opted out of analytics or tracking, skip notification logic
  if (isAnalyticsOptedOut()) return;

  const now = Date.now();
  const queue = clickHistory[type] || [];

  // Filter queue to keep only clicks within the rolling 60-second window
  const activeClicks = queue.filter(timestamp => now - timestamp <= ROLLING_WINDOW_MS);
  activeClicks.push(now);
  clickHistory[type] = activeClicks;

  // Check if threshold is met
  if (activeClicks.length >= THRESHOLD) {
    if (!isNotificationBlocked()) {
      // Mark session as sent & set 30-minute cooldown
      try {
        sessionStorage.setItem('name_notification_sent', '1');
        localStorage.setItem('name_notification_cooldown', String(now + COOLDOWN_MS));
      } catch {
        // safe storage fallback
      }

      // Reset rolling counter for this category
      clickHistory[type] = [];

      // Send the email notification
      const friendlyName = type === 'my_name_clicked' 
        ? "Ibrahim (Author's Name)" 
        : "Ananya (Recipient's Name)";

      sendNameInteractionEmail({
        interaction_type: friendlyName,
        click_count: activeClicks.length,
        time_window: '60 seconds',
        event_time: new Date().toLocaleString('en-US', {
          dateStyle: 'medium',
          timeStyle: 'short',
        }),
        website_url: typeof window !== 'undefined' ? window.location.href : '',
      }).catch((err) => {
        console.warn('Name interaction notification failed silently:', err);
      });
    } else {
      // Threshold reached while under cooldown; reset counter to prevent buildup
      clickHistory[type] = [];
    }
  }
}
