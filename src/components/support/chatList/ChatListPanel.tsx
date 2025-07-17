'use client';

import React, { useState } from 'react';
import SectionHeader from '@/components/support/SectionHeader';
import SearchInput from '@/components/common/SearchInput';
import ChatList from '@/components/support/chatList/ChatList';

const ChatListPanel = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChat = () => {
    console.log(searchValue);
    setSearchValue('');
  };
  const handleChangeChat = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    // console.log(searchValue);
  };
  return (
    <div className="flex flex-col w-[30%] gap-1 border-r border-lineGray overflow-y-auto">
      <SectionHeader title="상담 목록" />
      <SearchInput
        onSearchClick={() => {
          handleSearchChat();
        }}
        onChange={handleChangeChat}
      />
      <ChatList />
    </div>
  );
};

export default ChatListPanel;
