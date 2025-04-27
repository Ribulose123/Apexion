import React from 'react';
import { Loader as LoaderIcon } from 'lucide-react';

interface LoaderProps {
  size?: number;
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({ size = 24, className = '' }) => {
  return (
    <LoaderIcon size={size} className={`animate-spin ${className}`} />
  );
};