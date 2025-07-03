import React from 'react';
import type { ChatListItemType } from '../../../types/support';
import { IoPersonCircle } from 'react-icons/io5';

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
          <IoPersonCircle className="w-full h-full" color="#C0C0C0" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="text-textBlack text-base font-semibold">
              {chatListItem.name}
            </span>
            <span className="text-textLightGray text-sm font-medium">
              {chatListItem.time}
            </span>
          </div>
          <div className="text-[#5D5D5D] text-base font-normal">
            {chatListItem.phone}
          </div>
        </div>
      </div>
    </div>
  );
}
