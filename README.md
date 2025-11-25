# Rana Gambling Simulator

A modern gambling simulator inspired by CS:GO skin gambling sites like CSRoll and SkinClub, featuring case opening, item upgrades, and inventory management.

## Features

- **Case Opening**: Open different rarity cases (Common, Rare, Epic, Legendary) with animated openings
- **Item Upgrades**: Upgrade your items to higher rarities with risk/reward mechanics
- **Inventory System**: Manage your collection of items
- **Balance System**: Start with $1000 and add funds as needed
- **Modern UI**: Beautiful gradient designs with backdrop blur effects
- **Animations**: Smooth case opening animations and visual effects

## Setup

1. **Add Background Image**: 
   - Place your background image in the project root directory
   - Name it `background.jpg`
   - The image will be used as the full-screen background with an overlay

2. **Open the Application**:
   - Simply open `index.html` in your web browser
   - No server or build process required!

## How to Play

### Opening Cases
1. Choose a case type (Common $5, Rare $25, Epic $50, Legendary $100)
2. Click "Open Case" to purchase and open
3. Watch the animation and see what item you got!
4. Items are automatically added to your inventory

### Upgrading Items
1. Go to the "Upgrade Items" section
2. Click on an item from your inventory
3. View the upgrade preview showing:
   - Target rarity
   - Upgrade cost (50% of item value)
   - Success chance
4. Click "Upgrade" to attempt the upgrade
   - **Success**: Item upgrades to next rarity
   - **Failure**: Item is destroyed (you lose it!)

### Upgrade Success Rates
- Common → Rare: 75% chance
- Rare → Epic: 50% chance
- Epic → Legendary: 25% chance

## Technical Details

- Pure HTML, CSS, and JavaScript (no dependencies)
- Responsive design that works on desktop and mobile
- Local storage ready (can be extended to save progress)
- Modern CSS features: backdrop-filter, gradients, animations

## Customization

You can easily customize:
- Item names and values in `script.js`
- Case prices in the `casePrices` object
- Rarity drop rates in `rarityWeights`
- Colors and styling in `styles.css`
- Background image by replacing `background.jpg`

## Browser Compatibility

Works best in modern browsers that support:
- CSS backdrop-filter
- CSS Grid
- ES6 JavaScript features

Enjoy gambling responsibly! 🎰

