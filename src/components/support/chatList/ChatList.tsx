'use client';

import React, { useState } from 'react';
import type { ChatListItemType } from '@/types/support';
import ContactItem from './ChatItem';

const MOCK_CHAT_LIST: ChatListItemType[] = [
  {
    chat_id: 1,
    clientName: '아이디',
    phone: '010-1234-5678',
    time: '3분 전',
    profileImage:
      'https://i.pinimg.com/736x/d5/cc/bb/d5ccbb3c0796509fdaa7696da65cc8e2.jpg',
  },
  {
    chat_id: 2,
    clientName: '비회원',
    phone: '010-1234-5678',
    time: '12월 31일',
    profileImage:
      'https://i.pinimg.com/736x/d5/cc/bb/d5ccbb3c0796509fdaa7696da65cc8e2.jpg',
  },
  {
    chat_id: 3,
    clientName: '비회원',
    phone: '010-1234-5678',
    time: '12월 31일',
    profileImage:
      'https://i.pinimg.com/736x/d5/cc/bb/d5ccbb3c0796509fdaa7696da65cc8e2.jpg',
  },
  {
    chat_id: 4,
    clientName: '비회원',
    phone: '010-1234-5678',
    time: '12월 31일',
    profileImage:
      'https://i.pinimg.com/736x/d5/cc/bb/d5ccbb3c0796509fdaa7696da65cc8e2.jpg',
  },
  {
    chat_id: 5,
    clientName: '비회원',
    phone: '010-1234-5678',
    time: '12월 31일',
    profileImage:
      'https://i.pinimg.com/736x/d5/cc/bb/d5ccbb3c0796509fdaa7696da65cc8e2.jpg',
  },
  {
    chat_id: 6,
    clientName: '비회원',
    phone: '010-1234-5678',
    time: '12월 31일',
    profileImage:
      'https://i.pinimg.com/736x/d5/cc/bb/d5ccbb3c0796509fdaa7696da65cc8e2.jpg',
  },
  {
    chat_id: 7,
    clientName: '비회원',
    phone: '010-1234-5678',
    time: '12월 31일',
    profileImage:
      'https://i.pinimg.com/736x/d5/cc/bb/d5ccbb3c0796509fdaa7696da65cc8e2.jpg',
  },
  {
    chat_id: 8,
    clientName: '비회원',
    phone: '010-1234-5678',
    time: '12월 31일',
    profileImage:
      'https://i.pinimg.com/736x/d5/cc/bb/d5ccbb3c0796509fdaa7696da65cc8e2.jpg',
  },
  {
    chat_id: 9,
    clientName: '비회원',
    phone: '010-1234-5678',
    time: '12월 31일',
    profileImage:
      'https://i.pinimg.com/736x/d5/cc/bb/d5ccbb3c0796509fdaa7696da65cc8e2.jpg',
  },
  {
    chat_id: 10,
    clientName: '비회원',
    phone: '010-1234-5678',
    time: '12월 31일',
    profileImage:
      'https://i.pinimg.com/736x/d5/cc/bb/d5ccbb3c0796509fdaa7696da65cc8e2.jpg',
  },
  {
    chat_id: 11,
    clientName: '비회원',
    phone: '010-1234-5678',
    time: '12월 31일',
    profileImage:
      'https://i.pinimg.com/736x/d5/cc/bb/d5ccbb3c0796509fdaa7696da65cc8e2.jpg',
  },
  {
    chat_id: 12,
    clientName: '비회원',
    phone: '010-1234-5678',
    time: '12월 31일',
    profileImage:
      'https://i.pinimg.com/736x/d5/cc/bb/d5ccbb3c0796509fdaa7696da65cc8e2.jpg',
  },
  {
    chat_id: 13,
    clientName: '비회원',
    phone: '010-1234-5678',
    time: '12월 31일',
    profileImage:
      'https://i.pinimg.com/736x/d5/cc/bb/d5ccbb3c0796509fdaa7696da65cc8e2.jpg',
  },
];

export default function ChatList() {
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
