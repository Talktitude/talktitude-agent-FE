'use client';

import Header from '@/components/common/Header';
import ChatList from '@/components/support/ChatList';

import React from 'react';

export default function SupportPage() {
  return (
    <>
      <Header />
      <div className="flex w-full">
        <ChatList />
      </div>
    </>
  );
}
