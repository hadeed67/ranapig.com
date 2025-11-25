import { CASE_PRICES, CASE_NAMES } from './rarities.js';

// Case configurations
export const CASES = [
  {
    id: 'common',
    name: CASE_NAMES.common,
    rarity: 'common',
    price: CASE_PRICES.common,
    media: '/assets/images/rana3.png',
    isVideo: false,
    description: '70% Common, 25% Rare, 4% Epic, 1% Legendary'
  },
  {
    id: 'rare',
    name: CASE_NAMES.rare,
    rarity: 'rare',
    price: CASE_PRICES.rare,
    media: '/assets/images/RANA5.png',
    isVideo: false,
    description: '50% Common, 35% Rare, 12% Epic, 3% Legendary'
  },
  {
    id: 'epic',
    name: CASE_NAMES.epic,
    rarity: 'epic',
    price: CASE_PRICES.epic,
    media: '/assets/images/RANA6.jpg',
    isVideo: false,
    description: '30% Common, 40% Rare, 25% Epic, 5% Legendary'
  },
  {
    id: 'legendary',
    name: CASE_NAMES.legendary,
    rarity: 'legendary',
    price: CASE_PRICES.legendary,
    media: '/assets/videos/rana-gif.mp4',
    isVideo: true,
    description: '10% Common, 15% Rare, 10% Epic, 65% Legendary'
  }
];

/**
 * Get case configuration by rarity
 * @param {string} rarity
 * @returns {object} Case configuration
 */
export function getCaseByRarity(rarity) {
  return CASES.find(c => c.rarity === rarity);
}
