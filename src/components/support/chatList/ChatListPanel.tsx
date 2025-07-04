import React from 'react';
import SectionHeader from '@/components/support/SectionHeader';
import SearchInput from '@/components/support/chatList/SearchInput';
import ChatList from '@/components/support/chatList/ChatList';

const ChatListPanel = () => {
  return (
    <div className="flex flex-col w-[30%] gap-1 border-r border-lineGray overflow-y-auto">
      <SectionHeader title="상담 목록" />
      <SearchInput />
      <ChatList />
    </div>
  );
};

export default ChatListPanel;
