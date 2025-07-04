import ChatHeader from './ChatHeader';
import ChatRoom from './ChatRoom';
import ChatInput from './ChatInput';
import { MessageType, ChatHeaderInfoType } from '@/types/support';
import { useState } from 'react';

const MOCK_CHAT_INFO: ChatHeaderInfoType = {
  clientName: '홍길동',
  clientId: 'hong123',
  phone: '010-1234-5678',
};

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

const ChatRoomPanel = () => {
  const [messages, setMessages] = useState(MOCK_MESSAGE);
  const [chatInfo] = useState(MOCK_CHAT_INFO);

  const handleSendMessage = (message: string) => {
    const newMessage = {
      messageId: messages.length + 1,
      senderType: 'user',
      original: message,
      timestamp: new Date().toISOString(),
    } as MessageType;
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="flex flex-col w-[35%] border-r border-lineGray bg-bgLightBlue">
      <ChatHeader chatInfo={chatInfo} />
      <ChatRoom messages={messages} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatRoomPanel;
