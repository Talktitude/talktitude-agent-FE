import React from 'react';
import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
}

const Badge = ({ children }: BadgeProps) => {
  return (
    <div className="px-2.5 py-[5px] bg-mainColor rounded-[10px] inline-flex justify-center items-center gap-2.5 overflow-hidden">
      <div className="justify-start text-white text-xs font-medium">
        {children}
      </div>
    </div>
  );
};

export default Badge;
