import { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  /**
   * Show notification toast
   * @param {string} message - Message to display
   * @param {string} type - success | error | warning | info
   * @param {number} duration - Duration in ms (default 3000)
   */
  const showNotification = (message, type = 'success', duration = 3000) => {
    const id = Date.now() + Math.random();
    const notification = { id, message, type };
    
    setNotifications(prev => [...prev, notification]);
    
    // Auto-dismiss after duration
    if (duration > 0) {
      setTimeout(() => {
        dismissNotification(id);
      }, duration);
    }
    
    return id;
  };

  /**
   * Dismiss notification by ID
   * @param {number} id - Notification ID
   */
  const dismissNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  /**
   * Clear all notifications
   */
  const clearAll = () => {
    setNotifications([]);
  };

  const value = {
    notifications,
    showNotification,
    dismissNotification,
    clearAll
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

/**
 * Hook to use notification context
 * @throws {Error} If used outside NotificationProvider
 */
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
};
