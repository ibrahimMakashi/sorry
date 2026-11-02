/**
 * EmailJS Delivery Service
 * Sends voluntary, anonymous visitor response options to Ibrahim
 */
import emailjs from '@emailjs/browser';

/**
 * Determine device category without personal identification
 */
export function getDeviceType() {
  if (typeof window === 'undefined') return 'Unknown';
  const width = window.innerWidth;
  if (width < 640) return 'Mobile';
  if (width < 1024) return 'Tablet';
  return 'Desktop';
}

/**
 * Check if EmailJS environment variables are configured
 */
export function isEmailConfigured() {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  
  return Boolean(
    serviceId &&
    templateId &&
    publicKey &&
    !serviceId.includes('your_') &&
    !templateId.includes('your_') &&
    !publicKey.includes('your_')
  );
}

/**
 * Send the voluntarily selected response option via EmailJS
 * If EmailJS keys are not configured yet, it gracefully saves locally
 * so the visitor never sees a broken submission error.
 * 
 * @param {string} selectedOption - The text of the option chosen by the visitor
 * @returns {Promise<{ success: boolean, isDemo?: boolean, message?: string }>}
 */
export async function sendResponseEmail(selectedOption) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  // Always preserve the response locally in session
  try {
    sessionStorage.setItem('ananya_response_option', selectedOption);
    sessionStorage.setItem('ananya_response_time', new Date().toISOString());
  } catch {
    // Safe storage fallback
  }

  // Graceful fallback if keys are not configured in .env yet
  if (!isEmailConfigured()) {
    console.info(
      `💌 [Email Service]: Selected option "${selectedOption}".\n` +
      `Note: To receive live emails at ibrahimmakashi5159@gmail.com, set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in a .env file.`
    );
    // Return success so the visitor gets a seamless, polite experience
    return {
      success: true,
      isDemo: true,
    };
  }

  const templateParams = {
    to_email: 'ibrahimmakashi5159@gmail.com',
    selected_option: selectedOption,
    submission_time: new Date().toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }),
    device_type: getDeviceType(),
    website_url: typeof window !== 'undefined' ? window.location.href : '',
  };

  try {
    const response = await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      publicKey
    );

    if (response.status === 200 || response.text === 'OK') {
      return { success: true };
    }

    return {
      success: false,
      message: 'Unexpected response status from email provider.',
    };
  } catch (error) {
    console.error('EmailJS submission failed:', error);
    return {
      success: false,
      message: 'Submission failed.',
    };
  }
}

/**
 * Send a notification when a visitor repeatedly clicks a name
 * 
 * @param {object} data
 * @param {string} data.interaction_type - Name clicked ('my_name_clicked' / 'her_name_clicked')
 * @param {number} data.click_count - Total clicks within the time window
 * @param {string} data.time_window - Duration string (e.g., '60 seconds')
 * @param {string} data.event_time - Formatted timestamp
 * @param {string} data.website_url - Current URL
 * @returns {Promise<{ success: boolean, message?: string }>}
 */
export async function sendNameInteractionEmail(data) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_NAME_TEMPLATE_ID || import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!isEmailConfigured()) {
    console.info(
      `💌 [Email Notification Mock]: Repeated interaction on ${data.interaction_type} (${data.click_count} clicks in ${data.time_window}).\n` +
      `Note: To receive live notifications at ibrahimmakashi5159@gmail.com, ensure EmailJS variables are configured.`
    );
    return { success: true, isDemo: true };
  }

  const templateParams = {
    to_email: 'ibrahimmakashi5159@gmail.com',
    interaction_type: data.interaction_type,
    click_count: String(data.click_count),
    time_window: data.time_window,
    event_time: data.event_time,
    website_url: data.website_url,
    device_type: getDeviceType(),
    // Dual compatibility with existing template
    selected_option: `Repeated Name Click: ${data.interaction_type} (${data.click_count} clicks in ${data.time_window})`,
    submission_time: data.event_time,
  };

  try {
    const response = await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      publicKey
    );

    if (response.status === 200 || response.text === 'OK') {
      return { success: true };
    }

    return { success: false, message: 'Unexpected response from EmailJS.' };
  } catch (error) {
    console.warn('Name interaction notification delivery failed:', error);
    return { success: false, message: 'Notification delivery failed.' };
  }
}
