"use client";
import React, { useState } from "react";
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
  const [expandedId, setExpandedId] = useState<number | string | null>(null);

  const totalPages = 3;
  const sidebarItems = [
    { icon: Bell, label: "All", count: notifications.length },
    { icon: Settings, label: "System Notifications", count: 2 },
    { icon: Bell, label: "Announcements", count: null },
    { icon: Folder, label: "News", count: null },
    { icon: User, label: "Account", count: null },
  ];

  const handleToggle = (id: number | string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const renderPagination = () => {
    const pages = [];

    // Previous button
    pages.push(
      <button
        key="prev"
        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
        disabled={currentPage === 1}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
    );

    // Page numbers
    for (let i = 1; i <= Math.min(3, totalPages); i++) {
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
        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
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

  return (
    <div className="text-white mt-3">
      <div className="p-4 md:p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold">Notifications</h2>
          <div className="flex items-center gap-4">
            <button
              className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
              onClick={handleMarkAllAsRead}
            >
              <TfiBrushAlt size={20} />
              <span className="hidden md:block text-lg font-medium">
                Mark All as Read
              </span>
            </button>
            <button className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
              <Settings size={20} />
              <span className="hidden md:block text-lg font-medium">
                Settings
              </span>
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 md:border-r border-[#141E32] md:pr-4">
            {/* Desktop view */}
            <nav className="space-y-2 hidden md:block">
              {sidebarItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={index}
                    onClick={() => setActiveTab(item.label)}
                    className={`w-full text-left flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                      activeTab === item.label
                        ? "bg-gray-700 text-white"
                        : "text-gray-400 hover:text-white hover:bg-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-[#141E32] rounded-full w-7 h-7 flex items-center justify-center">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="text-sm">{item.label}</span>
                    </div>
                    {item.count !== null && (
                      <span className="bg-gray-600 text-xs px-2 py-0.5 rounded-full">
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Mobile view */}
            <div className="space-x-5 border-b-1 border-[#141E32] block md:hidden">
              {sidebarItems.map((item, index) => (
                <button
                  className={`${
                    activeTab === item.label ? "border-b border-[#F2AF29]" : ""
                  }`}
                  key={index}
                  onClick={() => setActiveTab(item.label)}
                >
                  <div>
                    {item.label}{" "}
                    <span
                      className={`text-[15px] ${
                        activeTab === item.label
                          ? "text-[#F2AF29]"
                          : "text-white"
                      }`}
                    >
                      {item.count}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Notifications List */}
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="border-b border-[#141E32] p-3 hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            notification.isRead || notification.read
                              ? "bg-gray-500"
                              : "bg-cyan-500"
                          }`}
                        ></div>
                        <h3 className="font-medium text-white">
                          {notification.type || notification.title}
                        </h3>
                      </div>

                      <p
                        className={`text-gray-300 text-sm mb-3 ${
                          expandedId === notification.id ? "" : "line-clamp-2"
                        }`}
                      >
                        {notification.description || notification.message}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="text-gray-500 text-xs">
                          {notification.timestamp || notification.time}
                        </div>
                        {expandedId === notification.id && (
                          <Link
                            href="#"
                            className="text-blue-400 hover:text-blue-300 text-xs flex items-center"
                            onClick={(e) => {
                              e.preventDefault();
                              // Handle view more action
                            }}
                          >
                            View more <ArrowRight className="w-3 h-3 ml-1" />
                          </Link>
                        )}
                      </div>
                    </div>

                    <button
                      className="text-gray-400 hover:text-white transition-colors ml-4"
                      onClick={() => handleToggle(notification.id)}
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          expandedId === notification.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center space-x-2 mt-8">
              {renderPagination()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;