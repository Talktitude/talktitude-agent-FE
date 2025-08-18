import ClientBubble from './ClientBubble';
import AgentBubble from './AgentBubble';
import { SupportMessageType } from '@/types/support';
import { useRef, useEffect } from 'react';
import { MessageSquareMore } from 'lucide-react';

interface ChatRoomProps {
  messages: SupportMessageType[];
}

export default function ChatRoom({ messages }: ChatRoomProps) {
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const emptyMessage = messages.length === 0;

  return (
    <div className="flex flex-col h-[calc(100vh-56px)] gap-2 p-5 overflow-y-auto">
      {emptyMessage ? (
        <div className="flex flex-col justify-center items-center h-full gap-3">
          <MessageSquareMore size={45} color="#aaaaaa" />
          <p className="text-textLightGray text-sm">채팅 내역이 없습니다.</p>
        </div>
      ) : (
        <>
          {messages.map((message) => (
            <div key={message.messageId}>
              {message.senderType === 'CLIENT' ? (
                <ClientBubble message={message} />
              ) : (
                <AgentBubble message={message} />
              )}
            </div>
          ))}
          <div ref={chatEndRef} />
        </>
      )}
    </div>
  );
}
