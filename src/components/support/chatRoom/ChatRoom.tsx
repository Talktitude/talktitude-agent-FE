import ClientBubble from './ClientBubble';
import AgentBubble from './AgentBubble';
import { MessageType } from '@/types/support';
import { useRef, useEffect, useState } from 'react';

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

export default function ChatRoom() {
  const [messages] = useState(MOCK_MESSAGE);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col gap-2 p-5 overflow-y-auto">
      {messages.map((message) => (
        <div key={message.messageId}>
          {message.senderType === 'client' ? (
            <ClientBubble message={message} />
          ) : (
            <AgentBubble message={message} />
          )}
        </div>
      ))}
      <div ref={chatEndRef} />
    </div>
  );
}
