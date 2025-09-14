import React from 'react';
import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  size?: 'sm' | 'md';
}

const Badge = ({ children, size }: BadgeProps) => {
  const getSize = () => {
    switch (size) {
      case 'sm':
        return 'text-sm';
      case 'md':
        return 'text-md';
      default:
        return 'text-xs';
    }
  };
  const getColor = () => {
    switch (children) {
      case '주문 문의':
        return 'bg-[#F9EEEE] text-[#F06969]';
      case '기타 문의':
        return 'bg-[#FFFBEB] text-[#DEAB35]';
      case '리뷰 문의':
        return 'bg-[#FFE8F1] text-[#C73E7E]';
      case '결제 문의':
        return 'bg-[#FFF3E8] text-[#EE8721]';
      case '쿠폰 문의':
        return 'bg-[#F2F7E8] text-[#7EAA25]';
      case '회원 문의':
        return 'bg-[#E8F7F2] text-[#1FAA77]';
      case '배달 문의':
        return 'bg-[#E8F6FA] text-[#2B9BB8]';
      case '안전거래 문의':
        return 'bg-[#FFF4F0] text-[#D87B50]';
      case '서비스 이용 문의':
        return 'bg-[#F3EDFF] text-[#6C4BC4]';
      case '종료':
        return 'bg-[#F3F3F3] text-[#5D5D5D]';
      default:
        return 'bg-bgLightBlue text-mainColor';
    }
  };

  return (
    <div
      className={`px-1.5 py-0.5 rounded-[20px] inline-flex justify-center items-center overflow-hidden w-fit ${getColor()}`}
    >
      <div className={`justify-start ${getColor()} ${getSize()} font-semibold`}>
        {children}
      </div>
    </div>
  );
};

export default Badge;
