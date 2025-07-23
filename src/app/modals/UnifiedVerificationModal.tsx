"use client";
import React, { useState } from 'react';
import { ChevronDown, Cloud, Camera, Hourglass, X } from 'lucide-react';
import ReactCountryFlag from "react-country-flag";

interface UnifiedVerificationModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

interface Country {
  code: string;
  name: string;
}

const countries: Country[] = [
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'CA', name: 'Canada' },
  { code: 'IN', name: 'India' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'GH', name: 'Ghana' },
  { code: 'KE', name: 'Kenya' }
];

const UnifiedVerificationModal = ({ isOpen = true, onClose }: UnifiedVerificationModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [countryOfResidence, setCountryOfResidence] = useState<Country>(countries[0]);
  const [issuingCountry, setIssuingCountry] = useState<Country>(countries[0]);
  const [idType, setIdType] = useState<'National ID' | 'BVN' | 'Passport' | 'Driver License'>('National ID');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showIssuingDropdown, setShowIssuingDropdown] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(files);
  };

  const handleStepOneNext = () => {
    if (idType === 'National ID') {
      setCurrentStep(2);
    } else {
      alert(`Redirecting to enter ${idType} number...`);
      if (onClose) onClose();
    }
  };

  const handleDocumentVerify = () => {
    if (selectedFiles.length === 0) {
      alert('Please upload a document first');
      return;
    }
    setCurrentStep(3);
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
      <div className="max-w-md w-full bg-white text-black rounded-2xl shadow-xl overflow-hidden relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        {currentStep === 1 && (
          <div className="px-8 py-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Identity Verification</h2>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country/Region of Residence:
              </label>
              <div className="relative">
                <button
                  onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                  className="w-full px-4 py-3 text-left bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <ReactCountryFlag 
                      countryCode={countryOfResidence.code} 
                      svg 
                      className="mr-2 w-5 h-5"
                      title={countryOfResidence.code}
                    />
                    <span className="text-gray-900">{countryOfResidence.name}</span>
                  </div>
                  <ChevronDown className={`text-gray-400 transition-transform ${showCountryDropdown ? 'rotate-180' : ''}`} size={20} />
                </button>
                {showCountryDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                    {countries.map((country) => (
                      <button
                        key={country.code}
                        onClick={() => {
                          setCountryOfResidence(country);
                          setShowCountryDropdown(false);
                        }}
                        className={`w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center ${countryOfResidence.code === country.code ? 'bg-gray-100' : ''}`}
                      >
                        <ReactCountryFlag 
                          countryCode={country.code} 
                          svg 
                          className="mr-2 w-5 h-5"
                          title={country.code}
                        />
                        {country.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Issuing Country/Region:
              </label>
              <div className="relative">
                <button
                  onClick={() => setShowIssuingDropdown(!showIssuingDropdown)}
                  className="w-full px-4 py-3 text-left bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <ReactCountryFlag 
                      countryCode={issuingCountry.code} 
                      svg 
                      className="mr-2 w-5 h-5"
                      title={issuingCountry.code}
                    />
                    <span className="text-gray-900">{issuingCountry.name}</span>
                  </div>
                  <ChevronDown className={`text-gray-400 transition-transform ${showIssuingDropdown ? 'rotate-180' : ''}`} size={20} />
                </button>
                {showIssuingDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                    {countries.map((country) => (
                      <button
                        key={country.code}
                        onClick={() => {
                          setIssuingCountry(country);
                          setShowIssuingDropdown(false);
                        }}
                        className={`w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center ${issuingCountry.code === country.code ? 'bg-gray-100' : ''}`}
                      >
                        <ReactCountryFlag 
                          countryCode={country.code} 
                          svg 
                          className="mr-2 w-5 h-5"
                          title={country.code}
                        />
                        {country.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                ID Type:
              </label>
              <div className="space-y-3">
                <label className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <input
                    type="radio"
                    name="idType"
                    value="National ID"
                    checked={idType === 'National ID'}
                    onChange={() => setIdType('National ID')}
                    className="mt-1 w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  />
                  <div>
                    <span className="text-gray-900 font-medium">National ID</span>
                    <p className="text-gray-500 text-sm mt-1">e.g. NIN, SSN, Aadhaar</p>
                  </div>
                </label>
                <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <input
                    type="radio"
                    name="idType"
                    value="BVN"
                    checked={idType === 'BVN'}
                    onChange={() => setIdType('BVN')}
                    className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  />
                  <span className="ml-3 text-gray-900">Bank Verification Number (BVN)</span>
                </label>
                <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <input
                    type="radio"
                    name="idType"
                    value="Passport"
                    checked={idType === 'Passport'}
                    onChange={() => setIdType('Passport')}
                    className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  />
                  <span className="ml-3 text-gray-900">Passport</span>
                </label>
                <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <input
                    type="radio"
                    name="idType"
                    value="Driver License"
                    checked={idType === 'Driver License'}
                    onChange={() => setIdType('Driver License')}
                    className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  />
                  <span className="ml-3 text-gray-900">Driver&apos;s License</span>
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

        {currentStep === 2 && (
          <div className="px-6 py-4">
            <div className="px-2 py-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Take photo of ID document</h2>
              <div className="mt-3 bg-gray-100 text-gray-800 text-sm px-4 py-3 rounded-lg">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-gray-600 rounded-full mt-1.5 flex-shrink-0"></div>
                  <p>Make sure the document shows your photo, full name, date of birth and date of issue.</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="space-y-2">
                <div className="bg-gray-100 rounded-lg h-24 flex items-center justify-center">
                  <Camera className="text-gray-400" size={24} />
                </div>
                <h3 className="text-green-600 font-medium text-sm">Do</h3>
              </div>

              <div className="space-y-2">
                <div className="bg-gray-100 rounded-lg h-24 flex items-center justify-center">
                  <Camera className="text-gray-400" size={24} />
                </div>
                <h3 className="text-red-500 font-medium text-sm">Don&apos;t</h3>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <ul className="space-y-2 text-sm text-gray-700">
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
                    <span>Has good lighting</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>All 4 corners visible</span>
                  </li>
                </ul>
              </div>

              <div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500 font-bold">•</span>
                    <span>Photo is blurry</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500 font-bold">•</span>
                    <span>Details unreadable</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500 font-bold">•</span>
                    <span>Too dark or bright</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500 font-bold">•</span>
                    <span>Corners cut off</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-5 h-5 border-2 border-indigo-500 rounded flex items-center justify-center">
                  <div className="w-2 h-2 bg-indigo-500 rounded"></div>
                </div>
                <span className="text-indigo-600 text-sm font-medium">Upload documents with your phone</span>
              </div>

              <label htmlFor="file-upload" className="block">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer">
                  <Cloud className="mx-auto mb-2 text-gray-400" size={32} />
                  <p className="text-gray-600 text-sm font-medium">Upload documents</p>
                  <p className="text-gray-400 text-xs mt-1">JPG, PNG or PDF (max 5MB)</p>
                </div>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  accept="image/*,.pdf"
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
                disabled={selectedFiles.length === 0}
                className={`flex-1 py-3 px-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors ${selectedFiles.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Verify
              </button>
            </div>
          </div>
        )}

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
              This process usually takes from 5 to 7 minutes but might last up to 24 hours in special cases. 
              In the meantime you are allowed to deposit up to 500 USD. Trade and withdraw your profit!
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
  );
};

export default UnifiedVerificationModal;