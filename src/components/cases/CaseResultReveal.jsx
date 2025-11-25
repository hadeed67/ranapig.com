import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ParticleEffect } from '@/components/ui/ParticleEffect';
import { RARITY_COLORS } from '@/data/rarities';
import './CaseResultReveal.css';

export function CaseResultReveal({ item }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current || !glowRef.current) return;

    const tl = gsap.timeline();

    // Dramatic 3D flip entrance
    tl.fromTo(cardRef.current,
      { 
        scale: 0,
        rotationY: -180,
        opacity: 0
      },
      {
        scale: 1,
        rotationY: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'back.out(1.7)'
      }
    );

    // Pulsing glow
    tl.to(glowRef.current, {
      opacity: 1,
      scale: 1.2,
      duration: 0.6,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut'
    }, '-=0.4');

    return () => tl.kill();
  }, [item]);

  return (
    <div className="case-result-reveal">
      <ParticleEffect count={60} color={RARITY_COLORS[item.rarity]} duration={2} />
      <div ref={cardRef} className="result-card">
        <div 
          ref={glowRef}
          className="result-glow"
          style={{ backgroundColor: RARITY_COLORS[item.rarity] }}
        />
        <div className="result-media-container">
          {item.media?.type === 'video' ? (
            <video autoPlay muted loop playsInline className="result-media">
              <source src={item.media.src} type="video/mp4" />
            </video>
          ) : (
            <img src={item.media?.src} alt={item.name} className="result-media" />
          )}
        </div>
        <div className={'result-rarity-badge rarity-' + item.rarity}>
          {item.rarity.toUpperCase()}
        </div>
        <h2 className="result-name">{item.name}</h2>
        <p className="result-value">{'$' + item.value.toFixed(2)}</p>
      </div>
    </div>
  );
}
