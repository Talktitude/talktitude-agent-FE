'use client';

import ChatHeader from './ChatHeader';
import ChatRoom from './ChatRoom';
import ChatInput from './ChatInput';
import { SupportMessageType, ChatHeaderInfoType } from '@/types/support';
import { useEffect, useState, useCallback } from 'react';
import {
  getChatHeaderInfo,
  getChatMessage,
} from '@/api/support/chatRoomPanelApi';
import { useSearchParams } from 'next/navigation';

interface ChatRoomPanelProps {
  inputMessage?: string;
  setInputMessage?: (message: string) => void;
}

const ChatRoomPanel = ({
  inputMessage: externalInputMessage,
  setInputMessage: externalSetInputMessage,
}: ChatRoomPanelProps) => {
  const sessionId = useSearchParams().get('sessionId');
  const [chatInfo, setChatInfo] = useState<ChatHeaderInfoType | null>(null);
  const [messages, setMessages] = useState<SupportMessageType[]>([]);
  const [inputMessage, setInputMessage] = useState('');

  // 외부에서 제어하는 경우(추천 답변 선택 시) 내부에서 제어하는 경우(기본 입력 시) 구분하여 값 설정
  const currentInputMessage =
    externalInputMessage !== undefined ? externalInputMessage : inputMessage;
  const currentSetInputMessage = externalSetInputMessage || setInputMessage;

  const handleSendMessage = (message: string) => {
    const newMessage = {
      messageId: messages.length + 1,
      senderType: 'USER',
      originalText: message,
      textToShow: message,
      showOriginal: false,
      createdAt: new Date().toISOString(),
    } as SupportMessageType;
    setMessages([...messages, newMessage]);
    currentSetInputMessage('');
  };

  const handleInputChange = (value: string) => {
    currentSetInputMessage(value);
  };

  const fetchChatMessage = useCallback(async () => {
    const response = await getChatMessage(Number(sessionId));
    setMessages(response.data);
  }, [sessionId]);

  useEffect(() => {
    const fetchChatHeaderInfo = async (sessionId: number) => {
      const response = await getChatHeaderInfo(sessionId);
      setChatInfo(response.data);
    };
    if (sessionId) {
      fetchChatHeaderInfo(Number(sessionId));
      fetchChatMessage();
    }
  }, [sessionId, fetchChatMessage]);

  return (
    <div className="flex flex-col w-[40%] border-r border-lineGray bg-bgLightBlue">
      {chatInfo && <ChatHeader chatInfo={chatInfo} />}
      <ChatRoom messages={messages} />
      <ChatInput
        onSendMessage={handleSendMessage}
        value={currentInputMessage}
        onChange={handleInputChange}
        disabled={chatInfo?.status === 'FINISHED'}
      />
    </div>
  );
};

export default ChatRoomPanel;
