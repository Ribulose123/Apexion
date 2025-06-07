'use client'
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';


interface NotificationSettings {
  announcements: boolean;
  email: boolean;
  priceofAlert: boolean;
  signal: boolean;
  appPush: boolean;
  showBadge: boolean;
  hasUnreadNotifications: boolean; 
}


interface NotificationContextType {
  settings: NotificationSettings;
  updateSetting: (key: keyof NotificationSettings, value: boolean) => void;
  markNotificationsAsRead: () => void;
}


const NotificationContext = createContext<NotificationContextType | undefined>(undefined);


interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<NotificationSettings>({
    announcements: true,
    email: true,
    priceofAlert: true,
    signal: true,
    appPush: true,
    showBadge: true,
    hasUnreadNotifications: false, // Initialize as false, will load from localStorage
  });

  // Load settings from localStorage on initial render
  useEffect(() => {
    const loadSettings = async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      const savedSettings = localStorage.getItem('notificationSettings');
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    };
    loadSettings();
  }, []);

  // Simulate new notifications arriving periodically
  useEffect(() => {
    const interval = setInterval(() => {
      // Only set hasUnreadNotifications to true if showBadge is true in settings
      setSettings(prev => {
        const newHasUnread = prev.showBadge ? Math.random() > 0.7 : false;
        return {
          ...prev,
          hasUnreadNotifications: newHasUnread,
        };
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Function to update a specific setting
  const updateSetting = (key: keyof NotificationSettings, value: boolean) => {
    setSettings(prev => {
      const newSettings = { ...prev, [key]: value };
      localStorage.setItem('notificationSettings', JSON.stringify(newSettings));

      // If showBadge is turned off, immediately hide any unread notifications
      if (key === 'showBadge' && !value) {
        newSettings.hasUnreadNotifications = false;
      }
      return newSettings;
    });
  };

  // Function to mark all notifications as read
  const markNotificationsAsRead = () => {
    setSettings(prev => ({ ...prev, hasUnreadNotifications: false }));
    // In a real app, you would also make an API call to mark notifications as read on the backend.
  };

  const contextValue: NotificationContextType = {
    settings,
    updateSetting,
    markNotificationsAsRead,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

// Custom hook to consume the context
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};