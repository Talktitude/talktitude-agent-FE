'use client';

import Header from '@/components/common/Header';
import ChatListPanel from '@/components/support/chatList';
import ChatRoomPanel from '@/components/support/chatRoom';
import React from 'react';

export default function SupportPage() {
  return (
    <>
      <Header />
      <div className="flex w-full h-[calc(100vh-60px)]">
        <ChatListPanel />
        <ChatRoomPanel />
      </div>
    </>
  );
}
