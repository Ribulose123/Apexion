// components/NotifactionSettings.tsx
import React from "react";
import ToggleBotton from "./ToggleBotton";
import { useNotifications } from "@/app/context/NotificationContext";

const NotifactionSettings = () => {
  const { settings, updateSetting, /* markNotificationsAsRead */ } = useNotifications();

  const handleSettingChange = (key: keyof typeof settings, value: boolean) => {
    updateSetting(key, value);
  };

 /*  const handleViewNotifications = () => {
    markNotificationsAsRead();
    alert('Showing notifications...');
  }; */

  return (
    <div>
      <h2 className="text-xl text-white font-semibold capitalize">notifications</h2>
      <div className="border-2 border-[#141E32] rounded-lg p-4 gap-4">
        <div className="w-full">
          <div className=" w-full ">
            <span className="block text-base text-white font-semibold ">
              Notifications settings
            </span>
            <p className="text-sm text-[#A4A4A4] font-medium">
              SMS notifications might not be available in your location. In that
              case, you can opt for email notifications instead.
            </p>
          </div>
          <div className="w-full h-[2px] bg-[#141E32] mt-1"></div>
        </div>

        {/* Notification settings */}
        <div className="mt-5 space-y-4">
          {/* Announcements */}
          <div className="flex items-center justify-between">
            <span className="md:text-base text-sm text-white font-semibold capitalize">announcements</span>
            <ToggleBotton
              id="announcements"
              checked={settings.announcements}
              onChange={(checked) => handleSettingChange('announcements', checked)}
            />
          </div>

          {/* Signals */}
          <div className="flex items-center justify-between">
            <span className="md:text-base text-sm text-white font-semibold capitalize">Signals</span>
            <ToggleBotton
              id="signal"
              checked={settings.signal}
              onChange={(checked) => handleSettingChange('signal', checked)}
            />
          </div>

          {/* Email */}
          <div className="flex items-center justify-between">
            <span className="md:text-base text-sm text-white font-semibold capitalize">Email</span>
            <ToggleBotton
              id="email"
              checked={settings.email}
              onChange={(checked) => handleSettingChange('email', checked)}
            />
          </div>

          {/* Price alert */}
          <div className="flex items-center justify-between">
            <span className="md:text-base text-sm text-white font-semibold capitalize">Price Alert</span>
            <ToggleBotton
              id="priceofAlert"
              checked={settings.priceofAlert}
              onChange={(checked) => handleSettingChange('priceofAlert', checked)}
            />
          </div>

          {/* App push */}
          <div className="flex items-center justify-between">
            <span className="md:text-base text-sm text-white font-semibold capitalize">App push notifications</span>
            <ToggleBotton
              id="appPush"
              checked={settings.appPush}
              onChange={(checked) => handleSettingChange('appPush', checked)}
            />
          </div>

           {/* Show Badge Toggle (Add this to your UI) */}
           <div className="flex items-center justify-between">
            <span className="md:text-base text-sm text-white font-semibold capitalize">Show Notification Badge</span>
            <ToggleBotton
              id="showBadge"
              checked={settings.showBadge}
              onChange={(checked) => handleSettingChange('showBadge', checked)}
            />
          </div>

          {/* Example button to view notifications and mark them as read */}
        {/*   <button
            onClick={handleViewNotifications}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            View Notifications
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default NotifactionSettings;