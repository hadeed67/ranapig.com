import { useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/utils/formatters';
import './CaseCard.css';

export function CaseCard({ caseData, onOpen, disabled = false }) {
  const cardRef = useRef(null);

  const handleMouseEnter = () => {
    if (disabled) return;
    gsap.to(cardRef.current, {
      y: -10,
      scale: 1.02,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = () => {
    if (disabled) return;
    gsap.to(cardRef.current, {
      y: 0,
      scale: 1,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  return (
    <div
      ref={cardRef}
      className={`case-card case-card-${caseData.rarity}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="case-media">
        {caseData.isVideo ? (
          <video autoPlay muted loop playsInline>
            <source src={caseData.media} type="video/mp4" />
          </video>
        ) : (
          <img src={caseData.media} alt={caseData.name} />
        )}
      </div>
      
      <div className="case-info">
        <div className={`case-rarity rarity-${caseData.rarity}`}>
          {caseData.rarity.toUpperCase()}
        </div>
        <h3 className="case-name">{caseData.name}</h3>
        <p className="case-description">{caseData.description}</p>
        <div className="case-price">{formatCurrency(caseData.price)}</div>
        <Button 
          variant="case" 
          onClick={() => onOpen(caseData)}
          disabled={disabled}
        >
          Open Case
        </Button>
      </div>
    </div>
  );
}
