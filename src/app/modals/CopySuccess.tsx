import React, { useEffect } from 'react'
import { CheckCircle } from 'lucide-react';
interface SimpleSuccessToastProps {
  message: string;
  onClose: () => void;
}
const CopySuccess = ({message, onClose}:SimpleSuccessToastProps) => {

    useEffect(()=>{
        const timer = setTimeout(()=>{
            onClose();
        },3000)
        return ()=> clearTimeout(timer)
    },[onClose])
  return (
   <div className="fixed top-5 right-5 z-[100] bg-green-500 text-white p-4 rounded-lg shadow-xl flex items-center space-x-3 transform transition-all duration-300 animate-fadeInOut">
      <CheckCircle size={24} />
      <p className="font-medium">{message}</p>
      <button onClick={onClose} className="ml-4 text-xl font-bold">
        &times;
      </button>
    </div>
  )
}

export default CopySuccess
