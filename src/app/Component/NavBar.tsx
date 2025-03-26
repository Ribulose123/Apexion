"use client";

import Link from "next/link";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-transparent text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-6 mt-10">
        {/* Logo */}
        <h1 className="text-2xl font-bold">LOGO</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          {["Home", "About Us", "FAQs", "Pricing"].map((item, index) => {
            const href = item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s+/g, "-")}`;
            const isActive = pathname === href;

            return (
              <li key={index} className="relative">
                <Link
                  href={href}
                  className={`hover:text-gray-400 transition-all duration-300 ${
                    isActive ? "text-gray-400 border-glitch" : ""
                  }`}
                >
                  {item}
                </Link>
                {isActive && (
                  <span className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-gray-400 animate-pulse"></span>
                )}
              </li>
            );
          })}
        </ul>

        {/* Right-side Controls */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/login" className="px-4 py-2 border border-gray-100/10 rounded-full transition">
            Login
          </Link>
          <Link href="/register" className="px-4 py-2 bg-[#6967AE] rounded-full transition">
            Register
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
          {isOpen ? <FaTimes /> : <Image src='/img/bx_menu-alt-right.png' alt="Menu Toggle" width={30} height={30} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 text-center py-4">
          <ul className="space-y-4">
            {["Home", "About Us", "FAQs", "Pricing"].map((item, index) => {
              const href = item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s+/g, "-")}`;
              return (
                <li key={index}>
                  <Link href={href} className="block py-2 hover:text-gray-400" onClick={() => setIsOpen(false)}>
                    {item}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile Login/Register */}
          <div className="mt-4 space-y-2">
            <Link href="/login" className="block px-4 py-2 border border-gray-200/10 transition">
              Login
            </Link>
            <Link href="/register" className="block bg-[#6967AE] rounded-full px-4 py-2 transition">
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
  
  