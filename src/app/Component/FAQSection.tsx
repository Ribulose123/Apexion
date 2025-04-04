"use client"

import { useState } from "react";
import { FaArrowDown } from "react-icons/fa";

const faqs = [
  { question: "What is a trading platform?", answer: "It is an online platform where traders track asset quotes and make trades using broker services." },
  { question: "The Platform Doesn’t Load?", answer: "Check your internet connection or try clearing your browser cache and reloading the page." },
  { question: "When Will Deposits Be Credited?", answer: "Deposits are usually credited instantly but may take up to 24 hours depending on the payment method." },
  { question: "Do I Need to Install Any Trading Software?", answer: "Most trading platforms are available online, but some offer desktop or mobile applications for convenience." },
  { question: "What Should I Do If a System Error Occurs?", answer: "Try refreshing the page, checking your internet connection, or contacting support for assistance." },
  { question: "What are bonuses?", answer: "Bonuses are incentives provided by brokers to encourage trading activity and deposits." },
  { question: "How does copy trading work?", answer: "Copy trading allows users to automatically replicate the trades of experienced traders." },
  { question: "What are the fees?", answer: "Fees may include spreads, commissions, and overnight swap charges depending on the broker." },
  { question: "Who are the trading experts?", answer: "Trading experts are professionals with experience in financial markets who provide insights and strategies." },
  { question: "What is the recommended amount to start with?", answer: "The starting amount depends on your financial goals, but it's recommended to start with an amount you can afford to lose." }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-7xl mx-auto text-white py-12  px-1  sm:mt-[40px]">
      <h2 className="text-center text-2xl md:text-4xl font-medium mb-6">
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
              <span className="text-[#E8E8E8] sm:text-[24px] text-[28px font-medium]">{faq.question}</span>
              <FaArrowDown
                className={`transition-transform ${
                  openIndex === index ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>
            {openIndex === index && (
              <div className="text-gray-400 text-[13px] sm:text-[16px] py-2">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
