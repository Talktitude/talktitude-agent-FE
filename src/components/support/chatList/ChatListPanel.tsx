'use client';

import React, { useEffect, useState } from 'react';
import SectionHeader from '@/components/support/SectionHeader';
import SearchInput from '@/components/common/SearchInput';
import Filter from '@/components/support/chatList/Filter';
import ChatList from '@/components/support/chatList/ChatList';
import type { ChatListItemType, FilterOption } from '@/types/support';
import { getChatList, getChatSearch } from '@/api/support/chatListPanelApi';
import { PiChats } from 'react-icons/pi';

interface ChatListPanelProps {
  onChatSelect?: (chatItem: ChatListItemType) => void;
}

const ChatListPanel = ({ onChatSelect }: ChatListPanelProps) => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedChat, setSelectedChat] = useState(-1);
  const [chatListItems, setChatListItems] = useState<ChatListItemType[]>([]);
  const [filterOption, setFilterOption] = useState<FilterOption>('ALL');

  const handleSearchChat = () => {
    const fetchChatSearch = async () => {
      const response = await getChatSearch(searchValue, filterOption);
      setChatListItems(response.data);
    };
    fetchChatSearch();
    setSearchValue('');
  };

  const onChangeSearchChat = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    // console.log(searchValue);
  };

  const handleFilterChange = (filter: 'ALL' | 'IN_PROGRESS' | 'FINISHED') => {
    setFilterOption(filter);
  };

  const handleChatSelect = (sessionId: number) => {
    setSelectedChat(sessionId);
    const selectedChatItem = chatListItems.find(
      (chat) => chat.sessionId === sessionId,
    );
    if (selectedChatItem && onChatSelect) {
      onChatSelect(selectedChatItem);
    }
  };

  useEffect(() => {
    const fetchChatList = async () => {
      const response = await getChatList(filterOption);
      setChatListItems(response.data);
    };
    fetchChatList();
  }, [filterOption]);

  return (
    <div className="flex flex-col w-[30%] gap-1 border-r border-lineGray overflow-y-auto">
      <SectionHeader title="상담 목록" />
      {chatListItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full gap-2.5">
          <PiChats size={45} color="#949494" />
          <p className="text-textLightGray text-base font-medium text-center">
            고객이 상담을 시작하면 여기에 표시됩니다.
          </p>
        </div>
      ) : (
        <>
          <SearchInput
            onSearchClick={() => {
              handleSearchChat();
            }}
            onChange={onChangeSearchChat}
          />
          <Filter
            filterOption={filterOption}
            onFilterChange={handleFilterChange}
          />
          <ChatList
            chatListItems={chatListItems}
            selectedChat={selectedChat}
            filterOption={filterOption}
            onFilterChange={handleFilterChange}
            onChatSelect={handleChatSelect}
          />
        </>
      )}
    </div>
  );
};

export default ChatListPanel;
