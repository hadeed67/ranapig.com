import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './ParticleEffect.css';

export function ParticleEffect({ count = 50, color = '#667eea', duration = 1.5 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const particles = [];
    const container = containerRef.current;
    
    // Create particles
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.backgroundColor = color;
      container.appendChild(particle);
      particles.push(particle);

      // Random angle for radial burst
      const angle = (Math.PI * 2 * i) / count;
      const distance = 100 + Math.random() * 150;
      const size = 3 + Math.random() * 5;
      
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';

      // Animate particle outward
      gsap.fromTo(particle,
        { 
          x: 0, 
          y: 0, 
          opacity: 1, 
          scale: 1 
        },
        {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          opacity: 0,
          scale: 0,
          duration: duration + Math.random() * 0.5,
          ease: 'power2.out'
        }
      );
    }

    // Cleanup
    return () => {
      particles.forEach(p => p.remove());
    };
  }, [count, color, duration]);

  return <div ref={containerRef} className="particle-container" />;
}
