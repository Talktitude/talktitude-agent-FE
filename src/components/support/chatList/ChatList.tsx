'use client';

import React from 'react';
import ContactItem from './ChatItem';
import { PiChats } from 'react-icons/pi';
import type { ChatListProp } from '@/types/support';
import { CHAT_LIST_PLACEHOLDERS } from '@/lib/constants/placeholders';

export default function ChatList({
  chatListItems,
  selectedChat,
  filterOption,
  onChatSelect,
  isSearchMode = false,
}: ChatListProp) {
  const filterText = filterOption === 'IN_PROGRESS' ? '진행 중인' : '종료된';
  return (
    <div className="bg-white">
      {isSearchMode && (
        <div className="px-4 py-2 text-sm text-textGray border-b border-lineGray">
          검색 결과 ({chatListItems.length}건)
        </div>
      )}
      {chatListItems.length === 0 ? (
        <div className="h-[calc(100dvh-300px)] flex flex-col items-center justify-center gap-2 text-textLightGray">
          {isSearchMode ? (
            <>
              <PiChats size={45} color="#D9D9D9" />
              <p className="text-sm">
                {CHAT_LIST_PLACEHOLDERS.NO_SEARCH_RESULT}
              </p>
              <p className="text-xs">
                {CHAT_LIST_PLACEHOLDERS.NO_CHAT_RESULT_SEARCH}
              </p>
            </>
          ) : (
            <>
              <PiChats size={45} color="#D9D9D9" />
              <p className="text-sm">
                {`${filterText} ${CHAT_LIST_PLACEHOLDERS.NO_CHAT_RESULT}`}
              </p>
            </>
          )}
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          {chatListItems.length > 0 &&
            chatListItems.map((chat, index) => (
              <ContactItem
                key={index}
                chatListItem={chat}
                isSelected={chat.sessionId === selectedChat}
                onClick={() => onChatSelect(chat.sessionId)}
              />
            ))}
        </div>
      )}
    </div>
  );
}
