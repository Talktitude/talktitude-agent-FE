import ClientBubble from './ClientBubble';
import AgentBubble from './AgentBubble';
import { MessageType } from '@/types/support';

const MOCK_MESSAGE: MessageType[] = [
  {
    id: 1,
    senderType: 'client',
    original:
      '안녕하세요! 무엇을 도와드릴까요?안녕하세요! 무엇을 도와드릴까요? 안녕하세요! 무엇을 도와드릴까요?',
    polite: '안녕하세요! 무엇을 도와드릴까요?',
    timestamp: '2025-01-01 12:00:00',
  },
  {
    id: 2,
    senderType: 'user',
    original: '안녕하세요! 무엇을 도와드릴까요?',
    timestamp: '2025-01-01 12:00:00',
  },
  {
    id: 3,
    senderType: 'client',
    original:
      '안녕하세요! 무엇을 도와드릴까요?안녕하세요! 무엇을 도와드릴까요?안녕하세요! 무엇을 도와드릴까요?',
    timestamp: '2025-01-01 12:00:00',
  },
  {
    id: 4,
    senderType: 'user',
    original: '안녕하세요! 무엇을 도와드릴까요?',
    timestamp: '2025-01-01 12:00:00',
  },
  {
    id: 5,
    senderType: 'user',
    original: '안녕하세요! 무엇을 도와드릴까요?',
    timestamp: '2025-01-01 12:00:00',
  },
  {
    id: 6,
    senderType: 'client',
    original: '원문입니다 불손불손불손',
    polite: '안녕하세요! 무엇을 도와드릴까요?',
    timestamp: '2025-01-01 12:00:00',
  },
];

export default function ChatRoom() {
  return (
    <div className="flex flex-col gap-2 p-5">
      {MOCK_MESSAGE.map((message) => (
        <div key={message.id}>
          {message.senderType === 'client' ? (
            <ClientBubble message={message} />
          ) : (
            <AgentBubble message={message} />
          )}
        </div>
      ))}
    </div>
  );
}
