import React from 'react';
import type { ChatListItemType } from '../../../types/support';
import Image from 'next/image';

interface ChatItemProps {
  chatListItem: ChatListItemType;
  isSelected: boolean;
  onClick: () => void;
}

export default function ChatItem({
  chatListItem,
  isSelected,
  onClick,
}: ChatItemProps) {
  return (
    <div
      className={`px-5 py-3.5 cursor-pointer ${
        isSelected ? 'bg-gray-200' : 'hover:bg-gray-100'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-full flex items-center justify-center">
          <Image
            src={
              chatListItem.profileImageUrl ||
              'https://i.pinimg.com/736x/d5/cc/bb/d5ccbb3c0796509fdaa7696da65cc8e2.jpg'
            }
            alt="profile"
            width={48}
            height={48}
            className="rounded-full"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="text-textBlack text-base font-semibold">
              {chatListItem.clientLoginId}
            </span>
            <span className="text-textLightGray text-sm font-medium">
              {chatListItem.lastMessageTime}
            </span>
          </div>
          <div className="text-[#5D5D5D] text-base font-normal">
            {chatListItem.clientPhone}
          </div>
        </div>
      </div>
    </div>
  );
}
