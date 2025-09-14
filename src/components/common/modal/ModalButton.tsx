import React from 'react';

interface ModalButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'confirm' | 'cancel' | 'warning';
  size?: 'single' | 'pair';
  className?: string;
}

const ModalButton = ({
  children,
  onClick,
  variant = 'confirm',
  size = 'single',
  className = '',
}: ModalButtonProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'confirm':
        return 'bg-mainColor text-white hover:bg-[#4A66C9]';
      case 'cancel':
        return 'bg-bgLightGray text-textGray hover:bg-lineGray';
      case 'warning':
        return 'bg-textRed text-white hover:bg-[#D55A5A]';
      default:
        return 'bg-mainColor text-white hover:bg-[#4A66C9]';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'single':
        return 'px-12 py-1.5';
      case 'pair':
        return 'px-8 py-1.5';
      default:
        return 'px-12 py-1.5';
    }
  };

  const baseClasses = 'text-lg font-semibold rounded-full transition-colors';

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${getVariantClasses()} ${getSizeClasses()} ${className}`}
    >
      {children}
    </button>
  );
};

export default ModalButton;
