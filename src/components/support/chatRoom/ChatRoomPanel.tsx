'use client';

import ChatHeader from './ChatHeader';
import ChatRoom from './ChatRoom';
import ChatInput from './ChatInput';
import { MessageType, ChatHeaderInfoType } from '@/types/support';
import { useEffect, useState } from 'react';
import { getChatHeaderInfo } from '@/api/support/chatRoomPanelApi';
import { useSearchParams } from 'next/navigation';

interface ChatRoomPanelProps {
  inputMessage?: string;
  setInputMessage?: (message: string) => void;
}

const MOCK_MESSAGE: MessageType[] = [
  {
    messageId: 1,
    senderType: 'client',
    original:
      '안녕하세요! 무엇을 도와드릴까요?안녕하세요! 무엇을 도와드릴까요? 안녕하세요! 무엇을 도와드릴까요?',
    polite: '안녕하세요! 무엇을 도와드릴까요?',
    timestamp: '2025-01-01 12:00:00',
  },
  {
    messageId: 2,
    senderType: 'user',
    original: '안녕하세요! 무엇을 도와드릴까요?',
    timestamp: '2025-01-01 12:00:00',
  },
  {
    messageId: 3,
    senderType: 'client',
    original:
      '안녕하세요! 무엇을 도와드릴까요?안녕하세요! 무엇을 도와드릴까요?안녕하세요! 무엇을 도와드릴까요?',
    timestamp: '2025-01-01 12:00:00',
  },
  {
    messageId: 4,
    senderType: 'user',
    original: '안녕하세요! 무엇을 도와드릴까요?',
    timestamp: '2025-01-01 12:00:00',
  },
  {
    messageId: 5,
    senderType: 'user',
    original: '안녕하세요! 무엇을 도와드릴까요?',
    timestamp: '2025-01-01 12:00:00',
  },
  {
    messageId: 6,
    senderType: 'client',
    original: '원문입니다 불손불손불손',
    polite: '안녕하세요! 무엇을 도와드릴까요?',
    timestamp: '2025-01-01 12:00:00',
  },
  {
    messageId: 7,
    senderType: 'client',
    original: '원문입니다 불손불손불손',
    polite: '안녕하세요! 무엇을 도와드릴까요?',
    timestamp: '2025-01-01 12:00:00',
  },
  {
    messageId: 8,
    senderType: 'client',
    original: '안녕하세요! 무엇을 도와드릴까요?',
    timestamp: '2025-01-01 12:00:00',
  },
  {
    messageId: 9,
    senderType: 'client',
    original: '안녕하세요! 무엇을 도와드릴까요?',
    timestamp: '2025-01-01 12:00:00',
  },
  {
    messageId: 10,
    senderType: 'client',
    original: '안녕하세요! 무엇을 도와드릴까요?',
    timestamp: '2025-01-01 12:00:00',
  },
  {
    messageId: 11,
    senderType: 'user',
    original: '안녕하세요! 무엇을 도와드릴까요?',
    timestamp: '2025-01-01 12:00:00',
  },
  {
    messageId: 12,
    senderType: 'user',
    original: '안녕하세요! 무엇을 도와드릴까요?',
    timestamp: '2025-01-01 12:00:00',
  },
  {
    messageId: 13,
    senderType: 'user',
    original: '안녕하세요! 무엇을 도와드릴까요?',
    timestamp: '2025-01-01 12:00:00',
  },
];

const ChatRoomPanel = ({
  inputMessage: externalInputMessage,
  setInputMessage: externalSetInputMessage,
}: ChatRoomPanelProps) => {
  const sessionId = useSearchParams().get('sessionId');
  const [chatInfo, setChatInfo] = useState<ChatHeaderInfoType | null>(null);
  const [messages, setMessages] = useState(MOCK_MESSAGE);
  const [inputMessage, setInputMessage] = useState('');

  // 외부에서 제어하는 경우(추천 답변 선택 시) 내부에서 제어하는 경우(기본 입력 시) 구분하여 값 설정
  const currentInputMessage =
    externalInputMessage !== undefined ? externalInputMessage : inputMessage;
  const currentSetInputMessage = externalSetInputMessage || setInputMessage;

  const handleSendMessage = (message: string) => {
    const newMessage = {
      messageId: messages.length + 1,
      senderType: 'user',
      original: message,
      timestamp: new Date().toISOString(),
    } as MessageType;
    setMessages([...messages, newMessage]);
    currentSetInputMessage(''); // 메시지 전송 후 입력창 초기화
  };

  const handleInputChange = (value: string) => {
    currentSetInputMessage(value);
  };

  useEffect(() => {
    const fetchChatHeaderInfo = async (sessionId: number) => {
      const response = await getChatHeaderInfo(sessionId);
      setChatInfo(response.data);
    };
    if (sessionId) {
      fetchChatHeaderInfo(Number(sessionId));
    }
  }, [sessionId]);

  return (
    <div className="flex flex-col w-[40%] border-r border-lineGray bg-bgLightBlue">
      {chatInfo && <ChatHeader chatInfo={chatInfo} />}
      <ChatRoom messages={messages} />
      <ChatInput
        onSendMessage={handleSendMessage}
        value={currentInputMessage}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default ChatRoomPanel;
