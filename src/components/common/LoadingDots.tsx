'use client';

import React from 'react';

interface LoadingDotsProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'white';
  dotColors?: Array<'primary' | 'secondary' | 'white' | string>;
  middleColor?: 'primary' | 'secondary' | 'white' | string;
  className?: string;
}

const LoadingDots = ({
  size = 'md',
  color = 'primary',
  dotColors,
  middleColor,
  className = '',
}: LoadingDotsProps) => {
  const sizeClasses = {
    sm: 'w-1 h-1',
    md: 'w-2 h-2',
    lg: 'w-3 h-3',
  };

  const colorClasses = {
    primary: 'bg-mainColor',
    secondary: 'bg-[#8DB8F3]',
    lightBlue: 'bg-bgLightBlue',
    white: 'bg-white',
  };

  const resolveColorClass = (index: number) => {
    // dotColors가 제공되면 인덱스별 지정 값을 우선 적용
    const fromArray = dotColors?.[index];
    if (fromArray) {
      return colorClasses[fromArray as keyof typeof colorClasses] ?? fromArray;
    }
    // 가운데 점 개별 지정이 있으면 적용
    if (index === 1 && middleColor) {
      return (
        colorClasses[middleColor as keyof typeof colorClasses] ?? middleColor
      );
    }
    // 기본색
    return colorClasses[color];
  };

  return (
    <div className={`flex items-center justify-center space-x-1 ${className}`}>
      <div
        className={`${sizeClasses[size]} ${resolveColorClass(
          0,
        )} rounded-full animate-bounce`}
        style={{ animationDelay: '0ms' }}
      />
      <div
        className={`${sizeClasses[size]} ${resolveColorClass(
          1,
        )} rounded-full animate-bounce`}
        style={{ animationDelay: '150ms' }}
      />
      <div
        className={`${sizeClasses[size]} ${resolveColorClass(
          2,
        )} rounded-full animate-bounce`}
        style={{ animationDelay: '300ms' }}
      />
    </div>
  );
};

export default LoadingDots;
