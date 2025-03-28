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
            className="mx-3 sm:mx-6 opacity-70 hover:opacity-100 transition-opacity"
          >
            <Image 
              src={logo} 
              alt="Brand Logo" 
              width={250}  // Increased base width
              height={125}  // Proportionally increased height
              className="w-[350px] sm:w-[180px] md:w-[200px] lg:w-[250px] h-auto" 
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default LogoCarousel;