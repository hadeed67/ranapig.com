// Media pool with anti-repetition system
export const MEDIA_POOL = {
  images: [
    '/assets/images/rana2.jpg',
    '/assets/images/rana3.png',
    '/assets/images/rana4.png',
    '/assets/images/RANA5.png',
    '/assets/images/RANA6.jpg',
    '/assets/images/ranaxx.png',
    '/assets/images/zz.jpg',
    '/assets/images/rananew1.png',
    '/assets/images/rananew2.png'
  ],
  videos: [
    '/assets/videos/rana-gif.mp4',
    '/assets/videos/ranavid.mp4',
    '/assets/videos/ranavid3.mp4'
  ]
};

// Anti-repetition tracker
let recentImages = [];
let recentVideos = [];
const MAX_RECENT = 3;

/**
 * Get random media (image or video) with anti-repetition
 * @param {boolean} isVideo - Whether to get a video or image
 * @returns {string} Media file path
 */
export function getRandomMedia(isVideo = false) {
  const pool = isVideo ? MEDIA_POOL.videos : MEDIA_POOL.images;
  const recent = isVideo ? recentVideos : recentImages;
  
  // Filter out recently used items
  const available = pool.filter(item => !recent.includes(item));
  const selectionPool = available.length > 0 ? available : pool;
  
  // Select random item
  const selected = selectionPool[Math.floor(Math.random() * selectionPool.length)];
  
  // Update recent tracker
  recent.push(selected);
  if (recent.length > MAX_RECENT) recent.shift();
  
  if (isVideo) {
    recentVideos = recent;
  } else {
    recentImages = recent;
  }
  
  return selected;
}

/**
 * Get media for a specific rarity tier
 * Higher rarities have higher chance of video
 * @param {string} rarity - common, rare, epic, legendary
 * @returns {object} Media object with type and src
 */
export function getMediaForRarity(rarity) {
  const videoChances = {
    common: 0.3,
    rare: 0.4,
    epic: 0.6,
    legendary: 0.8
  };
  
  const useVideo = Math.random() < (videoChances[rarity] || 0.3);
  
  return {
    type: useVideo ? 'video' : 'image',
    src: getRandomMedia(useVideo)
  };
}

/**
 * Reset the anti-repetition tracker (useful for testing)
 */
export function resetMediaTracker() {
  recentImages = [];
  recentVideos = [];
}
