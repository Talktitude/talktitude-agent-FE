'use client';

import React from 'react';
import Logo from './Logo';
import LoadingSpinner from './LoadingSpinner';

interface LoadingPageProps {
  message?: string;
  showLogo?: boolean;
  fullScreen?: boolean;
  className?: string;
}

const LoadingPage = ({
  message,
  showLogo = true,
  fullScreen = true,
  className = '',
}: LoadingPageProps) => {
  const containerClasses = fullScreen
    ? 'fixed inset-0 bg-white/60 z-50 flex flex-col items-center justify-center'
    : 'flex flex-col items-center justify-center p-8';

  return (
    <div className={`${containerClasses} ${className}`}>
      {showLogo && (
        <div className="mb-8">
          <Logo />
        </div>
      )}

      <div className="flex flex-col items-center space-y-4">
        <LoadingSpinner size="lg" color="primary" />
        {message && (
          <p className="text-textLightGray font-medium text-lg">{message}</p>
        )}
      </div>
    </div>
  );
};

export default LoadingPage;
