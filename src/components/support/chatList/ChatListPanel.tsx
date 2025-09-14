'use client';

import React from 'react';
import SectionHeader from '@/components/support/SectionHeader';
import SearchInput from '@/components/common/SearchInput';
import Filter from '@/components/support/chatList/Filter';
import ChatList from '@/components/support/chatList/ChatList';
import type { ChatListItemType } from '@/types/support';
import { useChatList } from '@/hooks/support/useChatList';
import { PiChats } from 'react-icons/pi';

const ChatListPanel = ({
  onChatSelect,
}: {
  onChatSelect: (chatItem: ChatListItemType) => void;
}) => {
  const {
    searchValue,
    selectedChat,
    allChatListItems,
    chatListItems,
    filterOption,
    searchResultItems,
    isSearchMode,
    handleSearchChat,
    onChangeSearchChat,
    handleFilterChange,
    handleChatSelect,
  } = useChatList({ onChatSelect });

  return (
    <div className="flex flex-col w-[30%] gap-1 border-r border-lineGray overflow-hidden">
      <SectionHeader title="상담 목록" />
      {allChatListItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full gap-2">
          <PiChats size={45} color="#D9D9D9" />
          <p className="text-textLightGray text-sm text-center">
            고객이 상담을 시작하면 여기에 표시됩니다.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-1 h-[calc(100dvh-115px)]">
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
          <div className="flex-1 min-h-0">
            <ChatList
              chatListItems={isSearchMode ? searchResultItems : chatListItems}
              selectedChat={selectedChat ?? -1}
              filterOption={filterOption}
              onFilterChange={handleFilterChange}
              onChatSelect={handleChatSelect}
              isSearchMode={isSearchMode}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatListPanel;
