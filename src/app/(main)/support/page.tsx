'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '@/components/common/Header';
import ChatListPanel from '@/components/support/chatList/ChatListPanel';
import ChatRoomPanel from '@/components/support/chatRoom/ChatRoomPanel';
import SupportInfoPanel from '@/components/support/supportInfo/SupportInfoPanel';
import type { ChatListItemType } from '@/types/support';
import Image from 'next/image';
import GrayLogo from '/public/logo/gray-logo.svg';
import { validateSessionId } from '@/lib/utils';

export default function SupportPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [inputMessage, setInputMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState<ChatListItemType | null>(
    null,
  );

  const handleChatSelect = (chatItem: ChatListItemType) => {
    setSelectedChat(chatItem);
    router.replace(`/support?sessionId=${chatItem.sessionId}`);
  };

  useEffect(() => {
    const sessionId = searchParams.get('sessionId');
    const validSessionId = validateSessionId(sessionId);
    if (validSessionId !== null) {
      setSelectedChat({ sessionId: validSessionId } as ChatListItemType);
    } else {
      setSelectedChat(null);
    }
  }, [searchParams]);

  return (
    <>
      <Header />
      <div className="flex w-full h-[calc(100vh-56px)]">
        <ChatListPanel onChatSelect={handleChatSelect} />
        {selectedChat ? (
          <>
            <ChatRoomPanel
              inputMessage={inputMessage}
              setInputMessage={setInputMessage}
            />
            <SupportInfoPanel setInputMessage={setInputMessage} />
          </>
        ) : (
          <div className="flex flex-col w-[70%] items-center justify-center bg-gray-50">
            <Image
              src={GrayLogo}
              alt="채팅 선택 이미지"
              width={280}
              height={62}
              style={{ width: '280px', height: '62px' }}
              className="object-contain"
            />
          </div>
        )}
      </div>
    </>
  );
}
