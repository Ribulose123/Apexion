"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll events to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav 
      className={`${
        scrolled 
          ? "bg-[#01040F] shadow-lg" 
          : "bg-transparent"
      } text-white py-2 w-full fixed top-0 z-50 transition-all duration-300`}
    >
      <div className="container mx-auto max-w-6xl flex justify-between items-center px-4 md:px-6 h-20">
        {/* Logo */}
        <Image src='/img/logo2.jpg' alt="logo" width={50} height={50}/>

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
                    isActive ? "text-white font-medium nav-active" : ""
                  }`}
                >
                  {item}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right-side Controls */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/login" className="px-4 py-2 border border-gray-100 rounded-full transition hover:bg-white/10">
            Login
          </Link>
          <Link href="/register" className="px-4 py-2 bg-[#6967AE] border border-gray-100 rounded-full transition hover:bg-[#5856a0]">
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
        <div className="md:hidden bg-[#01040F] w-full p-4 shadow-lg">
          <ul className="space-y-4">
            {["Home", "About Us", "FAQs", "Pricing"].map((item, index) => {
              const href = item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s+/g, "-")}`;
              const isActive = pathname === href;

              return (
                <li key={index} className="relative">
                  <Link 
                    href={href} 
                    className={`block py-2 hover:text-gray-400 ${isActive ? "text-white font-medium nav-active-mobile" : ""}`} 
                    onClick={() => setIsOpen(false)}
                  >
                    {item}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile Login/Register */}
          <div className="mt-4 flex flex-col  space-y-2">
            <Link href="/login" className="block px-4 py-2 border border-gray-100 transition w-1/2 rounded-full text-center">
              Login
            </Link>
            <Link href="/register" className="block border bg-[#6967AE] rounded-full px-4 py-2 transition w-1/2 text-center">
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;