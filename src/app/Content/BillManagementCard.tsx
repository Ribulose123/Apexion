import React from "react";
import { GoDownload } from "react-icons/go";

const BillManagementCard = () => {
  return (
    <div className="w-full max-w-[450px] sm:max-w-[355px] mx-auto p-6 bg-[#0D0E13] text-white shadow-xl rounded-2xl border border-gray-800 relative flex flex-col">
      <h2 className="text-center text-[15px] sm:text-lg font-semibold mb-6 opacity-80">
        Bill Management
      </h2>

      <div className="flex-grow p-4 rounded-xl shadow-lg flex flex-col justify-between">
        {/* Description */}
        <p className="text-[#797A80] text-center text-[11px] sm:text-[13px] font-medium flex-grow flex items-center justify-center">
          Easily manage, pay and reconcile business bills
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-4">
          <button className="border border-gray-600 px-3 sm:px-4 py-2 rounded-full text-[11px] sm:text-[13px] font-medium  text-gray-300 hover:bg-gray-800 transition">
            Show as List
          </button>
          <button className="border border-gray-600 px-3 sm:px-4 py-2 rounded-full text-[11px] sm:text-[13px] flex  font-medium items-center gap-1 text-gray-300 hover:bg-gray-800 transition">
            Download zip <GoDownload size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillManagementCard;