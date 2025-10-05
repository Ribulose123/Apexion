'use client';
import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Image from 'next/image';

// Dynamically import icons
const ArrowLeft = dynamic(() => import('lucide-react').then(mod => mod.ArrowLeft), { ssr: false });
const Upload = dynamic(() => import('lucide-react').then(mod => mod.Upload), { ssr: false });
const CheckCircle = dynamic(() => import('lucide-react').then(mod => mod.CheckCircle), { ssr: false });
const Clock = dynamic(() => import('lucide-react').then(mod => mod.Clock), { ssr: false });
const XCircle = dynamic(() => import('lucide-react').then(mod => mod.XCircle), { ssr: false });

const KycVerificationPage: React.FC = () => {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [kycStatus, setKycStatus] = useState<'NOT_SUBMITTED' | 'PENDING' | 'APPROVED' | 'REJECTED'>('NOT_SUBMITTED');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type - only images
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        alert('Please select a valid image file (JPG, PNG only)');
        return;
      }
      
      // Validate file size (2MB max for profile images)
      if (file.size > 2 * 1024 * 1024) {
        alert('Image size must be less than 2MB');
        return;
      }
      
      setSelectedFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select an image first');
      return;
    }

    setIsUploading(true);
    try {
      // Simulate API call - replace with your actual KYC upload API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update status to pending
      setKycStatus('PENDING');
      alert('Profile photo uploaded successfully! Your verification is under review.');
      
      // Clear selection
      setSelectedFile(null);
      setPreviewUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return { color: 'text-green-500', icon: <CheckCircle size={20} />, text: 'Verified' };
      case 'PENDING':
        return { color: 'text-yellow-500', icon: <Clock size={20} />, text: 'Under Review' };
      case 'REJECTED':
        return { color: 'text-red-500', icon: <XCircle size={20} />, text: 'Rejected' };
      default:
        return { color: 'text-gray-500', icon: null, text: 'Not Verified' };
    }
  };

  const statusConfig = getStatusConfig(kycStatus);

  return (
    <div className="min-h-screen text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button 
            onClick={() => router.back()}
            className="flex items-center text-gray-400 hover:text-white mr-4"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold">KYC Verification</h1>
        </div>

        {/* Status Card */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold mb-2">Verification Status</h2>
              <div className={`flex items-center ${statusConfig.color}`}>
                {statusConfig.icon}
                <span className="ml-2 font-medium">{statusConfig.text}</span>
              </div>
            </div>
            {kycStatus === 'PENDING' && (
              <div className="text-sm text-yellow-400">
                Estimated time: 1-2 business days
              </div>
            )}
          </div>
        </div>

        {/* Upload Section */}
        {kycStatus !== 'APPROVED' && kycStatus !== 'PENDING' && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Upload Profile Photo</h3>
            
            {/* Image Preview */}
            {previewUrl && (
              <div className="mb-6 flex flex-col items-center">
                <div className="relative w-40 h-40 rounded-full overflow-hidden border-2 border-blue-500">
                  <Image 
                    src={previewUrl} 
                    alt="Profile preview" 
                    className="w-full h-full object-cover"
                    width={100}
                    height={100}
                  />
                </div>
                <button
                  onClick={clearSelection}
                  className="mt-3 text-sm text-red-400 hover:text-red-300"
                >
                  Remove Photo
                </button>
              </div>
            )}
            
            {/* File Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Select Profile Image
              </label>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept=".jpg,.jpeg,.png"
                className="w-full text-sm text-gray-400
                  file:mr-4 file:py-3 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-600 file:text-white
                  hover:file:bg-blue-700
                  cursor-pointer"
                disabled={isUploading}
              />
              <p className="text-xs text-gray-400 mt-2">
                Supported formats: JPG, PNG (Max 2MB)
              </p>
            </div>

            {/* Upload Button */}
            <button
              onClick={handleUpload}
              disabled={!selectedFile || isUploading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg transition-colors font-medium flex items-center justify-center"
            >
              {isUploading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <Upload size={18} className="mr-2" />
                  Submit for Verification
                </>
              )}
            </button>
          </div>
        )}

        {/* Requirements Card */}
        <div className="bg-gray-800 rounded-lg p-6 mt-6">
          <h3 className="text-lg font-semibold mb-4">Photo Requirements</h3>
          <ul className="text-sm text-gray-300 space-y-2">
            <li className="flex items-start">
              <span className="text-green-400 mr-2">•</span>
              <span>Clear, recent photo of yourself</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-400 mr-2">•</span>
              <span>Face clearly visible and well-lit</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-400 mr-2">•</span>
              <span>No filters or heavy editing</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-400 mr-2">•</span>
              <span>Neutral background preferred</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-400 mr-2">•</span>
              <span>File size under 2MB</span>
            </li>
          </ul>
          
          <div className="mt-4 p-3 bg-blue-900 bg-opacity-20 rounded">
            <p className="text-xs text-blue-400">
              <strong>Note:</strong> Your profile photo will be used for identity verification purposes only and is stored securely.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KycVerificationPage;