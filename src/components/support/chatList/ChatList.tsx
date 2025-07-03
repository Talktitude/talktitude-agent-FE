'use client';

import React, { useState } from 'react';
import type { ChatListItemType } from '@/types/support';
import ContactItem from './ChatItem';

const MOCK_CHAT_LIST: ChatListItemType[] = [
  { chat_id: 1, name: '아이디', phone: '010-1234-5678', time: '3분 전' },
  { chat_id: 2, name: '비회원', phone: '010-1234-5678', time: '12월 31일' },
  { chat_id: 3, name: '비회원', phone: '010-1234-5678', time: '12월 31일' },
  { chat_id: 4, name: '비회원', phone: '010-1234-5678', time: '12월 31일' },
  { chat_id: 5, name: '비회원', phone: '010-1234-5678', time: '12월 31일' },
  { chat_id: 6, name: '비회원', phone: '010-1234-5678', time: '12월 31일' },
  { chat_id: 7, name: '비회원', phone: '010-1234-5678', time: '12월 31일' },
  { chat_id: 8, name: '비회원', phone: '010-1234-5678', time: '12월 31일' },
  { chat_id: 9, name: '비회원', phone: '010-1234-5678', time: '12월 31일' },
  { chat_id: 10, name: '비회원', phone: '010-1234-5678', time: '12월 31일' },
  { chat_id: 11, name: '비회원', phone: '010-1234-5678', time: '12월 31일' },
  { chat_id: 12, name: '비회원', phone: '010-1234-5678', time: '12월 31일' },
  { chat_id: 13, name: '비회원', phone: '010-1234-5678', time: '12월 31일' },
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
