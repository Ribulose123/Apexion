"use client";
import React, { useState, useEffect } from "react";
import { ChevronDown, Cloud, Hourglass, X, CheckCircle, AlertCircle, Camera } from "lucide-react";
import ReactCountryFlag from "react-country-flag";
import { API_ENDPOINTS } from "../config/api";
import Image from "next/image";

interface UnifiedVerificationModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

interface Country {
  code: string;
  name: string;
}

interface CountryApiResponse {
  cca2: string;
  name: {
    common: string;
  };
}

interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  kycStatus: "PENDING" | "APPROVED" | "REJECTED" | "NOT_SUBMITTED";
  kycImage?: string;
}

// Custom hook to fetch countries
const useCountries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,cca2"
        );
        const data: CountryApiResponse[] = await response.json();

        const formattedCountries: Country[] = data
          .map((country: CountryApiResponse) => ({
            code: country.cca2,
            name: country.name.common,
          }))
          .sort((a: Country, b: Country) => a.name.localeCompare(b.name));

        setCountries(formattedCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setCountries([
          { code: "US", name: "United States" },
          { code: "GB", name: "United Kingdom" },
          { code: "CA", name: "Canada" },
          { code: "IN", name: "India" },
          { code: "ZA", name: "South Africa" },
          { code: "GH", name: "Ghana" },
          { code: "KE", name: "Kenya" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return { countries, loading };
};

const UnifiedVerificationModal = ({
  isOpen = true,
  onClose,
}: UnifiedVerificationModalProps) => {
  const { countries, loading } = useCountries();
  const [currentStep, setCurrentStep] = useState(1);
  const [countryOfResidence, setCountryOfResidence] = useState<Country | null>(null);
  const [issuingCountry, setIssuingCountry] = useState<Country | null>(null);
  const [idType, setIdType] = useState<"National ID" | "BVN" | "Passport" | "Driver License">("National ID");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showIssuingDropdown, setShowIssuingDropdown] = useState(false);
  const [showRegionModal, setShowRegionModal] = useState(false);
  const [kycStatus, setKycStatus] = useState<"NOT_SUBMITTED" | "PENDING" | "APPROVED" | "REJECTED">("NOT_SUBMITTED");
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);

  // Check user's KYC status from profile when modal opens
  useEffect(() => {
    if (isOpen) {
      checkUserKycStatus();
    }
  }, [isOpen]);

  // Set default countries once loaded
  useEffect(() => {
    if (countries.length > 0 && !countryOfResidence) {
      setCountryOfResidence(countries[0]);
      setIssuingCountry(countries[0]);
    }
  }, [countries, countryOfResidence]);

  // Check user's current KYC status from profile
  const checkUserKycStatus = async () => {
    try {
      setIsCheckingStatus(true);
      const authToken = localStorage.getItem('authToken');
      if (!authToken?.trim()) {
        console.log('No auth token found');
        return;
      }

      console.log('🔍 Checking user KYC status from profile...');
      
      const response = await fetch(API_ENDPOINTS.USER.USER_PROFILE, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
      });

      console.log('📊 Profile response status:', response.status);

      if (response.ok) {
        const result = await response.json();
        console.log('📋 User Profile Data:', result);
        
        if (result.data) {
          const userData: UserProfile = result.data;
          setUserProfile(userData);
          setKycStatus(userData.kycStatus || "NOT_SUBMITTED");
          
          // If user already has a KYC status, skip to appropriate step
          if (userData.kycStatus && userData.kycStatus !== "NOT_SUBMITTED") {
            console.log('🎯 User has existing KYC status:', userData.kycStatus);
            setCurrentStep(3); // Go directly to status view
          }
        }
      } else {
        console.error('❌ Failed to fetch user profile:', response.status);
      }
    } catch (error) {
      console.error('💥 Error checking KYC status:', error);
    } finally {
      setIsCheckingStatus(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(files);
  };

  const handleStepOneNext = () => {
    if (kycStatus === "PENDING") {
      alert("Your KYC verification is already in progress. Please wait for the current submission to be processed.");
      setCurrentStep(3);
      return;
    }
    
    if (kycStatus === "APPROVED") {
      alert("Your KYC has already been approved. No need to upload again.");
      setCurrentStep(3);
      return;
    }

    if (kycStatus === "REJECTED") {
      setCurrentStep(2);
      return;
    }
    
    // If NOT_SUBMITTED or no status, continue normal flow
    if (idType === "National ID" || idType === "Driver License") {
      setCurrentStep(2);
    } else {
      setShowRegionModal(true);
    }
  };

  const handleDocumentVerify = async () => {
    if (selectedFiles.length === 0) {
      alert("Please upload a document first");
      return;
    }
    
    // Double-check: Prevent upload if already pending or approved
    if (kycStatus === "PENDING" || kycStatus === "APPROVED") {
      alert(`Your KYC is already ${kycStatus === "APPROVED" ? "approved" : "in progress"}. Cannot upload new documents.`);
      setCurrentStep(3);
      return;
    }

    const authToken = localStorage.getItem('authToken');
    if (!authToken?.trim()) {
      alert("Please login first");
      return;
    }

    setCurrentStep(3);
    setKycStatus("PENDING");
    
    const formData = new FormData();
    if (selectedFiles[0]) {
      formData.append('kycImage', selectedFiles[0]);
    }

    try {
      console.log('🟡 Starting KYC verification upload...');
      
      const responseData = await fetch(API_ENDPOINTS.USER.KYC, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${authToken}`
        },
        body: formData,
      });

      const result = await responseData.json();
      console.log('✅ KYC Upload Response:', result);
      
      if (result.status === 200 || responseData.ok) {
        // Update local state and refresh profile to get latest status
        setKycStatus("PENDING");
        await checkUserKycStatus(); // Refresh to get actual status from backend
        
        alert("KYC document uploaded successfully! Your verification is now in progress.");
      } else {
        throw new Error(result.message || "Verification failed");
      }
    } catch (err) {
      console.error("💥 KYC Verification Error:", err);
      alert(`Verification failed`);
      setCurrentStep(2);
      setKycStatus("NOT_SUBMITTED");
    }
  };

  const handleFinalVerify = () => {
    if (onClose) onClose();
  };

  const handleClose = () => {
    setCurrentStep(1);
    setSelectedFiles([]);
    if (onClose) onClose();
  };

  const handleCloseRegionModal = () => {
    setShowRegionModal(false);
  };

  // Refresh KYC status from profile
  const handleRefreshStatus = async () => {
    await checkUserKycStatus();
  };

  if (!isOpen) return null;

  if (loading || isCheckingStatus) {
    return (
      <div className="fixed inset-0 bg-black/75 bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="max-w-md w-full bg-white text-black rounded-2xl shadow-xl p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">
            {isCheckingStatus ? "Checking verification status..." : "Loading countries..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/75 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="max-w-md w-full bg-white text-black rounded-2xl shadow-xl min-h-[400px] h-auto max-h-[90vh] overflow-y-auto">
        <div className="px-9 py-2 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Identity Verification
          </h2>
          <button onClick={handleClose} className="">
            <X size={20} />
          </button>
        </div>

        {/* Step 1: Country and ID Type Selection */}
        {currentStep === 1 && (
          <div className="px-8 py-8">
            {/* Show current status if exists */}
            {(kycStatus === "PENDING" || kycStatus === "APPROVED" || kycStatus === "REJECTED") && (
              <div className={`mb-6 p-4 rounded-lg ${
                kycStatus === "APPROVED" ? "bg-green-50 border border-green-200" :
                kycStatus === "REJECTED" ? "bg-red-50 border border-red-200" :
                "bg-blue-50 border border-blue-200"
              }`}>
                <div className="flex items-center space-x-3">
                  {kycStatus === "APPROVED" ? (
                    <CheckCircle className="text-green-600" size={24} />
                  ) : kycStatus === "REJECTED" ? (
                    <AlertCircle className="text-red-600" size={24} />
                  ) : (
                    <Hourglass className="text-blue-600" size={24} />
                  )}
                  <div className="flex-1">
                    <h3 className={`font-semibold text-sm ${
                      kycStatus === "APPROVED" ? "text-green-800" :
                      kycStatus === "REJECTED" ? "text-red-800" :
                      "text-blue-800"
                    }`}>
                      {kycStatus === "APPROVED" ? "Verification Approved" :
                       kycStatus === "REJECTED" ? "Verification Rejected" :
                       "Verification in Progress"}
                    </h3>
                    <p className={`text-xs ${
                      kycStatus === "APPROVED" ? "text-green-700" :
                      kycStatus === "REJECTED" ? "text-red-700" :
                      "text-blue-700"
                    }`}>
                      {kycStatus === "APPROVED" ? "Your identity has been successfully verified." :
                       kycStatus === "REJECTED" ? "Please check your documents and try again." :
                       "Your documents are being reviewed. Please wait."}
                    </p>
                    {userProfile?.kycImage && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-600 mb-1">Uploaded document:</p>
                        <Image 
                          src={userProfile.kycImage} 
                          alt="KYC Document" 
                          width={60}
                          height={40}
                          className="rounded border"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Rest of Step 1 content */}
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
                    {countryOfResidence && (
                      <ReactCountryFlag
                        countryCode={countryOfResidence.code}
                        svg
                        className="mr-2 w-5 h-5"
                        title={countryOfResidence.code}
                      />
                    )}
                    <span className="text-gray-900">
                      {countryOfResidence ? countryOfResidence.name : "Select country..."}
                    </span>
                  </div>
                  <ChevronDown
                    className={`text-gray-400 transition-transform ${showCountryDropdown ? "rotate-180" : ""}`}
                    size={20}
                  />
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
                        className={`w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center ${
                          countryOfResidence?.code === country.code ? "bg-gray-100" : ""
                        }`}
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

            {/* Issuing Country */}
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
                    {issuingCountry && (
                      <ReactCountryFlag
                        countryCode={issuingCountry.code}
                        svg
                        className="mr-2 w-5 h-5"
                        title={issuingCountry.code}
                      />
                    )}
                    <span className="text-gray-900">
                      {issuingCountry ? issuingCountry.name : "Select country..."}
                    </span>
                  </div>
                  <ChevronDown
                    className={`text-gray-400 transition-transform ${showIssuingDropdown ? "rotate-180" : ""}`}
                    size={20}
                  />
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
                        className={`w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center ${
                          issuingCountry?.code === country.code ? "bg-gray-100" : ""
                        }`}
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

            {/* ID Type Selection */}
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
                    checked={idType === "National ID"}
                    onChange={() => setIdType("National ID")}
                    className="mt-1 w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  />
                  <div>
                    <span className="text-gray-900 font-medium">
                      National ID
                    </span>
                    <p className="text-gray-500 text-sm mt-1">
                      e.g. NIN, SSN, Aadhaar
                    </p>
                  </div>
                </label>
                <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <input
                    type="radio"
                    name="idType"
                    value="BVN"
                    checked={idType === "BVN"}
                    onChange={() => setIdType("BVN")}
                    className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  />
                  <span className="ml-3 text-gray-900">
                    Bank Verification Number (BVN)
                  </span>
                </label>
                <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <input
                    type="radio"
                    name="idType"
                    value="Passport"
                    checked={idType === "Passport"}
                    onChange={() => setIdType("Passport")}
                    className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  />
                  <span className="ml-3 text-gray-900">Passport</span>
                </label>
                <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <input
                    type="radio"
                    name="idType"
                    value="Driver License"
                    checked={idType === "Driver License"}
                    onChange={() => setIdType("Driver License")}
                    className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  />
                  <span className="ml-3 text-gray-900">
                    Driver&apos;s License
                  </span>
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
                {kycStatus === "NOT_SUBMITTED" ? "Next" : 
                 kycStatus === "REJECTED" ? "Try Again" : "View Status"}
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Document Upload (only show if no pending/approved status) */}
        {currentStep === 2 && (kycStatus === "NOT_SUBMITTED" || kycStatus === "REJECTED") && (
         <div className="px-6 py-4">
    {/* Header Section */}
    <div className="text-center mb-8">
      <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Camera className="text-indigo-600" size={28} />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Identity</h2>
      <p className="text-gray-600">Upload a clear photo of your ID document</p>
    </div>

    {/* Requirements Card */}
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
      <div className="flex items-start space-x-3">
        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="text-blue-600 text-sm font-bold">!</span>
        </div>
        <div>
          <h3 className="text-blue-800 font-semibold text-sm mb-1">Important Requirements</h3>
          <p className="text-blue-700 text-sm">
            Make sure your document shows your photo, full name, date of birth, and date of issue clearly.
          </p>
        </div>
      </div>
    </div>

    {/* Do's and Don'ts Section */}
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Document Guidelines</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Do's Column */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2">
              <span className="text-green-600">✓</span>
            </div>
            <h4 className="text-green-800 font-semibold">Do This</h4>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start space-x-2">
              <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-green-600 text-xs">✓</span>
              </div>
              <span className="text-green-700 text-sm">Clear and sharp photo</span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-green-600 text-xs">✓</span>
              </div>
              <span className="text-green-700 text-sm">All details readable</span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-green-600 text-xs">✓</span>
              </div>
              <span className="text-green-700 text-sm">Good lighting</span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-green-600 text-xs">✓</span>
              </div>
              <span className="text-green-700 text-sm">All 4 corners visible</span>
            </li>
          </ul>
        </div>

        {/* Don'ts Column */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-2">
              <span className="text-red-600">✗</span>
            </div>
            <h4 className="text-red-800 font-semibold">Avoid This</h4>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start space-x-2">
              <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-red-600 text-xs">✗</span>
              </div>
              <span className="text-red-700 text-sm">Blurry or unclear</span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-red-600 text-xs">✗</span>
              </div>
              <span className="text-red-700 text-sm">Details covered</span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-red-600 text-xs">✗</span>
              </div>
              <span className="text-red-700 text-sm">Poor lighting</span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-red-600 text-xs">✗</span>
              </div>
              <span className="text-red-700 text-sm">Corners cut off</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    {/* Upload Section */}
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Upload Document</h3>
        {selectedFiles.length > 0 && (
          <button
            onClick={() => setSelectedFiles([])}
            className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center space-x-1"
          >
            <X size={16} />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {/* Image Preview */}
      {selectedFiles.length > 0 && (
        <div className="mb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {selectedFiles.map((file, index) => (
              <div key={index} className="relative group">
                <div className="border-2 border-green-200 rounded-xl overflow-hidden bg-white shadow-sm">
                  {file.type.startsWith('image/') ? (
                    <div className="aspect-video relative">
                      <Image 
                        src={URL.createObjectURL(file)} 
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                        width={100}
                        height={100}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200" />
                    </div>
                  ) : (
                    <div className="aspect-video flex items-center justify-center bg-gray-50">
                      <div className="text-center">
                        <Cloud className="mx-auto mb-2 text-gray-400" size={32} />
                        <p className="text-gray-600 text-sm font-medium">PDF Document</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {(file.size / 1024).toFixed(1)} KB • {file.type.split('/')[1]?.toUpperCase() || 'FILE'}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          const newFiles = [...selectedFiles];
                          newFiles.splice(index, 1);
                          setSelectedFiles(newFiles);
                        }}
                        className="ml-2 text-red-500 hover:text-red-700 transition-colors flex-shrink-0"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Status Badge */}
                <div className="absolute -top-2 -right-2">
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    Ready
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Area */}
      <label htmlFor="file-upload" className="block">
        <div className={`border-2 border-dashed ${
          selectedFiles.length > 0 ? 'border-gray-300' : 'border-indigo-300'
        } rounded-xl p-8 text-center hover:border-indigo-400 transition-all duration-200 cursor-pointer bg-white hover:bg-gray-50`}>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-3">
              <Cloud className="text-indigo-600" size={24} />
            </div>
            <p className="text-gray-700 font-medium mb-1">
              {selectedFiles.length > 0 ? 'Add more documents' : 'Choose files to upload'}
            </p>
            <p className="text-gray-500 text-sm">
              JPG, PNG or PDF (Max 5MB each)
            </p>
            {selectedFiles.length === 0 && (
              <button
                type="button"
                className="mt-3 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Select Files
              </button>
            )}
          </div>
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

      {/* File Summary */}
      {selectedFiles.length > 0 && (
        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              {selectedFiles.length} file{selectedFiles.length !== 1 ? 's' : ''} selected
            </span>
            <span className="text-gray-900 font-medium">
              Total: {(selectedFiles.reduce((total, file) => total + file.size, 0) / 1024 / 1024).toFixed(2)} MB
            </span>
          </div>
        </div>
      )}
    </div>

    {/* Navigation Buttons */}
    <div className="flex space-x-3 pt-4 border-t border-gray-200">
      <button
        onClick={() => setCurrentStep(1)}
        className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
      >
        <ChevronDown className="rotate-90" size={18} />
        <span>Back</span>
      </button>
      <button
        onClick={handleDocumentVerify}
        disabled={selectedFiles.length === 0}
        className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
          selectedFiles.length === 0
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm"
        }`}
      >
        <span>Verify Document</span>
        <ChevronDown className="-rotate-90" size={18} />
      </button>
    </div>
  </div>
        )}

        {/* Step 3: Status Display */}
        {currentStep === 3 && (
          <div className="px-8 py-12 text-center">
            <div className="mb-8">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${
                kycStatus === "APPROVED" ? "bg-green-100" :
                kycStatus === "REJECTED" ? "bg-red-100" :
                "bg-indigo-100"
              }`}>
                {kycStatus === "APPROVED" ? (
                  <CheckCircle className="text-green-600" size={32} />
                ) : kycStatus === "REJECTED" ? (
                  <AlertCircle className="text-red-600" size={32} />
                ) : (
                  <Hourglass className="text-indigo-600 animate-pulse" size={32} />
                )}
              </div>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {kycStatus === "PENDING"
                ? "Your Document is Under Review"
                : kycStatus === "APPROVED"
                ? "Verification Approved! 🎉"
                : kycStatus === "REJECTED"
                ? "Verification Rejected"
                : "Verification Status"}
            </h2>

            {/* Show uploaded image if available */}
            {userProfile?.kycImage && (
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2">Uploaded Document:</p>
                <div className="inline-block border rounded-lg overflow-hidden">
                  <Image 
                    src={userProfile.kycImage} 
                    alt="KYC Document" 
                    width={150}
                    height={100}
                    className="object-cover"
                  />
                </div>
              </div>
            )}

            {kycStatus === "PENDING" && (
              <div className="mb-6">
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  This process usually takes from 5 to 7 minutes but might last up
                  to 24 hours in special cases. In the meantime you are allowed to
                  deposit up to 500 USD. Trade and withdraw your profit!
                </p>
                <button
                  onClick={handleRefreshStatus}
                  className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                >
                  <span>Refresh Status</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>
            )}

            {kycStatus === "REJECTED" && (
              <div className="mb-6">
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Your documents were not approved. Please ensure they meet our requirements:
                  clear photo, all details visible, good lighting, and all corners shown.
                </p>
                <button
                  onClick={() => setCurrentStep(2)}
                  className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                >
                  <span>Upload Again</span>
                  <Cloud size={16} />
                </button>
              </div>
            )}

            <button
              onClick={handleFinalVerify}
              className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              {kycStatus === "APPROVED" ? "Continue" : 
               kycStatus === "REJECTED" ? "Close" : "Continue"}
            </button>
          </div>
        )}

        {/* Region Not Available Modal */}
        {showRegionModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="max-w-sm w-full bg-white rounded-2xl shadow-xl p-6">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                  <X className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Not Available in Your Region
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                  {idType} verification is not currently available in your
                  region. Please select National ID or Driver&apos;s License to
                  proceed with document upload.
                </p>
                <button
                  onClick={handleCloseRegionModal}
                  className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnifiedVerificationModal;