// CS:GO Items Database organized by rarity
export const ITEMS = {
  common: [
    { name: "AK-47 | Redline", value: 2.50, rarity: "common" },
    { name: "AWP | Worm God", value: 3.00, rarity: "common" },
    { name: "M4A4 | Desert-Strike", value: 4.00, rarity: "common" },
    { name: "Glock-18 | Steel Disruption", value: 5.00, rarity: "common" },
    { name: "USP-S | Guardian", value: 6.00, rarity: "common" },
    { name: "P250 | Cartel", value: 3.50, rarity: "common" },
    { name: "MAC-10 | Fade", value: 4.50, rarity: "common" },
    { name: "Five-SeveN | Case Hardened", value: 5.50, rarity: "common" }
  ],
  rare: [
    { name: "AK-47 | Blue Laminate", value: 15.00, rarity: "rare" },
    { name: "AWP | Corticera", value: 20.00, rarity: "rare" },
    { name: "M4A1-S | Boreal Forest", value: 25.00, rarity: "rare" },
    { name: "Desert Eagle | Crimson Web", value: 30.00, rarity: "rare" },
    { name: "Glock-18 | Water Elemental", value: 35.00, rarity: "rare" },
    { name: "P90 | Asiimov", value: 22.00, rarity: "rare" },
    { name: "USP-S | Kill Confirmed", value: 28.00, rarity: "rare" },
    { name: "AK-47 | Point Disarray", value: 32.00, rarity: "rare" }
  ],
  epic: [
    { name: "AK-47 | Jaguar", value: 40.00, rarity: "epic" },
    { name: "AWP | Redline", value: 50.00, rarity: "epic" },
    { name: "M4A4 | X-Ray", value: 60.00, rarity: "epic" },
    { name: "Desert Eagle | Hypnotic", value: 70.00, rarity: "epic" },
    { name: "Glock-18 | Fade", value: 80.00, rarity: "epic" },
    { name: "AK-47 | Neon Revolution", value: 65.00, rarity: "epic" },
    { name: "M4A1-S | Hyper Beast", value: 75.00, rarity: "epic" },
    { name: "AWP | Hyper Beast", value: 85.00, rarity: "epic" }
  ],
  legendary: [
    { name: "AK-47 | Fire Serpent", value: 150.00, rarity: "legendary" },
    { name: "AWP | Dragon Lore", value: 200.00, rarity: "legendary" },
    { name: "M4A4 | Howl", value: 250.00, rarity: "legendary" },
    { name: "Desert Eagle | Blaze", value: 300.00, rarity: "legendary" },
    { name: "Karambit | Fade", value: 500.00, rarity: "legendary" },
    { name: "Butterfly Knife | Doppler", value: 450.00, rarity: "legendary" },
    { name: "M9 Bayonet | Crimson Web", value: 400.00, rarity: "legendary" },
    { name: "Glock-18 | Gamma Doppler", value: 350.00, rarity: "legendary" }
  ]
};

/**
 * Get random item from a rarity tier
 * @param {string} rarity - common, rare, epic, legendary
 * @returns {object} Item object without media (media added later)
 */
export function getRandomItemByRarity(rarity) {
  const items = ITEMS[rarity];
  if (!items || items.length === 0) {
    return ITEMS.common[0]; // Fallback to first common item
  }
  return { ...items[Math.floor(Math.random() * items.length)] };
}

/**
 * Get all items count
 * @returns {number} Total number of items
 */
export function getTotalItemsCount() {
  return Object.values(ITEMS).reduce((sum, items) => sum + items.length, 0);
}
