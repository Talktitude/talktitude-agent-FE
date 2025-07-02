'use client';

import Header from '@/components/common/Header';
import ChatList from '@/components/support/ChatList';
import SearchInput from '@/components/support/SearchInput';
import SectionHeader from '@/components/support/SectionHeader';
import React from 'react';

export default function SupportPage() {
  return (
    <>
      <Header />
      <div className="flex w-full">
        <div className="flex flex-col flex-1 gap-1 border-r border-lineGrey">
          <SectionHeader title="상담 목록" />
          <SearchInput />
          <ChatList />
        </div>
      </div>
    </>
  );
}
