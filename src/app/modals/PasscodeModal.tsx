import React, { useState } from 'react';
import { API_ENDPOINTS, } from '../config/api';



interface PasscodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (passcode: string) => void; 
  email?:string
}

const PasscodeModal: React.FC<PasscodeModalProps> = ({ isOpen, onClose, onSubmit, email }) => {
  const [passcode, setPasscode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleApiSubmit = async () => {
    if (!passcode.trim() || isLoading) return;

    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.USER.CODE_VIDATION, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include necessary auth headers here
        },
        body: JSON.stringify({ withdrawalCode: passcode }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Validation failed. Please check your passcode.');
      }

      onSubmit(passcode); 
      setPasscode("");
      onClose();

    } catch (err) {
      setError((err as Error).message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-semibold mb-4 text-white">Enter Passcode</h2>
        <p className='text-sm text-gray-300 mt-4'>A passcode would be sent your {email}, to facilitate your withdrawal process, contact our support team for more information</p>
        {error && (
          <p className="text-red-400 mb-3 text-sm">{error}</p>
        )}

        <input
          type="password"
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
          placeholder="Enter your passcode"
          className="w-full bg-gray-700 text-white p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700 transition-colors text-white"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleApiSubmit}
            disabled={!passcode.trim() || isLoading}
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Validating...' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PasscodeModal;