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
  const [allChatListItems, setAllChatListItems] = useState<ChatListItemType[]>(
    [],
  );
  const [chatListItems, setChatListItems] = useState<ChatListItemType[]>([]);
  const [filterOption, setFilterOption] = useState<FilterOption>('ALL');
  const [searchResultItems, setSearchResultItems] = useState<
    ChatListItemType[]
  >([]);
  const [isSearchMode, setIsSearchMode] = useState(false);

  const handleSearchChat = () => {
    if (!searchValue.trim()) return;

    const fetchChatSearch = async () => {
      const response = await getChatSearch(searchValue, filterOption);
      setSearchResultItems(response.data);
      setIsSearchMode(true);
    };
    fetchChatSearch();
  };

  const onChangeSearchChat = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    // 검색어 비어있는 경우 검색 모드 false로 변경
    if (!e.target.value.trim()) {
      setIsSearchMode(false);
      setSearchResultItems([]);
    }
  };

  const handleFilterChange = (filter: 'ALL' | 'IN_PROGRESS' | 'FINISHED') => {
    setFilterOption(filter);
    // 필터 변경 시 검색 모드 false로 변경
    setIsSearchMode(false);
    setSearchResultItems([]);
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

  // 전체 데이터: 최초 1회 렌더링
  useEffect(() => {
    const fetchAllChatList = async () => {
      const response = await getChatList('ALL');
      setAllChatListItems(response.data);
    };
    fetchAllChatList();
  }, []);

  // 필터링된 데이터: filterOption 바뀔 때마다 렌더링
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
      {allChatListItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full gap-2">
          <PiChats size={45} color="#D9D9D9" />
          <p className="text-textLightGray text-sm text-center">
            고객이 상담을 시작하면 여기에 표시됩니다.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-1 h-full">
          <SearchInput
            onSearchClick={() => {
              handleSearchChat();
            }}
            onChange={onChangeSearchChat}
            value={searchValue}
          />
          <Filter
            filterOption={filterOption}
            onFilterChange={handleFilterChange}
          />
          <ChatList
            chatListItems={isSearchMode ? searchResultItems : chatListItems}
            selectedChat={selectedChat}
            filterOption={filterOption}
            onFilterChange={handleFilterChange}
            onChatSelect={handleChatSelect}
            isSearchMode={isSearchMode}
          />
        </div>
      )}
    </div>
  );
};

export default ChatListPanel;
