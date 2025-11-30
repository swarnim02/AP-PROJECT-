import { useState, useEffect } from 'react';

let showNotificationGlobal = null;

function Notification() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    showNotificationGlobal = (message, type = 'info') => {
      const id = Date.now();
      const notification = { id, message, type };
      setNotifications(prev => [...prev, notification]);
      
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }, 4000);
    };
  }, []);

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="notification-container">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={`notification notification-${notification.type}`}
          onClick={() => removeNotification(notification.id)}
        >
          {notification.message}
          <button className="notification-close">×</button>
        </div>
      ))}
    </div>
  );
}

export const showNotification = (message, type) => {
  if (showNotificationGlobal) {
    showNotificationGlobal(message, type);
  }
};

export default Notification;