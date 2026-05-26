export const haptics = {
  // Check if vibration is supported
  isSupported: () => typeof window !== 'undefined' && 'navigator' in window && 'vibrate' in navigator,

  // Light tap for minor interactions (hover, small buttons)
  light: () => {
    if (haptics.isSupported()) navigator.vibrate(10);
  },

  // Medium tap for standard clicks
  medium: () => {
    if (haptics.isSupported()) navigator.vibrate(25);
  },

  // Heavy tap for important actions
  heavy: () => {
    if (haptics.isSupported()) navigator.vibrate(50);
  },

  // Success pattern (ta-da!)
  success: () => {
    if (haptics.isSupported()) navigator.vibrate([30, 50, 40]);
  },

  // Error pattern (bzzt)
  error: () => {
    if (haptics.isSupported()) navigator.vibrate([50, 50, 50]);
  },

  // Level Up / Big reward pattern
  levelUp: () => {
    if (haptics.isSupported()) navigator.vibrate([30, 30, 40, 30, 50, 40, 100]);
  }
};
