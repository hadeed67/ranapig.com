import { useNotification } from '@/context/NotificationContext';
import classNames from 'classnames';
import './Notification.css';

export function Notification() {
  const { notifications, dismissNotification } = useNotification();

  if (notifications.length === 0) return null;

  return (
    <div className="notification-container">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={classNames('notification', `notification-${notification.type}`)}
          onClick={() => dismissNotification(notification.id)}
        >
          <span className="notification-icon">
            {notification.type === 'success' && '✓'}
            {notification.type === 'error' && '✕'}
            {notification.type === 'warning' && '⚠'}
            {notification.type === 'info' && 'ℹ'}
          </span>
          <span className="notification-message">{notification.message}</span>
        </div>
      ))}
    </div>
  );
}
