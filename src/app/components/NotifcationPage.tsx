"use client";
import React, { useState, useMemo } from "react";
import {
  Bell,
  ChevronDown,
  Settings,
  User,
  Folder,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { TfiBrushAlt } from "react-icons/tfi";
import { useNotifications } from "../context/NotificationContext";
import { useNotificationsData } from "../hooks/useNotificationsData";

const NotificationPage = () => {
  const { markNotificationsAsRead } = useNotifications();
  const { notifications, markAllAsRead } = useNotificationsData();
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("All");
  const [expandedNotifications, setExpandedNotifications] = useState<Set<string | number>>(new Set());

  // Constants
  const NOTIFICATIONS_PER_PAGE = 5;
  const totalPages = Math.ceil(notifications.length / NOTIFICATIONS_PER_PAGE);

  // Filter notifications based on active tab
  const filteredNotifications = useMemo(() => {
    switch (activeTab) {
      case "System Notifications":
        return notifications.filter(notification => 
          notification.type?.includes("System") || 
          notification.title?.includes("Security") ||
          notification.type?.includes("Login")
        );
      case "Announcements":
        return notifications.filter(notification => 
          notification.title?.includes("New feature") ||
          notification.title?.includes("Announcement")
        );
      case "News":
        return notifications.filter(notification => 
          notification.title?.includes("Market") ||
          notification.title?.includes("📈")
        );
      case "Account":
        return notifications.filter(notification => 
          notification.type?.includes("Account") ||
          notification.title?.includes("Profile") ||
          notification.title?.includes("Reminder")
        );
      default:
        return notifications;
    }
  }, [notifications, activeTab]);

  // Paginate notifications
  const paginatedNotifications = useMemo(() => {
    const startIndex = (currentPage - 1) * NOTIFICATIONS_PER_PAGE;
    return filteredNotifications.slice(startIndex, startIndex + NOTIFICATIONS_PER_PAGE);
  }, [filteredNotifications, currentPage]);

  // Sidebar items with dynamic counts
  const sidebarItems = [
    { 
      icon: Bell, 
      label: "All", 
      count: notifications.length 
    },
    { 
      icon: Settings, 
      label: "System Notifications", 
      count: notifications.filter(n => 
        n.type?.includes("System") || n.title?.includes("Security")
      ).length 
    },
    { 
      icon: Bell, 
      label: "Announcements", 
      count: notifications.filter(n => 
        n.title?.includes("New feature") || n.title?.includes("Announcement")
      ).length 
    },
    { 
      icon: Folder, 
      label: "News", 
      count: notifications.filter(n => 
        n.title?.includes("Market") || n.title?.includes("📈")
      ).length 
    },
    { 
      icon: User, 
      label: "Account", 
      count: notifications.filter(n => 
        n.type?.includes("Account") || n.title?.includes("Profile")
      ).length 
    },
  ];

  const toggleNotification = (id: string | number) => {
    setExpandedNotifications(prev => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(id)) {
        newExpanded.delete(id);
      } else {
        newExpanded.add(id);
      }
      return newExpanded;
    });
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 3;

    // Previous button
    pages.push(
      <button
        key="prev"
        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={currentPage === 1}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
    );

    // Calculate start and end for page numbers
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${
            currentPage === i
              ? "bg-[#1DA2B4] text-white"
              : "text-gray-400 hover:text-white hover:bg-gray-700"
          }`}
        >
          {i}
        </button>
      );
    }

    // Next button
    pages.push(
      <button
        key="next"
        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    );

    return pages;
  };

  const handleMarkAllAsRead = () => {
    markNotificationsAsRead();
    markAllAsRead();
  };

  // Reset to page 1 when tab changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  return (
    <div className="text-white mt-3 min-h-screen bg-[#0A0D14]">
      <div className="p-4 md:p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold">Notifications</h2>
          <div className="flex items-center gap-4">
            <button
              className="flex items-center gap-2 hover:text-cyan-400 transition-colors p-2 rounded-lg hover:bg-gray-800"
              onClick={handleMarkAllAsRead}
            >
              <TfiBrushAlt size={20} />
              <span className="hidden md:block text-lg font-medium">
                Mark All as Read
              </span>
            </button>
            <Link 
              href='/security' 
              className="flex items-center gap-2 hover:text-cyan-400 transition-colors p-2 rounded-lg hover:bg-gray-800"
            >
              <Settings size={20} />
              <span className="hidden md:block text-lg font-medium">
                Settings
              </span>
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full lg:w-64 lg:border-r border-[#141E32] lg:pr-4">
            {/* Desktop Sidebar */}
            <nav className="space-y-2 hidden lg:block">
              {sidebarItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={index}
                    onClick={() => setActiveTab(item.label)}
                    className={`w-full text-left flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                      activeTab === item.label
                        ? "bg-[#1DA2B4] bg-opacity-20 text-cyan-400 border border-cyan-400 border-opacity-30"
                        : "text-gray-400 hover:text-white hover:bg-gray-800"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`rounded-full w-8 h-8 flex items-center justify-center ${
                        activeTab === item.label ? "bg-cyan-400" : "bg-[#141E32]"
                      }`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    {item.count !== null && item.count > 0 && (
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        activeTab === item.label 
                          ? "bg-cyan-400 text-white" 
                          : "bg-gray-700 text-gray-300"
                      }`}>
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Mobile Tabs */}
            <div className="flex overflow-x-auto gap-2 pb-2 border-b border-[#141E32] lg:hidden scrollbar-hide">
              {sidebarItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(item.label)}
                  className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === item.label
                      ? "bg-[#1DA2B4] text-white"
                      : "text-gray-400 bg-[#141E32] hover:text-white"
                  }`}
                >
                  {item.label}
                  {item.count !== null && item.count > 0 && (
                    <span className="ml-2 bg-gray-600 text-white text-xs px-2 py-0.5 rounded-full">
                      {item.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Notifications Content */}
          <div className="flex-1">
            {/* Notifications List */}
            <div className="space-y-3">
              {paginatedNotifications.length > 0 ? (
                paginatedNotifications.map((notification) => {
                  const isExpanded = expandedNotifications.has(notification.id);
                  const isUnread = !(notification.isRead || notification.read);
                  
                  return (
                    <div
                      key={notification.id}
                      className={`border border-[#141E32] rounded-lg p-4 transition-all duration-200 ${
                        isUnread 
                          ? "bg-cyan-900 bg-opacity-10 border-cyan-500 border-opacity-30" 
                          : "bg-[#141E32] bg-opacity-30 hover:bg-opacity-50"
                      } hover:shadow-lg`}
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <div
                              className={`w-3 h-3 rounded-full flex-shrink-0 ${
                                isUnread ? "bg-cyan-500 animate-pulse" : "bg-gray-500"
                              }`}
                            ></div>
                            <h3 className="font-semibold text-white truncate">
                              {notification.type || notification.title}
                            </h3>
                          </div>

                          <p
                            className={`text-gray-300 text-sm mb-3 leading-relaxed ${
                              isExpanded ? "" : "line-clamp-2"
                            }`}
                          >
                            {notification.description || notification.message}
                          </p>
                          
                          <div className="flex items-center justify-between mt-3">
                            <span className="text-gray-500 text-xs">
                              {notification.timestamp || notification.time}
                            </span>
                            {isExpanded && (
                              <Link
                                href="#"
                                className="text-cyan-400 hover:text-cyan-300 text-xs flex items-center transition-colors"
                                onClick={(e) => e.preventDefault()}
                              >
                                View details <ArrowRight className="w-3 h-3 ml-1" />
                              </Link>
                            )}
                          </div>
                        </div>

                        <button
                          className="text-gray-400 hover:text-cyan-400 transition-colors flex-shrink-0 ml-2"
                          onClick={() => toggleNotification(notification.id)}
                          aria-label={isExpanded ? "Collapse notification" : "Expand notification"}
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12">
                  <Bell className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-400 mb-2">
                    No notifications found
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {activeTab === "All" 
                      ? "You're all caught up!" 
                      : `No ${activeTab.toLowerCase()} found`}
                  </p>
                </div>
              )}
            </div>

            {/* Pagination - Only show if there are pages */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-8">
                {renderPagination()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;