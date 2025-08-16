'use client';

import React from 'react';
import type { ChatListItemType, FilterOption } from '@/types/support';
import ContactItem from './ChatItem';

interface ChatListProps {
  chatListItems: ChatListItemType[];
  selectedChat: number;
  filterOption: FilterOption;
  onFilterChange: (filter: FilterOption) => void;
  onChatSelect: (chatId: number) => void;
}

export default function ChatList({
  chatListItems,
  selectedChat,
  onChatSelect,
}: ChatListProps) {
  return (
    <div className="bg-white flex-1 flex-col">
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
