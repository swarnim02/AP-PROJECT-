import { showNotification } from '../components/Notification';

// Helper functions for common notification patterns
export const notifySuccess = (message) => {
  showNotification(message, 'success');
};

export const notifyError = (message) => {
  showNotification(message, 'error');
};

export const notifyInfo = (message) => {
  showNotification(message, 'info');
};

// API error handler
export const handleApiError = (error) => {
  if (error.message.includes('401')) {
    notifyError('Session expired. Please login again.');
    localStorage.removeItem('token');
    window.location.href = '/login';
  } else if (error.message.includes('403')) {
    notifyError('Access denied. Insufficient permissions.');
  } else if (error.message.includes('404')) {
    notifyError('Resource not found.');
  } else if (error.message.includes('500')) {
    notifyError('Server error. Please try again later.');
  } else {
    notifyError('An unexpected error occurred.');
  }
};