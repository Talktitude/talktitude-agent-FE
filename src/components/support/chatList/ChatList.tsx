'use client';

import React, { useState } from 'react';
import type { ChatListItemType } from '@/types/support';
import ContactItem from './ChatItem';

const MOCK_CHAT_LIST: ChatListItemType[] = [
  {
    chat_id: 1,
    sessionId: 1,
    clientName: '아이디',
    clientPhone: '010-1234-5678',
    time: '3분 전',
    profileImageUrl:
      'https://i.pinimg.com/736x/d5/cc/bb/d5ccbb3c0796509fdaa7696da65cc8e2.jpg',
  },
  {
    chat_id: 2,
    sessionId: 2,
    clientName: '비회원',
    clientPhone: '010-1234-5678',
    time: '12월 31일',
    profileImageUrl:
      'https://i.pinimg.com/736x/d5/cc/bb/d5ccbb3c0796509fdaa7696da65cc8e2.jpg',
  },
  {
    chat_id: 3,
    sessionId: 3,
    clientName: '비회원',
    clientPhone: '010-1234-5678',
    time: '12월 31일',
    profileImageUrl:
      'https://i.pinimg.com/736x/d5/cc/bb/d5ccbb3c0796509fdaa7696da65cc8e2.jpg',
  },
  {
    chat_id: 4,
    sessionId: 4,
    clientName: '비회원',
    clientPhone: '010-1234-5678',
    time: '12월 31일',
    profileImageUrl:
      'https://i.pinimg.com/736x/d5/cc/bb/d5ccbb3c0796509fdaa7696da65cc8e2.jpg',
  },
  {
    chat_id: 5,
    sessionId: 5,
    clientName: '비회원',
    clientPhone: '010-1234-5678',
    time: '12월 31일',
    profileImageUrl:
      'https://i.pinimg.com/736x/d5/cc/bb/d5ccbb3c0796509fdaa7696da65cc8e2.jpg',
  },
  {
    chat_id: 6,
    sessionId: 6,
    clientName: '비회원',
    clientPhone: '010-1234-5678',
    time: '12월 31일',
    profileImageUrl:
      'https://i.pinimg.com/736x/d5/cc/bb/d5ccbb3c0796509fdaa7696da65cc8e2.jpg',
  },
  {
    chat_id: 7,
    sessionId: 7,
    clientName: '비회원',
    clientPhone: '010-1234-5678',
    time: '12월 31일',
    profileImageUrl:
      'https://i.pinimg.com/736x/d5/cc/bb/d5ccbb3c0796509fdaa7696da65cc8e2.jpg',
  },
  {
    chat_id: 8,
    sessionId: 8,
    clientName: '비회원',
    clientPhone: '010-1234-5678',
    time: '12월 31일',
    profileImageUrl:
      'https://i.pinimg.com/736x/d5/cc/bb/d5ccbb3c0796509fdaa7696da65cc8e2.jpg',
  },
  {
    chat_id: 9,
    sessionId: 9,
    clientName: '비회원',
    clientPhone: '010-1234-5678',
    time: '12월 31일',
    profileImageUrl:
      'https://i.pinimg.com/736x/d5/cc/bb/d5ccbb3c0796509fdaa7696da65cc8e2.jpg',
  },
  {
    chat_id: 10,
    sessionId: 10,
    clientName: '비회원',
    clientPhone: '010-1234-5678',
    time: '12월 31일',
    profileImageUrl:
      'https://i.pinimg.com/736x/d5/cc/bb/d5ccbb3c0796509fdaa7696da65cc8e2.jpg',
  },
  {
    chat_id: 11,
    sessionId: 11,
    clientName: '비회원',
    clientPhone: '010-1234-5678',
    time: '12월 31일',
    profileImageUrl:
      'https://i.pinimg.com/736x/d5/cc/bb/d5ccbb3c0796509fdaa7696da65cc8e2.jpg',
  },
  {
    chat_id: 12,
    sessionId: 12,
    clientName: '비회원',
    clientPhone: '010-1234-5678',
    time: '12월 31일',
    profileImageUrl:
      'https://i.pinimg.com/736x/d5/cc/bb/d5ccbb3c0796509fdaa7696da65cc8e2.jpg',
  },
  {
    chat_id: 13,
    sessionId: 13,
    clientName: '비회원',
    clientPhone: '010-1234-5678',
    time: '12월 31일',
    profileImageUrl:
      'https://i.pinimg.com/736x/d5/cc/bb/d5ccbb3c0796509fdaa7696da65cc8e2.jpg',
  },
];

interface ChatListProps {
  onChatSelect?: (chatItem: ChatListItemType) => void;
}

export default function ChatList({ onChatSelect }: ChatListProps) {
  const [selectedChat, setSelectedChat] = useState(-1);
  const [chatListItems] = useState(MOCK_CHAT_LIST);

  const [filterOption, setFilterOption] = useState<
    'all' | 'ongoing' | 'completed'
  >('all');

  const handleFilterChange = (filter: 'all' | 'ongoing' | 'completed') => {
    setFilterOption(filter);
  };

  const filterButtons = [
    { value: 'all', label: '전체' },
    { value: 'ongoing', label: '진행중' },
    { value: 'completed', label: '종료' },
  ] as const;

  const onChattSelect = (chatId: number) => {
    setSelectedChat(chatId);
    const selectedChatItem = chatListItems.find(
      (chat) => chat.chat_id === chatId,
    );
    if (selectedChatItem && onChatSelect) {
      onChatSelect(selectedChatItem);
    }
  };

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
            onClick={() => handleFilterChange(filter.value)}
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
            isSelected={chat.chat_id === selectedChat}
            onClick={() => onChattSelect(chat.chat_id)}
          />
        ))}
      </div>
    </div>
  );
}
