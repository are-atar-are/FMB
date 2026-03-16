import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';

interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface NotificationContextType {
  showNotification: (message: string, type?: Notification['type']) => void;
  hideNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: React.ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = useCallback((message: string, type: Notification['type'] = 'info') => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, message, type }]);
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
      hideNotification(id);
    }, 3000);
  }, []);

  const hideNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification, hideNotification }}>
      {children}
      <View style={styles.container}>
        {notifications.map(notification => (
          <NotificationToast
            key={notification.id}
            notification={notification}
            onHide={() => hideNotification(notification.id)}
          />
        ))}
      </View>
    </NotificationContext.Provider>
  );
};

interface NotificationToastProps {
  notification: Notification;
  onHide: () => void;
}

const NotificationToast: React.FC<NotificationToastProps> = ({ notification, onHide }) => {
  const translateY = new Animated.Value(-100);

  React.useEffect(() => {
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  }, []);

  const getBackgroundColor = () => {
    switch (notification.type) {
      case 'success':
        return '#34C759';
      case 'error':
        return '#FF3B30';
      case 'info':
      default:
        return '#007AFF';
    }
  };

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'info':
      default:
        return 'ℹ';
    }
  };

  return (
    <Animated.View
      style={[
        styles.toast,
        { backgroundColor: getBackgroundColor(), transform: [{ translateY }] },
      ]}
    >
      <Text style={styles.icon}>{getIcon()}</Text>
      <Text style={styles.message}>{notification.message}</Text>
      <TouchableOpacity onPress={onHide} style={styles.closeButton}>
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1000,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width - 40,
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  icon: {
    fontSize: 18,
    color: 'white',
    marginRight: 12,
    fontWeight: 'bold',
  },
  message: {
    flex: 1,
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
  },
  closeButton: {
    padding: 4,
  },
  closeText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});