/**
 * Format number as currency
 * @param {number} value - Amount in dollars
 * @returns {string} Formatted currency string
 */
export function formatCurrency(value) {
  return `$${value.toFixed(2)}`;
}

/**
 * Format rarity name for display
 * @param {string} rarity - Rarity tier
 * @returns {string} Capitalized rarity name
 */
export function formatRarity(rarity) {
  if (!rarity) return '';
  return rarity.charAt(0).toUpperCase() + rarity.slice(1);
}

/**
 * Format percentage
 * @param {number} value - Percentage value
 * @returns {string} Formatted percentage string
 */
export function formatPercentage(value) {
  return `${value}%`;
}

/**
 * Format number with commas
 * @param {number} value - Number to format
 * @returns {string} Formatted number
 */
export function formatNumber(value) {
  return value.toLocaleString();
}

/**
 * Truncate text to max length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export function truncateText(text, maxLength = 50) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}
