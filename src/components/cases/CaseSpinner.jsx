import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './CaseSpinner.css';

export function CaseSpinner({ items, finalItem, onComplete }) {
  const spinnerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    if (!spinnerRef.current || !trackRef.current || !items || items.length === 0) return;

    const itemWidth = 220; // Width of each item + gap
    const centerOffset = spinnerRef.current.offsetWidth / 2 - itemWidth / 2;
    
    // Calculate final position to land on the winning item
    const finalIndex = items.length - 1; // Last item is the winner
    const finalPosition = -(finalIndex * itemWidth) + centerOffset;

    // Create dramatic 4-phase timeline
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => onComplete(finalItem), 500);
      }
    });

    // Phase 1: Fast spin (build tension)
    tl.to(trackRef.current, {
      x: -(itemWidth * 5),
      duration: 0.8,
      ease: 'power1.in'
    });

    // Phase 2: Medium speed
    tl.to(trackRef.current, {
      x: -(itemWidth * 12),
      duration: 1.2,
      ease: 'power2.in'
    });

    // Phase 3: Dramatic slowdown
    tl.to(trackRef.current, {
      x: finalPosition - 30,
      duration: 1.8,
      ease: 'power4.out'
    });

    // Phase 4: Final land with bounce
    tl.to(trackRef.current, {
      x: finalPosition,
      duration: 0.6,
      ease: 'back.out(2)'
    });

    return () => tl.kill();
  }, [items, finalItem, onComplete]);

  if (!items || items.length === 0) return null;

  return (
    <div className="case-spinner" ref={spinnerRef}>
      <div className="spinner-track" ref={trackRef}>
        {items.map((item, index) => (
          <div 
            key={index} 
            className={'spinner-item spinner-item-' + item.rarity}
          >
            <div className="spinner-item-media">
              {item.media?.type === 'video' ? (
                <video autoPlay muted loop playsInline>
                  <source src={item.media.src} type="video/mp4" />
                </video>
              ) : (
                <img src={item.media?.src} alt={item.name} />
              )}
            </div>
            <div className={'spinner-item-rarity rarity-' + item.rarity}>
              {item.rarity.toUpperCase()}
            </div>
            <p className="spinner-item-name">{item.name}</p>
            <p className="spinner-item-value">{'$' + item.value.toFixed(2)}</p>
          </div>
        ))}
      </div>
      <div className="spinner-selector" />
    </div>
  );
}
