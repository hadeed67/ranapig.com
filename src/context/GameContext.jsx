import { createContext, useContext, useState, useEffect } from 'react';

const GameContext = createContext();

export function GameProvider({ children }) {
  // Initialize state from localStorage or defaults
  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem('balance');
    return saved ? parseFloat(saved) : 1000.00;
  });
  
  const [inventory, setInventory] = useState(() => {
    const saved = localStorage.getItem('inventory');
    return saved ? JSON.parse(saved) : [];
  });

  // Persist balance to localStorage
  useEffect(() => {
    localStorage.setItem('balance', balance.toString());
  }, [balance]);

  // Persist inventory to localStorage
  useEffect(() => {
    localStorage.setItem('inventory', JSON.stringify(inventory));
  }, [inventory]);

  /**
   * Add funds to balance
   * @param {number} amount - Amount to add
   */
  const addFunds = (amount) => {
    setBalance(prev => prev + amount);
  };

  /**
   * Deduct amount from balance (with validation)
   * @param {number} amount - Amount to deduct
   * @returns {boolean} Success flag
   */
  const deductBalance = (amount) => {
    if (balance < amount) {
      return false;
    }
    setBalance(prev => prev - amount);
    return true;
  };

  /**
   * Add item to inventory
   * @param {object} item - Item to add
   */
  const addToInventory = (item) => {
    setInventory(prev => [...prev, item]);
  };

  /**
   * Remove item from inventory by ID
   * @param {string|number} itemId - Item ID to remove
   */
  const removeFromInventory = (itemId) => {
    setInventory(prev => prev.filter(item => item.id !== itemId));
  };

  /**
   * Empty entire inventory (with confirmation)
   * @returns {boolean} Whether inventory was emptied
   */
  const emptyInventory = () => {
    if (inventory.length === 0) return false;
    
    if (window.confirm(`Empty inventory? You will lose ${inventory.length} item(s)!`)) {
      setInventory([]);
      return true;
    }
    return false;
  };

  /**
   * Get item from inventory by ID
   * @param {string|number} itemId - Item ID
   * @returns {object|null} Item or null
   */
  const getItemById = (itemId) => {
    return inventory.find(item => item.id === itemId) || null;
  };

  /**
   * Get inventory total value
   * @returns {number} Total value of all items
   */
  const getInventoryValue = () => {
    return inventory.reduce((sum, item) => sum + (item.value || 0), 0);
  };

  const value = {
    // State
    balance,
    inventory,
    
    // Balance operations
    addFunds,
    deductBalance,
    
    // Inventory operations
    addToInventory,
    removeFromInventory,
    emptyInventory,
    getItemById,
    getInventoryValue
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}

/**
 * Hook to use game context
 * @throws {Error} If used outside GameProvider
 */
export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
};
