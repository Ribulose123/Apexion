// components/NotificationModal.tsx
'use client';

import React from 'react';
import { useNotifications } from '../context/NotificationContext';
import { useNotificationsData } from '../hooks/useNotificationsData';
import Link from 'next/link';
import { ArrowRight, Bell } from 'lucide-react';

const NotificationModal = ({ onClose }: { onClose: () => void }) => {
  const { markNotificationsAsRead } = useNotifications();
  const { notifications, markAllAsRead } = useNotificationsData();

  const handleClick = () => {
    markNotificationsAsRead();
    markAllAsRead();
    onClose();
  };

  return (
    <div className='absolute top-14 right-0 w-80 bg-[#01040F] border border-gray-800 rounded-lg shadow-2xl z-50'>
      <div className='p-4 flex justify-between items-center border-b border-gray-800'>
        <h3 className="font-medium text-white">New Notification</h3>
        <div>
          <Link 
            href="/notifications" 
            className='flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300'
            onClick={handleClick}
          > 
            View more <ArrowRight size={14}/>
          </Link>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.slice(0, 3).map((notification) => (
          <div 
            key={notification.id}
            className={`p-4 border-b border-gray-800 hover:bg-gray-900 cursor-pointer transition ${
              !notification.isRead && !notification.read ? "bg-gray-900/50" : ""
            }`}
            onClick={handleClick}
          >
            <div className="flex items-start gap-3">
              <div className="mt-1 p-2 bg-blue-500/10 rounded-full">
                <Bell size={16} className="text-blue-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-white">{notification.title}</h4>
                <p className="text-sm text-gray-400">
                  {notification.description || notification.message}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {notification.timestamp || notification.time}
                </p>
              </div>
              {(!notification.isRead && !notification.read) && (
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationModal;