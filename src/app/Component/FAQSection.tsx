"use client"

import { useState } from "react";
import { FaArrowDown } from "react-icons/fa";

const faqs = [
  { question: "What is a trading platform?", answer: "" },
  { question: "The Platform Doesn’t Load?", answer: "" },
  { question: "When Will Deposits Be Credited?", answer: "" },
  { question: "Do I Need to Install Any Trading Software?", answer: "" },
  { question: "What Should I Do If a System Error Occurs?", answer: "" },
  { question: "What are bonuses?", answer: "" },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-5xl mx-auto text-white py-12  px-1 mt-[70px]">
      <h2 className="text-center text-[24px] sm:text[50px] font-semibold mb-6">
        Everything You Need to Know
      </h2>

      <div className="space-y-2">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-b border-gray-700 cursor-pointer"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center py-4">
              <span className="text-[#E8E8E8] sm:text-[24px]">{faq.question}</span>
              <FaArrowDown
                className={`transition-transform ${
                  openIndex === index ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>
            {openIndex === index && (
              <div className="text-gray-400 text-sm py-2">{faq.answer || " "}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
