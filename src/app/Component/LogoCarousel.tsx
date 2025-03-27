"use client"; 

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const logos = [
  "/img/image 7.png",
  "/img/image 9.png",
  "/img/image 5.png",
  "/img/image 8.png",
];

const LogoCarousel = () => {
  return (
    <div className="w-full overflow-hidden mt-[70px] py-4">
      <motion.div
        className="flex items-center whitespace-nowrap"
        animate={{ 
          x: ["0%", "-100%"] 
        }} 
        transition={{ 
          repeat: Infinity, 
          duration: 20, 
          ease: "linear",
          repeatType: "loop"
        }} 
        style={{ width: "200%" }} 
      >
        {/* Duplicating logos to create an infinite scroll effect */}
        {[...logos, ...logos, ...logos].map((logo, index) => (
          <div 
            key={index} 
            className="mx-6 opacity-70 hover:opacity-100 transition-opacity"
          >
            <Image 
              src={logo} 
              alt="Brand Logo" 
              width={150} 
              height={75} 
              className="w-[180px] sm:w-[150px] md:w-[180px] lg:w-[200px] h-auto" 
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default LogoCarousel;