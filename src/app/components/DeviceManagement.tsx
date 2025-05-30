'use client';
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { MdOutlineMonitor } from "react-icons/md";

const DeviceManagement = () => {
    const router = useRouter()
  const devices = [
    {
      device: 'Chrome 13 136.0.0.0/Windows 10',
      loginTime: '2020-05-23 00:09:34',
      loginLocation: 'Nigeria-Bayelsa State-Yenagoa',
      ip: '112.019.09.31',
      deviceType: 'Temporary Device',
      isCurrentDevice: true
    },
    {
      device: 'Chrome 13 136.0.0.0/Windows 10',
      loginTime: '2020-05-23 00:09:34',
      loginLocation: 'Nigeria-Bayelsa State-Yenagoa',
      ip: '112.019.09.31',
      deviceType: 'Temporary Device',
      isCurrentDevice: false
    }
  ];

  return (
    <div className="min-h-screen  text-white">
      {/* Header */}
      <div className="flex items-center space-x-4 p-6 ">
         <button
                  onClick={() => router.back()}
                  className="text-gray-400 hover:text-white md:block hidden"
                >
                  <ArrowLeft className="mr-1" size={30} />
                </button>
        <h1 className="text-2xl sm:text-4xl font-semibold text-[#E8E8E8]">Device Management</h1>
      </div>

      {/* Table Container */}
      <div className="p-6">
        <div className="overflow-auto">
          <table className="w-full">
            {/* Table Header */}
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-4 px-4 text-[#E8E8E8] font-medium text-sm">Device</th>
                <th className="text-left py-4 px-4 text-[#E8E8E8] font-medium text-sm">Login Time</th>
                <th className="text-left py-4 px-4 text-[#E8E8E8] font-medium text-sm">Login Location</th>
                <th className="text-left py-4 px-4 text-[#E8E8E8] font-medium text-sm">IP</th>
                <th className="text-left py-4 px-4 text-[#E8E8E8] font-medium text-sm">Device Types</th>
                <th className="text-left py-4 px-4 text-[#E8E8E8] font-medium text-sm">Action</th>
              </tr>
            </thead>
            
            {/* Table Body */}
            <tbody>
              {devices.map((device, index) => (
                <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/50">
                  {/* Device */}
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <MdOutlineMonitor className="text-[#E8E8E8]" size={20} />
                      <span className="text-[#E8E8E8] text-sm">{device.device}</span>
                    </div>
                  </td>
                  
                  {/* Login Time */}
                  <td className="py-4 px-4">
                    <span className="text-[#E8E8E8] text-sm">{device.loginTime}</span>
                  </td>
                  
                  {/* Login Location */}
                  <td className="py-4 px-4">
                    <span className="text-[#E8E8E8] text-sm">{device.loginLocation}</span>
                  </td>
                  
                  {/* IP */}
                  <td className="py-4 px-4">
                    <span className="text-[#E8E8E8] text-sm">{device.ip}</span>
                  </td>
                  
                  {/* Device Types */}
                  <td className="py-4 px-4">
                    <span className="text-[#E8E8E8] text-sm">{device.deviceType}</span>
                  </td>
                  
                  {/* Action */}
                  <td className="py-4 px-4">
                    <div className="flex space-x-3">
                      <button className="text-[#1DA2B4] hover:text-[#315b61] text-sm font-medium transition-colors">
                        Delete
                      </button>
                      <button className="text-[#1DA2B4] hover:text-[#315b61] text-sm font-medium transition-colors">
                        Log Out
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DeviceManagement;