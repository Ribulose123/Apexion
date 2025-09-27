// hooks/useNotificationsData.ts
'use client';

import { useState, useCallback } from 'react';

export interface Notification {
  id: string | number;
  type?: string;
  title: string;
  description?: string;
  message?: string;
  timestamp: string;
  time?: string;
  isRead?: boolean;
  read?: boolean;
  priority?: 'low' | 'medium' | 'high';
  category?: 'security' | 'feature' | 'market' | 'tip' | 'reminder';
}

export const useNotificationsData = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    // Security notifications
    {
      id: '1',
      type: 'Login Attempt From New IP',
      title: 'Dear User,',
      description: 'This appears to be detected that your account is logged from an unfamiliar IP address...',
      timestamp: '1 day ago',
      isRead: false,
      priority: 'high',
      category: 'security'
    },
    {
      id: '2',
      type: 'Security Alert',
      title: 'Important Update',
      description: 'Please update your password for security reasons...',
      timestamp: '2 days ago',
      isRead: false,
      priority: 'high',
      category: 'security'
    },
    {
      id: 5,
      title: "🔐 Recent login detected.",
      message: "Review your account activity.",
      time: "1 day ago",
      timestamp: "1 day ago",
      read: true,
      priority: 'medium',
      category: 'security'
    },

    // Feature notifications
    {
      id: '3',
      type: 'System Notification',
      title: 'New Feature Available',
      description: 'Check out our new trading tools in the dashboard...',
      timestamp: '3 days ago',
      isRead: true,
      priority: 'medium',
      category: 'feature'
    },
    {
      id: 4,
      title: "New features available!",
      message: "Check out our latest trading tools.",
      time: "2 hours ago",
      timestamp: "2 hours ago",
      read: false,
      priority: 'medium',
      category: 'feature'
    },

    // Market notifications
    {
      id: 6,
      title: "📈 Market update",
      message: "Stay ahead with today's insights.",
      time: "3 hours ago",
      timestamp: "3 hours ago",
      read: false,
      priority: 'low',
      category: 'market'
    },

    // Tip notifications
    {
      id: 7,
      title: "💡 Tip of the day",
      message: "Explore copy trading to maximize growth.",
      time: "5 hours ago",
      timestamp: "5 hours ago",
      read: false,
      priority: 'low',
      category: 'tip'
    },

    // Reminder notifications
    {
      id: 8,
      title: "📢 Reminder",
      message: "Complete your profile for a better experience.",
      time: "1 day ago",
      timestamp: "1 day ago",
      read: true,
      priority: 'low',
      category: 'reminder'
    }
  ]);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(notification => ({
      ...notification,
      isRead: true,
      read: true
    })));
    console.log("All notifications marked as read");
  }, []);

  const markAsRead = useCallback((id: string | number) => {
    setNotifications(prev => prev.map(notification => 
      notification.id === id 
        ? { ...notification, isRead: true, read: true }
        : notification
    ));
  }, []);

  const deleteNotification = useCallback((id: string | number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const addNotification = useCallback((notification: Omit<Notification, 'id'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now() // Simple ID generation
    };
    setNotifications(prev => [newNotification, ...prev]);
  }, []);

  const unreadCount = notifications.filter(notification => 
    !notification.isRead && !notification.read
  ).length;

  return {
    notifications,
    unreadCount,
    markAllAsRead,
    markAsRead,
    deleteNotification,
    addNotification
  };
};