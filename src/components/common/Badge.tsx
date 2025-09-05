import React from 'react';
import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
}

const Badge = ({ children }: BadgeProps) => {
  const isFinished = children === '종료';
  return (
    <div
      className={`px-1.5 py-0.5 rounded-[20px] inline-flex justify-center items-center overflow-hidden ${
        isFinished ? 'bg-[#F9EEEE]' : 'bg-bgLightBlue'
      }`}
    >
      <div
        className={`justify-start ${
          isFinished ? 'text-textRed' : 'text-mainColor'
        } text-xs font-medium`}
      >
        {children}
      </div>
    </div>
  );
};

export default Badge;
