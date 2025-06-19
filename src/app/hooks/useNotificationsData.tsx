// hooks/useNotificationsData.ts
'use client';

import { useState } from 'react';

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
}

export const useNotificationsData = () => {
  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'Login Attempt From New IP',
      title: 'Dear User,',
      description: 'This appears to be detected that your account is logged from an unfamiliar IP address...',
      timestamp: '1 day ago',
      isRead: false
    },
    {
      id: '2',
      type: 'Security Alert',
      title: 'Important Update',
      description: 'Please update your password for security reasons...',
      timestamp: '2 days ago',
      isRead: false
    },
    {
      id: '3',
      type: 'System Notification',
      title: 'New Feature Available',
      description: 'Check out our new trading tools in the dashboard...',
      timestamp: '3 days ago',
      isRead: true
    },
    {
      id: 4,
      title: "New feature available",
      message: "Check out our new trading tools",
      time: "2 hours ago",
      timestamp: "2 hours ago",
      read: false
    },
    {
      id: 5,
      title: "Security alert",
      message: "Your account was accessed from a new device",
      time: "1 day ago",
      timestamp: "1 day ago",
      read: true
    }
  ]);

  const markAllAsRead = () => {
    
    console.log("All notifications marked as read");
  };

  return {
    notifications,
    markAllAsRead
  };
};