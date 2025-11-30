function formatPostedAt(iso) {
  const d = new Date(iso);
  const opts = { hour: 'numeric', minute: '2-digit', hour12: true };
  return `Posted at ${d.toLocaleTimeString(undefined, opts)}`;
}

export default formatPostedAt;

/**
 * Convert ISO date string into "Month Day, Year" format
 * @param {string} isoString - e.g. "2025-11-25T12:10:38.155Z"
 * @param {string} locale - optional, defaults to 'en-US'
 * @returns {string} formatted date, e.g. "November 25, 2025"
 */
export function formatDate(isoString, locale = 'en-US') {
  if (!isoString) return '';
  const date = new Date(isoString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(locale, options);
}

// 👉 "November 25, 2025"
