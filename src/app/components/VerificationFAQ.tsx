'use client';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ChevronRight } from 'lucide-react';

const VerificationFAQ = () => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const faqItems = [
    {
      id: 'identity',
      question: 'Why do I need to undergo identity verification?',
      answer: 'Identity verification is a process required by financial institutions and other regulated organizations to confirm your identity. Biget will verify your identity and conduct risk assessment to mitigate risks.'
    },
    {
      id: 'documents',
      question: 'What documents can I submit for identity verification?',
      answer: 'Level 1: ID card, passport, driver\'s license, and proof of residence. Level 2: Bank statements, utility bills (within the last...'
    },
    {
      id: 'requirements',
      question: 'What are the requirements for identity verification?',
      answer: '1. You must be at least 18 years old. 2. You can only complete the identity verification on one account.'
    }
  ];

  const toggleItem = (id: string) => {
    setExpandedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-[#131B31] rounded-xl p-6 md:min-h-[600px]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">FAQ</h2>
        <button className="text-blue-400 text-sm flex items-center">
          More
          <ChevronRight size={16} className="ml-1" />
        </button>
      </div>

      <div className="space-y-4">
        {faqItems.map((item) => (
          <div key={item.id} className="border-b border-gray-700 pb-3">
            <button
              className="flex justify-between items-center w-full text-left py-2"
              onClick={() => toggleItem(item.id)}
            >
              <span className="font-medium">{item.question}</span>
              {expandedItems.includes(item.id) ? (
                <ChevronUp size={18} className="text-gray-400" />
              ) : (
                <ChevronDown size={18} className="text-gray-400" />
              )}
            </button>
            {expandedItems.includes(item.id) && (
              <div className="text-sm text-gray-400 mt-2 pr-4">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerificationFAQ;
