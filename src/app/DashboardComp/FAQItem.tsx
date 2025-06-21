'use client'
import React, { useState } from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';

const FAQItem = ({ question, answer, isOpen, onToggle }: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  return (
    <div className="border-b border-gray-700/50">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 text-left  px-1"
      >
        <h3 className="text-white text-lg font-medium pr-4">{question}</h3>
        <div className="flex-shrink-0">
          {isOpen ? (
            <ArrowUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ArrowDown className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </button>
      
      {isOpen && (
        <div className="pb-6 px-1">
          <div className="text-gray-300 leading-relaxed">
            {answer}
          </div>
        </div>
      )}
    </div>
  );
};

export default function BidvestFAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqData = [
    {
      question: "What are the benefits of Bidvest convert?",
      answer: "Bidvest convert offers several key benefits including instant cryptocurrency conversions, competitive exchange rates, low transaction fees, secure transactions with advanced encryption, 24/7 availability, support for multiple cryptocurrencies, and seamless integration with your existing Bidvest account. You can convert between different digital assets quickly and efficiently without needing to use external exchanges."
    },
    {
      question: "Are there any fees associated with conversions in Bidvest?",
      answer: "Yes, Bidvest charges a small conversion fee for each transaction. The standard conversion fee is typically 0.1% to 0.5% depending on the cryptocurrencies being converted and your account tier. Network fees may also apply for blockchain transactions. Premium account holders may enjoy reduced fees. All fees are transparently displayed before you confirm any conversion."
    },
    {
      question: "When will I receive converted assets?",
      answer: "For instant conversions, you will typically receive your converted assets within 1-3 minutes after confirmation. The exact timing may vary depending on network congestion and the specific cryptocurrencies involved. Bitcoin and Ethereum conversions usually complete within 2-5 minutes, while stablecoin conversions are often instantaneous. You'll receive real-time updates on your conversion status through the platform."
    },
    {
      question: "Where can I check my conversion history?",
      answer: "You can access your complete conversion history in several ways: 1) Navigate to your account dashboard and click on 'Transaction History', 2) Use the 'Convert History' tab in the main conversion interface, 3) Access detailed reports through the 'Reports' section in your account settings. Your history includes timestamps, conversion rates, fees paid, and transaction IDs for easy tracking and record-keeping."
    }
  ];

  return (
    <div className=" p-6">
      <div className="">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">FAQ</h1>
        </div>
        
        <div className="">
          {faqData.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openItems.includes(index)}
              onToggle={() => toggleItem(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

