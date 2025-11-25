import './MobileNav.css';

export function MobileNav() {
  const scrollToSection = (id) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navItems = [
    { label: 'Cases', icon: '🎁', action: () => scrollToSection('.case-grid-container') },
    { label: 'Inventory', icon: '🎒', action: () => scrollToSection('.inventory-container') },
    { label: 'Top', icon: '⬆️', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) }
  ];

  return (
    <nav className="mobile-nav">
      {navItems.map(item => (
        <button
          key={item.label}
          className="mobile-nav-item"
          onClick={item.action}
        >
          <span className="mobile-nav-icon">{item.icon}</span>
          <span className="mobile-nav-label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
