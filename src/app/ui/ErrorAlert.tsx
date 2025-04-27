import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorAlertProps {
  message: string;
  onDismiss: () => void;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, onDismiss }) => {
  return (
    <div className="bg-red-900/30 border border-red-700 text-red-100 p-4 mb-4 rounded-lg flex items-center">
      <AlertCircle size={20} className="mr-2" />
      <span>{message}</span>
      <button className="ml-auto text-red-300 hover:text-red-100" onClick={onDismiss}>
        ×
      </button>
    </div>
  );
};