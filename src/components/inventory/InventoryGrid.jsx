import { useGame } from '@/context/GameContext';
import { InventoryItem } from './InventoryItem';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/utils/formatters';
import './InventoryGrid.css';

export function InventoryGrid({ onSelectItem, selectedItemId = null }) {
  const { inventory, emptyInventory, getInventoryValue } = useGame();

  const handleEmptyInventory = () => {
    emptyInventory();
  };

  if (inventory.length === 0) {
    return (
      <div className="inventory-container">
        <div className="inventory-header">
          <h2 className="section-title">Inventory</h2>
        </div>
        <div className="inventory-empty">
          <p>Your inventory is empty</p>
          <p className="inventory-empty-hint">Open cases to get items!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="inventory-container">
      <div className="inventory-header">
        <div>
          <h2 className="section-title">Inventory</h2>
          <p className="inventory-stats">
            {inventory.length} items • Total value: {formatCurrency(getInventoryValue())}
          </p>
        </div>
        <Button variant="danger" onClick={handleEmptyInventory}>
          Empty Inventory
        </Button>
      </div>
      
      <div className="inventory-grid">
        {inventory.map((item) => (
          <InventoryItem
            key={item.id}
            item={item}
            onSelect={onSelectItem}
            isSelected={selectedItemId === item.id}
          />
        ))}
      </div>
    </div>
  );
}
