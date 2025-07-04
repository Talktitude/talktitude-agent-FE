'use client';

import React from 'react';
import Header from '@/components/common/Header';
import ChatListPanel from '@/components/support/chatList/ChatListPanel';
import ChatRoomPanel from '@/components/support/chatRoom/ChatRoomPanel';
import SupportInfoPanel from '@/components/support/supportInfo/SupportInfoPanel';

export default function SupportPage() {
  return (
    <>
      <Header />
      <div className="flex w-full h-[calc(100vh-60px)]">
        <ChatListPanel />
        <ChatRoomPanel />
        <SupportInfoPanel />
      </div>
    </>
  );
}
