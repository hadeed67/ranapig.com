import { useState } from 'react';
import { GameProvider } from '@/context/GameContext';
import { NotificationProvider, useNotification } from '@/context/NotificationContext';
import { Header } from '@/components/layout/Header';
import { MobileNav } from '@/components/layout/MobileNav';
import { CaseGrid } from '@/components/cases/CaseGrid';
import { InventoryGrid } from '@/components/inventory/InventoryGrid';
import { Notification } from '@/components/ui/Notification';
import { Modal } from '@/components/ui/Modal';
import { CaseSpinner } from '@/components/cases/CaseSpinner';
import { CaseResultReveal } from '@/components/cases/CaseResultReveal';
import { useGame } from '@/context/GameContext';
import { generateSpinItems } from '@/utils/rarityCalculator';
import '@/styles/variables.css';
import '@/styles/global.css';
import '@/styles/animations.css';
import '@/styles/mobile.css';
import './App.css';

function AppContent() {
  const { balance, deductBalance, addToInventory } = useGame();
  const { showNotification } = useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinItems, setSpinItems] = useState([]);
  const [wonItem, setWonItem] = useState(null);

  const handleOpenCase = (caseData) => {
    // Check if user has enough balance
    if (!deductBalance(caseData.price)) {
      const priceFormatted = caseData.price.toFixed(2);
      showNotification('Insufficient funds! Need $' + priceFormatted, 'error');
      return;
    }

    // Generate items for spinning animation (25 items, last one is the winner)
    const items = generateSpinItems(caseData.rarity, 25);
    const finalItem = items[items.length - 1];

    setSpinItems(items);
    setWonItem(finalItem);
    setIsSpinning(true);
    setIsModalOpen(true);
  };

  const handleSpinComplete = (finalItem) => {
    // Add to inventory
    addToInventory(finalItem);

    // Show result
    setIsSpinning(false);

    // Show notification
    showNotification('You won ' + finalItem.name + '!', 'success');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setWonItem(null);
      setSpinItems([]);
      setIsSpinning(false);
    }, 300);
  };

  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <CaseGrid onOpenCase={handleOpenCase} />
        <InventoryGrid />
      </main>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {isSpinning && spinItems.length > 0 ? (
          <div className="spinning-modal">
            <h2>Opening Case...</h2>
            <CaseSpinner
              items={spinItems}
              finalItem={wonItem}
              onComplete={handleSpinComplete}
            />
          </div>
        ) : wonItem ? (
          <CaseResultReveal item={wonItem} />
        ) : null}
      </Modal>

      <Notification />
      <MobileNav />
    </div>
  );
}

function App() {
  return (
    <GameProvider>
      <NotificationProvider>
        <AppContent />
      </NotificationProvider>
    </GameProvider>
  );
}

export default App;
