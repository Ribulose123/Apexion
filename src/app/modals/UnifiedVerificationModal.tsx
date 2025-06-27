"use client";
import React, { useState } from 'react';
import { ChevronDown, Cloud, Camera, Hourglass, X } from 'lucide-react';

// Define the props interface for UnifiedVerificationModal
interface UnifiedVerificationModalProps {
  isOpen?: boolean;
  onClose: () => void; // Explicitly type onClose as a function that returns void
}

const UnifiedVerificationModal = ({ isOpen = true, onClose }: UnifiedVerificationModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [countryOfResidence, setCountryOfResidence] = useState('Federal Republic of Nigeria');
  const [issuingCountry, setIssuingCountry] = useState('Federal Republic of Nigeria');
  const [idType, setIdType] = useState<'NIN' | 'BVN'>('NIN'); // Explicitly type idType
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // Explicitly type selectedFiles as an array of File objects
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showIssuingDropdown, setShowIssuingDropdown] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => { // Explicitly type event
    const files = Array.from(event.target.files || []);
    setSelectedFiles(files);
  };

  const handleStepOneNext = () => {
    if (idType === 'NIN') {
      setCurrentStep(2); // Go to document upload
    } else {
      // For other ID types, go somewhere else (placeholder)
      alert('Redirecting to enter ' + idType + ' number...');
      if (onClose) onClose();
    }
  };

  const handleDocumentVerify = () => {
    if (selectedFiles.length === 0) {
      alert('Please upload a document first');
      return;
    }
    setCurrentStep(3); // Go to review step
  };

  const handleFinalVerify = () => {
    alert('Verification completed!');
    if (onClose) onClose();
  };

  const handleClose = () => {
    setCurrentStep(1);
    setSelectedFiles([]);
    if (onClose) onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden relative">
        {/* Close Button - Always visible */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Step 1: Country and ID Type Selection */}
        {currentStep === 1 && (
          <div className="px-8 py-8">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country/region of residence
              </label>
              <div className="relative">
                <button
                  onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                  className="w-full px-4 py-3 text-left bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent flex items-center justify-between"
                >
                  <span className="text-gray-900">{countryOfResidence}</span>
                  <ChevronDown className="text-gray-400" size={20} />
                </button>
                {showCountryDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <button
                      onClick={() => {
                        setCountryOfResidence('Federal Republic of Nigeria');
                        setShowCountryDropdown(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50"
                    >
                      Federal Republic of Nigeria
                    </button>
                    <button
                      onClick={() => {
                        setCountryOfResidence('United States');
                        setShowCountryDropdown(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50"
                    >
                      United States
                    </button>
                    <button
                      onClick={() => {
                        setCountryOfResidence('United Kingdom');
                        setShowCountryDropdown(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50"
                    >
                      United Kingdom
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Issuing country/region
              </label>
              <div className="relative">
                <button
                  onClick={() => setShowIssuingDropdown(!showIssuingDropdown)}
                  className="w-full px-4 py-3 text-left bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent flex items-center justify-between"
                >
                  <span className="text-gray-900">{issuingCountry}</span>
                  <ChevronDown className="text-gray-400" size={20} />
                </button>
                {showIssuingDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <button
                      onClick={() => {
                        setIssuingCountry('Federal Republic of Nigeria');
                        setShowIssuingDropdown(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50"
                    >
                      Federal Republic of Nigeria
                    </button>
                    <button
                      onClick={() => {
                        setIssuingCountry('United States');
                        setShowIssuingDropdown(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50"
                    >
                      United States
                    </button>
                    <button
                      onClick={() => {
                        setIssuingCountry('United Kingdom');
                        setShowIssuingDropdown(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50"
                    >
                      United Kingdom
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                ID type
              </label>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="idType"
                    value="NIN"
                    checked={idType === 'NIN'}
                    onChange={(e) => setIdType(e.target.value as 'NIN' | 'BVN')} // Cast to the union type
                    className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  />
                  <span className="ml-3 text-gray-900">NIN</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="idType"
                    value="BVN"
                    checked={idType === 'BVN'}
                    onChange={(e) => setIdType(e.target.value as 'NIN' | 'BVN')} // Cast to the union type
                    className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  />
                  <span className="ml-3 text-gray-900">BVN</span>
                </label>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleClose}
                className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleStepOneNext}
                className="flex-1 py-3 px-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Document Upload (only for NIN) */}
        {currentStep === 2 && (
          <>
            <div className="px-6 py-4 bg-gray-50">
              <h2 className="text-xl font-semibold text-gray-900">Take photo of ID document</h2>
              <div className="mt-3 bg-gray-600 text-white text-sm px-4 py-3 rounded-lg">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full mt-1.5 flex-shrink-0"></div>
                  <p>Make sure the document shows your photo, full name, date of birth and date of issue.</p>
                </div>
              </div>
            </div>

            <div className="px-6 py-4">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                  <div className="bg-gray-800 rounded-lg h-24 flex items-center justify-center">
                    <Camera className="text-gray-400" size={24} />
                  </div>
                  <h3 className="text-green-600 font-medium text-sm">Do</h3>
                </div>

                <div className="space-y-2">
                  <div className="bg-gray-800 rounded-lg h-24 flex items-center justify-center">
                    <Camera className="text-gray-400" size={24} />
                  </div>
                  <h3 className="text-red-500 font-medium text-sm">Don&apos;t</h3> {/* Escaped apostrophe */}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <ul className="space-y-1 text-xs text-gray-700">
                    <li className="flex items-start space-x-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span>Photo is clear and sharp</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span>Details can be read clearly</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span>Has a good photo quality</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span>All 4 corners of the document are visible</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <ul className="space-y-1 text-xs text-gray-700">
                    <li className="flex items-start space-x-2">
                      <span className="text-red-500 font-bold">•</span>
                      <span>Photo is blurry and not focused</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-red-500 font-bold">•</span>
                      <span>Details cannot be read clearly</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-red-500 font-bold">•</span>
                      <span>Poor photo quality (too dark or bright)</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-red-500 font-bold">•</span>
                      <span>Not all corners are visible</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-5 h-5 border-2 border-teal-500 rounded flex items-center justify-center">
                    <div className="w-2 h-2 bg-teal-500 rounded"></div>
                  </div>
                  <span className="text-teal-600 text-sm font-medium">Upload documents with your phone</span>
                </div>

                <label htmlFor="file-upload" className="block">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer">
                    <Cloud className="mx-auto mb-2 text-gray-400" size={32} />
                    <p className="text-gray-600 text-sm font-medium">Upload documents</p>
                  </div>
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                </label>

                {selectedFiles.length > 0 && (
                  <div className="mt-3 text-sm text-gray-600">
                    {selectedFiles.length} file(s) selected
                  </div>
                )}
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleDocumentVerify}
                  className="flex-1 py-3 px-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                  Verify
                </button>
              </div>
            </div>
          </>
        )}

        {/* Step 3: Under Review */}
        {currentStep === 3 && (
          <div className="px-8 py-12 text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full">
                <Hourglass className="text-indigo-600 animate-pulse" size={32} />
              </div>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Your Document is Under Review
            </h2>

            <p className="text-gray-600 text-sm leading-relaxed mb-8">
              This process usually takes from 5 to 7 minutes but might last up to 24 hours in special cases. In the meantime you are allowed to deposit up to 500 USD. Trade and withdraw your profit!
            </p>

            <button
              onClick={handleFinalVerify}
              className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default UnifiedVerificationModal;