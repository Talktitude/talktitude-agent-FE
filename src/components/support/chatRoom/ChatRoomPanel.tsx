'use client';

import React, { useEffect, useState, useCallback } from 'react';
import ChatHeader from './ChatHeader';
import ChatRoom from './ChatRoom';
import ChatInput from './ChatInput';
import { SupportMessageType, ChatHeaderInfoType } from '@/types/support';
import { useSearchParams } from 'next/navigation';
import {
  getChatHeaderInfo,
  getChatMessage,
  patchEndChat,
} from '@/api/support/chatRoomPanelApi';
import { validateSessionId } from '@/lib/utils';
import { useChatSocket } from '@/hooks/support/useChatSocket';

interface ChatRoomPanelProps {
  inputMessage?: string;
  setInputMessage?: (message: string) => void;
}

const ChatRoomPanel = ({
  inputMessage: externalInputMessage,
  setInputMessage: externalSetInputMessage,
}: ChatRoomPanelProps) => {
  const searchParams = useSearchParams();
  const sessionIdQS = searchParams.get('sessionId');
  const validSessionId = validateSessionId(sessionIdQS);

  const [chatInfo, setChatInfo] = useState<ChatHeaderInfoType | null>(null);
  const [messages, setMessages] = useState<SupportMessageType[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [forcedRefresh, setForcedRefresh] = useState(false);

  // 외부 제어/내부 제어 분기
  const currentInputMessage =
    externalInputMessage !== undefined ? externalInputMessage : inputMessage;
  const currentSetInputMessage = externalSetInputMessage || setInputMessage;

  // 1) 초기 메시지 조회
  const fetchChatMessage = useCallback(async () => {
    if (validSessionId == null) return;
    try {
      const data = await getChatMessage(validSessionId);
      setMessages(Array.isArray(data) ? data : data?.data ?? []);
    } catch (e) {
      console.error(e);
    }
  }, [validSessionId]);

  // 2) 헤더 정보 조회
  const fetchHeaderInfo = useCallback(async () => {
    if (validSessionId == null) return;
    try {
      const data = await getChatHeaderInfo(validSessionId);
      setChatInfo(data?.data ?? data);
    } catch (e) {
      console.error(e);
    }
  }, [validSessionId]);

  // 3) 소켓 수신
  const handleReceive = useCallback((msg: unknown) => {
    setMessages((prev) => {
      return [...prev, msg as SupportMessageType];
    });
  }, []);

  // 4) 소켓 훅 (연결, 전송)
  const { connected, sendMessage } = useChatSocket(handleReceive);

  useEffect(() => {
    fetchHeaderInfo();
    fetchChatMessage();
  }, [fetchHeaderInfo, fetchChatMessage]);

  // 5) 소켓 송신
  const handleSendMessage = (text: string) => {
    if (validSessionId == null) return;
    if (!text.trim()) return;

    sendMessage({
      originalText: text,
      senderType: 'USER',
      sessionId: validSessionId,
    });

    currentSetInputMessage('');
  };

  const isFinished = chatInfo?.status === 'FINISHED';

  const handleSupportEnd = async (sessionId: number) => {
    if (confirm('상담을 종료하시겠습니까?')) {
      if (isFinished) return;
      const response = await patchEndChat(sessionId);
      console.log(response.message);
      setForcedRefresh(true);
    }
  };

  return (
    <div className="flex flex-col w-[40%] border-r border-lineGray bg-bgLightBlue">
      {chatInfo && (
        <ChatHeader
          chatInfo={chatInfo}
          onSupportEnd={handleSupportEnd}
          forcedRefresh={forcedRefresh}
        />
      )}

      <ChatRoom messages={messages} />

      <ChatInput
        onSendMessage={handleSendMessage}
        value={currentInputMessage}
        onChange={(v) => currentSetInputMessage(v)}
        forcedRefresh={forcedRefresh}
        disabled={isFinished || !connected || validSessionId == null}
      />
    </div>
  );
};

export default ChatRoomPanel;
