import { useGame } from '@/context/GameContext';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/utils/formatters';
import './Header.css';

export function Header() {
  const { balance, addFunds } = useGame();

  const handleAddFunds = () => {
    addFunds(500);
  };

  return (
    <header className="header slide-down">
      <div className="header-left">
        <img 
          src="/assets/images/rana3.png" 
          alt="Logo" 
          className="header-logo float"
        />
        <h1 className="header-title">ranacasinolun.inc</h1>
      </div>
      
      <div className="header-right">
        <div className="balance-display">
          <span className="balance-label">Balance:</span>
          <span className="balance-amount">{formatCurrency(balance)}</span>
        </div>
        <Button variant="success" onClick={handleAddFunds}>
          Add Funds
        </Button>
      </div>
    </header>
  );
}
