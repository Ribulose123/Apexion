import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaDiscord ,FaYoutube  } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className=" text-white py-8 px-6 md:px-20 w-full mt-[150px]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start items-start">
          {/* Logo Section */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl sm:text-[40px] text-[30px] font-bold">LOGO</h2>
          </div>
          
          {/* Footer Links */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-12 text-sm">
            <div className="text-start ">
              <h3 className="font-semibold mb-2 text-[14px] sm:text-[18px]">Company</h3>
              <ul className="space-y-1 opacity-70 hover:opacity-100  text-[#6B6B6B] text-[13px] sm:text-[15px] font-medium">
                <li><Link href="/contact">Career</Link></li>
                <li><Link href="/about">About Apexion</Link></li>
                <li><Link href="faq">FAQs</Link></li>
              </ul>
            </div>
            <div className="text-start ">
              <h3 className="font-semibold mb-2 text-[14px] sm:text-[18px]"><Link href='/contact'>Support</Link></h3>
              <ul className="space-y-1 opacity-70 hover:opacity-100 sm:block hidden text-[#6B6B6B] text-[12px] sm:text-[15px] font-medium">
                <li className="sm:block hidden"><Link href="/contact">Contact us</Link></li>
                <li><a href="#">Community</a></li>
                <li><a href="#">Help Center</a></li>
              </ul>
            </div>
            <div className="text-start ">
              <h3 className="font-semibold mb-2 text-[14px] sm:text-[18px]">Services</h3>
              <ul className="space-y-1 opacity-70 hover:opacity-100 sm:block hidden text-[#6B6B6B] text-[12px] sm:text-[15px] font-medium">
                <li><a href="#">Stock</a></li>
                <li><a href="#">Forex</a></li>
                <li><a href="#">Crypto</a></li>
                <li><a href="#">Copy</a></li>
              </ul>
            </div>
            <div className="text-start ">
              <h3 className="font-semibold mb-2 text-[14px] sm:text-[18px]"><Link href='/policy'>Legal & Privacy</Link></h3>
              <ul className="space-y-1 opacity-70 hover:opacity-100 sm:block hidden text-[#6B6B6B] text-[12px] sm:text-[15px] font-medium">
                <li><a href="#">Cookie Policy</a></li>
                <li><a href="#">Cookie Preferences</a></li>
                <li><a href="#">Terms of Use</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-start sm:items-center text-xs opacity-70">
          <p className="text-[12px] sm:text-[15px] font-semibold text-[#A4A4A4]">Copyright &copy; 2025 Apexion. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:opacity-100 opacity-70"><FaFacebookF /></a>
            <a href="#" className="hover:opacity-100 opacity-70"><FaTwitter /></a>
            <a href="#" className="hover:opacity-100 opacity-70"><FaInstagram /></a>
            <a href="#" className="hover:opacity-100 opacity-70"><FaLinkedinIn /></a>
            <a href="#" className="hover:opacity-100 opacity-70"><FaDiscord /></a>
            <a href="#" className="hover:opacity-100 opacity-70"><FaYoutube /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
