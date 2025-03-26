import React from "react";
import { GoDownload } from "react-icons/go";

const BillManagementCard = () => {
  return (
    <div className="sm:w-[379px] sm:h-[355px] w-[450px] h-[260px] mx-auto p-6 bg-[#0D0E13] text-white shadow-xl rounded-[24px] border border-gray-800  flex flex-col justify-center gap-6">
      {/* Title */}
      <h2 className="text-center text-[24px] font-medium text-[#E8E8E8] ">
        Bill Management
      </h2>

      {/* Description */}
      <p className="text-[#797A80] text-center text-[18px]">
        Easily manage, pay and reconcile business bills
      </p>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <button className="border border-gray-600 px-4 py-2 rounded-full text-sm text-gray-300 hover:bg-gray-800 transition">
          Show as List
        </button>
        <button className="border border-gray-600 px-4 py-2 rounded-full text-sm flex items-center gap-1 text-gray-300 hover:bg-gray-800 transition">
          Download zip <GoDownload size={16} />
        </button>
      </div>
    </div>
  );
};

export default BillManagementCard;
