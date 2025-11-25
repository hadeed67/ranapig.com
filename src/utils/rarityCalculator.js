import { getRandomItemByRarity } from '@/data/items.js';
import { RARITY_WEIGHTS, UPGRADE_CHANCES, getNextRarity, getUpgradeKey } from '@/data/rarities.js';
import { getMediaForRarity } from '@/data/mediaPool.js';

/**
 * Get random item based on case type's rarity weights
 * @param {string} caseType - common, rare, epic, legendary
 * @returns {object} Complete item object with media
 */
export function getRandomItem(caseType) {
  const weights = RARITY_WEIGHTS[caseType];
  if (!weights) {
    throw new Error(`Invalid case type: ${caseType}`);
  }
  
  // Calculate weighted random selection
  const random = Math.random() * 100;
  let cumulative = 0;
  let selectedRarity = 'common';
  
  for (const [rarity, weight] of Object.entries(weights)) {
    cumulative += weight;
    if (random <= cumulative) {
      selectedRarity = rarity;
      break;
    }
  }
  
  // Get item from selected rarity
  const item = getRandomItemByRarity(selectedRarity);
  
  // Add media and unique ID
  item.media = getMediaForRarity(selectedRarity);
  item.id = Date.now() + Math.random();
  
  return item;
}

/**
 * Attempt an upgrade from current item to next rarity
 * @param {object} item - Item to upgrade
 * @returns {object} Result with success flag and item
 */
export function attemptUpgrade(item) {
  const nextRarity = getNextRarity(item.rarity);
  
  if (!nextRarity) {
    return {
      success: false,
      message: 'Item is already max rarity',
      item: null
    };
  }
  
  const upgradeKey = getUpgradeKey(item.rarity, nextRarity);
  const successChance = UPGRADE_CHANCES[upgradeKey];
  
  if (!successChance) {
    return {
      success: false,
      message: 'Invalid upgrade path',
      item: null
    };
  }
  
  // Roll for success
  const roll = Math.random() * 100;
  const success = roll <= successChance;
  
  if (success) {
    // Create upgraded item
    const upgradedItem = getRandomItemByRarity(nextRarity);
    upgradedItem.media = getMediaForRarity(nextRarity);
    upgradedItem.id = Date.now() + Math.random();
    
    return {
      success: true,
      message: `Success! Upgraded to ${nextRarity}`,
      item: upgradedItem,
      chance: successChance
    };
  } else {
    return {
      success: false,
      message: `Failed! Item destroyed. (${successChance}% chance)`,
      item: null,
      chance: successChance
    };
  }
}

/**
 * Generate multiple items for case opening animation
 * @param {string} caseType - Case rarity type
 * @param {number} count - Number of items to generate
 * @returns {Array} Array of items
 */
export function generateSpinItems(caseType, count = 25) {
  const items = [];
  for (let i = 0; i < count; i++) {
    items.push(getRandomItem(caseType));
  }
  return items;
}
