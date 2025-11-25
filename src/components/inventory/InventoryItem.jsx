import { formatCurrency, formatRarity } from '@/utils/formatters';
import classNames from 'classnames';
import './InventoryItem.css';

export function InventoryItem({ item, onSelect, isSelected = false }) {
  const handleClick = () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <div
      className={classNames('inventory-item', `inventory-item-${item.rarity}`, {
        'inventory-item-selected': isSelected
      })}
      onClick={handleClick}
    >
      <div className="inventory-media">
        {item.media?.type === 'video' ? (
          <video autoPlay muted loop playsInline>
            <source src={item.media.src} type="video/mp4" />
          </video>
        ) : (
          <img src={item.media?.src} alt={item.name} />
        )}
      </div>
      
      <div className="inventory-info">
        <div className={`inventory-rarity rarity-${item.rarity}`}>
          {formatRarity(item.rarity)}
        </div>
        <h4 className="inventory-name">{item.name}</h4>
        <div className="inventory-value">{formatCurrency(item.value)}</div>
      </div>
    </div>
  );
}
