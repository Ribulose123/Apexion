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
        style={{ width: "300%" }} 
      >
        {/* Duplicating logos to create an infinite scroll effect */}
        {[...logos, ...logos, ...logos].map((logo, index) => (
        <div 
  key={index} 
  className="w-full px-4 sm:px-6"
>
  <Image 
    src={logo} 
    alt="Brand Logo" 
    width={1200}  // Large base width
    height={400}  // Proportional height
    className="w-full sm:w-full md:w-full  lg:w-full h-auto object-cover" 
  />
</div>
        ))}
      </motion.div>
    </div>
  );
};

export default LogoCarousel;