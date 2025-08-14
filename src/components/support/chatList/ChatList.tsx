'use client';

import React from 'react';
import type { ChatListItemType } from '@/types/support';
import ContactItem from './ChatItem';

interface ChatListProps {
  chatListItems: ChatListItemType[];
  selectedChat: number;
  filterOption: 'ALL' | 'IN_PROGRESS' | 'FINISHED';
  onFilterChange: (filter: 'ALL' | 'IN_PROGRESS' | 'FINISHED') => void;
  onChatSelect: (chatId: number) => void;
}

export default function ChatList({
  chatListItems,
  selectedChat,
  filterOption,
  onFilterChange,
  onChatSelect,
}: ChatListProps) {
  const filterButtons = [
    { value: 'ALL', label: '전체' },
    { value: 'IN_PROGRESS', label: '진행중' },
    { value: 'FINISHED', label: '종료' },
  ] as const;

  return (
    <div className="bg-white flex-1 flex-col">
      <div className="px-4 py-2 flex justify-end gap-4 text-sm font-medium">
        {filterButtons.map((filter) => (
          <button
            key={filter.value}
            className={`${
              filterOption === filter.value
                ? 'text-mainColor font-bold'
                : 'text-textLightGray'
            }`}
            onClick={() => onFilterChange(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        {chatListItems.map((chat, index) => (
          <ContactItem
            key={index}
            chatListItem={chat}
            isSelected={chat.sessionId === selectedChat}
            onClick={() => onChatSelect(chat.sessionId)}
          />
        ))}
      </div>
    </div>
  );
}
