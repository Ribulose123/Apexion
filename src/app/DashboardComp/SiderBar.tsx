"use client";
import React from "react";
import { menuItems } from "../data/data";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideBar = () => {
  const pathname = usePathname(); // Get current path to determine active link

  return (
    <div className="w-16 lg:w-48 bg-linear-to-b from-[#141E323D] to-[#141E32]  flex flex-col pt-10 mt-3 hidden sm:block">
      <nav className="flex-1">
        <ul className="space-y-1 flex flex-col items-center lg:items-start">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <li
                key={item.name}
                className="w-full flex justify-center lg:justify-start px-2"
              >
                <Link
                  href={item.href}
                  className={`flex items-center justify-center gap-2 lg:justify-start p-3 rounded-lg w-full text-[12px]
                    ${
                      isActive
                        ? "bg-yellow-500 text-white font-medium"
                        : "text-gray-300 hover:bg-gray-800"
                    }
                  `}
                >
                  <span
                    className={`text-[17px] ${isActive ? "text-white" : ""}`}
                  >
                    {React.createElement(item.icon, { size: 18 })}
                  </span>

                  <span className="hidden lg:block ml-3 ">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
