// Rarity drop weight probabilities by case type
export const RARITY_WEIGHTS = {
  common: {
    common: 70,
    rare: 25,
    epic: 4,
    legendary: 1
  },
  rare: {
    common: 50,
    rare: 35,
    epic: 12,
    legendary: 3
  },
  epic: {
    common: 30,
    rare: 40,
    epic: 25,
    legendary: 5
  },
  legendary: {
    common: 10,
    rare: 15,
    epic: 10,
    legendary: 65
  }
};

// Rarity color scheme
export const RARITY_COLORS = {
  common: '#6b7280',
  rare: '#3b82f6',
  epic: '#a855f7',
  legendary: '#f59e0b'
};

// Upgrade success chances
export const UPGRADE_CHANCES = {
  'common-rare': 75,
  'rare-epic': 50,
  'epic-legendary': 25
};

// Case prices by rarity
export const CASE_PRICES = {
  common: 5.00,
  rare: 25.00,
  epic: 50.00,
  legendary: 100.00
};

// Case names
export const CASE_NAMES = {
  common: "Common Case",
  rare: "Rare Case",
  epic: "Epic Case",
  legendary: "Legendary Case"
};

/**
 * Get next rarity tier
 * @param {string} currentRarity - current rarity level
 * @returns {string|null} Next rarity or null if already max
 */
export function getNextRarity(currentRarity) {
  const rarities = ['common', 'rare', 'epic', 'legendary'];
  const index = rarities.indexOf(currentRarity);
  return index < rarities.length - 1 ? rarities[index + 1] : null;
}

/**
 * Get upgrade key for success chance lookup
 * @param {string} fromRarity
 * @param {string} toRarity
 * @returns {string|null} Upgrade key or null
 */
export function getUpgradeKey(fromRarity, toRarity) {
  return `${fromRarity}-${toRarity}`;
}

/**
 * Get upgrade cost (2x the case price of target rarity)
 * @param {string} targetRarity
 * @returns {number} Cost in dollars
 */
export function getUpgradeCost(targetRarity) {
  return (CASE_PRICES[targetRarity] || 0) * 2;
}
