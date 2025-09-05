import React from 'react';
import type { ChatItemProps } from '../../../types/support';
import Image from 'next/image';
import { useTimeFormat } from '../../../hooks/useTimeFormat';
import Badge from '@/components/common/Badge';

export default function ChatItem({
  chatListItem,
  isSelected,
  onClick,
}: ChatItemProps) {
  const formattedTime = useTimeFormat(chatListItem.lastMessageTime);

  return (
    <div
      className={`px-5 py-3.5 cursor-pointer ${
        isSelected ? 'bg-gray-200' : 'hover:bg-gray-100'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className="relative w-14 h-14 rounded-full flex items-center justify-center">
          <Image
            src={
              chatListItem.profileImageUrl ||
              'https://i.pinimg.com/736x/d5/cc/bb/d5ccbb3c0796509fdaa7696da65cc8e2.jpg'
            }
            alt="profile"
            fill
            unoptimized={true}
            sizes="48px"
            className="rounded-full object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="text-textBlack text-base font-semibold">
              {chatListItem.clientLoginId}
            </span>
            <span className="text-textLightGray text-sm font-medium">
              {formattedTime}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-[#5D5D5D] text-base font-normal">
              {chatListItem.clientPhone}
            </div>
            <Badge>
              {chatListItem.status === 'IN_PROGRESS' ? '진행중' : '종료'}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
