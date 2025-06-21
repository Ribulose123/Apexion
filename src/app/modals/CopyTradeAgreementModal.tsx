import React, { useState } from 'react';
import { X } from 'lucide-react';

const CopyTradeAgreementModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleConfirm = () => {
    if (isChecked) {
      // Handle confirmation logic here
      console.log('Agreement confirmed');
      setIsOpen(false);
    }
  };

  const handleOpenModal = () => {
    setIsOpen(true);
    setIsChecked(false);
  };

  if (!isOpen) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <button
          onClick={handleOpenModal}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Open Agreement Modal
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Bidvest Copy Trade Agreement
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
            <p>
              By accessing and using this web page and the other web pages owned or operated by us or accessing and using our 
              online services or by accessing or using the Bidgal Mobile App, you will be contractually presumed to have notice of, 
              and you acknowledge that you agree to comply with and be bound, by these Conditions, as amended from time to 
              time. These Conditions govern our relationship with you in relation to our Website and/or Mobile App. If you disagree 
              with any part of these Conditions, you must immediately discontinue your access or use of our Website and our 
              Mobile App as this can may be.
            </p>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Customer Qualification</h3>
              <p className="mb-3">
                Please note that the regulatory requirements that we are exempted from when dealing with you as an Accredited 
                Investor:
              </p>
              <p className="mb-3">
                1. The investor has reached the age of 18 years; has complete rights and behavioural capabilities; has sufficient 
                knowledge and experience to understand the nature and risks of financial products and concepts.
              </p>
              <p className="mb-3">
                2. You are the legal owner of the funds in Bidgal account, and ensure the legality of the source of funds or digital 
                assets, and may not use the platform to operate illegal acts.
              </p>
              <p className="mb-3">
                <strong>Concept</strong>
              </p>
              <p>
                Copy trading means you as a prospective Investor are under the general from complying with certain requirements 
                under the Financial Services Act, certain regulations, notices and guidelines issued thereunder, as well as certain 
                requirements under the Securities and Futures Act, Chapter 289 of Singapore (&#39;SFA&#39;) and certain regulations and
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <input
              type="checkbox"
              id="agreement-checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="agreement-checkbox" className="text-sm text-gray-700">
              I have read and agree to the terms and conditions.
            </label>
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={handleConfirm}
              disabled={!isChecked}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                isChecked
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopyTradeAgreementModal;